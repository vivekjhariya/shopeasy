import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/product';

type RouteContext = {
  params: Promise<{ slug: string }>;
};
export async function GET(request: Request, context: RouteContext) {
  try {
    const params = await context.params;
    await dbConnect();
    
    const { slug } = params;
    
    // Try to find by originalId first, then by _id
    let product = await Product.findOne({ originalId: slug });
    
    if (!product) {
      product = await Product.findOne({ _id: slug });
    }
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching single product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
