# 📁 Projektstruktur - Moggi App

## Übersicht

```
moggi-app/
├── App.tsx                      # Haupt-App-Datei mit Navigation
├── app.json                     # Expo Konfiguration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript Konfiguration
│
├── src/                         # Haupt-Quellcode-Ordner
│   ├── screens/                 # Alle App-Bildschirme
│   │   ├── HomeScreen.tsx       # 🏠 Home-Seite
│   │   ├── ProductsScreen.tsx   # 🛍️ Produkte-Seite
│   │   ├── CartScreen.tsx       # 🛒 Warenkorb-Seite
│   │   ├── AccountScreen.tsx    # 👤 Mein Konto-Seite
│   │   └── MoreScreen.tsx       # ⚙️ Mehr-Seite
│   │
│   ├── navigation/              # Navigation-Konfiguration
│   │   └── BottomTabNavigator.tsx  # Bottom Tab Navigation mit Icons
│   │
│   ├── theme/                   # Design & Styling
│   │   └── colors.ts            # 🎨 Farbschema (Orange, Schwarz, Weiß)
│   │
│   └── components/              # Wiederverwendbare Komponenten
│       └── (zukünftige Komponenten)
│
└── assets/                      # Bilder, Icons, Fonts
    ├── icon.png
    ├── splash-icon.png
    └── ...
```

## 🎨 Navigation

Die App verwendet **React Navigation** mit einer Bottom Tab Bar:

- **Home**: Startseite mit Übersicht
- **Produkte**: Produktliste und Kategorien
- **Warenkorb**: Einkaufswagen
- **Mein Konto**: Benutzerprofil
- **Mehr**: Weitere Optionen und Einstellungen

## 🚀 Entwicklung

### Neue Seite hinzufügen

1. Erstelle eine neue Datei in `src/screens/`, z.B. `NewScreen.tsx`
2. Füge den Screen in `src/navigation/BottomTabNavigator.tsx` hinzu
3. Wähle ein passendes Icon aus [Ionicons](https://icons.expo.fyi/Index)

### Komponente erstellen

1. Erstelle eine Datei in `src/components/`, z.B. `Button.tsx`
2. Exportiere die Komponente: `export default function Button() { ... }`
3. Importiere sie in deinen Screens: `import Button from '../components/Button'`

## 📦 Installierte Packages

- **react-navigation**: Navigation zwischen Screens
- **@react-navigation/bottom-tabs**: Bottom Tab Navigation
- **@expo/vector-icons**: Icons (Ionicons)
- **react-native-screens**: Native Screen-Komponenten
- **react-native-safe-area-context**: Sichere Bereiche für Notches/Kamera

## 🎯 Nächste Schritte

1. **Design anpassen**: Farben und Styles in den Screen-Dateien
2. **State Management**: Context API oder Redux hinzufügen
3. **API Integration**: Daten von einem Backend laden
4. **Authentifizierung**: Login/Registrierung implementieren
5. **Datenspeicherung**: AsyncStorage oder eine Datenbank

## 🎨 Design

Die App verwendet ein **Orange-Schwarz-Weiß** Farbschema. Alle Farben sind zentral in `src/theme/colors.ts` definiert.

Siehe `DESIGN.md` für einen vollständigen Design Guide.

## 💡 Tipps

- Jede Screen-Datei ist eigenständig und kann unabhängig bearbeitet werden
- Verwende `components/` für Code, der in mehreren Screens verwendet wird
- Verwende immer `colors` aus `src/theme/colors.ts` für konsistente Farben
- Icons findest du auf: https://icons.expo.fyi/Index
- Teste die App auf deinem Handy mit der Expo Go App

