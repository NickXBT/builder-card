@echo off
echo ============================================
echo   Pushing Builder Card to GitHub (NickXBT)
echo ============================================
echo.

git branch -M main
git add .
git commit -m "feat: complete Builder Card portfolio application"
git remote set-url origin https://github.com/NickXBT/builder-card.git
echo Pushing to https://github.com/NickXBT/builder-card.git ...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ============================================
    echo   SUCCESS! Project is live on GitHub!
    echo   https://github.com/NickXBT/builder-card
    echo ============================================
) else (
    echo ============================================
    echo   PUSH FAILED!
    echo   Make sure you created an empty repo named
    echo   'builder-card' at https://github.com/new
    echo ============================================
)

pause
