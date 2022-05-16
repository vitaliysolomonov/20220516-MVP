import {useEffect, useState} from "react";
import axios from "axios";

import GroupMailEntry from "./GroupMailEntry";
import TopBar from "./TopBar";
import * as React from "react";

const GroupPage = ({user, setUser}) => {

    const [groupMail, setGroupMail] = useState([]);
    const getGroupMail = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/mail/${user.access}`);
        setGroupMail(data);
    };

    useEffect(() => {
        getGroupMail();
    });

    return (
        <div className="App">
            <TopBar user={user} setUser={setUser}/>
            {groupMail ?
                <div>
                    <p>{user.name}, the following <strong>{user.access}</strong> Soldiers have mail:</p>
                    <table rules={"rows"} className={"list"}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>#Days at Mail Room</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupMail.map((entry) => <GroupMailEntry
                            entry={entry}
                            key={entry.id}
                        />)}
                        </tbody>
                    </table>
                </div>
                :
                <p>{user.name}, {user.unit} Soldiers do not have mail.</p>
            }

        </div>
    );
}
export default GroupPage;

