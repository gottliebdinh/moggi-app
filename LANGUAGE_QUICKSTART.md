# Neue Sprache hinzufügen - Schnellreferenz

**Schneller Überblick für das Hinzufügen einer neuen Sprache zur Moggi App.**

Für die ausführliche Dokumentation siehe: [`ADDING_NEW_LANGUAGE.md`](./ADDING_NEW_LANGUAGE.md)

---

## 🎯 Übersicht

**Betroffene Dateien:** 2
1. `src/context/LanguageContext.tsx` (UI-Übersetzungen)
2. `src/translations/menuTranslations.ts` (Menü-Übersetzungen)

**Zu übersetzende Elemente:**
- 368 UI-Keys
- 10 Menü-Kategorien
- 160 Gerichte
- 4 Tags

---

## 📋 Schritt-für-Schritt (Kurzfassung)

### 1️⃣ Type erweitern
```typescript
// src/context/LanguageContext.tsx
export type Language = 'de' | 'en' | 'vi' | 'NEUECODE';
```

### 2️⃣ UI-Übersetzungen hinzufügen
```typescript
// src/context/LanguageContext.tsx
const translations: Record<Language, Record<string, string>> = {
  de: { /* ... */ },
  en: { /* ... */ },
  vi: { /* ... */ },
  NEUECODE: {
    // Kopiere alle 368 Keys von 'en' und übersetze sie
    'profile.edit': '...',
    'account.title': '...',
    // ... alle weiteren Keys
    
    // ⚠️ WICHTIG: Language Name in ALLEN Sprachen hinzufügen!
    'language.NEUENAME': '...',
  },
};
```

### 3️⃣ Menü-Übersetzungen hinzufügen
```typescript
// src/translations/menuTranslations.ts
export const menuTranslations = {
  de: { /* ... */ },
  en: { /* ... */ },
  vi: { /* ... */ },
  NEUECODE: {
    categories: {
      'Vorspeisen': { title: '...', subtitle: '...' },
      // ... 9 weitere Kategorien
    },
    dishes: {
      'Edamame': '...',
      // ... 159 weitere Gerichte
    },
    tags: {
      'Scharf': '...',
      'Vegetarisch': '...',
      'Vegan': '...',
      'Beliebte Wahl': '...'
    }
  }
};
```

---

## ✅ Prüf-Befehle

### Key-Anzahl überprüfen
```bash
cd moggi-app

# Finde Zeilennummern
grep -n "^  (de|en|vi|NEUECODE): {$" src/context/LanguageContext.tsx
grep -n "^  },$" src/context/LanguageContext.tsx

# Zähle Keys (ersetze START und END mit den Zeilennummern)
sed -n 'START,ENDp' src/context/LanguageContext.tsx | grep -c "^\s*'"
# Erwartung: 368 für alle Sprachen
```

### Linter prüfen
```bash
npm run lint
```

### App testen
```bash
npm start
```

---

## ⚠️ Häufige Fehler

| Problem | Lösung |
|---------|--------|
| **Key-Anzahl stimmt nicht** | Vergleiche mit existierender Sprache, kopiere alle Keys |
| **Syntax-Fehler** | Kommas prüfen, Anführungszeichen escapen: `It\'s` |
| **Platzhalter fehlen** | `{name}`, `{email}`, `{date}` etc. müssen erhalten bleiben |
| **Wochentage falsch sortiert** | Immer Sonntag zuerst! (wegen `Date.getDay()`) |
| **Language Name fehlt** | In **ALLEN** Sprachen hinzufügen, nicht nur in der neuen |
| **Nicht alle Gerichte übersetzt** | Alle 160 Gerichte müssen vorhanden sein |

---

## 📊 Wichtige Zahlen

| Element | Anzahl |
|---------|--------|
| UI-Keys | 368 |
| Kategorien | 10 |
| Gerichte | 160 |
| Tags | 4 |
| Wochentage (voll) | 7 |
| Wochentage (kurz) | 7 |
| Datumslabels | 2 |

---

## 🔍 Kategorien-Übersicht

Folgende Kategorien müssen übersetzt werden:

1. **Vorspeisen** - Appetizers / Starters
2. **Hauptgericht** - Main Dishes
3. **Suppen** - Soups
4. **Nudelsuppen** - Noodle Soups
5. **Gebratene Nudeln & Reis** - Fried Noodles & Rice
6. **Beilagen** - Sides
7. **Dessert** - Desserts
8. **Salat** - Salads
9. **Getränke** - Beverages
10. **Bier & Wein** - Beer & Wine

---

## 🎨 Wochentage (Wichtig!)

**Reihenfolge beachten** (Sonntag = 0 in JavaScript):

```typescript
'weekday.sunday': '...',      // 0
'weekday.monday': '...',      // 1
'weekday.tuesday': '...',     // 2
'weekday.wednesday': '...',   // 3
'weekday.thursday': '...',    // 4
'weekday.friday': '...',      // 5
'weekday.saturday': '...',    // 6

// Kurze Version (für Kalender)
'weekday.short.sunday': '...',
'weekday.short.monday': '...',
// ... etc.

// Datumslabels
'date.today': '...',
'date.tomorrow': '...',
```

---

## 📝 Checkliste

```
Code:
□ Language Type erweitert
□ 368 UI-Keys übersetzt
□ Language Name zu ALLEN Sprachen hinzugefügt
□ 10 Kategorien übersetzt
□ 160 Gerichte übersetzt
□ 4 Tags übersetzt
□ 7 Wochentage (voll) übersetzt
□ 7 Wochentage (kurz) übersetzt
□ 2 Datumslabels übersetzt

QA:
□ Key-Anzahl = 368 für alle Sprachen
□ npm run lint = keine Fehler
□ Platzhalter erhalten
□ Sonderzeichen escaped
□ Wochentage korrekt sortiert

Test:
□ Sprache wechselbar
□ Alle Screens übersetzt
□ Menü übersetzt
□ Kalender korrekt
□ Checkout funktioniert
```

---

## 🆘 Hilfe

Bei Problemen:
1. Siehe [`ADDING_NEW_LANGUAGE.md`](./ADDING_NEW_LANGUAGE.md)
2. Vergleiche mit bestehenden Sprachen (Deutsch = Master)
3. Nutze die Prüf-Befehle oben

---

**Erstellt: November 2025**

