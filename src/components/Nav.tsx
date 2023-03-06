import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = () => {
    const [user, setUser] = useState(new User());
    // {
    //     firstName: '',
    //     lastName: '',
    //     email: ''
    // });

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('user'); //, {withCredentials: true} - for cookie authentication

                setUser(new User(
                    data.id,
                    data.firstName,
                    data.lastName,
                    data.email,
                    data.role
                ));
                // setUser(data); this wont work since we are using user model now
            }
        )(); //anonymous function, same as: 'const getUser = async () => { ... }' and than calling it with 'getUser();' 
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }

    return (
        <>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/#">Company name</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                <Link to="/profile" className="nav-link px-3 text-decoration-none">{user.name}</Link>
                {/* {user?.firstName} {user?.lastName} = {user.name} */}
                <Link to="/login" className="nav-link px-3 text-decoration-none"
                    onClick={logout}
                >Sign out</Link>
                </div>
            </div>
        </header>
        </>
    );
}

export default Nav;