import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/connection';
import { SearchSchema } from '@/schemas/search.schema';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = SearchSchema.safeParse({
    q: searchParams.get('q'),
  });

  if (!parsed.success) {
    return NextResponse.json(
        { message: 'Search query is required' },
        { status: 400 }
    );
  }

  const { q } = parsed.data;


  const products = await prisma.product.findMany({
    where: {
      status: 'ACTIVE',
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { brand: { contains: q, mode: 'insensitive' } },
        { tags: { has: q } },
      ],
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json({ products });
}