import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import App4 from "./App4";
import * as serviceWorker from './serviceWorker';

const msg = "React\nRedux\nMongoDB\nNodeJs\nMobx";
ReactDOM.render(
  <React.StrictMode>
    {/*<App name={"홍길동"} sex={"남자"} age={"30"}/>*/}
    {/*<App msg = {msg} />*/}
    <App4 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
