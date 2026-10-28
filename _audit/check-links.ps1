# Static audit of Lumicom: verify all local links, images, css/js referenced from HTML files
$root = "D:\PROJECT\Lumicom"
$problems = New-Object System.Collections.Generic.List[string]
$checked = 0

function Test-Ref {
  param([string]$pagePath, [string]$ref, [string]$attr)
  $script:checked++
  if ($ref -match '^(https?:)?//') { return }            # external
  if ($ref -match '^(mailto:|tel:|data:|#|javascript:)') { return }
  $clean = $ref.Split('#')[0].Split('?')[0]
  if ($clean -eq '') { return }
  # resolve relative to page dir
  $pageDir = Split-Path $pagePath -Parent
  $full = Join-Path $pageDir $clean
  $full = [System.IO.Path]::GetFullPath($full)
  if (-not (Test-Path -LiteralPath $full)) {
    $script:problems.Add("MISSING [$attr] '$ref' -> $full   (page: $pagePath)")
  }
}

$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter *.html | Where-Object { $_.FullName -notmatch '\\_tools\\' }
foreach ($f in $htmlFiles) {
  $content = Get-Content -LiteralPath $f.FullName -Raw
  # match src="..." href="..." srcset entries
  $matches0 = [regex]::Matches($content, '(src|href)\s*=\s*"([^"]+)"')
  foreach ($m in $matches0) { Test-Ref -pagePath $f.FullName -ref $m.Groups[2].Value -attr $m.Groups[1].Value }
  $m2 = [regex]::Matches($content, "src\s*=\s*'([^']+)'")
  foreach ($m in $m2) { Test-Ref -pagePath $f.FullName -ref $m.Groups[1].Value -attr 'src' }
  # srcset
  $m3 = [regex]::Matches($content, 'srcset\s*=\s*"([^"]+)"')
  foreach ($m in $m3) {
    foreach ($part in ($m.Groups[1].Value -split ',')) {
      $u = ($part.Trim() -split '\s+')[0]
      if ($u) { Test-Ref -pagePath $f.FullName -ref $u -attr 'srcset' }
    }
  }
  # url(...) in inline styles
  $m4 = [regex]::Matches($content, 'url\((["'']?)([^)'']+)\1\)')
  foreach ($m in $m4) { Test-Ref -pagePath $f.FullName -ref $m.Groups[2].Value -attr 'style-url' }
  # absolute windows paths / localhost
  if ($content -match 'file:///|C:\\|D:\\|localhost') {
    $script:problems.Add("SUSPICIOUS absolute/local path in $($f.FullName)")
  }
}

# CSS files referenced @import / url()
$cssFiles = Get-ChildItem -Path $root -Recurse -Filter *.css | Where-Object { $_.FullName -notmatch '\\_tools\\' }
foreach ($c in $cssFiles) {
  $content = Get-Content -LiteralPath $c.FullName -Raw
  $m = [regex]::Matches($content, 'url\((["'']?)([^)'']+)\1\)')
  foreach ($mm in $m) {
    $ref = $mm.Groups[2].Value
    $script:checked++
    if ($ref -match '^(https?:)?//|data:') { continue }
    $clean = $ref.Split('#')[0].Split('?')[0]
    $full = [System.IO.Path]::GetFullPath((Join-Path (Split-Path $c.FullName -Parent) $clean))
    if (-not (Test-Path -LiteralPath $full)) {
      $script:problems.Add("MISSING css-url '$ref' -> $full   (css: $c.FullName)")
    }
  }
  if ($content -match 'file:///|localhost') { $script:problems.Add("SUSPICIOUS path in css $($c.FullName)") }
}

# JS files: look for fetch/paths to html/img
$jsFiles = Get-ChildItem -Path $root -Recurse -Filter *.js | Where-Object { $_.FullName -notmatch '\\_tools\\' }
foreach ($j in $jsFiles) {
  $content = Get-Content -LiteralPath $j.FullName -Raw
  $m = [regex]::Matches($content, '"([^"]+\.(?:html|jpg|jpeg|png|webp|svg|json))"')
  foreach ($mm in $m) {
    $ref = $mm.Groups[1].Value
    if ($ref -match '^(https?:)?//|data:') { continue }
    $full = [System.IO.Path]::GetFullPath((Join-Path (Split-Path $j.FullName -Parent) $ref))
    $script:checked++
    if (-not (Test-Path -LiteralPath $full)) {
      $script:problems.Add("MISSING js-ref '$ref' -> $full   (js: $j.FullName)")
    }
  }
}

Write-Output "Checked references: $checked"
Write-Output "Problems found: $($problems.Count)"
$problems | Sort-Object -Unique | ForEach-Object { Write-Output $_ }
