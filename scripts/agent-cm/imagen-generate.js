#!/usr/bin/env node
// Génération d'image via l'API Gemini (generateContent + responseModalities IMAGE).
// Les modèles Imagen (:predict) ont été retirés de l'API en août 2026 —
// la famille gemini-*-image les remplace. Même contrat CLI qu'avant :
//   node imagen-generate.js --prompt "..." --output /path/image.png
const fs = require('fs');
const { GEMINI_API_KEY } = require('./config');

const IMAGE_MODEL = 'gemini-3.1-flash-image';

const RETRY_DELAYS = [0, 3000, 8000];

const PROMPT_VARIANTS = [
  (p) => p,
  (p) => p.replace(/photographie éditoriale/i, 'photo de stock haut de gamme')
           .replace(/photorealistic/i, 'realistic photography style')
           .replace(/éditorial/i, 'stock photography'),
  (p) => `Architectural photography of a prestigious French château in Île-de-France, manicured French gardens, golden hour light, stone facade, slate roof, no people, no text, no logos`,
];

function extractInlineImage(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.data);
  return imagePart ? imagePart.inlineData : null;
}

async function generateImage(prompt, outputPath) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY env var is required');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  let lastError = null;

  for (let attempt = 0; attempt < RETRY_DELAYS.length; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_DELAYS[attempt];
      console.error(`[ImageGen] Retry ${attempt}/${RETRY_DELAYS.length - 1} after ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }

    const currentPrompt = PROMPT_VARIANTS[attempt](prompt);
    if (attempt > 0) {
      console.error(`[ImageGen] Reformulated prompt: ${currentPrompt.substring(0, 80)}...`);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: currentPrompt }] }],
          generationConfig: {
            responseModalities: ['IMAGE'],
            imageConfig: { aspectRatio: '16:9' },
          },
        }),
        signal: AbortSignal.timeout(60000),
      });

      const data = await response.json();

      if (data.error) {
        lastError = new Error(`Gemini image API: ${data.error.message}`);
        console.error(`[ImageGen] Attempt ${attempt + 1} error: ${data.error.message}`);
        continue;
      }

      const inline = extractInlineImage(data);
      if (!inline) {
        const finishReason = data?.candidates?.[0]?.finishReason || 'no candidates';
        lastError = new Error(`No image returned from Gemini image API (${finishReason})`);
        console.error(`[ImageGen] Attempt ${attempt + 1}: empty response (${finishReason})`);
        continue;
      }

      const buffer = Buffer.from(inline.data, 'base64');
      fs.writeFileSync(outputPath, buffer);
      if (attempt > 0) console.error(`[ImageGen] Success on attempt ${attempt + 1}`);
      return { path: outputPath, size: buffer.length, mime: inline.mimeType || 'image/png' };

    } catch (err) {
      lastError = err;
      console.error(`[ImageGen] Attempt ${attempt + 1} failed: ${err.message}`);
    }
  }

  throw lastError || new Error('All image generation attempts failed');
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
