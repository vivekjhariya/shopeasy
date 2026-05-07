import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cart from '@/lib/models/cart';
import { requireAuth } from '@/lib/auth/utils';

type RouteContext = {
  params: Promise<{ productId: string }>;
};

// Update cart item quantity
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth(request);
    await dbConnect();
    
    const params = await context.params;
    const body = await request.json();
    const { quantity } = body;
    
    const cart = await Cart.findOne({ user: auth.userId });
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === params.productId
    );
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message === 'Authentication required' ? 401 : 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const auth = await requireAuth(request);
    await dbConnect();
    
    const params = await context.params;
    const cart = await Cart.findOne({ user: auth.userId });
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== params.productId
    );
    
    await cart.save();
    
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.message === 'Authentication required' ? 401 : 500 }
    );
  }
}
