
import { types } from "../types/types"

/*
    REDUCER QUE SE ENCARGA DEl MANEJO DE LAS ACCIONES
    PARA LA AUTENTIFICACION
*/

// REDUCER PARA LA AUTENTIFICACION
export const authReducer = (state = {}, action) => {
    
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
            
        case types.logout:
            return {  }
    
        default:
            return state;
    }
}