// Einfacher In-Memory Store für Verification Codes
// In Production: Nutze eine richtige Datenbank (Supabase, Redis, etc.)

const verificationCodes = new Map();

// Generiere 6-stelligen Code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Speichere Verification Code
const storeVerificationCode = (email, userId) => {
  const code = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 Minuten
  
  verificationCodes.set(email, {
    code,
    userId,
    expiresAt,
  });
  
  console.log(`📝 Verification Code für ${email}: ${code}`);
  return code;
};

// Prüfe Verification Code
const verifyCode = (email, code) => {
  const stored = verificationCodes.get(email);
  
  if (!stored) {
    return { valid: false, error: 'Kein Code gefunden' };
  }
  
  if (Date.now() > stored.expiresAt) {
    verificationCodes.delete(email);
    return { valid: false, error: 'Code abgelaufen' };
  }
  
  if (stored.code !== code) {
    return { valid: false, error: 'Ungültiger Code' };
  }
  
  // Code ist gültig
  verificationCodes.delete(email);
  return { valid: true, userId: stored.userId };
};

// Cleanup - lösche abgelaufene Codes alle 5 Minuten
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of verificationCodes.entries()) {
    if (now > data.expiresAt) {
      verificationCodes.delete(email);
      console.log(`🗑️ Abgelaufener Code entfernt: ${email}`);
    }
  }
}, 5 * 60 * 1000);

module.exports = {
  storeVerificationCode,
  verifyCode,
};

