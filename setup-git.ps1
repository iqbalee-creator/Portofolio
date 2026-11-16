Set-Location -Path "C:\Users\Hi\Downloads\Website-Portofolio"
git init
git remote remove origin 2>$null
git remote add origin https://github.com/iqbalee-creator/Portofolio.git
git branch -M main
git add .
git commit -m "Initial commit: Website Portofolio Pribadi"
git remote -v
git status
