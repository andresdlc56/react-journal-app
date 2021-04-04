import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    //TRAER LA NOTA ACTIVA DESDE EL STORE
    const { active: note } = useSelector(state => state.notes);

    //CUSTON HOOK PARA FORMULARIOS
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { title, body } = formValues;

    //GUARDANDO REFERENCIA DE EL ID DE LA NOTA
    const activeId = useRef(note.id)

    //EJECUTAR LO SIGUIENTE CADA VEZ QUE "note" o "reset" CAMBIEN
    useEffect(() => {
        if(note.id !== activeId.current){

            /*CADA VEZ QUE "note.id" SEA DISTINTA QUE LA REFERENCIA, SE RESETEA EL FORMULARIO
            CON LOS VALORES DE LA NOTA SELECCIONADA */
            reset(note);
            activeId.current = note.id
        }
    }, [note, reset])
    

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea 
                    placeholder="What happend today"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url)
                        &&
                            <div className="notes__image">
                                <img 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExtoLVhMIfPRj_8d5RQKF2qjwUbuYL2tZTg&usqp=CAU" 
                                    alt="imagen"/>
                            </div>
                }
            </div>
        </div>
    )
}
