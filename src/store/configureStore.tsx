import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from "../reducers/index";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export { store };

