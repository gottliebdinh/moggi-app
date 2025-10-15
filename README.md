# 🛍️ Moggi App

Eine moderne React Native E-Commerce App erstellt mit Expo und TypeScript.

## ✨ Features

- 🏠 **Home**: Startseite mit Übersicht
- 🛍️ **Produkte**: Produktkatalog
- 🛒 **Warenkorb**: Einkaufswagen
- 👤 **Mein Konto**: Benutzerprofil
- ⚙️ **Mehr**: Einstellungen und Optionen

## 🚀 Setup

### Voraussetzungen

- Node.js Version 20.19.4 (siehe `.nvmrc`)
- npm oder yarn

### Installation

1. **Node Version verwenden** (mit nvm):
   ```bash
   nvm use
   ```

2. **Dependencies installieren**:
   ```bash
   npm install
   ```

3. **Environment Variablen**:
   ```bash
   cp .env.example .env
   ```
   Bearbeite `.env` und füge deine Werte hinzu.

## 📱 App starten

- **Development Server**:
  ```bash
  npm start
  ```

- **iOS Simulator** (nur macOS):
  ```bash
  npm run ios
  ```

- **Android Emulator**:
  ```bash
  npm run android
  ```

- **Web Browser**:
  ```bash
  npm run web
  ```

## 📦 Build

Für Production Builds siehe [Expo Dokumentation](https://docs.expo.dev/build/introduction/).

## 🛠 Technologien

- **React Native** - Mobile App Framework
- **Expo** - Development Platform
- **TypeScript** - Type Safety
- **React Navigation** - Navigation zwischen Screens
- **Ionicons** - Moderne Icons

## 📁 Projektstruktur

Siehe `PROJEKTSTRUKTUR.md` für eine detaillierte Übersicht der Ordnerstruktur.

```
src/
├── screens/        # Alle App-Seiten
├── navigation/     # Navigation-Konfiguration
└── components/     # Wiederverwendbare Komponenten
```

## 📝 Notizen

- Die App läuft auf iOS, Android und Web
- Verwende `npm start` und scanne den QR Code mit der Expo Go App auf deinem Smartphone
- Bottom Tab Navigation mit 5 Hauptbereichen
- Hot Reload: Änderungen werden sofort in der App sichtbar

