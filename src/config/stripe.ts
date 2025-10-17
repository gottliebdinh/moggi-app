// Stripe Configuration
// TODO: Verschiebe diese Keys später in .env für bessere Sicherheit

export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51SISLvGoOdcgyztZoJN9i2zy0hZxu3d2VUR99ga4LoH01nM4Nv7rz8VTBg70EqOihpmsTsgJgrSx3WVZVENalxD000QbJroVhS';

// WICHTIG: Secret Key NIEMALS in der App verwenden! Nur im Backend!
// export const STRIPE_SECRET_KEY = 'YOUR_SECRET_KEY_HERE'; // Nur im Backend verwenden!

// Merchant Identifier für Apple Pay (muss in Apple Developer Account konfiguriert werden)
export const APPLE_PAY_MERCHANT_ID = 'merchant.com.moggi.app';

// Google Pay Merchant Info
export const GOOGLE_PAY_MERCHANT_NAME = 'MOGGI Asian Kitchen & Bar';

// Backend Endpoint (verwende deine lokale IP statt localhost für iPhone Tests)
export const BACKEND_URL = 'http://192.168.178.25:3000';