import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import Flatted, { parse, stringify } from 'flatted'
import createTransform from 'redux-persist/es/createTransform'

const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
)
const persistConfig ={
    key : 'main-root',
    storage,
    stateReconciler: autoMergeLevel2,
    transforms: [transformCircular]
}
const persistedReducer= persistReducer (persistConfig,rootReducer)
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
const Persistor=persistStore(store)
const DataProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate Loading={null} persistor={Persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default DataProvider