import re

files = [
    'src/app/shops/[shop]/page.tsx',
    'src/app/shops/[shop]/[category]/page.tsx'
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Fix type definition - make params a Promise
    content = re.sub(
        r'type (\w+Props) = \{\s*params: \{([^}]+)\};',
        r'type \1 = {\n  params: Promise<{\2}>;',
        content
    )
    
    # Fix generateMetadata - await params
    content = re.sub(
        r'export async function generateMetadata\(\s*\{ params \}: (\w+Props)',
        r'export async function generateMetadata(props: \1',
        content
    )
    
    # Add await params in generateMetadata body
    content = re.sub(
        r'(export async function generateMetadata\([^)]+\)[^{]*\{)\s*',
        r'\1\n  const params = await props.params;\n  ',
        content
    )
    
    # Fix component - await params
    content = re.sub(
        r'const \w+Page = async \(\{\s*params[^}]*\}: (\w+Props)\)',
        r'const \g<0>Page = async (props: \1)',
        content
    )
    content = re.sub(
        r'(const \w+Page = async \(props: \w+Props\)[^{]*\{)\s*',
        r'\1\n  const params = await props.params;\n  ',
        content
    )
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Fixed: {filepath}")
