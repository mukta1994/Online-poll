import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import myApp from './Reducers';
import {Provider} from 'react-redux'
//  import * as serviceWorker from './serviceWorker';


 let store = createStore(myApp);

 function render() {
  ReactDOM.render(
    <Provider store={store}>
    <div>
    <React.StrictMode> 
      <App store={store}/>
      
      <hr />
      </React.StrictMode>

    </div>,
   </Provider>,
    document.getElementById('root')
  );
}


store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
