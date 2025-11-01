# Übersetzungs-System Documentation 🌍

## Übersicht

Die Moggi App unterstützt vollständig **Deutsch** und **Englisch**. Das Übersetzungssystem ist zentral organisiert und einfach erweiterbar.

---

## 📁 Struktur

### 1. **Haupt-Übersetzungsdatei**
- **Datei:** `src/context/LanguageContext.tsx`
- **Inhalt:** Alle UI-Texte für Screens (außer Menü/Gerichte)
- **Funktion:** Stellt `t()` Funktion bereit für Übersetzungen

### 2. **Menü-Übersetzungen**
- **Datei:** `src/translations/menuTranslations.ts`
- **Inhalt:** Kategorien, Gerichtbeschreibungen, Tags
- **Funktionen:** `getCategoryTitle()`, `getDishDescription()`, `getTagTranslation()`

---

## 🔧 Wie das System funktioniert

### Verwendung in Komponenten

```typescript
import { useLanguage } from '../context/LanguageContext';

function MyScreen() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <Text>{t('home.heroTitle')}</Text>
  );
}
```

### Translation Keys

Translation Keys folgen dem Muster: `screen.element`

Beispiele:
- `home.heroTitle` → "Willkommen bei Moggi" / "Welcome to Moggi"
- `cart.checkoutButton` → "Zur Kasse" / "Checkout"
- `account.language` → "Sprache" / "Language"

### Platzhalter unterstützt

```typescript
// Mit Platzhaltern
t('orderSuccess.thankYou', { name: 'Max' })
// → "Vielen Dank, Max!" / "Thank you, Max!"

// Mit Newlines
t('verify.warning') // enthält {newline} für Zeilenumbrüche
```

---

## 📋 Vollständig übersetzte Screens

### Hauptnavigation
- ✅ **HomeScreen** - Hero, Chefs, Reservierungsbutton
- ✅ **ProductsScreen** - Kategorien, Highlights, Filter
- ✅ **CartScreen** - Warenkorb, Buttons, Leer-Zustand
- ✅ **AccountScreen** - Menü, Sprachauswahl, Profil
- ✅ **MoreScreen** - Alle Menüpunkte, App-Info

### Authentifizierung
- ✅ **LoginScreen** - Login-Formular, Alerts
- ✅ **RegisterScreen** - Registrierungsformular, Validierung
- ✅ **VerifyEmailScreen** - Code-Eingabe, Bestätigungen
- ✅ **ForgotPasswordScreen** - Passwort-Reset-Anfrage
- ✅ **ResetPasswordScreen** - Neues Passwort setzen
- ✅ **LoginCheckoutScreen** - Login während Checkout

### Bestellung & Checkout
- ✅ **OrderTypeScreen** - Gast vs. Login Auswahl
- ✅ **GuestCheckoutScreen** - Gast-Daten, Zeit-Auswahl
- ✅ **CheckoutScreen** - Checkout-Formular (alternative Version)
- ✅ **PaymentScreen** - Zahlungsinformationen
- ✅ **OrderSuccessScreen** - Bestellbestätigung
- ✅ **OrderHistoryScreen** - Bestellhistorie

### Reservierung
- ✅ **ReservationScreen** - Datum/Zeit/Gäste Auswahl
- ✅ **ReservationSuccessScreen** - Reservierungsbestätigung

### Detailseiten
- ✅ **CategoryDetailScreen** - Kategorie-Übersicht mit Gerichten
- ✅ **DishDetailScreen** - Gerichtdetails, Beschreibung

### Weitere Screens
- ✅ **ContactScreen** - Kontaktinformationen, Öffnungszeiten
- ✅ **HelpSupportScreen** - FAQ, Support-Optionen
- ✅ **ImprintScreen** - Impressum (Titel)
- ✅ **PrivacyScreen** - Datenschutz (Titel)

### Navigation
- ✅ **BottomTabNavigator** - Tab-Labels (Home, Speisekarte, etc.)

---

## 🍱 Menü-Übersetzungen (menuTranslations.ts)

### Kategorien
```typescript
categories: {
  'Highlights': { title: 'Highlights', subtitle: 'Unsere Favoriten' },
  'Small Dishes': { title: 'Kleine Gerichte', subtitle: 'Perfekt zum Teilen' },
  // ...
}
```

### Gerichte
```typescript
dishes: {
  'Maguro Tataki': 'Leicht angebratener Thunfisch mit Ponzu-Sauce',
  'Ebi Tempura': 'Knusprig frittierte Garnelen im Teigmantel',
  // ...
}
```

### Tags
```typescript
tags: {
  'Scharf': 'Spicy',
  'Vegetarisch': 'Vegetarian',
  'Neu': 'New',
  // ...
}
```

---

## ➕ Neue Übersetzungen hinzufügen

### 1. UI-Texte (LanguageContext.tsx)

```typescript
// In src/context/LanguageContext.tsx
const translations = {
  de: {
    // ... bestehende Übersetzungen
    myNewScreen: {
      title: 'Mein neuer Titel',
      subtitle: 'Untertitel hier',
      button: 'Klick mich'
    }
  },
  en: {
    // ... bestehende Übersetzungen
    myNewScreen: {
      title: 'My new title',
      subtitle: 'Subtitle here',
      button: 'Click me'
    }
  }
};
```

### 2. Menü-Übersetzungen (menuTranslations.ts)

```typescript
// In src/translations/menuTranslations.ts
export const menuTranslations = {
  categories: {
    de: {
      'Neue Kategorie': {
        title: 'Neue Kategorie',
        subtitle: 'Beschreibung'
      }
    },
    en: {
      'Neue Kategorie': {
        title: 'New Category',
        subtitle: 'Description'
      }
    }
  },
  dishes: {
    de: {
      'Neues Gericht': 'Deutsche Beschreibung'
    },
    en: {
      'Neues Gericht': 'English description'
    }
  }
};
```

### 3. Im Screen verwenden

```typescript
import { useLanguage } from '../context/LanguageContext';

function MyNewScreen() {
  const { t, getCategoryTitle, getDishDescription } = useLanguage();
  
  return (
    <View>
      <Text>{t('myNewScreen.title')}</Text>
      <Text>{getCategoryTitle('Neue Kategorie')}</Text>
      <Text>{getDishDescription('Neues Gericht')}</Text>
    </View>
  );
}
```

---

## 🔄 Sprache wechseln

### Über die App
1. **Konto-Tab** öffnen
2. **"Sprache"** / **"Language"** auswählen
3. Gewünschte Sprache wählen

### Programmatisch
```typescript
const { setLanguage } = useLanguage();

// Auf Englisch wechseln
setLanguage('en');

// Auf Deutsch wechseln
setLanguage('de');
```

### Speicherung
- Ausgewählte Sprache wird in **AsyncStorage** gespeichert
- Bleibt nach App-Neustart erhalten

---

## 📊 Statistik

- **Screens übersetzt:** 30+
- **Translation Keys:** 300+
- **Menü-Einträge:** 50+ Gerichte
- **Kategorien:** 6
- **Tags:** 5

---

## ⚙️ Technische Details

### Platzhalter-Ersetzung
Die `t()` Funktion unterstützt:
- `{name}`, `{email}`, `{number}`, `{count}` → Dynamische Werte
- `{newline}` → Wird zu `\n` konvertiert

### Datum-Formatierung
- Verwendet `toLocaleDateString()` für sprachabhängige Datumsformate
- Tag-Namen werden manuell lokalisiert (So/Su, Mo, Di/Tu, etc.)

### Zeitzone-Behandlung
- Admin-Dashboard: Verwendet `dateToLocalString()` für korrekte lokale Datums-Darstellung
- Vermeidet UTC-Konvertierung mit `toISOString()`

---

## 🐛 Häufige Probleme

### Problem: Translation Key wird angezeigt statt Text
**Ursache:** Key existiert nicht in `translations` Objekt
**Lösung:** Key in `LanguageContext.tsx` hinzufügen

### Problem: Menü-Beschreibung nicht übersetzt
**Ursache:** Gericht nicht in `menuTranslations.ts`
**Lösung:** Gericht in `menuTranslations.ts` → `dishes` hinzufügen

### Problem: Datum-Auswahl funktioniert nicht in Englisch
**Ursache:** Backend verwendet deutsche Tag-Namen für Regeln
**Lösung:** Bereits gefixt - interne Logik verwendet deutsche Namen, Display ist lokalisiert

---

## 📝 Best Practices

1. **Konsistente Benennung:** Verwende `screen.element` Format
2. **Gruppierung:** Gruppiere zusammengehörige Keys unter einem Screen
3. **Keine Duplikate:** Verwende `common.*` für häufig genutzte Texte
4. **Placeholder-Namen:** Verwende sprechende Namen wie `{name}`, nicht `{0}`
5. **Testen:** Teste beide Sprachen nach Änderungen

---

## 🚀 Neue Sprache hinzufügen

Um eine dritte Sprache (z.B. Französisch) hinzuzufügen:

1. **LanguageContext.tsx erweitern:**
```typescript
type Language = 'de' | 'en' | 'fr';

const translations = {
  de: { /* ... */ },
  en: { /* ... */ },
  fr: {
    home: {
      heroTitle: 'Bienvenue chez Moggi',
      // ...
    }
  }
};
```

2. **menuTranslations.ts erweitern:**
```typescript
categories: {
  de: { /* ... */ },
  en: { /* ... */ },
  fr: { 'Highlights': { title: 'Points forts', subtitle: '...' } }
}
```

3. **Sprachauswahl-UI erweitern:**
```typescript
// In AccountScreen.tsx
const languages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];
```

---

## 📞 Support

Bei Fragen oder Problemen:
- **Code-Review:** Prüfe `LanguageContext.tsx` und `menuTranslations.ts`
- **Logs:** Console-Logs zeigen fehlende Translation Keys
- **Testing:** Teste beide Sprachen in der App-Sprachauswahl

---

**Erstellt:** November 2024  
**Letzte Aktualisierung:** November 2024  
**Version:** 1.0

