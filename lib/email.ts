import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] || character)
}

export async function sendNewMessageNotification(message: {
  name: string
  email: string
  projectType?: string | null
  budget?: string | null
  message: string
}) {
  if (!resend || !process.env.FROM_EMAIL) {
    console.log('Email not configured. Would send notification for:', message)
    return { success: false, error: 'Email not configured' }
  }

  try {
    const name = escapeHtml(message.name)
    const email = escapeHtml(message.email)
    const projectType = message.projectType ? escapeHtml(message.projectType) : null
    const budget = message.budget ? escapeHtml(message.budget) : null
    const messageText = escapeHtml(message.message)

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.FROM_EMAIL, // Send to yourself
      subject: `New Project Inquiry from ${message.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Project Inquiry</h2>
          <p style="color: #666;">You have received a new project inquiry from your website.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333;">${messageText}</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This message was sent from the Karmveer Studio contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
