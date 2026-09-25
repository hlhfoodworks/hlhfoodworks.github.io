@echo off
cd /d "%~dp0"

echo === Cookbook Publisher ===
echo.

rem Remove stale lock file if present
if exist .git\index.lock (
    echo Removing stale git lock file...
    del .git\index.lock
)

git add cookbook_data.js index.html build_website.js recipe_utils.js

git diff --cached --quiet
if %errorlevel%==0 (
    echo Nothing new to publish.
    goto done
)

for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set dt=%%I
set today=%dt:~0,4%-%dt:~4,2%-%dt:~6,2%

git commit -m "Update cookbook: %today%"
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
