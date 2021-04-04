import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";


/* ----------------------IMPORTANDO CONFIGURACION DE FIREBASE--------------- */
  import { firebase } from '../firebase/firebaseConfig';
/* ------------------FIN IMPORTANDO CONFIGURACION DE FIREBASE--------------- */


/*---------------------ACCIONES------------------------------------ */
    import { login } from '../actions/auth';
    import { startLoadingNotes } from '../actions/notes';
/*---------------------FIN ACCIONES--------------------------------- */


/*---------------------COMPONENTES------------------------------------ */
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
/*---------------------FIN COMPONENTES--------------------------------- */


export const AppRouter = () => {

    /* NOTA: ESTA APP SIEMPRE EMPIEZA CON LA BANDERA O ESTADO "checking" EN TRUE
    DESPUES QUE SE EJECUTA LA FUNCION DE FIREBASE CONTENIDA EN EL useEffect, ESTA EVALUA SI 
    HAY UN USUARIO AUTENTICADO O NO Y LUEGO CAMBIA LA BANDERA "checking" A FALSE 
    
    ESTA BANDERA (checking) ES USADA PARA MEJORAR LA EXPERIENCIA DEL USUARIO
    */


    const dispatch = useDispatch();

    /* ESTADO QUE SERA USADO COMO BANDERA PARA SABER SI
    LA APP ESTA ESPERANDO LA RESPUESTA DE LA API "FIREBASE" */
    const [checking, setChecking] = useState(true);


    /* ESTADO QUE SERA USADO COMO BANDERA PARA SABER SI
    EL USUARIO ESTA AUTENTICADO O NO */
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    //  ESTE EFECTO SE VA A EJECUTAR CADA VEZ QUE CAMBIE EL "dispatch" o "setChecking"
    //  NOTA: dispatch y checking solo cambian la primera vez q es renderizado el componente
    useEffect(() => {
        
        //EFECTO O FUNCION QUE VA ESTAR ESCUCHANDO SI EL USUARIO ESTA AUTENTICADO O NO
        /* ES UNA FUNCION ASINCRONA QUE TARDA UN POCO EN RESPONDER DEBIDO A Q HACE CONSULTAS 
        A FIREBASE */
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user?.uid) {
                //SI ENTRA AQUI QUIERE DECIR QUE EL USUARIO ESTA LOGEADO CORRECTAMENTE
                // POR LO TANTO SE DEBE CAMBIAR EL VALOR DE LA BANDERA "isLoggedIn" A TRUE

                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                /*EJECUTANDO ACCION PARA INICIAR LA CARGA DE LAS NOTAS PERTENECIENTES 
                AL USUARIO AUTENTICADO */
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn(false);
            }

            /* AQUI YA SE SABE OBTUVO UNA RESPUESTA DE FIREBASE, 
            POR LO TANTO SE DEBE CAMBIAR EL VALOR DE LA BANDERA "checking" */
            setChecking(false)
        });
    }, [ dispatch, setChecking, setIsLoggedIn ]);


    //CONDIFICIONAL QUE SE VA A EJECUTAR MIENTRAS "checking" ESTE EN TRUE
    if(checking) {

        // AQUI SE PUEDE PONER UN COMPONENTE MAS BONITO PARA MANEJAR EL ESPERE
        return (
            <h1>Espere...</h1>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                        path="/auth"
                    />

                    <PrivateRoute 
                        path="/" 
                        component={ JournalScreen }
                        isAuthenticated={ isLoggedIn }
                        exact
                    />                    
                </Switch>
            </div>
        </Router>
    )
}
