# Apple Pay Setup für MOGGI App

## Problem: Apple Pay öffnet nicht in Expo Go

**Apple Pay funktioniert NICHT in Expo Go!** Du brauchst einen Development Build oder Production Build.

## Schnellste Lösung: EAS Build (Empfohlen)

### 1. EAS CLI installieren
```bash
npm install -g eas-cli
```

### 2. Bei Expo anmelden
```bash
eas login
```

### 3. Development Build erstellen
```bash
eas build --profile development --platform ios
```

Dies erstellt eine `.ipa` Datei, die du auf deinem iPhone installieren kannst.

### 4. App auf iPhone installieren

Nach dem Build bekommst du einen Link zum Download. Installiere die App über:
- **TestFlight** (einfachste Methode)
- oder direkt über den Download-Link

### 5. Apple Pay konfigurieren

Du musst in deinem **Apple Developer Account**:

1. **Merchant ID erstellen**:
   - Gehe zu https://developer.apple.com/account
   - Identifiers → Merchant IDs → "+"
   - Merchant ID: `merchant.com.moggi.app`

2. **App ID konfigurieren**:
   - Identifiers → App IDs
   - Bundle ID: `com.moggi.app`
   - Aktiviere "Apple Pay"
   - Wähle die Merchant ID aus

3. **Provisioning Profile erstellen**:
   - Certificates, Identifiers & Profiles → Profiles
   - Erstelle ein Development Profile
   - Wähle deine App ID und Merchant ID

## Alternative: Lokaler Build (Fortgeschritten)

Wenn du Xcode hast:

```bash
npx expo prebuild
npx expo run:ios
```

## Testen ohne Apple Pay (Stripe Payment Sheet)

Die App unterstützt auch **normale Kreditkartenzahlung** über das Stripe Payment Sheet:
- Funktioniert auch im Development Build
- Zeigt Kreditkartenformular
- Apple Pay wird automatisch angeboten, wenn verfügbar

## Aktueller Status

✅ Backend läuft (Port 3000)
✅ Stripe Integration aktiv
✅ Payment Flow komplett
⏳ Apple Pay (benötigt Development Build + Apple Developer Setup)

## Nächste Schritte

1. **Teste mit Kreditkarte** im Development Build
2. **Richte Apple Developer Account** ein
3. **Erstelle Production Build** für App Store

## Test-Kreditkarten (Stripe Test Mode)

- Karte: `4242 4242 4242 4242`
- Ablaufdatum: Beliebig (Zukunft)
- CVC: Beliebig (3 Ziffern)
- PLZ: Beliebig

## Support

Bei Fragen zur Stripe Integration: https://stripe.com/docs/payments/accept-a-payment
Bei Fragen zu Apple Pay: https://developer.apple.com/apple-pay/


