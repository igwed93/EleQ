import { NextResponse } from 'next/server';
import prisma from '@/prisma/connection';

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
      status: 'ACTIVE',
    },
    take: 8,
    include: {
      category: true,
      reviews: { select: { rating: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ products });
}
