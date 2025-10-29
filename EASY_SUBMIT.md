# ✅ App bei Apple einreichen - Einfache Anleitung

## 📱 Situation
- ✅ Backend läuft auf Render
- ✅ iOS `.ipa` Datei vorhanden (24 MB)
- ✅ EAS CLI installiert & eingeloggt als `gottliebdinh`
- ✅ App konfiguriert

## 🚀 **Nächste Schritte:**

### 1. Apple Developer Account (wichtig!)

**Du brauchst ein Apple Developer Account** ($99/Jahr):

1. **Registrieren:** https://developer.apple.com/programs/
2. **Zugriff kann 24-48h dauern**
3. **Nach Aktivierung:** Gehe zu https://appstoreconnect.apple.com
   - Erstelle neue App → Name: "MOGGI"
   - Bundle ID: `com.moggi.app`

### 2. App einreichen (Terminal)

**Öffne Terminal und führe aus:**

```bash
cd "/Users/gottlieb/Projects/Moggi App/moggi-app"

# Option 1: Existierende .ipa einreichen
eas submit --platform ios --latest

# ODER Option 2: Neuen Build erstellen + einreichen
eas build --profile production --platform ios
```

**Was passiert:**
- EAS fragt nach deinen Apple Developer Credentials (1x)
- App wird gesigned & hochgeladen
- In App Store Connect sichtbar (15-30 Min)

### 3. App Store Connect (nach Upload)

1. Gehe zu: https://appstoreconnect.apple.com
2. Klicke auf deine App "MOGGI"
3. **Version für Review vorbereiten**
4. Fülle aus:
   - Screenshots (iPhone)
   - Beschreibung
   - Kategorie: Essen & Trinken
5. **Zur Überprüfung senden**

### 4. Warte auf Review (1-7 Tage)

Apple prüft die App, dann ist sie live im Store!

## ⚠️ Wichtige Voraussetzungen:

### Apple Developer Setup (einmalig):

#### a) App ID erstellen:
https://developer.apple.com/account/resources/identifiers/list
- Bundle ID: `com.moggi.app`
- Capabilities: Push Notifications, Apple Pay

#### b) Merchant ID (für Apple Pay):
https://developer.apple.com/account/resources/identifiers/list/merchant
- Merchant ID: `merchant.com.moggi.app`

## 🎯 Einfachste Lösung für dich:

Da der Build bei Render funktioniert hat, mach einfach:

```bash
cd "/Users/gottlieb/Projects/Moggi App/moggi-app"
eas submit --platform ios --latest
```

Falls `eas submit` nach deinen Apple Developer Credentials fragt:
- Folge den Anweisungen
- Logge dich mit deinem Apple Developer Account ein
- EAS macht den Rest automatisch

## 📋 Zusammenfassung:

| Was | Status | Action |
|-----|--------|--------|
| Backend Render | ✅ Läuft | - |
| iOS Build | ✅ Fertig (24 MB) | - |
| EAS CLI | ✅ Installiert | - |
| Apple Account | ⏳ Benötigt | $99/Jahr |
| App einreichen | ⏳ Bereit | `eas submit` |
| Review | ⏳ Warten | 1-7 Tage |

## 🆘 Hilfe:

**Detaillierte Anleitung:** Siehe `APPLE_SUBMIT_GUIDE.md`

**Schnellstart:** Siehe `SUBMIT_QUICK_START.md`

**EAS Docs:** https://docs.expo.dev/submit/introduction/

---

## 🎉 Los geht's!

Alles ist bereit. Du musst nur noch:
1. Apple Developer Account ($99) → kann 1-2 Tage dauern
2. Dann `eas submit --platform ios --latest` → 5 Minuten
3. Dann App Info ausfüllen → 15 Minuten
4. Dann Apple Review → 1-7 Tage

**Dann ist deine App live!** 🚀

