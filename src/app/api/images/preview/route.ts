import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imagePath = searchParams.get('path');

    if (!imagePath) {
      return NextResponse.json({ error: 'Path manquant' }, { status: 400 });
    }

    // Vérifier que le fichier existe
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: 'Image non trouvée' }, { status: 404 });
    }

    // Lire le fichier
    const imageBuffer = fs.readFileSync(imagePath);

    // Retourner l'image avec le bon content-type
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Erreur lecture image:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
