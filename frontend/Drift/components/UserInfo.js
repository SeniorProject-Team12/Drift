import React, { createContext, useState, useEffect, useContext, useReducer } from 'react';

const UserContext = createContext();

export const useUserInfo = () => useContext(UserContext);

const userInfoReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_USER_INFO':
            return {
                ...state,
                userID: action.userID,
                firstName: action.fName, 
                lastName: action.lName,
                username: action.username
            };
        case 'CLEAR_USER_INFO':
            return {
                ...state,
                userID: '',
                firstName: '',
                lastName: '',
                username: ''
            };
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [state, assign] = useReducer(userInfoReducer, {userID: '', firstName: '', lastName: '', username: '' });
//   const [userID, setUserID] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');

//   const globalValues = {
//     clearUserContext,
//     setUserID,
//     userID,
//     setFirstName,
//     firstName,
//     setLastName,
//     lastName,
//     setEmail,
//     email,
//     setUsername,
//     username
//   };

  return (
    <UserContext.Provider value={{ userInfo: state, assign }}>
      {children}
    </UserContext.Provider>
  );
};

// past work
export var profile = { fName: "", lName: "", username: "", email: "" };

export function clearProfile() {
    profile["fName"] = "";
    profile["lName"] = "";
    profile["email"] = "";
    profile["email"] = "";
}