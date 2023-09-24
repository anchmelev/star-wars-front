import { HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from 'antd';
import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { appTheme } from './AppTheme';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ConfigProvider theme={appTheme}>
          <AppRouter />
        </ConfigProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
