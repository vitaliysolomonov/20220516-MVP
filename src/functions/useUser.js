import {useState} from "react";

export default function useUser(){
    const getUser = () => {
        const userString = localStorage.getItem('userString');
        const user = JSON.parse(userString);
        return user;
    };

    const[user,setUser] = useState(getUser());

    const saveUser = (userToSave) => {
        localStorage.setItem('userString', JSON.stringify(userToSave));
        setUser(userToSave);
    };

    return {
        setUser: saveUser,
        user
    }
}
