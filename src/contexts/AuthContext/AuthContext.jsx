import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

import reducer, { actionTypes, initialState, FAKE_USER } from "./AuthReducer"

const AuthContext = createContext();


function AuthProvider({ children }) {
    const [{ user, isAuthenticated, error }, dispatch] = useReducer(reducer, initialState);

    const dispatchLogout = useCallback(function () { dispatch({ type: actionTypes.LOGOUT }) }, [])
    const dispatchLogin = useCallback(function (payload) { dispatch({ type: actionTypes.LOGIN, payload }) }, [])
    const dispatchInccorectCreds = useCallback(function () { dispatch({ type: actionTypes.INCORRECT_CREDS }) }, [])

    const login = useCallback(function (email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatchLogin(FAKE_USER)
        } else {
            dispatchInccorectCreds()
        }
    }, [dispatchLogin, dispatchInccorectCreds]);

    const value = useMemo(()=>({
        user,
        isAuthenticated,
        login,
        logout: dispatchLogout,
        error
    }),[user, isAuthenticated, dispatchLogout, login, error])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * 
 * @returns {initialState & {login: (email:string,password:string)=>void;logout:()=>{}}}
 */
function useAuth() {
    const authContext = useContext(AuthContext);
    if (authContext === undefined) throw new Error("auth context was accesed outside the scope of AuthContext.Provider");
    return authContext;
}

export { AuthProvider, useAuth }