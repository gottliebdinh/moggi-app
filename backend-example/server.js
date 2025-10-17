// MOGGI App - Backend Beispiel für Stripe Payment Intents
// Dies ist ein einfaches Node.js/Express Backend für Stripe Zahlungen

require('dotenv').config({ path: '../.env.local' });

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY_HERE');
const { Resend } = require('resend');
const { getOrderConfirmationEmail } = require('./emailTemplates/orderConfirmation');
const { getWelcomeEmail } = require('./emailTemplates/welcomeEmail');
const { getPasswordResetEmail } = require('./emailTemplates/passwordResetEmail');
const { getVerificationEmail } = require('./emailTemplates/verificationEmail');
const { storeVerificationCode, verifyCode } = require('./verificationStore');

const resend = new Resend(process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY_HERE');
const app = express();

app.use(express.json());

// CORS für React Native
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Payment Intent erstellen
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, customerEmail, customerName } = req.body;

    // 1. Customer erstellen oder finden
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
      });
    }

    // 2. Payment Intent erstellen
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in Cent
      currency: currency || 'eur',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        restaurant: 'MOGGI Asian Kitchen & Bar',
        location: 'Katharinengasse 14, 90403 Nürnberg',
      },
    });

    // 3. Ephemeral Key für Customer erstellen
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51SISLvGoOdcgyztZoJN9i2zy0hZxu3d2VUR99ga4LoH01nM4Nv7rz8VTBg70EqOihpmsTsgJgrSx3WVZVENalxD000QbJroVhS'
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(400).json({ error: error.message });
  }
});

// Bestellbestätigung per E-Mail senden
app.post('/send-order-confirmation', async (req, res) => {
  try {
    const { customerEmail, customerName, orderNumber, items, total, pickupDate, pickupTime } = req.body;

    console.log('📧 Sende Bestellbestätigung an:', customerEmail);

    const emailHtml = getOrderConfirmationEmail({
      customerName,
      orderNumber,
      items,
      total,
      pickupDate,
      pickupTime,
    });

    const { data, error } = await resend.emails.send({
      from: 'MOGGI <noreply@gdinh.de>',
      to: [customerEmail],
      subject: `Bestellbestätigung #${orderNumber} - MOGGI`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Fehler beim E-Mail senden:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('✅ E-Mail erfolgreich gesendet:', data);
    res.json({ success: true, emailId: data.id });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
});

// Welcome E-Mail senden (bei Registrierung)
app.post('/send-welcome-email', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    console.log('📧 Sende Welcome E-Mail an:', email);

    const emailHtml = getWelcomeEmail({
      firstName,
      lastName,
    });

    const { data, error } = await resend.emails.send({
      from: 'MOGGI <noreply@gdinh.de>',
      to: [email],
      subject: 'Willkommen bei MOGGI! 🎉',
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Fehler beim E-Mail senden:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('✅ Welcome E-Mail erfolgreich gesendet:', data);
    res.json({ success: true, emailId: data.id });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({ error: error.message });
  }
});

// Passwort-Reset E-Mail senden
app.post('/send-password-reset-email', async (req, res) => {
  try {
    const { email, resetLink } = req.body;

    console.log('📧 Sende Passwort-Reset E-Mail an:', email);

    const emailHtml = getPasswordResetEmail({
      resetLink,
    });

    const { data, error } = await resend.emails.send({
      from: 'MOGGI <noreply@gdinh.de>',
      to: [email],
      subject: 'Passwort zurücksetzen - MOGGI',
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Fehler beim E-Mail senden:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('✅ Passwort-Reset E-Mail erfolgreich gesendet:', data);
    res.json({ success: true, emailId: data.id });

  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: error.message });
  }
});

// E-Mail Verifizierung senden
app.post('/send-verification-email', async (req, res) => {
  try {
    const { email, firstName, userId } = req.body;

    console.log('📧 Sende Verification E-Mail an:', email);

    // Generiere und speichere Code
    const code = storeVerificationCode(email, userId);
    
    const emailHtml = getVerificationEmail({
      firstName,
      code,
      verificationLink: `exp://192.168.178.25:8081/--/verify?email=${encodeURIComponent(email)}&code=${code}`,
    });

    const { data, error } = await resend.emails.send({
      from: 'MOGGI <noreply@gdinh.de>',
      to: [email],
      subject: 'Bestätige deine E-Mail - MOGGI',
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Fehler beim E-Mail senden:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('✅ Verification E-Mail erfolgreich gesendet:', data);
    res.json({ success: true, emailId: data.id });

  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verification Code prüfen
app.post('/verify-email', async (req, res) => {
  try {
    const { email, code, userId, firstName } = req.body;

    console.log('🔍 Prüfe Verification Code für:', email);

    const result = verifyCode(email, code);

    if (!result.valid) {
      console.log('❌ Ungültiger Code:', result.error);
      return res.status(400).json({ error: result.error });
    }

    console.log('✅ E-Mail erfolgreich verifiziert');
    
    // Sende Welcome E-Mail nach erfolgreicher Verifizierung
    try {
      const welcomeHtml = getWelcomeEmail({
        firstName: firstName || 'User',
      });
      
      await resend.emails.send({
        from: 'MOGGI <noreply@gdinh.de>',
        to: [email],
        subject: 'Willkommen bei MOGGI! 🎉',
        html: welcomeHtml,
      });
      
      console.log('✅ Welcome E-Mail gesendet an:', email);
    } catch (welcomeError) {
      console.log('⚠️ Welcome E-Mail konnte nicht gesendet werden:', welcomeError);
    }
    
    res.json({ success: true, userId: result.userId });

  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook für Stripe Events (optional aber empfohlen)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = 'whsec_YOUR_WEBHOOK_SECRET_HERE';

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    // Handle verschiedene Events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('✅ Zahlung erfolgreich:', paymentIntent.id);
        // Hier: Bestellung in Datenbank speichern, E-Mail senden, etc.
        break;
      
      case 'payment_intent.payment_failed':
        console.log('❌ Zahlung fehlgeschlagen');
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MOGGI Backend läuft auf Port ${PORT}`);
  console.log(`📡 Payment Intent Endpoint: http://localhost:${PORT}/create-payment-intent`);
});

