import { Resend } from 'resend';

// Initialize Resend with your API Key from your Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Arun Mohan <invitation@ar-wedding.nxtdev.xyz>',
      to: [email],
      subject: `Wedding Invitation: Anjana & Rinu — June 24, 2026`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .email-wrapper { background-color: #0e0703; padding: 40px 20px; font-family: 'Georgia', serif; color: #D4AF37; text-align: center; }
            .card { max-width: 500px; margin: 0 auto; border: 2px solid #382208; padding: 30px; background-color: #1a0e03; border-radius: 4px; outline: 1px solid #D4AF37; outline-offset: -10px; }
            .om { font-size: 24px; margin-bottom: 20px; color: #D4AF37; }
            .title { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; opacity: 0.8; }
            .names { font-size: 32px; margin: 15px 0; font-weight: normal; }
            .details { color: #f2d675; font-size: 16px; line-height: 1.6; margin: 20px 0; }
            .btn { display: inline-block; padding: 12px 24px; margin: 10px 5px; border: 1px solid #D4AF37; color: #D4AF37; text-decoration: none; font-size: 12px; letter-spacing: 1px; transition: all 0.3s; }
            .footer { font-size: 11px; margin-top: 30px; opacity: 0.6; line-height: 1.4; color: #A87C20; }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="card">
              <div class="om">ॐ</div>
              <div class="title">Wedding Reception Invitation</div>
              <p style="color: #f2d675;">Dear <strong>${name}</strong>,</p>
              <p class="details">With the blessings of the Almighty,<br>we cordially invite you to celebrate the wedding reception of</p>
              
              <h1 class="names">Anjana & Rinu</h1>
              
              <div class="details">
                <strong>Wednesday, 24th June 2026</strong><br>
                4:00 PM - 9:00 PM<br>
                Sreepadmam Auditorium, Kunnamangalam
              </div>

              <div style="margin-top: 30px;">
                <a href="https://ar-wedding.nxtdev.xyz" class="btn">VIEW VIRTUAL CARD</a>
                <a href="https://go.nxtdev.xyz/NGyHDH" class="btn">LOCATION MAP</a>
              </div>

              <div style="margin-top: 15px;">
                <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Anjana+and+Rinu&dates=20260624T103000Z/20260624T153000Z&details=Wedding+reception+at+Sreepadmam+Auditorium&location=Sreepadmam+Auditorium,+Kunnamangalam" 
                   style="color: #f2d675; font-size: 12px; text-decoration: underline;">+ Add to Calendar</a>
              </div>

              <div class="footer">
                With Regards,<br>
                <strong>Arun Mohan & Family</strong><br>
                Pulparambil, Karanthur
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ message: 'Invitation sent successfully!', data });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
