import React, { useContext } from 'react'

const AuthContext = React.createContext()

export function AuthService({ children, value }) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthValue() {
    return useContext(AuthContext)
}

/* Retrieve current user object by: const {currentUser} = useAuthValue() */