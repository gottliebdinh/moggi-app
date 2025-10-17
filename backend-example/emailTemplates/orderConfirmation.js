const { getEmailBase } = require('./emailBase');

const getOrderConfirmationEmail = (orderData) => {
  const itemsHtml = orderData.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A;">
            <span style="color: #FFFFFF; font-size: 16px;">${item.quantity}x ${item.name}</span>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #2A2A2A; text-align: right;">
            <span style="color: #FFFFFF; font-size: 16px;">${(item.price || 0).toFixed(2).replace('.', ',')} €</span>
          </td>
        </tr>
      `
    )
    .join('');

  const content = `
    <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 30px 20px; text-align: center;">
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="width: 80px; height: 80px; background-color: #FF6B00; border-radius: 50%; text-align: center; vertical-align: middle;">
                    <span style="color: #FFFFFF; font-size: 48px; font-weight: bold;">✓</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding: 0 30px 10px; text-align: center;">
              <h2 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 300; font-family: Georgia, serif;">Vielen Dank für deine Bestellung!</h2>
            </td>
          </tr>

          <!-- Subtitle -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 16px; line-height: 24px;">
                Hallo ${orderData.customerName},<br/>
                deine Bestellung wurde erfolgreich aufgegeben.
              </p>
            </td>
          </tr>

          <!-- Order Number -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border: 2px solid #FF6B00;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 12px 0; color: #999999; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Bestellnummer</p>
                    <p style="margin: 0; color: #FF6B00; font-size: 36px; font-weight: 600; font-family: 'Courier New', monospace; letter-spacing: 4px;">#${orderData.orderNumber}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pickup Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #FF6B00;">
                <td style="padding: 20px;">
                  <h3 style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">📍 Abholung</h3>
                  <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Datum</p>
                  <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${orderData.pickupDate}</p>
                  <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Uhrzeit</p>
                  <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${orderData.pickupTime} Uhr</p>
                  <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Adresse</p>
                  <p style="margin: 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">Katharinengasse 14<br/>90403 Nürnberg</p>
                </td>
              </table>
            </td>
          </tr>

          <!-- Order Items -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">🍜 Deine Bestellung</h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${itemsHtml}
                      
                      <!-- Total -->
                      <tr>
                        <td style="padding: 20px 0 0 0;">
                          <span style="color: #999999; font-size: 18px; font-family: Georgia, serif;">Gesamt</span>
                        </td>
                        <td style="padding: 20px 0 0 0; text-align: right;">
                          <span style="color: #FF6B00; font-size: 28px; font-weight: 600; font-family: Georgia, serif;">${orderData.total.toFixed(2).replace('.', ',')} €</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info Box -->
          <tr>
            <td style="padding: 0 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 107, 0, 0.1); border-radius: 12px; border: 1px solid rgba(255, 107, 0, 0.3);">
                <td style="padding: 20px;">
                  <p style="margin: 0; color: #FFFFFF; font-size: 15px; line-height: 22px;">
                    💡 <strong>Wichtig:</strong> Bitte sei pünktlich zur angegebenen Abholzeit. Deine Bestellung wird frisch für dich zubereitet!
                  </p>
                </td>
              </table>
            </td>
          </tr>

  `;

  return getEmailBase(content);
};

module.exports = { getOrderConfirmationEmail };

