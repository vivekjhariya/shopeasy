import re

files = [
    'src/app/api/products/[productId]/route.ts',
    'src/app/api/singleProduct/[slug]/route.ts'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Extract param name
    param_name = 'productId' if 'productId' in filepath else 'slug'
    
    # Add type definition at top after imports
    if 'type RouteContext' not in content:
        import_end = content.find('\n\n')
        type_def = f"\n\ntype RouteContext = {{\n  params: Promise<{{ {param_name}: string }}>;\n}};\n"
        content = content[:import_end] + type_def + content[import_end+2:]
    
    # Replace function signatures
    content = re.sub(
        r'export async function (GET|POST|PUT|DELETE|PATCH)\(\s*request: (NextRequest|Request),\s*\{ params \}: \{ params: \{ (\w+): string \} \}\s*\)',
        r'export async function \1(request: \2, context: RouteContext)',
        content
    )
    
    # Add await params after try {
    content = re.sub(
        r'(\s+try \{\s*)',
        r'\1const params = await context.params;\n    ',
        content
    )
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Fixed: {filepath}")
