import { NextResponse } from 'next/server';
import { testEmailConfiguration } from '@/lib/email';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('🧪 Test email endpoint appelé');
    console.log('Variables d\'environnement:');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'NON DÉFINI');
    console.log('EMAIL_ADMIN:', process.env.EMAIL_ADMIN);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

    // Test 1: Configuration
    console.log('\n📧 Test 1: Vérification configuration...');
    const configValid = await testEmailConfiguration();

    if (!configValid) {
      return NextResponse.json({
        success: false,
        error: 'Configuration email invalide',
        env: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          hasPass: !!process.env.SMTP_PASS,
        }
      }, { status: 500 });
    }

    console.log('✅ Configuration valide');

    // Test 2: Envoi email
    console.log('\n📧 Test 2: Envoi email de test...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SELECT CHÂTEAUX TEST" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.EMAIL_ADMIN || process.env.SMTP_USER,
      subject: '🧪 Test Email Production - Select Châteaux',
      html: `
        <h1>Email de test depuis la production</h1>
        <p>Si tu reçois cet email, la configuration SMTP fonctionne en production!</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
        <p><strong>Environnement:</strong> Production (Vercel)</p>
      `,
      text: 'Si tu reçois cet email, la configuration SMTP fonctionne en production!',
    });

    console.log('✅ Email envoyé:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      messageId: info.messageId,
      to: process.env.EMAIL_ADMIN,
    });

  } catch (error) {
    console.error('❌ Erreur lors du test email:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
