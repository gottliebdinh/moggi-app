import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { menuTranslations } from '../translations/menuTranslations';

export type Language = 'de' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
  getCategoryTitle: (categoryName: string) => string;
  getCategorySubtitle: (categoryName: string) => string;
  getDishDescription: (dishName: string) => string;
  getTagTranslation: (tag: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = '@moggi_app_language';

// Übersetzungen
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Profile Edit Screen
    'profile.edit': 'Profil bearbeiten',
    'profile.personalData': 'Persönliche Daten',
    'profile.updateInfo': 'Aktualisiere deine Kontoinformationen',
    'profile.firstName': 'Vorname',
    'profile.firstNamePlaceholder': 'Dein Vorname',
    'profile.lastName': 'Nachname',
    'profile.lastNamePlaceholder': 'Dein Nachname',
    'profile.email': 'E-Mail-Adresse',
    'profile.emailPlaceholder': 'deine@email.com',
    'profile.language': 'Sprache',
    'profile.languageSubtitle': 'Wähle deine bevorzugte Sprache',
    'profile.save': 'Änderungen speichern',
    'profile.saveSuccess': 'Profil erfolgreich aktualisiert!',
    'profile.emailInfo': 'Deine E-Mail-Adresse wird für die Bestätigung von Bestellungen und Reservierungen verwendet.',
    'profile.fillAllFields': 'Bitte fülle alle Felder aus',
    'profile.invalidEmail': 'Bitte gib eine gültige E-Mail-Adresse ein',
    'profile.error': 'Fehler',
    'profile.unexpectedError': 'Ein unerwarteter Fehler ist aufgetreten',
    // Language Options
    'language.german': 'Deutsch',
    'language.english': 'English',
    // Account Screen
    'account.title': 'Konto',
    'account.subtitle': 'Verwalte dein Profil',
    'account.guest': 'Gast',
    'account.notLoggedIn': 'Noch nicht angemeldet',
    'account.loginNow': 'Jetzt anmelden',
    'account.loginSuccess': 'Erfolgreich angemeldet!',
    'account.language': 'Sprache',
    'account.languageSubtitle': 'Wähle deine bevorzugte Sprache',
    'account.orders': 'Meine Bestellungen',
    'account.ordersSubtitle': 'Bestellhistorie ansehen',
    'account.editProfile': 'Profil bearbeiten',
    'account.editProfileSubtitle': 'Name, E-Mail, etc.',
    'account.logout': 'Abmelden',
    'account.logoutConfirm': 'Möchtest du dich wirklich abmelden?',
    'account.cancel': 'Abbrechen',
    'account.comingSoon': 'Diese Funktion wird bald verfügbar sein',
    // Home Screen
    'home.heroTitle': 'Zwei Welten, eine Vision - Asiatische Küche neu interpretiert',
    'home.heroSubtitle': 'Willkommen in einer Welt, wo Tradition auf Innovation trifft',
    'home.chefQuan': 'Chef Quan',
    'home.chefQuanDescription': 'Quan verbindet die authentischen Aromen seiner südchinesischen Heimat mit moderner Kreativität. Geprägt von den lebendigen Märkten Guangzhous, bringt er jahrtausendealte Esskultur auf kleine Teller.',
    'home.chefRyohey': 'Chef Ryohey',
    'home.chefRyoheyDescription': 'Ryohey bringt die hohe Kunst des Sushi-Handwerks nach Nürnberg. Mit über 15 Jahren Erfahrung in der Edomae-Tradition erschafft er jedes Stück mit Respekt für das Produkt und japanischer Perfektion.',
    'home.reserveTable': 'Tisch reservieren',
    // Products Screen
    'products.title': 'Speisekarte',
    'products.subtitle': 'Entdecke unsere Köstlichkeiten',
    'products.highlights': 'Highlights',
    'products.smallDishes': 'Kleine Gerichte',
    'products.fusionSpecials': 'Fusion Specials',
    'products.sushi': 'Sushi',
    'products.sides': 'Beilagen & More',
    // Cart Screen
    'cart.title': 'Warenkorb',
    'cart.subtitle': 'Deine ausgewählten Artikel',
    'cart.items': 'Artikel',
    'cart.empty': 'Dein Warenkorb ist leer',
    'cart.emptySubtext': 'Füge Produkte hinzu, um loszulegen',
    'cart.clear': 'Warenkorb leeren',
    'cart.total': 'Gesamt',
    'cart.checkout': 'Zur Kasse',
    // More Screen
    'more.title': 'Mehr',
    'more.subtitle': 'Weitere Optionen',
    'more.contact': 'Kontakt',
    'more.contactSubtitle': 'Telefon, E-Mail & Adresse',
    'more.privacy': 'Datenschutz',
    'more.privacySubtitle': 'Datenschutzerklärung',
    'more.imprint': 'Impressum',
    'more.imprintSubtitle': 'Rechtliche Informationen',
    'more.appName': 'MOGGI App',
    'more.appSubtitle': 'Restaurant-App',
    'more.appVersion': 'Version 1.0.0',
    'more.comingSoon': 'Diese Funktion wird bald verfügbar sein',
    'more.info': 'Info',
    // Navigation Tabs
    'nav.home': 'Home',
    'nav.menu': 'Speisekarte',
    'nav.cart': 'Warenkorb',
    'nav.account': 'Konto',
    'nav.more': 'Mehr',
    // Contact Screen
    'contact.title': 'Kontakt',
    'contact.phone': 'Telefon',
    'contact.location': 'Standort',
    'contact.email': 'E-Mail',
    'contact.openingHours': 'Öffnungszeiten',
    'contact.copied': 'Kopiert',
    'contact.copiedMessage': '{label} wurde in die Zwischenablage kopiert',
    'contact.copyError': 'Fehler',
    'contact.copyErrorMessage': 'Konnte nicht kopiert werden',
    // Login Screen
    'login.title': 'Login',
    'login.sectionTitle': 'Anmeldung',
    'login.emailLabel': 'E-Mail / Benutzername',
    'login.emailPlaceholder': 'max@example.com',
    'login.passwordLabel': 'Passwort',
    'login.passwordPlaceholder': '••••••••',
    'login.forgotPassword': 'Passwort vergessen?',
    'login.button': 'Anmelden',
    'login.fillAllFields': 'Bitte fülle alle Felder aus',
    'login.invalidCredentials': 'E-Mail oder Passwort ist falsch',
    'login.emailNotConfirmed': 'Bitte bestätige deine E-Mail-Adresse',
    'login.error': 'Ein Fehler ist aufgetreten',
    'login.noAccount': 'Noch kein Account?',
    'login.registerNow': 'Erstelle jetzt kostenlos einen Account',
    'login.accountInfo': 'Mit einem Account kannst du deine Bestellhistorie einsehen und Treuepunkte sammeln.',
    // Register Screen
    'register.title': 'Registrieren',
    'register.pageTitle': 'Konto erstellen',
    'register.subtitle': 'Registrierung für exklusive Vorteile',
    'register.firstName': 'Vorname',
    'register.firstNamePlaceholder': 'Max',
    'register.lastName': 'Nachname',
    'register.lastNamePlaceholder': 'Mustermann',
    'register.email': 'E-Mail',
    'register.emailPlaceholder': 'deine@email.com',
    'register.birthDate': 'Geburtsdatum',
    'register.dayPlaceholder': 'TT',
    'register.monthPlaceholder': 'MM',
    'register.yearPlaceholder': 'JJJJ',
    'register.password': 'Passwort',
    'register.passwordPlaceholder': '••••••••',
    'register.createAccount': 'Konto erstellen',
    'register.fillAllFields': 'Bitte fülle alle Felder aus',
    'register.passwordTooShort': 'Passwort muss mindestens 6 Zeichen lang sein',
    'register.invalidBirthDate': 'Bitte gib ein vollständiges Geburtsdatum ein',
    'register.emailAlreadyRegistered': 'Diese E-Mail ist bereits registriert. Bitte melde dich an.',
    'register.invalidEmail': 'Bitte gib eine gültige E-Mail-Adresse ein',
    'register.weakPassword': 'Passwort ist zu schwach. Verwende mindestens 6 Zeichen.',
    'register.error': 'Ein Fehler ist aufgetreten',
    'register.successTitle': 'Registrierung erfolgreich!',
    'register.successMessage': 'Dein Konto wurde erstellt.{newline}Du wirst zur Anmeldung weitergeleitet...',
    'register.terms': 'Mit der Registrierung akzeptierst du unsere',
    'register.termsOfService': 'Nutzungsbedingungen',
    'register.and': 'und',
    'register.privacyPolicy': 'Datenschutzrichtlinien',
    // Checkout Screen
    'checkout.title': 'Checkout',
    'checkout.guestData': 'Gast-Daten',
    'checkout.firstName': 'Vorname',
    'checkout.lastName': 'Nachname',
    'checkout.email': 'E-Mail-Adresse',
    'checkout.notes': 'Hinweise (optional)',
    'checkout.pickupDate': 'Abholdatum',
    'checkout.pickupTime': 'Abholzeit',
    'checkout.selectTime': 'Uhrzeit auswählen',
    'checkout.selectTimePlaceholder': 'Uhrzeit wählen',
    'checkout.selectDate': 'Datum auswählen',
    'checkout.continuePayment': 'Weiter zur Zahlung',
    'checkout.fillAllFields': 'Bitte fülle alle Felder aus',
    'checkout.selectDateFirst': 'Bitte wähle erst ein Datum aus',
    'checkout.selectTimeFirst': 'Bitte wähle eine Uhrzeit aus',
    'checkout.invalidEmail': 'Bitte gib eine gültige E-Mail-Adresse ein',
    'checkout.timeUnit': 'Uhr',
    'checkout.pickupInfo': 'Deine Bestellung wird frisch zubereitet. Bitte sei pünktlich zur Abholzeit bei uns in der Katharinengasse 14, Nürnberg.',
    // Order Success Screen
    'orderSuccess.paymentSuccess': 'Zahlung erfolgreich!',
    'orderSuccess.thankYou': 'Vielen Dank, {name}!',
    'orderSuccess.orderNumber': 'Bestellnummer',
    'orderSuccess.confirmationSent': 'Eine Bestätigung wurde an {email} gesendet',
    'orderSuccess.pickup': 'Abholung',
    'orderSuccess.pickupDate': 'Abholdatum',
    'orderSuccess.pickupTime': 'Uhrzeit',
    'orderSuccess.pickupAddress': 'Abholadresse',
    'orderSuccess.pickupAddressLine1': 'Katharinengasse 14',
    'orderSuccess.pickupAddressLine2': '90403 Nürnberg',
    'orderSuccess.newOrder': 'Weitere Bestellung',
    'orderSuccess.prepareToday': 'Wir bereiten deine Bestellung frisch zu. Bis gleich!',
    'orderSuccess.prepareTomorrow': 'Deine Bestellung wird morgen frisch zubereitet.',
    'orderSuccess.prepareLater': 'Deine Bestellung wird am Abholtag frisch zubereitet.',
    // Payment Screen
    'payment.title': 'Zahlung',
    'payment.orderSummary': 'Bestellübersicht',
    'payment.pickupDate': 'Abholung',
    'payment.amount': 'Gesamtbetrag',
    'payment.pay': 'Jetzt bezahlen',
    'payment.error': 'Fehler',
    'payment.processing': 'Wird verarbeitet...',
    'payment.selectMethod': 'Wähle deine Zahlungsmethode',
    'payment.items': 'Artikel',
    'payment.time': 'Uhrzeit',
    'payment.name': 'Name',
    'payment.securePayment': 'Sichere Zahlung',
    'payment.creditCard': 'Kreditkarte via Stripe',
    'payment.sslEncrypted': 'SSL-verschlüsselt',
    'payment.pciCompliant': 'PCI-konform',
    'payment.allCards': 'Alle Kreditkarten',
    'payment.stripeInfo': 'Du wirst zum sicheren Stripe-Zahlungsformular weitergeleitet. Deine Kartendaten werden verschlüsselt übertragen.',
    'payment.toPay': 'Zu zahlen',
    'payment.processingPayment': 'Verarbeite Zahlung...',
    // Reservation Screen
    'reservation.title': 'Tisch reservieren',
    'reservation.step1': 'Schritt 1: Datum & Uhrzeit',
    'reservation.step2': 'Schritt 2: Details',
    'reservation.selectDate': 'Datum auswählen',
    'reservation.selectTime': 'Uhrzeit auswählen',
    'reservation.time': 'Uhrzeit',
    'reservation.guests': 'Anzahl Gäste',
    'reservation.fullName': 'Vollständiger Name',
    'reservation.phone': 'Telefonnummer',
    'reservation.email': 'E-Mail',
    'reservation.notes': 'Anmerkungen (optional)',
    'reservation.confirm': 'Reservierung bestätigen',
    'reservation.confirmed': 'Reservierung erfolgreich!',
    'reservation.confirmMessage': 'Deine Reservierung wurde bestätigt. Wir freuen uns auf deinen Besuch!',
    // Order History Screen
    'orderHistory.title': 'Meine Bestellungen',
    'orderHistory.subtitle': 'Bestellhistorie',
    'orderHistory.empty': 'Noch keine Bestellungen',
    'orderHistory.emptySubtext': 'Deine Bestellungen werden hier angezeigt',
    // Dish Detail
    'dish.quantity': 'Menge',
    'dish.addToCart': 'In den Warenkorb',
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolgreich',
    'common.cancel': 'Abbrechen',
    'common.confirm': 'Bestätigen',
    'common.save': 'Speichern',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.close': 'Schließen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.required': 'Pflichtfeld',
  },
  en: {
    // Profile Edit Screen
    'profile.edit': 'Edit Profile',
    'profile.personalData': 'Personal Data',
    'profile.updateInfo': 'Update your account information',
    'profile.firstName': 'First Name',
    'profile.firstNamePlaceholder': 'Your first name',
    'profile.lastName': 'Last Name',
    'profile.lastNamePlaceholder': 'Your last name',
    'profile.email': 'Email Address',
    'profile.emailPlaceholder': 'your@email.com',
    'profile.language': 'Language',
    'profile.languageSubtitle': 'Choose your preferred language',
    'profile.save': 'Save Changes',
    'profile.saveSuccess': 'Profile updated successfully!',
    'profile.emailInfo': 'Your email address is used for order and reservation confirmations.',
    'profile.fillAllFields': 'Please fill in all fields',
    'profile.invalidEmail': 'Please enter a valid email address',
    'profile.error': 'Error',
    'profile.unexpectedError': 'An unexpected error occurred',
    // Language Options
    'language.german': 'Deutsch',
    'language.english': 'English',
    // Account Screen
    'account.title': 'Account',
    'account.subtitle': 'Manage your profile',
    'account.guest': 'Guest',
    'account.notLoggedIn': 'Not logged in',
    'account.loginNow': 'Login now',
    'account.loginSuccess': 'Successfully logged in!',
    'account.language': 'Language',
    'account.languageSubtitle': 'Choose your preferred language',
    'account.orders': 'My Orders',
    'account.ordersSubtitle': 'View order history',
    'account.editProfile': 'Edit Profile',
    'account.editProfileSubtitle': 'Name, Email, etc.',
    'account.logout': 'Logout',
    'account.logoutConfirm': 'Do you really want to logout?',
    'account.cancel': 'Cancel',
    'account.comingSoon': 'This feature will be available soon',
    // Home Screen
    'home.heroTitle': 'Two Worlds, One Vision - Asian Cuisine Reinterpreted',
    'home.heroSubtitle': 'Welcome to a world where tradition meets innovation',
    'home.chefQuan': 'Chef Quan',
    'home.chefQuanDescription': 'Quan combines the authentic flavors of his South Chinese homeland with modern creativity. Shaped by the vibrant markets of Guangzhou, he brings millennia-old culinary culture to small plates.',
    'home.chefRyohey': 'Chef Ryohey',
    'home.chefRyoheyDescription': 'Ryohey brings the high art of sushi craftsmanship to Nuremberg. With over 15 years of experience in the Edomae tradition, he creates each piece with respect for the product and Japanese perfection.',
    'home.reserveTable': 'Reserve Table',
    // Products Screen
    'products.title': 'Menu',
    'products.subtitle': 'Discover our delicacies',
    'products.highlights': 'Highlights',
    'products.smallDishes': 'Small Dishes',
    'products.fusionSpecials': 'Fusion Specials',
    'products.sushi': 'Sushi',
    'products.sides': 'Sides & More',
    // Cart Screen
    'cart.title': 'Cart',
    'cart.subtitle': 'Your selected items',
    'cart.items': 'items',
    'cart.empty': 'Your cart is empty',
    'cart.emptySubtext': 'Add products to get started',
    'cart.clear': 'Clear Cart',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    // More Screen
    'more.title': 'More',
    'more.subtitle': 'Additional Options',
    'more.contact': 'Contact',
    'more.contactSubtitle': 'Phone, Email & Address',
    'more.privacy': 'Privacy',
    'more.privacySubtitle': 'Privacy Policy',
    'more.imprint': 'Imprint',
    'more.imprintSubtitle': 'Legal Information',
    'more.appName': 'MOGGI App',
    'more.appSubtitle': 'Restaurant App',
    'more.appVersion': 'Version 1.0.0',
    'more.comingSoon': 'This feature will be available soon',
    'more.info': 'Info',
    // Navigation Tabs
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.more': 'More',
    // Contact Screen
    'contact.title': 'Contact',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.email': 'Email',
    'contact.openingHours': 'Opening Hours',
    'contact.copied': 'Copied',
    'contact.copiedMessage': '{label} has been copied to clipboard',
    'contact.copyError': 'Error',
    'contact.copyErrorMessage': 'Could not copy',
    // Login Screen
    'login.title': 'Login',
    'login.sectionTitle': 'Sign In',
    'login.emailLabel': 'Email / Username',
    'login.emailPlaceholder': 'max@example.com',
    'login.passwordLabel': 'Password',
    'login.passwordPlaceholder': '••••••••',
    'login.forgotPassword': 'Forgot Password?',
    'login.button': 'Sign In',
    'login.fillAllFields': 'Please fill in all fields',
    'login.invalidCredentials': 'Email or password is incorrect',
    'login.emailNotConfirmed': 'Please confirm your email address',
    'login.error': 'An error occurred',
    'login.noAccount': 'No account yet?',
    'login.registerNow': 'Create a free account now',
    'login.accountInfo': 'With an account, you can view your order history and collect loyalty points.',
    // Register Screen
    'register.title': 'Register',
    'register.pageTitle': 'Create Account',
    'register.subtitle': 'Register for exclusive benefits',
    'register.firstName': 'First Name',
    'register.firstNamePlaceholder': 'Max',
    'register.lastName': 'Last Name',
    'register.lastNamePlaceholder': 'Smith',
    'register.email': 'Email',
    'register.emailPlaceholder': 'your@email.com',
    'register.birthDate': 'Date of Birth',
    'register.dayPlaceholder': 'DD',
    'register.monthPlaceholder': 'MM',
    'register.yearPlaceholder': 'YYYY',
    'register.password': 'Password',
    'register.passwordPlaceholder': '••••••••',
    'register.createAccount': 'Create Account',
    'register.fillAllFields': 'Please fill in all fields',
    'register.passwordTooShort': 'Password must be at least 6 characters',
    'register.invalidBirthDate': 'Please enter a complete date of birth',
    'register.emailAlreadyRegistered': 'This email is already registered. Please sign in.',
    'register.invalidEmail': 'Please enter a valid email address',
    'register.weakPassword': 'Password is too weak. Use at least 6 characters.',
    'register.error': 'An error occurred',
    'register.successTitle': 'Registration Successful!',
    'register.successMessage': 'Your account has been created.{newline}You will be redirected to sign in...',
    'register.terms': 'By registering, you accept our',
    'register.termsOfService': 'Terms of Service',
    'register.and': 'and',
    'register.privacyPolicy': 'Privacy Policy',
    // Checkout Screen
    'checkout.title': 'Checkout',
    'checkout.guestData': 'Guest Data',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email Address',
    'checkout.notes': 'Notes (optional)',
    'checkout.pickupDate': 'Pickup Date',
    'checkout.pickupTime': 'Pickup Time',
    'checkout.selectTime': 'Select Time',
    'checkout.selectTimePlaceholder': 'Select time',
    'checkout.selectDate': 'Select Date',
    'checkout.continuePayment': 'Continue to Payment',
    'checkout.fillAllFields': 'Please fill in all fields',
    'checkout.selectDateFirst': 'Please select a date first',
    'checkout.selectTimeFirst': 'Please select a time',
    'checkout.invalidEmail': 'Please enter a valid email address',
    'checkout.timeUnit': '',
    'checkout.pickupInfo': 'Your order will be prepared fresh. Please be on time for pickup at Katharinengasse 14, Nuremberg.',
    // Order Success Screen
    'orderSuccess.paymentSuccess': 'Payment Successful!',
    'orderSuccess.thankYou': 'Thank you, {name}!',
    'orderSuccess.orderNumber': 'Order Number',
    'orderSuccess.confirmationSent': 'A confirmation has been sent to {email}',
    'orderSuccess.pickup': 'Pickup',
    'orderSuccess.pickupDate': 'Pickup Date',
    'orderSuccess.pickupTime': 'Time',
    'orderSuccess.pickupAddress': 'Pickup Address',
    'orderSuccess.pickupAddressLine1': 'Katharinengasse 14',
    'orderSuccess.pickupAddressLine2': '90403 Nuremberg',
    'orderSuccess.newOrder': 'New Order',
    'orderSuccess.prepareToday': 'We are preparing your order fresh. See you soon!',
    'orderSuccess.prepareTomorrow': 'Your order will be prepared fresh tomorrow.',
    'orderSuccess.prepareLater': 'Your order will be prepared fresh on the pickup day.',
    // Payment Screen
    'payment.title': 'Payment',
    'payment.orderSummary': 'Order Summary',
    'payment.pickupDate': 'Pickup',
    'payment.amount': 'Total Amount',
    'payment.pay': 'Pay Now',
    'payment.error': 'Error',
    'payment.processing': 'Processing...',
    'payment.selectMethod': 'Choose your payment method',
    'payment.items': 'Items',
    'payment.time': 'Time',
    'payment.name': 'Name',
    'payment.securePayment': 'Secure Payment',
    'payment.creditCard': 'Credit Card via Stripe',
    'payment.sslEncrypted': 'SSL encrypted',
    'payment.pciCompliant': 'PCI compliant',
    'payment.allCards': 'All credit cards',
    'payment.stripeInfo': 'You will be redirected to the secure Stripe payment form. Your card data will be transmitted encrypted.',
    'payment.toPay': 'To pay',
    'payment.processingPayment': 'Processing payment...',
    // Reservation Screen
    'reservation.title': 'Reserve Table',
    'reservation.step1': 'Step 1: Date & Time',
    'reservation.step2': 'Step 2: Details',
    'reservation.selectDate': 'Select Date',
    'reservation.selectTime': 'Select Time',
    'reservation.time': 'Time',
    'reservation.guests': 'Number of Guests',
    'reservation.fullName': 'Full Name',
    'reservation.phone': 'Phone Number',
    'reservation.email': 'Email',
    'reservation.notes': 'Notes (optional)',
    'reservation.confirm': 'Confirm Reservation',
    'reservation.confirmed': 'Reservation Successful!',
    'reservation.confirmMessage': 'Your reservation has been confirmed. We look forward to your visit!',
    // Order History Screen
    'orderHistory.title': 'My Orders',
    'orderHistory.subtitle': 'Order History',
    'orderHistory.empty': 'No orders yet',
    'orderHistory.emptySubtext': 'Your orders will be displayed here',
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.required': 'Required',
    // Dish Detail
    'dish.quantity': 'Quantity',
    'dish.addToCart': 'Add to Cart',
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('de');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved language from AsyncStorage
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
          setLanguageState(savedLanguage as Language);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string, params?: Record<string, string>): string => {
    let text = translations[language][key] || key;
    
    // Ersetze Platzhalter wie {name}, {email}, etc.
    if (params) {
      Object.keys(params).forEach((param) => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
      });
    }
    
    // Ersetze {newline} mit \n
    text = text.replace(/\{newline\}/g, '\n');
    
    return text;
  };

  const getCategoryTitle = (categoryName: string): string => {
    return menuTranslations[language]?.categories[categoryName]?.title || categoryName;
  };

  const getCategorySubtitle = (categoryName: string): string => {
    return menuTranslations[language]?.categories[categoryName]?.subtitle || '';
  };

  const getDishDescription = (dishName: string): string => {
    return menuTranslations[language]?.dishes[dishName] || '';
  };

  const getTagTranslation = (tag: string): string => {
    return menuTranslations[language]?.tags[tag] || tag;
  };

  // Don't render children until language is loaded
  if (loading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCategoryTitle, getCategorySubtitle, getDishDescription, getTagTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};
