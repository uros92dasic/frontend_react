import React, { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // const {data} = await axios.post("login", {
        await axios.post("login", {
            email,
            password
        }) //, {withCredentials: true} - for cookies from the back to the front

        // console.log(data)
        setRedirect(true);
    }

    if(redirect){
        return <Navigate replace to={'/'}/>
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Login</h1>

                <input type="email" className="form-control" placeholder="name@example.com" required
                    onChange={e => setEmail(e.target.value)}
                />
                    
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    );
}

export default Login;