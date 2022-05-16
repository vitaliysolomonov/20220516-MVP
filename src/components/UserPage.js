import axios from "axios";
import {useEffect, useState} from "react";

const UserPage = ({user, setUser}) => {
    const [email,setEmail]=useState('');
    const [mailEntry,setMailEntry]=useState({});

    const findMailEntry =async()=>{
        const {data} = await axios.post(`${process.env.REACT_APP_API}/mail/find`,{"name": user.name, "unit": user.unit});
        setMailEntry(data);
    }

    useEffect(()=>{
        findMailEntry();
    },[]);

    return (
        <>
           <br/>
            <p>{user.name}, you {mailEntry ?
                <span>have mail at Mail Room.<br/>It was received on {mailEntry.date}.</span>
                :
                <span>do not have mail at Mail Room.</span>}
            </p>
            <br/>
            <br/>
            <label htmlFor={"emailSignUp"}>Sign up for email notifications</label><br/>
            <input name={"emailSignUp"}
                   value={email}
                   placeholder={"your email..."}
                   onChange={(e)=>setEmail(e.target.value)}/>
            <button>Sign Up</button>
            <br/><br/>

            <div className={"footer"}>
                <div><h4 style={{textAlign: "center"}}>Hours of Operation:</h4></div>
                <div>Mon,Thu: 13:00-16:00</div>
                <div>Tue,Wed,Fri: 9:30-11:30, 13:00-16:00</div>
            <br/>
                <div>Location: 11250 SSG Sims Street, Battalion S1</div>
            </div>
        </>
    );
}
export default UserPage;
