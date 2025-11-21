import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('aiWidget', {
  // Placeholder for future IPC calls (e.g. to Node backend)
});
