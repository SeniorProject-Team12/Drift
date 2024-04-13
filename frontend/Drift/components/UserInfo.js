import { create } from 'zustand';

export const UseUserStore = create((set) => ({
    userFirstName: '',
    userLastName: '',
    username: '',
    email: '',
    setInfo: (fName, lName, user, email) => set({userFirstName: fName, userLastName: lName, username: user, email: email }),
    setLastName: (value) => set({userFirstName: value}),
    setUsername: (value) => set({userFirstName: value}),

    clear: () => set({userFirstName: '', userLastName: '', username: '', email: ''}),
}));

export var profile = { fName: "", lName: "", username: "", email: "" };

export function clearProfile() {
    profile["fName"] = "";
    profile["lName"] = "";
    profile["email"] = "";
    profile["email"] = "";
}
