import nodemailer from 'nodemailer'
import { saveOrder } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { services, email, phone } = body

  if (!services?.length || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Toate câmpurile sunt obligatorii'
    })
  }

  // Basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Adresa de email nu este validă'
    })
  }

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: config.smtpHost || 'smtp.gmail.com',
    port: parseInt(config.smtpPort as string) || 587,
    secure: false, // use STARTTLS on port 587
    requireTLS: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const servicesList = services.map((s: string) => `• ${s}`).join('\n')
  const servicesHtml = services.map((s: string) => `<li style="padding: 4px 0;">${s}</li>`).join('')
  const dateStr = new Date().toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // Save order to database
  try {
    await saveOrder({
      date: dateStr,
      email,
      phone: phone || '',
      services
    })
  } catch (err) {
    console.error('Database save failed:', err)
  }

  // Send email notification
  try {
    await transporter.sendMail({
      from: config.smtpFrom || config.smtpUser,
      to: config.orderEmail || 'office@accountingbusiness.ro',
      replyTo: email,
      subject: `Comandă nouă - ${services.join(', ')}`,
      text: `O nouă comandă a fost primită:\n\nServicii solicitate:\n${servicesList}\n\nDate de contact client:\nEmail: ${email}${phone ? `\nTelefon: ${phone}` : ''}\n\nData: ${dateStr}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">Comandă nouă</h2>
          </div>
          <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
            <h3 style="color: #1e40af; margin-top: 0;">Servicii solicitate:</h3>
            <ul style="padding-left: 20px;">${servicesHtml}</ul>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <h3 style="color: #1e40af;">Date de contact client:</h3>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 0.85em;">Comandă primită la: ${dateStr}</p>
          </div>
        </div>
      `
    })
  } catch (err) {
    console.error('Email sending failed:', err)
  }

  return { success: true }
})