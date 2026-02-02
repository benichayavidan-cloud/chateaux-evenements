// Test de configuration email
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

console.log('📧 Test de configuration email\n');

// Afficher les variables (masquées)
console.log('Variables d\'environnement:');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '****' + process.env.SMTP_PASS.slice(-4) : 'NON DÉFINI');
console.log('EMAIL_ADMIN:', process.env.EMAIL_ADMIN);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('\n---\n');

// Créer le transporteur
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Test 1: Vérifier la configuration
console.log('Test 1: Vérification de la configuration SMTP...');
transporter.verify()
  .then(() => {
    console.log('✅ Configuration SMTP valide!\n');

    // Test 2: Envoyer un email de test
    console.log('Test 2: Envoi d\'un email de test...');
    return transporter.sendMail({
      from: `"SELECT CHÂTEAUX TEST" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: process.env.EMAIL_ADMIN || process.env.SMTP_USER,
      subject: '🧪 Test Email - Select Châteaux',
      html: `
        <h1>Email de test</h1>
        <p>Si tu reçois cet email, la configuration SMTP fonctionne correctement!</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
      `,
      text: 'Si tu reçois cet email, la configuration SMTP fonctionne correctement!',
    });
  })
  .then((info) => {
    console.log('✅ Email envoyé avec succès!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('\n📬 Vérifie ta boîte mail:', process.env.EMAIL_ADMIN);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur:', error.message);
    if (error.code) console.error('Code d\'erreur:', error.code);
    if (error.command) console.error('Commande:', error.command);
    process.exit(1);
  });
