# 🔧 Fix: "Cannot read properties of undefined" bei Submit

## 🎯 Das Problem:

EAS kann die App in App Store Connect nicht finden oder erstellen.

## ✅ Lösung: App manuell in App Store Connect erstellen

### Schritt 1: App Store Connect öffnen
1. Gehe zu: https://appstoreconnect.apple.com
2. Klicke auf **"Meine Apps"** (oben links)
3. Klicke auf das **"+"** Symbol → **"Neue App"**

### Schritt 2: App Informationen eingeben
Fülle folgendes aus:

- **Platform:** iOS
- **Name:** MOGGI
- **Primäre Sprache:** Deutsch
- **Bundle ID:** `com.moggi.app` (auswählen aus Dropdown)
  - ⚠️ Falls Bundle ID nicht existiert, erstelle sie zuerst:
  - https://developer.apple.com/account/resources/identifiers/list
  - Klicke "+" → "App IDs"
  - Bundle ID: `com.moggi.app`
- **SKU:** `moggi-app-001`
- **Benutzerzugriff:** Vollzugriff (oder wie gewünscht)
- **Verfügbarkeit:** Weltweit (oder bestimmte Länder)

### Schritt 3: App erstellen
- Klicke auf **"Erstellen"**
- Die App wird jetzt in App Store Connect angelegt

### Schritt 4: Submit erneut versuchen
Nach 2-5 Minuten (App muss sich erst registrieren):

```bash
cd "/Users/gottlieb/Projects/Moggi App/moggi-app"
eas submit --platform ios --profile testflight --latest
```

## 🆘 Alternative: Mit Download-Link

Falls du die .ipa Datei direkt hochladen willst:

### Option A: Transporter App (macOS)
1. Lade Transporter herunter: https://apps.apple.com/app/transporter/id1450874784
2. Öffne Transporter
3. Ziehe die .ipa Datei in Transporter
4. Klicke "Deliver"

### Option B: Online .ipa Download
- URL des aktuellsten Builds: https://expo.dev/artifacts/eas/nN96YJQuWpsAR2Cb4YHUiY.ipa
- Lade die Datei herunter
- Nutze Transporter App zum Hochladen

## 📋 Checklist

- [ ] Bundle ID in Apple Developer erstellt (`com.moggi.app`)
- [ ] App in App Store Connect erstellt
- [ ] Warte 2-5 Minuten
- [ ] `eas submit` erneut ausführen

## 💡 Warum passiert das?

EAS versucht automatisch, die App in App Store Connect zu erstellen, aber:
- Das Bundle ID `com.moggi.app` existiert noch nicht in deinem Apple Developer Account
- Oder die App wurde in App Store Connect noch nicht erstellt

Das ist ein häufiges Problem beim ersten Submit!

## ✅ Nach dem Fix

Wenn alles funktioniert, siehst du:
```
✔ Ensuring your app exists on App Store Connect
✔ Uploading file
✔ Submission completed successfully
```

Dann kannst du in App Store Connect:
1. Gehe zu deiner App
2. Klicke auf TestFlight oder "Version für Review vorbereiten"
3. Wähle den hochgeladenen Build aus

