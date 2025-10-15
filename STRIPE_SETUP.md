# Stripe Payment Setup für MOGGI App

## 📋 Übersicht

Die App ist bereits für Apple Pay, Google Pay und Stripe Kreditkarten-Zahlungen vorbereitet. Um echte Zahlungen zu akzeptieren, musst du folgende Schritte durchführen:

## 🔧 1. Stripe Account erstellen

1. Gehe zu [stripe.com](https://stripe.com)
2. Erstelle einen Account
3. Verifiziere dein Geschäft

## 🔑 2. API Keys konfigurieren

1. Im Stripe Dashboard: **Developers → API keys**
2. Kopiere deinen **Publishable key** (beginnt mit `pk_test_...`)
3. Öffne `src/config/stripe.ts`
4. Ersetze `pk_test_YOUR_PUBLISHABLE_KEY_HERE` mit deinem echten Key

```typescript
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_dein_echter_key_hier';
```

## 🍎 3. Apple Pay aktivieren (iOS)

### In Stripe Dashboard:
1. **Settings → Payment methods**
2. Aktiviere **Apple Pay**
3. Lade deine **Domain Verification File** hoch

### In Apple Developer Account:
1. Gehe zu [developer.apple.com](https://developer.apple.com)
2. **Certificates, Identifiers & Profiles → Identifiers**
3. Wähle deine App ID
4. Aktiviere **Apple Pay**
5. Erstelle einen **Merchant ID**: `merchant.com.moggi.app`
6. Öffne `src/config/stripe.ts` und stelle sicher, dass der Merchant ID korrekt ist

### In Xcode:
1. Öffne `ios/moggiapp.xcworkspace`
2. Gehe zu **Signing & Capabilities**
3. Klicke **+ Capability**
4. Füge **Apple Pay** hinzu
5. Wähle deinen Merchant ID

## 🤖 4. Google Pay aktivieren (Android)

1. Im Stripe Dashboard: **Settings → Payment methods**
2. Aktiviere **Google Pay**
3. In `src/config/stripe.ts`: Merchant Name ist bereits konfiguriert

## 🔧 5. Backend für Payment Intents erstellen

Du brauchst einen Backend-Endpoint, der Payment Intents erstellt:

```javascript
// Beispiel: Node.js Backend mit Express
const stripe = require('stripe')('sk_test_DEIN_SECRET_KEY');

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, customerId } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency || 'eur',
    customer: customerId,
  });

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customerId },
    { apiVersion: '2023-10-16' }
  );

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customerId,
  });
});
```

## 📱 6. App-Konfiguration aktualisieren

### iOS (app.json):
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.moggi.app",
      "merchantIdentifier": "merchant.com.moggi.app"
    }
  }
}
```

### Android (app.json):
```json
{
  "expo": {
    "android": {
      "package": "com.moggi.app"
    }
  }
}
```

## ✅ 7. Code aktivieren

Wenn alles konfiguriert ist:

1. Öffne `src/screens/PaymentScreen.tsx`
2. Entferne den Demo-Code (Zeilen 61-93)
3. Entferne die Kommentare `/* */` um die echte Implementation (Zeilen 95-146)
4. Aktualisiere die `createPaymentIntent()` Funktion mit deinem Backend-Endpoint

## 🧪 8. Testen

### Test-Modus:
- Verwende Stripe Test Keys (`pk_test_...`)
- Apple Pay funktioniert nur auf echten Geräten (nicht im Simulator)
- Google Pay funktioniert im Emulator

### Test-Kreditkarten:
- **Erfolg:** 4242 4242 4242 4242
- **Ablehnung:** 4000 0000 0000 0002
- Beliebiges Datum in der Zukunft
- Beliebiger CVC (3 Ziffern)

## 🚀 9. Production

Wenn alles funktioniert:
1. Wechsle zu **Live Keys** (`pk_live_...`)
2. Setze `testEnv: false` in der GooglePay Konfiguration
3. Verifiziere dein Stripe-Geschäft vollständig

## 📚 Weitere Ressourcen

- [Stripe React Native Docs](https://stripe.com/docs/payments/accept-a-payment?platform=react-native)
- [Apple Pay Setup](https://stripe.com/docs/apple-pay)
- [Google Pay Setup](https://stripe.com/docs/google-pay)

## 💡 Aktueller Status

✅ Stripe Package installiert  
✅ Provider konfiguriert  
✅ Payment Screen erstellt  
✅ Apple Pay / Google Pay ready  
⏳ Backend-Integration erforderlich  
⏳ Stripe Keys eintragen  
⏳ Apple Developer Account Setup  

---

**Fragen?** Die komplette Implementation ist bereits vorbereitet und kommentiert in `src/screens/PaymentScreen.tsx`!

