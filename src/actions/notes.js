import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


/*==================ACCIONES ASYNC==================== */

    // ACCION PARA CARGAR UNA NUEVA NOTA A FIRESTORE
    export const startNewNote = () => {
        return async (dispatch, getState) => {

            /* OBTENIENDO TODO EL STATE ALMACENADO EN EL STORE */
            const uid = getState().auth.uid;
            

            //DEFINIENDO LA ESTRUCTURA INICIAL DE LA NUEVA NOTA
            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
            }

            //GRABANDO NUEVA NOTA EN FIRESTORE
            const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);

            dispatch(activeNote(doc.id, newNote))
        }
    }


    export const startLoadingNotes = (uid) => {
        return async(dispatch) => {

            //USANDO HELPER PARA OBTENER LAS "notes" DEL USUARIO AUTENTICADO
            const notes = await loadNotes(uid);

            //EJECUTANDO LA ACCION "setNotes" PARA CARGAR LAS NOTAS OBTENIDAS AL STORE
            dispatch(setNotes(notes))
        }
    }

/*===============FIN ACCIONES ASYNC==================== */


/*==================ACCIONES SICRONAS==================== */
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id, 
        ...note
    }
});


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});
/*===============FIN ACCIONES SICRONAS==================== */