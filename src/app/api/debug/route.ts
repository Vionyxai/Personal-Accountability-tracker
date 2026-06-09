import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const info: Record<string, string> = {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? 'SET' : 'MISSING',
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING ? 'SET' : 'MISSING',
    POSTGRES_URL: process.env.POSTGRES_URL ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV ?? 'unknown',
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'ok', env: info })
  } catch (e) {
    return NextResponse.json({ status: 'error', error: String(e), env: info }, { status: 500 })
  }
}
