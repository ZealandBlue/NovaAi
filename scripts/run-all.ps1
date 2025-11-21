param()

$ErrorActionPreference = "Stop"

Write-Host "[run-all] Starting ML service" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit","-Command","cd `"$PSScriptRoot/../ml-service`"; . .venv/Scripts/Activate.ps1; python app.py" | Out-Null

Start-Sleep -Seconds 5

Write-Host "[run-all] Starting backend-node" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit","-Command","cd `"$PSScriptRoot/../backend-node`"; npm run dev" | Out-Null

Start-Sleep -Seconds 5

Write-Host "[run-all] Starting electron-app" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit","-Command","cd `"$PSScriptRoot/../electron-app`"; npm run dev" | Out-Null

Write-Host "[run-all] All services started (check separate terminals)." -ForegroundColor Green
