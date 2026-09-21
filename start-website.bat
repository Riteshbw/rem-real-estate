@echo off
title REM Real Estate Web Portal
echo ==========================================
echo Starting REM Real Estate Website...
echo ==========================================
start http://localhost:4173
node serve.js
if %ERRORLEVEL% NEQ 0 (
    bun run serve.js
)
pause
