@echo off
title Push Portofolio ke GitHub
color 0A

:: Tambahkan Git ke PATH
set "PATH=C:\Users\Hi\AppData\Local\Programs\Git\cmd;%PATH%"

cd /d "%~dp0"

echo ========================================================
echo  MENGUNGGAH PORTOFOLIO KE GITHUB
echo  Repository: https://github.com/iqbalee-creator/Portofolio.git
echo  Branch    : main
echo ========================================================
echo.

git status
echo.
echo Melakukan push ke origin main...
git push origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo  BERHASIL! Perubahan terbaru telah terunggah ke GitHub.
    echo ========================================================
) else (
    echo ========================================================
    echo  Jika gagal otentikasi:
    echo  1. Buka: https://github.com/settings/tokens
    echo  2. Generate new token (classic) dan centang 'repo'
    echo  3. Masukkan token baru sebagai Password saat diminta.
    echo ========================================================
)

echo.
pause
