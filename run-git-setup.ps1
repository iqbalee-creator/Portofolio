# Add to current process PATH and User PATH
$gitCmd = "C:\Users\Hi\AppData\Local\Programs\Git\cmd"
$env:Path = "$gitCmd;" + $env:Path

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$gitCmd*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$gitCmd", "User")
}

Set-Location -Path "C:\Users\Hi\Downloads\Website-Portofolio"

# Check Git version
git --version

# Set fallback user identity if not already set
$userName = git config user.name
if (-not $userName) {
    git config --global user.name "iqbalee-creator"
}
$userEmail = git config user.email
if (-not $userEmail) {
    git config --global user.email "iqbalee-creator@users.noreply.github.com"
}

# 1. git init
Write-Output "==> Menjalankan git init..."
git init

# 2. git branch main
git branch -M main

# 3. git remote add origin
Write-Output "==> Mengatur remote origin..."
git remote remove origin 2>$null
git remote add origin https://github.com/iqbalee-creator/Portofolio.git
git remote -v

# 4. git add .
Write-Output "==> Menjalankan git add . ..."
# Remove temporary script from staging if needed or keep it
git add .

# 5. git commit -m "init"
Write-Output "==> Menjalankan git commit -m 'init'..."
git commit -m "init"

# 6. git push -u origin main
Write-Output "==> Menjalankan git push -u origin main..."
git push -u origin main
