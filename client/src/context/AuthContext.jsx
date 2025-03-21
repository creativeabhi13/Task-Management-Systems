// import React, { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);  // Loading state for initialization
//   const [emailToken, setEmailToken] = useState(null);  // For signup/reset password

//   useEffect(() => {
//     // // Retrieve user data and tokens from localStorage on initial load
//     // const storedData = JSON.parse(localStorage.getItem("user_data"));
//     // const storedEmailToken = localStorage.getItem("email_token");

//     // if (storedData) {
//     //   const { userToken, user } = storedData;
//     //   setToken(userToken);
//     //   setUserData(user);
//     //   setIsAuthenticated(true);
//     // }

//     // if (storedEmailToken) {
//     //   setEmailToken(storedEmailToken);
//     // }

//     // setLoading(false);  // Authentication check is complete
//     const storedData = localStorage.getItem("user_data");
//   const storedEmailToken = localStorage.getItem("email_token");

//   if (storedData) {
//     try {
//       const parsedData = JSON.parse(storedData); // Parse user data from localStorage
//       const { userToken, user } = parsedData;
//       setToken(userToken);
//       setUserData(user);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error('Error parsing user data from localStorage', error);
//     }
//   }
//   }, []);


  

//   // Login function - stores userToken and user data in localStorage
//   const login = (newToken, newUserData) => {
//     localStorage.setItem("user_data", JSON.stringify({ userToken: newToken, user: newUserData }));
//     setToken(newToken);
//     setUserData(newUserData);
//     setIsAuthenticated(true);
//   };

//   // Signup function - stores emailToken in localStorage
//   const signup = (newEmailToken) => {
//     localStorage.setItem("email_token", newEmailToken);
//     setEmailToken(newEmailToken);
//   };

//   // Reset password function - stores new emailToken in localStorage
//   const resetPassword = (newEmailToken) => {
//     localStorage.setItem("email_token", newEmailToken);
//     setEmailToken(newEmailToken);
//   };

//   // Logout function - clears both user and email tokens from localStorage
//   const logout = () => {
//     localStorage.removeItem("user_data");
//     localStorage.removeItem("email_token");
//     setToken(null);
//     setUserData(null);
//     setIsAuthenticated(false);
//     setEmailToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         userData,
//         token,
//         isAuthenticated,
//         login,          // For handling login
//         signup,         // For handling signup
//         resetPassword,  // For handling reset password
//         logout,         // For handling logout
//         loading,        // Loading state until authentication check completes
//         emailToken,     // For signup/reset password verification
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use authentication context in other components
// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for initialization
  const [emailToken, setEmailToken] = useState(null);  // For signup/reset password

  useEffect(() => {
    // Retrieve user data and tokens from localStorage on initial load
    const storedData = localStorage.getItem("user_data");
    const storedEmailToken = localStorage.getItem("email_token");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData); // Parse user data from localStorage
        const { userToken, user } = parsedData;
        setToken(userToken);
        setUserData(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    }

    if (storedEmailToken) {
      setEmailToken(storedEmailToken);
    }

    setLoading(false); // Authentication check is complete
  }, []);

  // Login function - stores userToken and user data in localStorage
  const login = (newToken, newUserData) => {
    const userDataToStore = { userToken: newToken, user: newUserData };
    localStorage.setItem("user_data", JSON.stringify(userDataToStore)); // Save user data as string
    setToken(newToken);
    setUserData(newUserData);
    setIsAuthenticated(true);
  };

  // Signup function - stores emailToken in localStorage
  const signup = (newEmailToken) => {
    localStorage.setItem("email_token", newEmailToken);
    setEmailToken(newEmailToken);
  };

  // Reset password function - stores new emailToken in localStorage
  const resetPassword = (newEmailToken) => {
    localStorage.setItem("email_token", newEmailToken);
    setEmailToken(newEmailToken);
  };

  // Logout function - clears both user and email tokens from localStorage
  const logout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("email_token");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    setEmailToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        token,
        isAuthenticated,
        login,          // For handling login
        signup,         // For handling signup
        resetPassword,  // For handling reset password
        logout,         // For handling logout
        loading,        // Loading state until authentication check completes
        emailToken,     // For signup/reset password verification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context in other components
export const useAuth = () => useContext(AuthContext);
