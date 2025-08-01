import { NextRequest, NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { layanan, nama, telepon, signature } = body

    console.log('[✅ Received Body]', body)

    // Cek validitas data
    if (!layanan || !nama || !telepon || !signature) {
      console.warn('[⚠️ Validation Error] Data tidak lengkap')
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // const now = new Date()
    // const formattedTime = now.toLocaleString('id-ID', {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    // })

    console.log('[🟡 ENV]', {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? '✅ exists' : '❌ missing',
      EMAIL_TO: process.env.EMAIL_TO,
      GOOGLE_SHEETS_URL: process.env.GOOGLE_SHEETS_URL,
    })

    // // === 1. Kirim Email ===
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // })

    // console.log('[📧 Sending Email]')
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: process.env.EMAIL_TO,
    //   subject: `Persetujuan ${layanan} - ${nama}`,
    //   html: `
    //     <p><strong>Formulir Persetujuan</strong></p>
    //     <p><strong>Nama:</strong> ${nama}</p>
    //     <p><strong>Telepon:</strong> ${telepon}</p>
    //     <p><strong>Layanan:</strong> ${layanan}</p>
    //     <p>Dikirim pada <strong>${formattedTime}</strong>.</p>
    //   `,
    //   attachments: [
    //     {
    //       filename: `ttd-${nama.replace(/\s/g, '_')}.png`,
    //       content: signature.split('base64,')[1],
    //       encoding: 'base64',
    //     },
    //   ],
    // })
    // console.log('[✅ Email sent]')

    // === 2. Kirim ke Google Sheets ===
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL!
    console.log('[🔗 Send to Google Sheets]:', googleSheetsUrl)

    const sheetsRes = await fetch(googleSheetsUrl, {
      method: 'POST',
      body: JSON.stringify({
        signature,
        layanan,
        nama,
        telepon,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const sheetsText = await sheetsRes.text()
    console.log('[✅ Google Sheets Response]', sheetsText)

    return NextResponse.json({ message: 'Data berhasil dikirim' }, { status: 200 })
  } catch (error) {
    console.error('❌ Caught Error:', error)
    return NextResponse.json({ error: 'Gagal mengirim data' }, { status: 500 })
  }
}
