import axios from 'axios';

const RPC_URL = process.env.BLOCKDAG_RPC_URL || 'http://127.0.0.1:8545';

let idCounter = 0;

async function rpc(method: string, params: any[] = []) {
  const id = ++idCounter;
  const res = await axios.post(RPC_URL, {
    jsonrpc: '2.0',
    id,
    method,
    params,
  });
  if (res.data.error) throw new Error(res.data.error.message || 'RPC error');
  return res.data.result;
}

export async function getLatestBlock() {
  return rpc('eth_getBlockByNumber', ['latest', false]);
}

export async function sendRawTransaction(rawTx: string) {
  return rpc('eth_sendRawTransaction', [rawTx]);
}

export async function sendAutonomousTrade(args: {
  symbol: string;
  side: string;
  size: number;
  price: number;
  userAddress: string;
}) {
  console.log('[blockdag] autonomous trade stub', args);
  const dummyRawTx = '0x';
  const txHash = await sendRawTransaction(dummyRawTx).catch(() => '0x-simulated');
  return { txHash };
}
