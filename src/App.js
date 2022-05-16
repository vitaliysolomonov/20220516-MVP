import './App.css';

import {BrowserRouter, Router, Switch, Routes, Route, Navigate} from "react-router-dom";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";

import Login from "./components/Login";
import useUser from "./functions/useUser";
import GroupPage from "./components/GroupPage";
import * as React from 'react';
import TopBar from "./components/TopBar";


function App() {

    const {user, setUser} = useUser();


    if (!user) {
        return (
            <>
                <TopBar user={user} setUser={setUser}/>
                <Login setUser={setUser}/>
            </>
        )

    } else if (user.access === "admin") {
        return (
            <div className="App">
                <TopBar user={user} setUser={setUser}/>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/*"}
                               element={<Navigate replace to={"/admin"}/>}/>

                        <Route
                            path={"/admin"}
                            element={<AdminPage

                                setUser={setUser}/>}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    } else if (user.access === "user") {
        return (
            <div className="App">
                <TopBar user={user} setUser={setUser}/>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/*"}
                               element={<Navigate replace to={"/"}/>}/>

                        <Route
                            path={"/"}
                            element={<UserPage user={user} setUser={setUser}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    } else if (user.access === "HHC"
        || user.access === "A Co"
        || user.access === "B Co"
        || user.access === "C Co") {
        return (
            <div className="App">
                <TopBar user={user} setUser={setUser}/>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/*"}
                               element={<Navigate replace to={"/group"}/>}/>
                        <Route
                            path={"/group"}
                            element={<GroupPage user={user} setUser={setUser}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );

    } else
        return (
            <>
                <TopBar user={user} setUser={setUser}/>
                <Login setUser={setUser}/>
            </>
        );
}

export default App;
