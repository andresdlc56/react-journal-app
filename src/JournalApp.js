import React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

/* ------------------------------------------------- 
    DE ESTA MANERA EL "store" YA ESTA DISPONIBLE 
    PARA TODA LA APP

    ASI SE TRABAJA CON REDUX
-------------------------------------------------- */


export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
