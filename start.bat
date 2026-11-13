@echo off
title Altus Vera LMS — Startup

echo.
echo  ======================================================
echo    ALTUS VERA LMS  ^|  Learn . Grow . Succeed
echo  ======================================================
echo.

:: ── 1. Apply EF Core migrations ────────────────────────
echo [1/3] Applying database migrations...
cd /d "%~dp0"
dotnet ef database update --project src\AltuVera.LMS.Infrastructure --startup-project src\AltuVera.LMS.API
if errorlevel 1 (
  echo ERROR: Database migration failed. Check your connection string in appsettings.json
  pause
  exit /b 1
)
echo       Done.
echo.

:: ── 2. Start API in background ──────────────────────────
echo [2/3] Starting API server on http://localhost:5100 ...
start "Altus Vera LMS API" /min cmd /c "cd /d "%~dp0src\AltuVera.LMS.API" && dotnet run --urls http://localhost:5100"
timeout /t 3 /nobreak >nul
echo       Done.
echo.

:: ── 3. Start React dev server ───────────────────────────
echo [3/3] Starting React frontend on http://localhost:5101 ...
start "Altus Vera LMS Web" /min cmd /c "cd /d "%~dp0web" && npm run dev"
timeout /t 4 /nobreak >nul
echo       Done.
echo.

:: ── Open browser ────────────────────────────────────────
echo  Opening http://localhost:5101 in your browser...
start "" "http://localhost:5101"
echo.
echo  ======================================================
echo    System is running.
echo    API  : http://localhost:5100
echo    Web  : http://localhost:5101
echo    Login: admin@altusvera.lms  /  Admin@123
echo  ======================================================
echo.
echo  Close this window to keep servers running in background.
echo  To stop: close the "Altus Vera LMS API" and "Altus Vera LMS Web" windows.
echo.
pause
