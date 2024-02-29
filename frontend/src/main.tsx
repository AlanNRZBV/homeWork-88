import React from 'react'
import ReactDOM from 'react-dom/client'
import {PersistGate} from "redux-persist/integration/react";
import {RouterProvider} from "react-router-dom";
import {persistor, store} from "./app/store.ts";
import {Provider} from "react-redux";
import {router} from "./router/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PersistGate>
    </React.StrictMode>,
)
