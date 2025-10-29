# 🚀 Schnellstart: App bei Apple einreichen

## ✅ Du hast bereits:
- ✅ Backend läuft auf Render
- ✅ `.ipa` Datei vorhanden (24 MB)
- ✅ App ist konfiguriert für Apple Developer

## 🎯 3 Schritte zum App Store:

### 1. EAS CLI installieren & anmelden
```bash
# Terminal öffnen
cd "/Users/gottlieb/Projects/Moggi App/moggi-app"

# EAS CLI installieren
npm install -g eas-cli

# Bei Expo anmelden
eas login

# Dein Projekt verknüpfen
eas build:configure
```

### 2. Apple Developer Account (wichtig!)

Du brauchst einen **Apple Developer Account** ($99/Jahr):

1. **Registrieren:** https://developer.apple.com/programs/
2. **Zugriff aktivieren:** Kann 24-48h dauern
3. **App Store Connect:** https://appstoreconnect.apple.com
   - Erstelle eine neue App
   - Name: "MOGGI"
   - Bundle ID: `com.moggi.app`

### 3. App einreichen

#### Option A: Mit bestehender `.ipa` Datei
```bash
eas submit --platform ios --latest
```

#### Option B: Neuen Build erstellen & einreichen
```bash
# Build für App Store erstellen
eas build --profile production --platform ios

# Nach dem Build automatisch einreichen (empfohlen)
eas submit --platform ios --latest
```

## 📋 Was EAS automatisch macht:
- ✅ Apps signieren mit deinem Apple Developer Certificate
- ✅ Upload zur App Store Connect
- ✅ TestFlight Beta Version erstellen

## ⏱️ Zeitplan:
- **Apple Developer Setup:** 1-2 Tage (Wartezeit)
- **EAS Build:** 20-30 Minuten
- **TestFlight:** 15 Minuten
- **App Review:** 1-7 Tage

## 🔍 Aktueller Status prüfen:
```bash
# Eingereichte Builds anzeigen
eas build:list --platform ios

# Status im Terminal
eas submit --latest
```

## 💡 Empfohlener Workflow:

### Schritt 1: TestFlight (Beta-Testing)
```bash
eas build --profile testflight --platform ios
```
- Lass Freunde/Familie die App testen
- Bug-Reports sammeln
- VOR dem App Store Release

### Schritt 2: App Store Release
```bash
eas build --profile production --platform ios
```
- Finale Version
- Nach TestFlight Tests

## 🆘 Probleme?

### "No Apple credentials configured"
```bash
eas credentials
```
- Folge den Anweisungen
- Logge dich mit deinem Apple Developer Account ein

### "Bundle ID not found"
- Gehe zu https://developer.apple.com/account/resources/identifiers/list
- Erstelle neue App ID mit Bundle ID: `com.moggi.app`

### Backend-URL ändern
- Prüfe `.env` oder `src/config/` Dateien
- Stelle sicher, dass deine Render URL dort steht

## 📱 Nach der Einreichung:

1. **App Store Connect:** https://appstoreconnect.apple.com
2. Navigiere zu deiner App
3. Klicke "Version für Review vorbereiten"
4. Wähle deinen Build aus
5. Fülle App-Informationen aus (Screenshots, Beschreibung, etc.)
6. "Zur Überprüfung senden"

## 🎉 Erfolg!

Nach der Apple Review (1-7 Tage) wird deine App im App Store verfügbar sein!

---

**Weitere Details:** Siehe `APPLE_SUBMIT_GUIDE.md` für vollständige Anleitung.

