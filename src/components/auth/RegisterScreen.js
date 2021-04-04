import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; //libreria necesaria para poder usar el dispatch
import { Link } from 'react-router-dom';


/* =========================ACIONES USADAS POR EL DISPATCH======================== */
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
/* ======================FIN ACIONES USADAS POR EL DISPATCH======================== */


/*-----------------------CUSTOM HOOK------------------ */
import { useForm } from '../../hooks/useForm';
/*--------------------FIN CUSTOM HOOK------------------ */


/*---------------LIBRERIAS DE TERCEROS-----------------*/
import validator from 'validator'; //maneja validaciones en formularios
/*---------------FIN LIBRERIAS DE TERCEROS---------------*/

export const RegisterScreen = () => {

    const dispatch = useDispatch();


    /* CAPTURANDO LA PROPIEDAD "msgError" DEL STATE PRODUCIDO X EL REDUX */
    const { msgError } = useSelector(state => state.ui);


    /* EJECUTANDO CUSTOM HOOK PARA EL MANEJO DE FORMULARIOS */   
    const [formValues, handleInputChange] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    /* MANEJADOR DEL FORMULARIO DE REGISTRO DE USUARIOS */
    const handleRegister = (e) => {
        e.preventDefault();
        
        /* LLAMANDO LAS REGLAS DE VALIDACION DEL FORMULARIO */
        if(isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    /* DEFINIENDO LAS REGLAS DE VALIDACION DE FORMULARIO */
    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(setError('Name is Required'));
            return false;
        } else if(!validator.isEmail(email)) {
            dispatch(setError('Email is Invalid'));
            return false;
        } else if(password !== password2 || password < 5) {
            dispatch(setError('Error en el Password'));
            return false;
        }

        //SINO TODOS LOS VALORES SON VALIDOS
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            {
                //SI "msgError" ES DIFERENTE DE null, MUESTRA EL MENSAJE DE ERROR
                msgError &&
                (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                )
            }

            <form onSubmit={ handleRegister }>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already Register?
                </Link>
            </form>
        </>
    )
}
