@echo off
echo ========================================================
echo  Menghubungkan Portofolio ke GitHub
echo  Repository: https://github.com/iqbalee-creator/Portofolio.git
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/5] Menginisialisasi Git...
git init

echo [2/5] Menambahkan remote repository origin...
git remote remove origin 2>nul
git remote add origin https://github.com/iqbalee-creator/Portofolio.git

echo [3/5] Mengatur branch utama ke 'main'...
git branch -M main

echo [4/5] Menambahkan seluruh file proyek...
git add .

echo [5/5] Membuat commit perdana...
git commit -m "Initial commit: Website Portofolio Pribadi"

echo.
echo ========================================================
echo  Penyambungan Git Lokal Selesai!
echo  Untuk mengunggah (push) ke GitHub, jalankan:
echo.
echo    git push -u origin main
echo ========================================================
echo.
pause
