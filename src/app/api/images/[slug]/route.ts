import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

/**
 * GET /api/images/[slug]
 * Sert une image WebP convertie en PNG (pour GMB qui ne supporte pas WebP)
 * Exemple: /api/images/chantilly-vs-fontainebleau-seminaire-comparatif
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // Chercher l'image WebP dans public/images/
    const webpPath = join(process.cwd(), "public", "images", `${slug}.webp`);

    let buffer: Buffer;
    try {
      buffer = await readFile(webpPath);
    } catch {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convertir WebP → PNG avec sharp, redimensionner en 1200x900 (ratio 4:3 GMB)
    const pngBuffer = await sharp(buffer)
      .resize(1200, 900, { fit: "cover", position: "center" })
      .png({ quality: 85 })
      .toBuffer();

    return new Response(new Uint8Array(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image conversion error:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
