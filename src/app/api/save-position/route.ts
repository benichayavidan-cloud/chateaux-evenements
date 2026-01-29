import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const POSITIONS_FILE = path.join(process.cwd(), 'image-positions.json');

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Lire les positions existantes
    let positions: any[] = [];
    if (fs.existsSync(POSITIONS_FILE)) {
      const content = fs.readFileSync(POSITIONS_FILE, 'utf-8');
      positions = JSON.parse(content);
    }

    // Ajouter la nouvelle position
    positions.push(data);

    // Sauvegarder
    fs.writeFileSync(POSITIONS_FILE, JSON.stringify(positions, null, 2));

    return NextResponse.json({ success: true, saved: data });
  } catch (error) {
    console.error('Erreur sauvegarde position:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(POSITIONS_FILE)) {
      return NextResponse.json({ positions: [] });
    }

    const content = fs.readFileSync(POSITIONS_FILE, 'utf-8');
    const positions = JSON.parse(content);

    return NextResponse.json({ positions });
  } catch (error) {
    console.error('Erreur lecture positions:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
