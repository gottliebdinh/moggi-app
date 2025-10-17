const { getEmailBase } = require('./emailBase');

const getWelcomeEmail = (userData) => {
  const content = `
    <!-- Welcome Icon -->
    <tr>
      <td style="padding: 40px 30px 20px; text-align: center;">
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="width: 80px; height: 80px; background-color: #FF6B00; border-radius: 50%; text-align: center; vertical-align: middle;">
              <span style="color: #FFFFFF; font-size: 48px; font-weight: bold;">👋</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 0 30px 10px; text-align: center;">
        <h2 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 300; font-family: Georgia, serif;">Willkommen bei MOGGI!</h2>
      </td>
    </tr>

    <!-- Subtitle -->
    <tr>
      <td style="padding: 0 30px 30px; text-align: center;">
        <p style="margin: 0; color: #999999; font-size: 16px; line-height: 24px;">
          Hallo ${userData.firstName},<br/>
          schön, dass du dabei bist!
        </p>
      </td>
    </tr>

    <!-- Info Card -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #FF6B00;">
          <td style="padding: 24px;">
            <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 600;">Dein Account ist bereit! 🎉</p>
            <p style="margin: 0; color: #999999; font-size: 15px; line-height: 22px;">
              Mit deinem Account kannst du:<br/><br/>
              ✓ Deine Bestellhistorie einsehen<br/>
              ✓ Schneller bestellen<br/>
              ✓ Treuepunkte sammeln
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
              <a href="exp://192.168.178.25:8081" style="color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 600;">
                Jetzt bestellen
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return getEmailBase(content);
};

module.exports = { getWelcomeEmail };

