# Anleitung: Neue Sprache hinzufügen

Diese Dokumentation beschreibt **alle notwendigen Schritte**, um eine neue Sprache zur Moggi App hinzuzufügen.

## Inhaltsverzeichnis
1. [Übersicht der betroffenen Dateien](#übersicht-der-betroffenen-dateien)
2. [Schritt-für-Schritt-Anleitung](#schritt-für-schritt-anleitung)
3. [Vollständige Liste aller Übersetzungs-Keys](#vollständige-liste-aller-übersetzungs-keys)
4. [Überprüfung und Qualitätssicherung](#überprüfung-und-qualitätssicherung)
5. [Häufige Fehler vermeiden](#häufige-fehler-vermeiden)

---

## Übersicht der betroffenen Dateien

Beim Hinzufügen einer neuen Sprache müssen **genau 2 Dateien** bearbeitet werden:

1. **`src/context/LanguageContext.tsx`** - Hauptdatei für UI-Übersetzungen
2. **`src/translations/menuTranslations.ts`** - Menü-spezifische Übersetzungen (Kategorien, Gerichte, Tags)

---

## Schritt-für-Schritt-Anleitung

### Schritt 1: Type Definition erweitern

**Datei:** `src/context/LanguageContext.tsx`

**Was tun:**
Füge den neuen Sprachcode zum `Language` Type hinzu.

**Beispiel:** Französisch hinzufügen
```typescript
// VORHER:
export type Language = 'de' | 'en' | 'vi';

// NACHHER:
export type Language = 'de' | 'en' | 'vi' | 'fr';
```

**Verfügbare Sprachcodes:**
- `de` = Deutsch
- `en` = Englisch
- `vi` = Vietnamesisch
- `fr` = Französisch
- `es` = Spanisch
- `it` = Italienisch
- `tr` = Türkisch
- etc.

---

### Schritt 2: Übersetzungsobjekt hinzufügen

**Datei:** `src/context/LanguageContext.tsx`

**Was tun:**
Erstelle ein neues Übersetzungsobjekt für die neue Sprache im `translations` Objekt.

**Struktur:**
```typescript
const translations: Record<Language, Record<string, string>> = {
  de: { /* ... */ },
  en: { /* ... */ },
  vi: { /* ... */ },
  // Neue Sprache hinzufügen:
  fr: {
    // Alle Keys hier kopieren und übersetzen
  },
};
```

**WICHTIG:** 
- Kopiere ALLE Keys von einer existierenden Sprache (z.B. von `en`)
- Die Anzahl der Keys MUSS in allen Sprachen identisch sein
- Aktuell gibt es **368 Keys** (Stand: November 2025)

---

### Schritt 3: Alle UI-Übersetzungen hinzufügen

**Datei:** `src/context/LanguageContext.tsx`

Übersetze alle 368 Keys. Die Keys sind in folgende Kategorien unterteilt:

#### 3.1 Profile & Account Screens
```typescript
// Profile Edit Screen
'profile.edit': 'Profil bearbeiten',
'profile.personalData': 'Persönliche Daten',
'profile.updateInfo': 'Aktualisiere deine Kontoinformationen',
// ... (13 Keys gesamt)

// Account Screen  
'account.title': 'Mein Konto',
'account.subtitle': 'Verwalte deine Einstellungen',
// ... (16 Keys gesamt)
```

#### 3.2 Home Screen
```typescript
'home.heroTitle': 'Willkommen bei',
'home.heroSubtitle': 'Authentische vietnamesische Küche',
// ... (8 Keys gesamt)
```

#### 3.3 Products Screen
```typescript
'products.title': 'Unsere Speisekarte',
'products.subtitle': 'Frisch zubereitet mit Liebe',
// ... (6 Keys gesamt)
```

#### 3.4 Cart & Checkout
```typescript
'cart.title': 'Warenkorb',
'cart.empty': 'Dein Warenkorb ist leer',
'cart.continueShopping': 'Weiter einkaufen',
// ... (26 Keys gesamt für cart.*)
// ... (28 Keys gesamt für checkout.*)
```

#### 3.5 Navigation & Common
```typescript
'nav.home': 'Home',
'nav.products': 'Speisekarte',
'nav.cart': 'Warenkorb',
'nav.more': 'Mehr',

'common.success': 'Erfolg',
'common.error': 'Fehler',
'common.loading': 'Lädt...',
// ... (28 Keys gesamt für common.*)
```

#### 3.6 Authentication Screens
```typescript
// Login
'login.title': 'Anmelden',
'login.subtitle': 'Willkommen zurück',
// ... (13 Keys gesamt)

// Register
'register.title': 'Registrieren',
'register.subtitle': 'Erstelle dein Konto',
// ... (16 Keys gesamt)

// Verify Email
'verify.title': 'E-Mail verifizieren',
// ... (13 Keys gesamt)

// Forgot/Reset Password
'forgotPassword.title': 'Passwort vergessen',
// ... (9 Keys gesamt)
'resetPassword.title': 'Passwort zurücksetzen',
// ... (11 Keys gesamt)
```

#### 3.7 Order & Payment
```typescript
'orderSuccess.title': 'Bestellung erfolgreich!',
'orderSuccess.thankYou': 'Vielen Dank für deine Bestellung',
// ... (15 Keys gesamt)

'payment.title': 'Zahlung',
'payment.selectMethod': 'Zahlungsmethode wählen',
// ... (16 Keys gesamt)

'orderHistory.title': 'Bestellverlauf',
'orderHistory.subtitle': 'Deine vergangenen Bestellungen',
// ... (16 Keys gesamt)
```

#### 3.8 Reservation
```typescript
'reservation.title': 'Tisch reservieren',
'reservation.subtitle': 'Reserviere deinen Platz',
'reservation.selectDate': 'Datum auswählen',
'reservation.selectTime': 'Uhrzeit auswählen',
// ... (42 Keys gesamt)
```

#### 3.9 Contact & More Screens
```typescript
'contact.title': 'Kontakt',
'contact.subtitle': 'Wir sind für dich da',
// ... (14 Keys gesamt)

'more.title': 'Mehr',
'more.subtitle': 'Weitere Optionen',
// ... (16 Keys gesamt)

'helpSupport.title': 'Hilfe & Support',
// ... (15 Keys gesamt)

'imprint.title': 'Impressum',
// ... (12 Keys gesamt)

'privacy.title': 'Datenschutz',
// ... (13 Keys gesamt)
```

#### 3.10 Language Selection
```typescript
'language.title': 'Sprache',
'language.select': 'Sprache wählen',
'language.german': 'Deutsch',
'language.english': 'English',
'language.vietnamese': 'Tiếng Việt',
// Neue Sprache hinzufügen:
'language.french': 'Français',  // Beispiel
```

#### 3.11 Weekdays (Full & Short)
```typescript
// Full weekday names
'weekday.sunday': 'Sonntag',
'weekday.monday': 'Montag',
'weekday.tuesday': 'Dienstag',
'weekday.wednesday': 'Mittwoch',
'weekday.thursday': 'Donnerstag',
'weekday.friday': 'Freitag',
'weekday.saturday': 'Samstag',

// Short weekday names (für Kalender, etc.)
'weekday.short.sunday': 'So',
'weekday.short.monday': 'Mo',
'weekday.short.tuesday': 'Di',
'weekday.short.wednesday': 'Mi',
'weekday.short.thursday': 'Do',
'weekday.short.friday': 'Fr',
'weekday.short.saturday': 'Sa',
```

#### 3.12 Date Labels
```typescript
'date.today': 'Heute',
'date.tomorrow': 'Morgen',
```

#### 3.13 Dish Detail
```typescript
'dish.quantity': 'Menge',
'dish.addToCart': 'In den Warenkorb',
```

---

### Schritt 4: Menu Translations hinzufügen

**Datei:** `src/translations/menuTranslations.ts`

**Was tun:**
Füge Übersetzungen für Kategorien, Gerichte und Tags hinzu.

#### 4.1 Struktur verstehen
```typescript
export const menuTranslations = {
  de: { categories: {...}, dishes: {...}, tags: {...} },
  en: { categories: {...}, dishes: {...}, tags: {...} },
  vi: { categories: {...}, dishes: {...}, tags: {...} },
  // Neue Sprache hinzufügen:
  fr: {
    categories: { /* ... */ },
    dishes: { /* ... */ },
    tags: { /* ... */ }
  }
};
```

#### 4.2 Categories übersetzen

**Anzahl:** 10 Kategorien (Stand: November 2025)

Jede Kategorie hat:
- `title`: Kategorie-Name
- `subtitle`: Beschreibung

**Beispiel:**
```typescript
categories: {
  'Vorspeisen': {
    title: 'Entrées',           // Französisch
    subtitle: 'Pour commencer'   // Französisch
  },
  'Hauptgericht': {
    title: 'Plats principaux',
    subtitle: 'Nos plats phares'
  },
  // ... weitere 8 Kategorien
}
```

**Alle Kategorien:**
1. Vorspeisen
2. Hauptgericht
3. Suppen
4. Nudelsuppen
5. Gebratene Nudeln & Reis
6. Beilagen
7. Dessert
8. Salat
9. Getränke
10. Bier & Wein

#### 4.3 Dishes übersetzen

**Anzahl:** 160 Gerichte (Stand: November 2025)

Jedes Gericht hat eine **Beschreibung**.

**Beispiel:**
```typescript
dishes: {
  'Edamame': 'Haricots de soja verts vapeur avec sel de mer',
  'Frühlingsrollen (2 Stück)': 'Rouleaux de printemps croustillants avec sauce aigre-douce',
  // ... weitere 158 Gerichte
}
```

**WICHTIG:** 
- Der Key ist der **deutsche Gerichtname**
- Der Value ist die **übersetzte Beschreibung**
- Alle 160 Gerichte müssen übersetzt werden
- Nutze die englische Version als Referenz für die Bedeutung

#### 4.4 Tags übersetzen

**Anzahl:** 4 Tags

```typescript
tags: {
  'Scharf': 'Épicé',           // Französisch
  'Vegetarisch': 'Végétarien',
  'Vegan': 'Végétalien',
  'Beliebte Wahl': 'Choix populaire'
}
```

---

### Schritt 5: Language Picker UI aktualisieren (Optional)

Wenn du einen visuellen Language Picker hast (z.B. mit Flaggen), aktualisiere:

**Mögliche Dateien:**
- `src/screens/AccountScreen.tsx`
- `src/screens/MoreScreen.tsx`
- Beliebige Komponenten mit Sprachauswahl

**Beispiel:**
```typescript
const languages = [
  { code: 'de', name: t('language.german'), flag: '🇩🇪' },
  { code: 'en', name: t('language.english'), flag: '🇬🇧' },
  { code: 'vi', name: t('language.vietnamese'), flag: '🇻🇳' },
  // Neue Sprache hinzufügen:
  { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
];
```

---

## Wichtiger Hinweis: Wochentage in Screens

**⚠️ ACHTUNG:** Alle Screens, die Datumsanzeigen verwenden, müssen die Helper-Funktionen nutzen!

### Screens mit Datumsanzeige (Stand: November 2025)

Die folgenden Screens nutzen bereits die korrekten Helper-Funktionen:

1. **CheckoutScreen.tsx** - nutzt `getShortWeekdayNames()`
2. **GuestCheckoutScreen.tsx** - nutzt `getShortWeekdayNames()`
3. **PaymentScreen.tsx** - nutzt `getWeekdayNames()`
4. **OrderSuccessScreen.tsx** - nutzt `getWeekdayNames()`
5. **ReservationScreen.tsx** - nutzt `getShortWeekdayNames()` und `t('date.today')`, `t('date.tomorrow')`
6. **ReservationSuccessScreen.tsx** - nutzt `getWeekdayNames()`

### Wenn ein neuer Screen mit Datumsanzeige erstellt wird:

**NIEMALS hart kodierte Wochentage verwenden:**
```typescript
// ❌ FALSCH:
const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const days = language === 'de' ? ['So', 'Mo', ...] : ['Sun', 'Mon', ...];
```

**✅ RICHTIG:**
```typescript
// Für kurze Wochentage (z.B. "So", "Sun", "CN"):
const { t, getShortWeekdayNames } = useLanguage();
const days = getShortWeekdayNames();
const day = days[date.getDay()];

// Für volle Wochentage (z.B. "Sonntag", "Sunday", "Chủ Nhật"):
const { t, getWeekdayNames } = useLanguage();
const days = getWeekdayNames();
const day = days[date.getDay()];

// Für "Heute" und "Morgen":
t('date.today')
t('date.tomorrow')
```

---

## Vollständige Liste aller Übersetzungs-Keys

### UI Translations (LanguageContext.tsx) - 368 Keys

Hier ist die vollständige Liste aller Keys, gruppiert nach Screens/Features:

```
Profile & Account (29 Keys):
├── profile.edit, profile.personalData, profile.updateInfo
├── profile.firstName, profile.lastName, profile.email
├── profile.phone, profile.address, profile.city
├── profile.postalCode, profile.country, profile.saveChanges
├── profile.cancel, account.title, account.subtitle
├── account.profile, account.orderHistory, account.reservations
├── account.payments, account.addresses, account.settings
├── account.language, account.notifications, account.helpSupport
├── account.imprint, account.privacy, account.logout
├── account.version, account.logoutConfirm, account.logoutCancel

Home Screen (8 Keys):
├── home.heroTitle, home.heroSubtitle, home.reserveTable
├── home.viewMenu, home.aboutTitle, home.aboutText
├── home.specialsTitle, home.specialsSubtitle

Products Screen (6 Keys):
├── products.title, products.subtitle, products.searchPlaceholder
├── products.filter, products.sortBy, products.noResults

Cart (26 Keys):
├── cart.title, cart.subtitle, cart.empty
├── cart.continueShopping, cart.total, cart.subtotal
├── cart.tax, cart.delivery, cart.checkout
├── cart.remove, cart.quantity, cart.price
├── cart.itemAdded, cart.itemRemoved, cart.clearCart
├── cart.clearCartConfirm, cart.clearCartCancel, cart.applyCode
├── cart.invalidCode, cart.discount, cart.freeDelivery
├── cart.minOrderAmount, cart.needMore, cart.pickupTime
├── cart.deliveryTime, cart.notes

Checkout (28 Keys):
├── checkout.title, checkout.subtitle, checkout.orderType
├── checkout.guest, checkout.user, checkout.personalInfo
├── checkout.firstName, checkout.lastName, checkout.email
├── checkout.phone, checkout.deliveryAddress, checkout.notes
├── checkout.notesPlaceholder, checkout.paymentMethod, checkout.selectPaymentMethod
├── checkout.cash, checkout.card, checkout.paypal
├── checkout.placeOrder, checkout.orderSummary, checkout.items
├── checkout.fillAllFields, checkout.invalidEmail, checkout.selectPayment
├── checkout.selectTime, checkout.selectTimeFirst, checkout.date
├── checkout.time

Order Success (15 Keys):
├── orderSuccess.title, orderSuccess.thankYou, orderSuccess.orderNumber
├── orderSuccess.orderPlaced, orderSuccess.preparing, orderSuccess.ready
├── orderSuccess.completed, orderSuccess.pickup, orderSuccess.delivery
├── orderSuccess.pickupTime, orderSuccess.deliveryTime, orderSuccess.trackOrder
├── orderSuccess.backToHome, orderSuccess.paymentSuccess, orderSuccess.paymentFailed

Payment (16 Keys):
├── payment.title, payment.subtitle, payment.selectMethod
├── payment.cash, payment.card, payment.paypal
├── payment.applePay, payment.googlePay, payment.creditCard
├── payment.cardNumber, payment.cardHolder, payment.expiryDate
├── payment.cvv, payment.saveCard, payment.pay
├── payment.processing

Order History (16 Keys):
├── orderHistory.title, orderHistory.subtitle, orderHistory.empty
├── orderHistory.goShopping, orderHistory.orderNumber, orderHistory.date
├── orderHistory.status, orderHistory.total, orderHistory.items
├── orderHistory.viewDetails, orderHistory.reorder, orderHistory.cancelOrder
├── orderHistory.cancelOrderConfirm, orderHistory.cancelOrderCancel, orderHistory.cancelled
├── orderHistory.refund

Reservation (42 Keys):
├── reservation.title, reservation.subtitle, reservation.selectDate
├── reservation.selectTime, reservation.guests, reservation.guestsPlaceholder
├── reservation.name, reservation.namePlaceholder, reservation.phone
├── reservation.phonePlaceholder, reservation.email, reservation.emailPlaceholder
├── reservation.notes, reservation.notesPlaceholder, reservation.reserve
├── reservation.success, reservation.successMessage, reservation.confirmationSent
├── reservation.viewReservations, reservation.fillAllFields, reservation.invalidEmail
├── reservation.selectDateAndTime, reservation.selectGuests, reservation.minGuests
├── reservation.maxGuests, reservation.closedMonday, reservation.onlyDinner
├── reservation.availableTimes, reservation.noAvailableTimes, reservation.bookingFee
├── reservation.bookingFeeInfo, reservation.totalAmount, reservation.payNow
├── reservation.timeSlot, reservation.selectTimeSlot, reservation.selectedTime
├── reservation.availableCapacity, reservation.fullyBooked, reservation.lastTable
├── reservation.fewTablesLeft, reservation.recommendedTime, reservation.alternativeTimes

More Screen (16 Keys):
├── more.title, more.subtitle, more.contact
├── more.openingHours, more.location, more.imprint
├── more.privacy, more.helpSupport, more.rateApp
├── more.shareApp, more.about, more.version
├── more.followUs, more.facebook, more.instagram
├── more.newsletter

Navigation (4 Keys):
├── nav.home, nav.products, nav.cart, nav.more

Contact (14 Keys):
├── contact.title, contact.subtitle, contact.address
├── contact.phone, contact.email, contact.openingHours
├── contact.monday, contact.tuesdayToSunday, contact.lunch
├── contact.dinner, contact.closed, contact.callUs
├── contact.emailUs, contact.directions

Login (13 Keys):
├── login.title, login.subtitle, login.email
├── login.emailPlaceholder, login.password, login.passwordPlaceholder
├── login.forgotPassword, login.login, login.noAccount
├── login.register, login.orContinueWith, login.invalidEmail
├── login.wrongPassword

Register (16 Keys):
├── register.title, register.subtitle, register.firstName
├── register.firstNamePlaceholder, register.lastName, register.lastNamePlaceholder
├── register.email, register.emailPlaceholder, register.password
├── register.passwordPlaceholder, register.confirmPassword, register.confirmPasswordPlaceholder
├── register.register, register.hasAccount, register.login
├── register.passwordMismatch

Verify Email (13 Keys):
├── verify.title, verify.subtitle, verify.enterCode
├── verify.codeSentTo, verify.verify, verify.resendCode
├── verify.didntReceive, verify.checkSpam, verify.wrongCode
├── verify.codeExpired, verify.codeSent, verify.tooManyAttempts
├── verify.sent

Forgot Password (9 Keys):
├── forgotPassword.title, forgotPassword.subtitle, forgotPassword.email
├── forgotPassword.emailPlaceholder, forgotPassword.sendCode, forgotPassword.backToLogin
├── forgotPassword.codeSent, forgotPassword.emailNotFound, forgotPassword.error

Reset Password (11 Keys):
├── resetPassword.title, resetPassword.subtitle, resetPassword.code
├── resetPassword.codePlaceholder, resetPassword.password, resetPassword.passwordPlaceholder
├── resetPassword.confirmPassword, resetPassword.confirmPasswordPlaceholder, resetPassword.reset
├── resetPassword.passwordMismatch, resetPassword.success

Help & Support (15 Keys):
├── helpSupport.title, helpSupport.subtitle, helpSupport.faq
├── helpSupport.contactUs, helpSupport.reportIssue, helpSupport.howToOrder
├── helpSupport.paymentMethods, helpSupport.deliveryInfo, helpSupport.refundPolicy
├── helpSupport.accountIssues, helpSupport.technicalSupport, helpSupport.feedback
├── helpSupport.termsOfService, helpSupport.privacyPolicy, helpSupport.stillNeedHelp

Imprint (12 Keys):
├── imprint.title, imprint.subtitle, imprint.companyName
├── imprint.address, imprint.phone, imprint.email
├── imprint.taxId, imprint.vatId, imprint.representative
├── imprint.registrationCourt, imprint.registrationNumber, imprint.responsibleForContent

Privacy (13 Keys):
├── privacy.title, privacy.subtitle, privacy.dataCollection
├── privacy.dataUsage, privacy.dataSecurity, privacy.cookies
├── privacy.thirdParty, privacy.yourRights, privacy.contact
├── privacy.lastUpdated, privacy.effectiveDate, privacy.changes
├── privacy.acceptance

Common (28 Keys):
├── common.success, common.error, common.loading
├── common.save, common.cancel, common.delete
├── common.confirm, common.yes, common.no
├── common.ok, common.done, common.skip
├── common.next, common.previous, common.finish
├── common.submit, common.search, common.filter
├── common.sort, common.close, common.open
├── common.add, common.remove, common.update
├── common.edit, common.view, common.back
├── common.required

Weekdays (7 Keys):
├── weekday.sunday, weekday.monday, weekday.tuesday
├── weekday.wednesday, weekday.thursday, weekday.friday
├── weekday.saturday

Weekdays Short (7 Keys):
├── weekday.short.sunday, weekday.short.monday, weekday.short.tuesday
├── weekday.short.wednesday, weekday.short.thursday, weekday.short.friday
├── weekday.short.saturday

Date Labels (2 Keys):
├── date.today, date.tomorrow

Dish Detail (2 Keys):
├── dish.quantity, dish.addToCart

Language Names (1 Key pro Sprache):
├── language.title, language.select, language.german
├── language.english, language.vietnamese
└── language.[neuesprache] // Hier neue Sprache hinzufügen
```

**Gesamt: 368 Keys** (kann sich bei App-Updates ändern)

---

### Menu Translations (menuTranslations.ts)

#### Categories (10)
```
1. Vorspeisen
2. Hauptgericht
3. Suppen
4. Nudelsuppen
5. Gebratene Nudeln & Reis
6. Beilagen
7. Dessert
8. Salat
9. Getränke
10. Bier & Wein
```

#### Dishes (160)
Siehe die aktuelle `menuTranslations.ts` Datei für die vollständige Liste aller Gerichte.

#### Tags (4)
```
1. Scharf
2. Vegetarisch
3. Vegan
4. Beliebte Wahl
```

---

## Überprüfung und Qualitätssicherung

### Schritt 1: Key-Anzahl prüfen

**Terminal-Befehl:**
```bash
cd moggi-app

# Zeilennummern der Sprach-Objekte finden
grep -n "^  (de|en|vi|fr): {$" src/context/LanguageContext.tsx
grep -n "^  },$" src/context/LanguageContext.tsx

# Keys zählen (Beispiel für Zeilen 26-423 = Deutsch)
sed -n '26,423p' src/context/LanguageContext.tsx | grep -c "^\s*'"
```

**Erwartetes Ergebnis:**
Alle Sprachen müssen die **gleiche Anzahl an Keys** haben (aktuell: 368).

### Schritt 2: Menü-Übersetzungen prüfen

**Terminal-Befehl:**
```bash
# Anzahl der Kategorien pro Sprache
grep -A 500 "^  de: {$" src/translations/menuTranslations.ts | grep -c "title:"

# Anzahl der Gerichte pro Sprache  
grep -A 2000 "dishes: {$" src/translations/menuTranslations.ts | grep -c "':'"
```

**Erwartetes Ergebnis:**
- Kategorien: 10 pro Sprache
- Gerichte: 160 pro Sprache
- Tags: 4 pro Sprache

### Schritt 3: Linter-Fehler prüfen

**Terminal-Befehl:**
```bash
npm run lint
# oder
npx eslint src/context/LanguageContext.tsx
npx eslint src/translations/menuTranslations.ts
```

**Erwartetes Ergebnis:**
Keine Fehler.

### Schritt 4: App testen

**Manuelle Tests:**
1. ✅ Sprache im Account-Screen wechseln
2. ✅ Alle Screens durchgehen und prüfen, ob Texte übersetzt sind
3. ✅ Menü öffnen - Kategorien und Gerichte prüfen
4. ✅ Kalender öffnen - Wochentage prüfen (z.B. im Checkout/Reservation)
5. ✅ "Heute" und "Morgen" Labels prüfen
6. ✅ Checkout-Prozess durchlaufen
7. ✅ Tags prüfen (Scharf, Vegetarisch, etc.)

### Schritt 5: Fehlende Übersetzungen finden

**Methode 1: Visuelle Inspektion**
- Gehe durch jeden Screen in der App
- Achte auf englische/deutsche Texte, die nicht übersetzt wurden

**Methode 2: Key-Vergleich**
```bash
# Keys aus deutscher Version extrahieren
sed -n '26,423p' src/context/LanguageContext.tsx | grep "^\s*'" | sed "s/: .*//g" > de_keys.txt

# Keys aus neuer Sprache extrahieren  
sed -n '[START],[END]p' src/context/LanguageContext.tsx | grep "^\s*'" | sed "s/: .*//g" > new_lang_keys.txt

# Unterschiede finden
diff de_keys.txt new_lang_keys.txt
```

---

## Häufige Fehler vermeiden

### ❌ Fehler 1: Anzahl der Keys stimmt nicht überein
**Problem:** Neue Sprache hat weniger oder mehr Keys als die anderen.

**Lösung:** 
- Verwende die Key-Zähl-Befehle von oben
- Vergleiche die Keys zwischen den Sprachen
- Kopiere zunächst ALLE Keys von einer existierenden Sprache

### ❌ Fehler 2: Syntax-Fehler im TypeScript
**Problem:** Komma vergessen, Anführungszeichen falsch, etc.

**Lösung:**
- Nutze einen Code-Editor mit Syntax-Highlighting (VS Code)
- Führe `npm run lint` aus
- Achte auf korrekte TypeScript-Syntax:
  ```typescript
  'key': 'value',  // ✅ Richtig
  'key': 'value'   // ❌ Letzter Eintrag ohne Komma
  ```

### ❌ Fehler 3: Sonderzeichen nicht escaped
**Problem:** Text enthält Apostrophe oder Anführungszeichen.

**Lösung:**
```typescript
// ❌ Falsch:
'text': 'It's a test',

// ✅ Richtig (Backslash vor Apostroph):
'text': 'It\'s a test',

// ✅ Alternative (Andere Anführungszeichen):
'text': "It's a test",
```

### ❌ Fehler 4: Platzhalter vergessen
**Problem:** In manchen Übersetzungen gibt es Platzhalter wie `{name}`, `{email}`, etc.

**Beispiel:**
```typescript
// ✅ Richtig (Platzhalter beibehalten):
'verify.codeSentTo': 'Nous avons envoyé un code à {email}',

// ❌ Falsch (Platzhalter fehlt):
'verify.codeSentTo': 'Nous avons envoyé un code',
```

**Wo werden Platzhalter verwendet:**
- `profile.*` - z.B. `{name}`, `{email}`
- `verify.*` - `{email}`
- `cart.*` - `{total}`, `{count}`
- `orderSuccess.*` - `{orderNumber}`, `{date}`, `{time}`

### ❌ Fehler 5: Menü-Gerichte nicht vollständig übersetzt
**Problem:** Nur einige Gerichte übersetzt, andere ausgelassen.

**Lösung:**
- Systematisch vorgehen: Kategorie für Kategorie
- Prüfe die Anzahl: Alle 160 Gerichte müssen vorhanden sein
- Nutze den Zähl-Befehl von oben

### ❌ Fehler 6: Wochentage falsch sortiert
**Problem:** Die Reihenfolge der Wochentage ist falsch.

**Wichtig:** Die Reihenfolge MUSS sein:
```typescript
// ✅ Richtig (Sonntag zuerst!):
'weekday.sunday': '...',
'weekday.monday': '...',
'weekday.tuesday': '...',
'weekday.wednesday': '...',
'weekday.thursday': '...',
'weekday.friday': '...',
'weekday.saturday': '...',
```

**Grund:** JavaScript's `Date.getDay()` gibt 0 für Sonntag zurück.

### ❌ Fehler 7: Language Name nicht hinzugefügt
**Problem:** Die neue Sprache erscheint nicht im Language Picker.

**Lösung:**
Vergiss nicht, den Language Key hinzuzufügen:
```typescript
// In ALLEN Sprachen (de, en, vi, UND in der neuen):
'language.french': 'Français',  // Beispiel für Französisch
```

---

## Beispiel: Französisch hinzufügen (Komplett-Durchlauf)

### 1. Type Definition
```typescript
export type Language = 'de' | 'en' | 'vi' | 'fr';
```

### 2. UI Translations
```typescript
const translations: Record<Language, Record<string, string>> = {
  de: { /* ... */ },
  en: { /* ... */ },
  vi: { /* ... */ },
  fr: {
    // Profile Edit Screen
    'profile.edit': 'Modifier le profil',
    'profile.personalData': 'Données personnelles',
    // ... alle 368 Keys übersetzen
    
    // Language Namen (in ALLEN Sprachen hinzufügen!)
    'language.french': 'Français',
    
    // Weekdays (wichtig: Reihenfolge beachten!)
    'weekday.sunday': 'Dimanche',
    'weekday.monday': 'Lundi',
    // ... etc.
    
    'weekday.short.sunday': 'Dim',
    'weekday.short.monday': 'Lun',
    // ... etc.
    
    'date.today': 'Aujourd\'hui',
    'date.tomorrow': 'Demain',
  },
};
```

### 3. Language Name in ALLEN anderen Sprachen hinzufügen
```typescript
// In de:
'language.french': 'Französisch',

// In en:
'language.french': 'French',

// In vi:
'language.french': 'Tiếng Pháp',

// In fr:
'language.french': 'Français',
```

### 4. Menu Translations
```typescript
export const menuTranslations = {
  de: { /* ... */ },
  en: { /* ... */ },
  vi: { /* ... */ },
  fr: {
    categories: {
      'Vorspeisen': {
        title: 'Entrées',
        subtitle: 'Pour commencer'
      },
      // ... 9 weitere Kategorien
    },
    dishes: {
      'Edamame': 'Haricots de soja verts vapeur avec sel de mer',
      // ... 159 weitere Gerichte
    },
    tags: {
      'Scharf': 'Épicé',
      'Vegetarisch': 'Végétarien',
      'Vegan': 'Végétalien',
      'Beliebte Wahl': 'Choix populaire'
    }
  }
};
```

### 5. Prüfung
```bash
# Key-Anzahl prüfen
sed -n '[START],[END]p' src/context/LanguageContext.tsx | grep -c "^\s*'"
# Sollte 368 ergeben

# Linter prüfen
npm run lint

# App testen
npm start
```

---

## Checkliste für neue Sprache

Benutze diese Checkliste, um sicherzustellen, dass nichts vergessen wurde:

### Code-Änderungen
- [ ] `Language` Type erweitert in `LanguageContext.tsx`
- [ ] Neues Übersetzungsobjekt in `translations` hinzugefügt
- [ ] Alle 368 UI-Keys übersetzt
- [ ] Language Name zu ALLEN Sprachen hinzugefügt (z.B. `language.french`)
- [ ] Wochentage übersetzt (7 volle + 7 kurze + 2 Datumslabels)
- [ ] Menü-Kategorien übersetzt (10)
- [ ] Menü-Gerichte übersetzt (160)
- [ ] Menü-Tags übersetzt (4)

### Qualitätssicherung
- [ ] Key-Anzahl geprüft (alle Sprachen haben gleich viele Keys)
- [ ] Syntax-Fehler behoben (Lint läuft ohne Fehler)
- [ ] Platzhalter (`{name}`, `{email}`, etc.) beibehalten
- [ ] Sonderzeichen korrekt escaped (`It\'s` statt `It's`)
- [ ] Wochentage in korrekter Reihenfolge (Sonntag zuerst!)

### App-Tests
- [ ] Sprache im Account-Screen wechselbar
- [ ] Alle Screens zeigen übersetzte Texte
- [ ] Menü zeigt übersetzte Kategorien und Gerichte
- [ ] Kalender zeigt übersetzte Wochentage
- [ ] "Heute" und "Morgen" werden korrekt angezeigt
- [ ] Checkout-Prozess funktioniert
- [ ] Tags werden korrekt angezeigt

---

## Support & Hilfe

Bei Fragen oder Problemen:

1. **Überprüfe die Dokumentation nochmal** - Oft findet man die Lösung hier
2. **Nutze die Prüf-Befehle** - Sie helfen, Fehler zu identifizieren
3. **Vergleiche mit existierenden Sprachen** - Deutsch ist die Master-Sprache
4. **Teste gründlich** - Gehe jeden Screen einzeln durch

---

**Viel Erfolg beim Hinzufügen neuer Sprachen! 🌍**

Erstellt: November 2025  
Letzte Aktualisierung: November 2025  
Version: 1.0

