import React from 'react';
import { useSelector } from 'react-redux';


import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {


    //EXTRAER UN STATE DESDE EL STORE DE LA APP
    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-context">
            
            <Sidebar />

            <main>
                {
                    /* SI ACTIVE TIENE ALGO MUESTRA <NoteScreen /> 
                    SINO MUESTRA <NothingSelected />*/
                    (active)
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }    
            </main>
        </div>
    )
}
