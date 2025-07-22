import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { layanan, nama, telepon, signature } = await req.json()

    if (!layanan || !nama || !telepon || !signature) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    const now = new Date()
    const formattedTime = now.toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    // === 1. Kirim Email ===
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
      subject: `Persetujuan ${layanan} - ${nama}`,
      html: `
        <p><strong>Formulir Persetujuan</strong></p>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Telepon:</strong> ${telepon}</p>
        <p><strong>Layanan:</strong> ${layanan}</p>
        <p>Dikirim pada <strong>${formattedTime}</strong>.</p>
      `,
      attachments: [
        {
          filename: `ttd-${nama.replace(/\s/g, '_')}.png`,
          content: signature.split('base64,')[1],
          encoding: 'base64',
        },
      ],
    })

    // === 2. Kirim ke Google Sheets ===
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbxOSZnL3d7JuJeWxbiTM5P5jgJKe5xtDFlymrb8CBYhXBZSQz37TPNQFn9G2_y5h7tw/exec' // Ganti ini
    await fetch(googleSheetsUrl, {
      method: 'POST',
      body: JSON.stringify({
        signature,
        layanan,
        nama,
        telepon,
      }),
      headers: { 'Content-Type': 'application/json' },
    })


    return NextResponse.json({ message: 'Data berhasil dikirim' }, { status: 200 })
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: 'Gagal mengirim data' }, { status: 500 })
  }
}
