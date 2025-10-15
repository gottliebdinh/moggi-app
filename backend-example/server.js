// MOGGI App - Backend Beispiel für Stripe Payment Intents
// Dies ist ein einfaches Node.js/Express Backend für Stripe Zahlungen

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY_HERE');
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

