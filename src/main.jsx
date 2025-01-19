import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { NotificationProvider } from './NotificationContext';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
);
