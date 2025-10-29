const { getEmailBase } = require('./emailBase');

const getReservationConfirmationEmail = (reservationData) => {
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
              <h2 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 300; font-family: Georgia, serif;">Reservierung bestätigt!</h2>
            </td>
          </tr>

          <!-- Subtitle -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 16px; line-height: 24px;">
                Hallo ${reservationData.guestName},<br/>
                deine Reservierung wurde erfolgreich bestätigt.
              </p>
            </td>
          </tr>

          <!-- Reservation Number -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border: 2px solid #FF6B00;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 12px 0; color: #999999; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Reservierungsnummer</p>
                    <p style="margin: 0; color: #FF6B00; font-size: 36px; font-weight: 600; font-family: 'Courier New', monospace; letter-spacing: 4px;">#${reservationData.reservationNumber}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reservation Details -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #FF6B00;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">🍽️ Reservierungsdetails</h3>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Datum</p>
                    <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${reservationData.date}</p>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Uhrzeit</p>
                    <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${reservationData.time} Uhr</p>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Anzahl Personen</p>
                    <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${reservationData.guests} ${reservationData.guests === 1 ? 'Person' : 'Personen'}</p>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Name</p>
                    <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${reservationData.guestName}</p>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">E-Mail</p>
                    <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${reservationData.email}</p>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Telefon</p>
                    <p style="margin: 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${reservationData.phone || 'Nicht angegeben'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${reservationData.note ? `
          <!-- Special Requests -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">📝 Besondere Wünsche</h3>
                    <p style="margin: 0; color: #FFFFFF; font-size: 16px; line-height: 24px;">${reservationData.note}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Restaurant Info -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #FF6B00;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 18px; font-weight: 600;">📍 Restaurant</h3>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Adresse</p>
                    <p style="margin: 0 0 16px 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">Katharinengasse 14<br/>90403 Nürnberg</p>
                    <p style="margin: 0 0 8px 0; color: #999999; font-size: 14px;">Telefon</p>
                    <p style="margin: 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">0911 63290791</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info Box -->
          <tr>
            <td style="padding: 0 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255, 107, 0, 0.1); border-radius: 12px; border: 1px solid rgba(255, 107, 0, 0.3);">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; color: #FFFFFF; font-size: 15px; line-height: 22px;">
                      💡 <strong>Wichtig:</strong> Bitte sei pünktlich zur reservierten Zeit. Falls du deine Reservierung ändern oder stornieren möchtest, kontaktiere uns bitte rechtzeitig!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

  `;

  return getEmailBase(content);
};

module.exports = { getReservationConfirmationEmail };
