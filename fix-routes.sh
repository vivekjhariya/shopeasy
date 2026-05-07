#!/bin/bash

# Fix all dynamic route params for Next.js 15
for file in src/app/api/orders/[orderId]/route.ts src/app/api/products/[productId]/route.ts src/app/api/singleProduct/[slug]/route.ts; do
  if [ -f "$file" ]; then
    # Backup
    cp "$file" "$file.bak"
    
    # Replace params pattern
    sed -i 's/{ params }: { params: { \([^}]*\) } }/context: { params: Promise<{ \1 }> }/g' "$file"
    
    # Add await params after function start
    sed -i '/export async function \(GET\|POST\|PUT\|DELETE\|PATCH\)/a\  const params = await context.params;' "$file"
    
    echo "Fixed: $file"
  fi
done
