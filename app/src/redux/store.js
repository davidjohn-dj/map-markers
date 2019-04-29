import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./index";
import thunk from "redux-thunk";

const store = createStore (
    rootReducer,
    compose (applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => {return f})
);

export default store;