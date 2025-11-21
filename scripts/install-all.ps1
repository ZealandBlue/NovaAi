param()

Write-Host "[install-all] Installing root dependencies" -ForegroundColor Cyan
npm install

Write-Host "[install-all] Installing Electron app dependencies" -ForegroundColor Cyan
Push-Location "electron-app"
npm install
Pop-Location

Write-Host "[install-all] Installing backend-node dependencies" -ForegroundColor Cyan
Push-Location "backend-node"
npm install
Pop-Location

Write-Host "[install-all] Installing contracts dependencies" -ForegroundColor Cyan
Push-Location "contracts"
npm install
Pop-Location

Write-Host "[install-all] Setting up Python virtualenv for ml-service" -ForegroundColor Cyan
Push-Location "ml-service"
if (-Not (Test-Path .venv)) {
  python -m venv .venv
}
. .venv/Scripts/Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
deactivate
Pop-Location

Write-Host "[install-all] Done" -ForegroundColor Green
