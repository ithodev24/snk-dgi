// app/api/test-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET(req: NextRequest) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Tes Email',
      text: 'Ini hanya tes kirim email dari Next.js!',
    })

    return NextResponse.json({ message: 'Email terkirim!' })
  } catch (error) {
    console.error('Error test email:', error)
    return NextResponse.json({ error: 'Gagal kirim email' }, { status: 500 })
  }
}
