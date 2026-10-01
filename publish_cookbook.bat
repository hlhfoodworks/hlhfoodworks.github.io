@echo off
cd /d "%~dp0"

echo === Cookbook Publisher ===
echo.

rem Remove stale lock file if present
if exist .git\index.lock (
    echo Removing stale git lock file...
    del .git\index.lock
)

git add cookbook_data.js build_website.js check_labels.js recipe_utils.js search-index.json *.html

git diff --cached --quiet
if %errorlevel%==0 (
    echo Nothing new to stage.
) else (
    for /f "tokens=*" %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do set today=%%I
    git commit -m "Update cookbook: %today%"
)

git config gc.auto 0
git push

if %errorlevel%==0 (
    echo.
    echo Done! Site will update in ~1 minute at https://hlhfoodworks.github.io
) else (
    echo.
    echo Push failed. Check your internet connection and try again.
)

:done
echo.
pause
