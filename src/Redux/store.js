import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";

import { composeWithDevTools } from '@redux-devtools/extension';
import { reducer } from "./Reducers/main.reducer";
const rootReducer = combineReducers({
    reducer
});

export const store = legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
