import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, subject, message } = body

    if (!name || !phone || !subject) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos.' }, { status: 400 })
    }

    // 1. Save to Payload CMS (optional — create a "Leads" collection)
    // const payload = await getPayload({ config })
    // await payload.create({ collection: 'leads', data: { name, phone, subject, message } })

    // 2. Send email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Site Cavalcante & Melo <noreply@cavalcantemelo.adv.br>',
          to: [process.env.CONTACT_EMAIL || 'contato@cavalcantemelo.adv.br'],
          subject: `Novo Lead: ${subject} — ${name}`,
          html: `
            <h2>Novo contato pelo site</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <p><strong>Mensagem:</strong> ${message || 'Não informada'}</p>
            <hr />
            <p><em>Enviado pelo formulário do site cavalcantemelo.adv.br</em></p>
          `,
        }),
      })
    }

    // 3. Send WhatsApp notification via n8n webhook (optional)
    if (process.env.N8N_WEBHOOK_URL) {
      await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, subject, message, source: 'site-form' }),
      }).catch(() => {})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
