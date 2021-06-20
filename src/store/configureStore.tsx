import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from "../reducers/index";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();

// This is for redux devtool extension
//const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

// Redux: Store
const store = createStore(
    rootReducer,
    //composeEnhancers(applyMiddleware(sagaMiddleware))
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export { store };

