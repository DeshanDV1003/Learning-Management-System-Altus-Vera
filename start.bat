@echo off
echo Starting Altus Vera LMS...

start "LMS API" cmd /k "cd src\AltuVera.LMS.API && dotnet run"
timeout /t 3 /nobreak >nul
start "LMS Web" cmd /k "cd web && npm run dev"

echo Both servers started.
echo API: http://localhost:5000
echo Web: http://localhost:5173
