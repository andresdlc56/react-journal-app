
/* 
    EJEMPLO DE COMO DEBE SER EL STATE DEVUELTO POR ESTE REDUCER

    NOTA: HAY DOS "active" QUE REPRESENTA LA MISMA PROPIEDAD PERO EN ESENARIOS
    DIFERENTES 

    {
         notes: [],
         active: null,
         active: {
             id: 'asbdkjasdbksdb6861',
             title: '',
             body: ''.
             imageUrl: '',
             date: 12345678878
         }
    }

*/

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        default:
            return state;
    }
}