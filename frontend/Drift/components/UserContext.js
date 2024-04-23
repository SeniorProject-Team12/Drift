import { create } from 'zustand';
  
// Create your store, which includes both state and (optionally) actions
const useUserStore = create((set) => ({
    userID: "1",
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    updateUserID: (userID) => set(() => ({ userID: userID })),
    updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
    updateLastName: (lastName) => set(() => ({ lastName: lastName })),
    updateUsername: (username) => set(() => ({ username: username })),
    updateEmail: (email) => set(() => ({ email: email })),
    clearUserInfo: () => set(() => ({ userID: 0, firstName: '', lastName: '', username: '', email: '' }))
}))

export default useUserStore;
