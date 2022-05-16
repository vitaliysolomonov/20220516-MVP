import {useState} from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Login = ({setUser}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const submitPassword = async (e) => {
        e.preventDefault();
        const {data} = await axios.post(`${process.env.REACT_APP_API}/user/find`,
            {
                "userName": userName,
                "password": password
            });
        setUserName('');
        setPassword('');
        if (data.name) {
            setIsWrongPassword(false);
            setUser(data);
        } else {
            setIsWrongPassword(true);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    mb:0,
                    p:2,
                    pb: 4,
                    width: "100%"
                },
            }}
        >
            <Paper elevation={3} >
            <div className="login-wrapper">
                <h3>Please Log In</h3>
                <form onSubmit={(e) => submitPassword(e)}>
                    <label htmlFor={"userName"}>
                        <input className={"log"}
                            placeholder={"Username..."}
                            htmlFor={"userName"}
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}/>
                    </label>
                    <br/>
                    <label htmlFor={"password"}>
                        <input className={"log"}
                            placeholder={"Password..."}
                            htmlFor={"password"}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </label>

                    <div align={"right"}>
                    <button
                        className={"login"}
                        type="submit"
                        onClick={(e) => submitPassword(e)}
                    > Login </button>
                    </div>

                </form>
            </div>
            {isWrongPassword ?
                <p className={"wrongPass"}>Wrong username or password</p>
                :
                <></>}
        </Paper>
        </Box>
    )
}
export default Login;