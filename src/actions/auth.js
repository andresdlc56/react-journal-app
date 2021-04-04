import { types } from "../types/types";


/*===================LIBRERIAS DE TERCEROS=======================================  */
    //autentificacion con firebase
    import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';

    //libreria para las alertas
    import Swal from 'sweetalert2'
/*================FIN LIBRERIAS DE TERCEROS======================================  */


/* =========================ACIONES USADAS POR EL DISPATCH======================== */
    import { uiStartLoading, uiFinishLoading } from "./ui";
/* ======================FIN ACIONES USADAS POR EL DISPATCH======================== */


/* 
    NOTA: LAS ACCIONES ASYNC DEBEN PASAR POR UN MIDDLEWARE
    ANTES DE SER DESPACHADAS AL REDUCER
*/


/*=================ACCIONES ASINCRONAS========================================*/

/* DEFINIENDO QUE MANEJA EL INICIO DE SESION CLASICO */
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        
        dispatch(uiStartLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName));
                
                
                dispatch(uiFinishLoading());
            })
            .catch((e) => {
                console.log(e);
                dispatch(uiFinishLoading());

                //EJECUTANDO EL MENSAJE DE ERROR
                Swal.fire('Error', e.message, 'error');
            });

    }
}

/* DEFINIENDO MIDDLEWARE PARA REGISTRAR USUARIO LOCAL EN FIREBASE */
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                /* DEBIDO A QUE EL OBJETO RESULTANTE DE ESTO NO RETORNA UN displayName
                LO CREARE YO MISMO */
                await user.updateProfile({ displayName: name })

                //ACA SE PUEDEN EJECUTAR MULTIPLES dispatch
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                console.log(e);

                //EJECUTANDO EL MENSAJE DE ERROR
                Swal.fire('Error', e.message, 'error');
            })
    }
}



/* DEFINIENDO EL MIDDLEWARE QUE MANEJARA LA ACCION DE LOGEO CON GOOGLE ASYNC */
export const startGooglelogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}

/* DEFINIENDO EL MIDDLEWARE QUE MANEJARA LA ACCION DE LOGOUT CON FIREBASE (ASYNC) */
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        //EJECUTANDO LA ACCION QUE VA A BORRAR EL "uid y displayName" DE MI STORE
        dispatch(logout());
    }
}
/*=================FIN ACCIONES ASINCRONAS======================================*/



/*=====================ACCIONES SINCRONAS============================= */
    export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
    });


    // ACCION QUE SE ENCARGA DE BORRAR EL "uid y displayName" DE MI STORE
    export const logout = () => ({
        type: types.logout
    });
/*===================FIN ACCIONES SINCRONAS============================= */