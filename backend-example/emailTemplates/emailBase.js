// Base Template für alle MOGGI E-Mails
const getEmailBase = (content) => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MOGGI - Asian Kitchen & Bar</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1A1A1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; border-radius: 16px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0A0A0A; padding: 40px 30px; text-align: center; border-bottom: 3px solid #FF6B00;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 36px; font-weight: 300; font-family: Georgia, serif;">MOGGI</h1>
              <p style="margin: 10px 0 0 0; color: #FF6B00; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Asian Kitchen & Bar</p>
            </td>
          </tr>

          <!-- Content -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="background-color: #0A0A0A; padding: 30px; text-align: center; border-top: 1px solid #2A2A2A;">
              <p style="margin: 0 0 12px 0; color: #FFFFFF; font-size: 16px; font-weight: 600;">MOGGI Asian Kitchen & Bar</p>
              <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Katharinengasse 14, 90403 Nürnberg</p>
              <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">📞 0911 / 123456</p>
              <p style="margin: 0; color: #999999; font-size: 14px;">📧 info@moggi-nuernberg.de</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #2A2A2A;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; color: #666666; font-size: 12px;">
                      Du hast Fragen? Kontaktiere uns gerne!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Footer Text -->
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 20px 20px 10px 20px; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 12px; line-height: 18px;">
                © 2025 MOGGI Asian Kitchen & Bar. Alle Rechte vorbehalten.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 20px 20px 20px; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 11px;">
                Made with <span style="color: #FF3B30;">♥</span> by Gottlieb Dinh
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

module.exports = { getEmailBase };

