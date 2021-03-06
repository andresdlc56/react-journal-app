import { types } from '../types/types';

const initialState = {
    loading: true,
    msgError: null
}


/*
    REDUCER QUE SE ENCARGA DE MANEJAR EL ERROR 
    EN EL REGISTER
*/


export const uiReducer = (state = { initialState }, action) => {

    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}