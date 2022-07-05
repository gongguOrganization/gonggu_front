import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootReducer, { rootSaga } from "./redux/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./redux/scrollTop";

//saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

//store에 mount
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//사가 미들웨어에서 통합 사가 함수를 실행
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
	<ScrollToTop/>
      <App />
    </Provider>
  </BrowserRouter>,
);

reportWebVitals();
