import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/rootReducer.js";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { mainSaga } from "./mainSaga.js";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "handleCartItem",
    "AuthReducerData",
    "OrderReducerData",
    "iconId",
    "updateProfileReducerData",
    "dashboardReducerData",
  ], // Persist only 'handleCartItem' reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [sagaMiddleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(mainSaga);
