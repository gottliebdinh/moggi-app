const { getEmailBase } = require('./emailBase');

const getPasswordResetEmail = (resetData) => {
  const content = `
    <!-- Lock Icon -->
    <tr>
      <td style="padding: 40px 30px 20px; text-align: center;">
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="width: 80px; height: 80px; background-color: #FF6B00; border-radius: 50%; text-align: center; vertical-align: middle;">
              <span style="color: #FFFFFF; font-size: 48px; font-weight: bold;">🔐</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 0 30px 10px; text-align: center;">
        <h2 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 300; font-family: Georgia, serif;">Passwort zurücksetzen</h2>
      </td>
    </tr>

    <!-- Subtitle -->
    <tr>
      <td style="padding: 0 30px 30px; text-align: center;">
        <p style="margin: 0; color: #999999; font-size: 16px; line-height: 24px;">
          Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt.
        </p>
      </td>
    </tr>

    <!-- Info Card -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #FF6B00;">
          <td style="padding: 24px;">
            <p style="margin: 0; color: #999999; font-size: 15px; line-height: 22px;">
              Klicke auf den Button unten, um dein Passwort zurückzusetzen. Der Link ist 1 Stunde gültig.
            </p>
          </td>
        </table>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td style="padding: 0 30px 30px; text-align: center;">
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background-color: #FF6B00; border-radius: 12px; padding: 16px 32px;">
              <a href="${resetData.resetLink}" style="color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600;">
                Passwort zurücksetzen
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Warning -->
    <tr>
      <td style="padding: 0 30px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 59, 48, 0.1); border-radius: 12px; border: 1px solid rgba(255, 59, 48, 0.3);">
          <tr>
            <td style="padding: 16px;">
              <p style="margin: 0; color: #FF3B30; font-size: 13px; line-height: 20px;">
                ⚠️ Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail einfach. Dein Passwort bleibt unverändert.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return getEmailBase(content);
};

module.exports = { getPasswordResetEmail };

