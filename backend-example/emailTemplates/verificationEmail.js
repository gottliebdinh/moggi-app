const { getEmailBase } = require('./emailBase');

const getVerificationEmail = (verificationData) => {
  const content = `
    <!-- Email Icon -->
    <tr>
      <td style="padding: 40px 30px 20px; text-align: center;">
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="width: 80px; height: 80px; background-color: #FF6B00; border-radius: 50%; text-align: center; vertical-align: middle;">
              <span style="color: #FFFFFF; font-size: 48px; font-weight: bold;">✉️</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 0 30px 10px; text-align: center;">
        <h2 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 300; font-family: Georgia, serif;">E-Mail bestätigen</h2>
      </td>
    </tr>

    <!-- Subtitle -->
    <tr>
      <td style="padding: 0 30px 30px; text-align: center;">
        <p style="margin: 0; color: #999999; font-size: 16px; line-height: 24px;">
          Hallo ${verificationData.firstName},<br/>
          nur noch ein Schritt bis dein Account bereit ist!
        </p>
      </td>
    </tr>

    <!-- Verification Code -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border: 2px solid #FF6B00;">
          <tr>
            <td style="padding: 24px; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #999999; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Dein Bestätigungscode</p>
              <p style="margin: 0; color: #FF6B00; font-size: 36px; font-weight: 600; font-family: 'Courier New', monospace; letter-spacing: 8px;">${verificationData.code}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Info -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #FF6B00;">
          <td style="padding: 20px;">
            <p style="margin: 0; color: #999999; font-size: 15px; line-height: 22px;">
              Gib diesen Code in der App ein, um deine E-Mail-Adresse zu bestätigen. Der Code ist <strong style="color: #FFFFFF;">10 Minuten</strong> gültig.
            </p>
          </td>
        </table>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td style="padding: 0 30px 40px; text-align: center;">
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="background-color: #FF6B00; border-radius: 12px; padding: 16px 32px;">
              <a href="${verificationData.verificationLink}" style="color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600;">
                Jetzt bestätigen
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return getEmailBase(content);
};

module.exports = { getVerificationEmail };

