/* CONFIGURAION NECESARIA PARA QUE EL STORE TRABAJE CON ACCIONES ASYNC */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/*   
    EN ESTE ARCHIVO STORE.JS VAN A PIVOTEAR TODOS LOS REDUCER PARA 
    LUEGO PONERLOS A DISPOSICION DE TODA LA APP
*/
import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

/* CONFIGURAION NECESARIA PARA QUE EL STORE TRABAJE CON ACCIONES ASYNC */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// PRACTICAMENTE ESTE SERA MI STORE
//  AQUI SE GUARDAN TODOS LOS REDUCERS QUE SE VAN USAR EN ESTA APP
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);