import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import { InputText } from './App';
import { InputeSelectBox } from './App';
import { InputRadio }from './App';
import { InputCheckBox } from './App';
import { SampleComponent, SampleComponent2 } from './App';
//import {Timer} from '.App';
import { SampleComponent1, CountResult, Counter, Button, Counter2, Counter3 } from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InputText />
    <InputeSelectBox />
    <InputRadio />
    <InputCheckBox />
    <SampleComponent/>
    <SampleComponent1 />
    <CountResult/>
    <Counter/>
    <Button/>
    <Counter2/>
    <Counter3/>
    <SampleComponent2/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
