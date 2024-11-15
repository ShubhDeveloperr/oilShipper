// import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";


// const AuthContext = createContext({
//   token: null as string | null,
//   isLoggedIn: false,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   loginState: (token: string) => {},
//   logout: () => {},
// });

// interface MyComponentProps {
//   children: ReactNode; 
// }

// const AuthProvider : React.FC<MyComponentProps>  = ({ children }) => {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);
  
//   console.log("Token in AuthProvider:", token);

//   const loginState = (newToken: string) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, isLoggedIn: !!token, loginState , logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;

import React, { createContext, ReactNode, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store"; 
import { logout, setToken } from "../store/authSlice";

interface AuthContextType {
  token: string | null;
  isLoggedIn: boolean;
  loginState: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: false,
  loginState: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  // Access token and isAuthenticated from Redux
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  console.log("Token in AuthProvider from Redux store:", token);

  const loginState = (newToken: string) => {
    dispatch(setToken(newToken));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: isAuthenticated, loginState, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
