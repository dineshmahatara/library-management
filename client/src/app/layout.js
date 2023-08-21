
'use client'
import './globals.css';
import { persistor, store } from './redux/store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import Header from './components/Header';
import Sidebar from './components/Sidebar';


export default function RootLayout({ 
  children,
}) {
  return (
    <html lang="en">
      <head>
        {/* Other head elements */}
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <div className="h-screen flex flex-row justify-start">
            <Sidebar />
            <div style={{ flex: '1' }}> {/* Make Main take up remaining width */}
                <Header />
                <>{children}</>

            </div>

        </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}