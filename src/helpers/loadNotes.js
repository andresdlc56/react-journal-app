import { db } from "../firebase/firebaseConfig"

//FUNCION NECESARIA PARA TRAER LAS NOTAS DE UN USUARIO DESDE LA DB
export const loadNotes = async (uid) => {

    //OBTENIENDO TODAS LAS NOTAS DEL USUARIO x MEDIO DE SU "uid"
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    
    //ARREGLO DONDE VOY A GUARDAR TODAS LAS NOTAS 
    const notes = [];

    //BARRIENDO Y GUARDANDO CADA NOTA OBTENIDA EN EL ARRAY "notes"
    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    console.log(notes);

    return notes;
}