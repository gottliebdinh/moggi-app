# 🚀 Apple App Store Submission Guide

## ✅ Für den Apple App Store

Da der Backend-Build bei Render erfolgreich war, kannst du die iOS-App jetzt einreichen:

## 📋 Was du brauchst:

1. ✅ **Apple Developer Account** ($99/Jahr)
   - Registriere dich bei: https://developer.apple.com
   - Melde dich mit deinem Apple ID an

2. ✅ **App Store Connect Zugriff**
   - Gehe zu: https://appstoreconnect.apple.com
   - Erstelle deine App (kann 24-48h dauern, bis Bundle ID aktiv ist)

3. ✅ **Certificates & Profiles** (automatisch mit EAS)
   - EAS verwaltet das automatisch für dich!

## 🎯 Schritt-für-Schritt Anleitung:

### 1. Apple Developer Account vorbereiten

#### a) App ID registrieren
1. Gehe zu https://developer.apple.com/account/resources/identifiers/list
2. Klicke auf **"+"** → **App IDs**
3. App ID: `com.moggi.app`
4. Aktiviere diese Capabilities:
   - ✅ Push Notifications
   - ✅ Apple Pay (mit Merchant ID)
   - ✅ Associated Domains

#### b) Merchant ID erstellen (für Apple Pay)
1. Gehe zu https://developer.apple.com/account/resources/identifiers/list/merchant
2. Klicke auf **"+"** → **Merchant IDs**
3. Merchant ID: `merchant.com.moggi.app`
4. Speichern

#### c) App Store Connect – App erstellen
1. Gehe zu https://appstoreconnect.apple.com
2. **Meine Apps** → **"+"** → **Neue App**
3. Fülle aus:
   - **Plattform:** iOS
   - **Name:** MOGGI
   - **Primäre Sprache:** Deutsch
   - **Bundle ID:** `com.moggi.app`
   - **SKU:** `moggi-app-001`
   - **Verfügbarkeit:** Weltweit (oder wähle Länder)

### 2. EAS Build erstellen (für App Store)

Du kannst einen der folgenden Befehle verwenden:

#### Option A: TestFlight Build (empfohlen für Tests)
```bash
cd moggi-app
eas build --profile testflight --platform ios
```

#### Option B: Production Build (für direkte App Store Einreichung)
```bash
eas build --profile production --platform ios
```

**Was passiert:**
- EAS erstellt ein signiertes `.ipa` File
- Lädt es automatisch nach App Store Connect hoch
- Du bekommst einen Link zum Download

**Dauer:** ~15-30 Minuten

### 3. EAS Submit (Alternative zu manueller Einreichung)

Falls du die `.ipa` Datei bereits hast (wie `moggi-app.ipa`):

```bash
cd moggi-app

# Einfach einreichen
eas submit --platform ios --latest

# Oder spezifische Datei
eas submit --platform ios --path ./moggi-app.ipa
```

### 4. TestFlight (Beta-Testing)

Nach dem Build kannst du die App in TestFlight testen:

1. Gehe zu App Store Connect → **TestFlight**
2. Warte bis der Build verarbeitet ist (15-30 Min)
3. Füge interne Tester hinzu (Mitglieder deines Teams)
4. Oder sende TestFlight-Links an externe Tester

### 5. App Store Einreichung

1. Gehe zu **App Store Connect** → **Meine Apps** → **MOGGI**
2. Klicke auf **App Store Informationen ausfüllen**
3. Fülle aus:
   - **App-Name:** MOGGI
   - **Untertitel:** Asian Kitchen & Bar
   - **Kategorie:** Lebensmittel und Getränke
   - **Screenshots** hochladen (verschiedene iPhone Größen)
   - **App-Beschreibung** schreiben
   - **Keywords** festlegen
   - **Preis:** Kostenlos
   - **Datenschutzrichtlinie** URL angeben

4. **Build auswählen:**
   - Oben rechts: **Version für Review vorbereiten**
   - Wähle deinen Production Build
   - Send ein zur Review → Apple prüft die App (1-7 Tage)

## 📱 Zusammenfassung

| Schritt | Tool/Platform | Dauer |
|---------|---------------|-------|
| Apple Developer Account | developer.apple.com | 5 Min |
| App ID & Merchant ID | developer.apple.com | 10 Min |
| App Store Connect Setup | appstoreconnect.apple.com | 15 Min |
| EAS Build | Terminal | 20-30 Min |
| TestFlight Beta | App Store Connect | 15 Min |
| App Store Review | Apple | 1-7 Tage |

## ⚠️ Wichtige Hinweise

### Apple Pay Setup:
- ✅ Merchant ID ist bereits in `app.json` konfiguriert: `merchant.com.moggi.app`
- ✅ Bundle ID ist konfiguriert: `com.moggi.app`
- ⚠️ Du musst diese IDs in deinem Apple Developer Account erstellen (siehe oben)

### Backend URL:
- Stelle sicher, dass deine Backend-URL korrekt in der App ist
- Render Deployment URL sollte in `.env` oder Config stehen

### App Screenshots:
Du brauchst Screenshots für verschiedene Geräte:
- iPhone 6.7" (iPhone 14 Pro Max, 15 Pro Max)
- iPhone 6.5" (iPhone 11 Pro Max, XS Max)
- iPhone 5.5" (iPhone 8 Plus)
- iPad Pro 12.9"

### Datenschutz & Legal:
- **Impressum** URL erstellen
- **Datenschutzrichtlinie** URL erstellen
- In der App unter "Impressum" und "Datenschutz" verlinken

## 🆘 Hilfe

### EAS CLI installieren:
```bash
npm install -g eas-cli
```

### Anmelden:
```bash
eas login
```

### Projekt-ID prüfen:
Die EAS Project ID ist bereits in `app.json`:
```json
"extra": {
  "eas": {
    "projectId": "008c582f-cd4c-4c01-b15b-1b2fbf5c7022"
  }
}
```

### Support:
- EAS Docs: https://docs.expo.dev/build/introduction/
- Apple Developer: https://developer.apple.com/support/
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/

## 🎉 Nach der Genehmigung

- ✅ App wird im App Store verfügbar sein
- ✅ Nutzer können die App herunterladen
- ✅ Push Notifications aktivieren (optional)
- ✅ App Analytics in App Store Connect einsehen

