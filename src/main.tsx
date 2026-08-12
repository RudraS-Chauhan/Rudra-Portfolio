import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Handle harmless WebSocket disconnect unhandled rejections cleanly in dev mode
if (typeof window !== 'undefined') {
  const isWsError = (msg: string) =>
    msg.includes('WebSocket') ||
    msg.includes('websocket') ||
    msg.includes('closed without opened') ||
    msg.includes('vite: connecting');

  window.addEventListener('unhandledrejection', (event) => {
    const reasonMsg = String(event?.reason?.message || event?.reason || '');
    if (isWsError(reasonMsg)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const errorMsg = String(event?.message || event?.error || '');
    if (isWsError(errorMsg)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
