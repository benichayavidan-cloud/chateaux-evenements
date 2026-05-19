#!/usr/bin/env node
const fs = require('fs');
const { GEMINI_API_KEY } = require('./config');

const RETRY_DELAYS = [0, 3000, 8000];

const PROMPT_VARIANTS = [
  (p) => p,
  (p) => p.replace(/photographie éditoriale/i, 'photo de stock haut de gamme')
           .replace(/photorealistic/i, 'realistic photography style')
           .replace(/éditorial/i, 'stock photography'),
  (p) => `Architectural photography of a prestigious French château in Île-de-France, manicured French gardens, golden hour light, stone facade, slate roof, no people, no text, no logos`,
];

async function generateImage(prompt, outputPath) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY env var is required');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GEMINI_API_KEY}`;

  let lastError = null;

  for (let attempt = 0; attempt < RETRY_DELAYS.length; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_DELAYS[attempt];
      console.error(`[Imagen] Retry ${attempt}/${RETRY_DELAYS.length - 1} after ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }

    const currentPrompt = PROMPT_VARIANTS[attempt](prompt);
    if (attempt > 0) {
      console.error(`[Imagen] Reformulated prompt: ${currentPrompt.substring(0, 80)}...`);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: currentPrompt }],
          parameters: { sampleCount: 1, aspectRatio: '16:9', personGeneration: 'ALLOW_ADULT' },
        }),
        signal: AbortSignal.timeout(60000),
      });

      const data = await response.json();

      if (data.error) {
        lastError = new Error(`Imagen API: ${data.error.message}`);
        console.error(`[Imagen] Attempt ${attempt + 1} error: ${data.error.message}`);
        continue;
      }

      const predictions = data.predictions || [];
      if (!predictions.length || !predictions[0].bytesBase64Encoded) {
        lastError = new Error('No image returned from Imagen API');
        console.error(`[Imagen] Attempt ${attempt + 1}: empty predictions`);
        continue;
      }

      const buffer = Buffer.from(predictions[0].bytesBase64Encoded, 'base64');
      fs.writeFileSync(outputPath, buffer);
      if (attempt > 0) console.error(`[Imagen] Success on attempt ${attempt + 1}`);
      return { path: outputPath, size: buffer.length, mime: predictions[0].mimeType || 'image/png' };

    } catch (err) {
      lastError = err;
      console.error(`[Imagen] Attempt ${attempt + 1} failed: ${err.message}`);
    }
  }

  throw lastError || new Error('All Imagen attempts failed');
}

async function main() {
  const args = process.argv.slice(2);
  const promptIdx = args.indexOf('--prompt');
  const outputIdx = args.indexOf('--output');

  if (promptIdx < 0 || outputIdx < 0) {
    console.error('Usage: node imagen-generate.js --prompt "..." --output /path/to/image.png');
    process.exit(1);
  }

  try {
    const result = await generateImage(args[promptIdx + 1], args[outputIdx + 1]);
    console.log(JSON.stringify(result));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
