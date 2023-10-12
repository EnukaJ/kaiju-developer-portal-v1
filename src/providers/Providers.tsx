'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import AuthProvider from './AuthProvider';
import { persistStore } from 'redux-persist';

persistStore(store);

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default Providers;
