import { HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from 'antd';
import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { appTheme } from './AppTheme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/http.api';
import './App.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HelmetProvider>
          <ConfigProvider theme={appTheme}>
            <AppRouter />
          </ConfigProvider>
        </HelmetProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
