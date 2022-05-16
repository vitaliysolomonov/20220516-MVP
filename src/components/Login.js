import {useState} from "react";
import axios from "axios";

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
        <>
            <div className="login-wrapper">
                <h3>Please Log In</h3>
                <form onSubmit={(e) => submitPassword(e)}>
                    <label htmlFor={"userName"}>
                        Username:
                        <br/>
                        <input
                            htmlFor={"userName"}
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}/>
                    </label><br/><br/>
                    <label htmlFor={"password"}>
                        Password:
                        <br/>
                        <input
                            htmlFor={"password"}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <br/>
                    <button
                        type="submit"
                        onClick={(e) => submitPassword(e)}
                    >
                        Login
                    </button>


                </form>
            </div>
            {isWrongPassword ?
                <p className={"wrongPass"}>Wrong username or password</p>
                :
                <></>}
        </>
    )
}
export default Login;