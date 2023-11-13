import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import {HelmetProvider} from "react-helmet-async";
import './global.css';
import 'normalize.css/normalize.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <App/>
        </HelmetProvider>
    </React.StrictMode>
);
