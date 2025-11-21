import axios from 'axios';

const ML_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

interface MlRequest {
  symbol: string;
  timeframe: string;
  mode: string;
  parameters: any;
}

export async function callMlService(body: MlRequest) {
  const res = await axios.post(`${ML_URL}/predict`, body);
  return res.data;
}
