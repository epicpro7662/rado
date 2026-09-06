@echo off
title Rado

echo Starting Dubak AI...
start "Dubak AI Server" cmd /k "cd /d %~dp0server && node server.js"

timeout /t 2 /nobreak >nul

echo Starting Rado website...
start "Rado Website" cmd /k "cd /d %~dp0 && npm run dev"

timeout /t 3 /nobreak >nul

echo Opening Rado...
start http://localhost:5173/

exit