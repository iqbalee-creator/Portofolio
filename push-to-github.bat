@echo off
echo ========================================================
echo  Mengunggah (Push) Portofolio ke GitHub
echo  Repository: https://github.com/iqbalee-creator/Portofolio.git
echo ========================================================
echo.

cd /d "%~dp0"

echo Menambahkan file perubahan...
git add .

echo Membuat commit...
git commit -m "Update website portofolio"

echo Mengunggah ke branch main di GitHub...
git push -u origin main

echo.
echo Selesai!
pause
