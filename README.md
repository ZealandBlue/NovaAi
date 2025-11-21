# BlockDAG AI Trading Widget DApp

Desktop AI trading widget for a BlockDAG (EVM-compatible DAG chain). This is a **scaffold** project including:

- Electron + React desktop app (trading widget UI)
- Node.js backend (AI orchestration, BlockDAG + DB integration)
- Python ML microservice (pattern prediction + RL hooks)
- Solidity smart contracts (authorization, staking, signatures)
- SQLite database for trade history caching

> NOTE: This is a reference scaffold, not production-ready trading software.

---

## 1. Architecture Overview

```text
+--------------------------------------------------------------+
|                     Desktop (Electron)                       |
|  React UI:                                                  |
|   - Live chart + animated AI cursor                         |
|   - Mode toggles: Autonomous / Simulation / Learning        |
|   - Panels: AI reasoning, market context, trade history     |
+-------------------------|------------------------------------+
                          | (HTTP/WebSocket)
                          v
+--------------------------------------------------------------+
|                    Node Backend (orchestrator)              |
|  - REST API: /predict, /trade, /parameters, /history        |
|  - Manages user sessions & risk parameters                  |
|  - Integrates BlockDAG JSON-RPC (on-chain data & txs)       |
|  - Talks to Python ML service (HTTP)                        |
|  - Persists trades to SQLite                                |
+-------------------------|------------------------------------+
                          | (HTTP)
                          v
+--------------------------------------------------------------+
|                Python ML Microservice                       |
|  - Example LSTM/Transformer-style model stub                |
|  - RL strategy hooks (placeholder)                          |
|  - /predict endpoint returns signals + reasoning            |
+--------------------------------------------------------------+

+--------------------------+    +-----------------------------+
|   BlockDAG L1 Network    |    |  Solidity Smart Contracts   |
|  - JSON-RPC endpoint     |<-->|  - TradingAuthorization     |
|  - Orderbook / on-chain  |    |  - Staking & limits         |
+--------------------------+    +-----------------------------+
```

---

## 2. Repository Layout

```text
ai-trading-widget-dapp/
  README.md
  package.json                # Root helper scripts
  scripts/
    install-all.ps1
    run-all.ps1

  electron-app/               # Electron + React desktop UI
    package.json
    public/
    src/
      index.tsx
      App.tsx
      components/
        TradingChart.tsx
        AiCursorOverlay.tsx
        ModeToggle.tsx
        Panels/
          AiReasoningPanel.tsx
          MarketContextPanel.tsx
          TradeHistoryPanel.tsx
      electron/
        main.ts
        preload.ts
      types/

  backend-node/               # Node backend (orchestrator)
    package.json
    tsconfig.json
    src/
      index.ts
      routes/
        predict.ts
        trade.ts
        parameters.ts
        history.ts
      services/
        blockdagClient.ts
        mlClient.ts
        db.ts
      config/
        index.ts

  ml-service/                 # Python ML microservice
    requirements.txt
    app.py
    model_stub.py
    rl_agent_stub.py

  contracts/                  # Solidity contracts
    hardhat.config.ts
    package.json
    contracts/
      TradingAuthorization.sol
    scripts/
      deploy.ts
```

---

## 3. Prerequisites

- Node.js >= 18
- Python >= 3.10
- npm or yarn
- PowerShell (for provided scripts on Windows)
- SQLite3 (optional CLI; node-sqlite3/`better-sqlite3` is used programmatically)

---

## 4. Installation

From the repository root:

```powershell
# Install everything (frontend, backend, contracts, ML service env)
./scripts/install-all.ps1
```

What this does:

- Installs root dependencies (linting, shared tooling if any)
- Installs Electron+React app dependencies
- Installs Node backend dependencies
- Installs Hardhat + contract deps
- Creates Python virtual environment and installs ML service deps

If you prefer manual steps:

```powershell
# 1) Electron app
cd electron-app
npm install

# 2) Node backend
cd ../backend-node
npm install

# 3) Contracts
cd ../contracts
npm install

# 4) ML service
cd ../ml-service
python -m venv .venv
. .venv/Scripts/Activate.ps1
pip install -r requirements.txt
```

---

## 5. Running the Stack (Dev)

From the repository root:

```powershell
./scripts/run-all.ps1
```

This will start, in order:

- Python ML service (on `http://127.0.0.1:5001`)
- Node backend (on `http://127.0.0.1:4000`)
- Electron+React desktop app

You can also run them manually in separate terminals:

```powershell
# Terminal 1 – ML service
cd ml-service
. .venv/Scripts/Activate.ps1
python app.py

# Terminal 2 – Node backend
cd backend-node
npm run dev

# Terminal 3 – Electron app
cd electron-app
npm run dev
```

---

## 6. Backend API (Scaffold)

Base URL (dev): `http://127.0.0.1:4000`

- `POST /predict`
  - Body: `{ symbol, timeframe, mode, parameters }`
  - Response: `{ signal, confidence, reasoning, suggestedTrade }`
  - Delegates to Python ML service.

- `POST /trade`
  - Body: `{ symbol, side, size, price, mode, userAddress }`
  - Response: `{ status, txHash? }`
  - In **simulation mode**, just records to DB.
  - In **autonomous mode**, prepares transaction payload for BlockDAG.

- `GET /parameters`
  - Response: current risk and mode parameters.

- `POST /parameters`
  - Updates risk/mode parameters.

- `GET /history`
  - Returns cached trades from SQLite.

---

## 7. Python ML Service (Scaffold)

Base URL (dev): `http://127.0.0.1:5001`

Endpoints:

- `POST /predict`
  - Input: `{ symbol, timeframe, history, mode, parameters }`
  - Output: mock prediction structure, e.g.
    ```json
    {
      "signal": "LONG",
      "confidence": 0.73,
      "reasoning": "Detected higher-low pattern and volume expansion.",
      "cursorPath": [
        { "x": 0.1, "y": 0.6 },
        { "x": 0.3, "y": 0.4 },
        { "x": 0.7, "y": 0.3 }
      ],
      "suggestedTrade": {
        "side": "BUY",
        "size": 0.25,
        "stopLoss": 0.97,
        "takeProfit": 1.05
      }
    }
    ```

Inside `model_stub.py` and `rl_agent_stub.py`, there are placeholder classes representing:

- LSTM/Transformer-based pattern model
- Reinforcement-learning agent for strategy adjustment

You can replace these with your real models later.

---

## 8. Solidity Contracts (Scaffold)

The `TradingAuthorization.sol` contract includes:

- Basic user registration/auth (by EVM address)
- Simple staking mechanism
- Per-user trading limits & mode approvals
- Off-chain signature verification hooks (for signed instructions from the desktop app)

Use Hardhat tasks in `contracts/` for deployment to your BlockDAG network or any EVM-compatible testnet.

```bash
cd contracts
npm run compile
npm run deploy -- --network blockdag
```

You must configure your BlockDAG RPC URL and accounts in `hardhat.config.ts`.

---

## 9. BlockDAG RPC Integration

In `backend-node/src/services/blockdagClient.ts` you will find a simple JSON-RPC client wrapper:

- Reads `BLOCKDAG_RPC_URL` from environment
- Exposes helpers for:
  - `getLatestBlock()`
  - `getOrderBook(symbol)` (mock/stub: wrap your real BlockDAG order book API)
  - `sendSignedTransaction(rawTx)`

Wire this into `/trade` to send live transactions when in **autonomous** mode.

---

## 10. Desktop UI Features (Scaffold)

The Electron+React app currently includes:

- Live chart placeholder component (`TradingChart`)
- Animated AI cursor overlay (`AiCursorOverlay`)
  - Consumes `cursorPath` from backend predictions
- Panels for AI reasoning, market context, and trade history
- Mode toggle component (`ModeToggle`) that calls `/parameters` on the backend

You can:

- Replace the chart with a real charting library (e.g., `lightweight-charts` or `recharts`).
- Add WebSocket subscriptions from the backend for streaming predictions.

---

## 11. Environment Configuration

Create `.env` files as needed, for example:

`backend-node/.env`:

```ini
PORT=4000
BLOCKDAG_RPC_URL=https://rpc.blockdag.example
SQLITE_DB_PATH=./data/trades.db
ML_SERVICE_URL=http://127.0.0.1:5001
```

`ml-service/.env` (if desired):

```ini
PORT=5001
MODEL_PATH=./models/sample_model.pt
```

---

## 12. Security & Warnings

- This project is **not** production-ready.
- No real capital should be traded using this scaffold.
- Implement full key management, signing flows, and audits before any real deployment.

---

## 13. Next Steps

- Integrate a real charting library and live market feed.
- Implement actual ML models and RL training loop.
- Flesh out smart contracts for full risk controls and multi-sig approvals.
- Add tests for contracts, backend, and ML logic.
#   N o v a A i  
 #   N o v a A i  
 