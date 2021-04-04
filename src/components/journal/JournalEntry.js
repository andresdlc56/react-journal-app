import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
    
    //DANDOLE FORMATO A LA FECHA DE CREACION DE LA NOTA (parte 1)
    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(
            activeNote(id, {
                date, title, body, url
            })
        );
    }


    return (
        <div 
            className="journal__entry pointer" 
            onClick={ handleEntryClick }
        >
            {
                //SI EL URL EXISTE MOSTRAR EL SIGUIENTE BLOQUE
                (url) 
                    &&
                        <div
                            className="journal__entry-picture"
                            style={{
                                backgroundSizes: 'cover',
                                backgroundImage: `url(${ url })`
                            }}
                        ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>

                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                { /* DANDOLE FORMATO FINAL A LAS FECHAS */ }
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
