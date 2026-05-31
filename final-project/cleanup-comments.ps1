# PowerShell script to remove comments from TypeScript files
Get-ChildItem -Path "app", "lib" -Recurse -Include "*.ts", "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Remove single-line comments (//)
    $content = $content -replace '//.*?(?=\r?\n|$)', ''
    
    # Remove multi-line comments (/* ... */)
    $content = $content -replace '/\*[\s\S]*?\*/', ''
    
    # Clean up extra blank lines
    $content = $content -replace '(\r?\n){3,}', "

"
    
    Set-Content -Path $_.FullName -Value $content
    Write-Host "✅ Cleaned: $(.FullName)"
}
Write-Host ""
Write-Host "✅ Comment removal complete!"
