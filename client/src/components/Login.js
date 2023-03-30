import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/API";
import { toast } from "react-toastify";
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async (username, password) => {
    
        try {
            const response = await API.post('/api/users/login', {
                username,
                password
            });
           
            return response
        } catch (error) {

            throw error
            
        }

    }

    const handleSignIn = async (e) => {
        if (username.trim() && password.trim()) {
            e.preventDefault();
            //👇🏻 triggers a login event
            const response =  await login(username,password);
            console.log(response.data)

            if(response.status === 200){
                // console.log(response.data)
                toast.success(response.data.message);
                setPassword("");
                setUsername("");
                //👇🏻 Saves the user's id and email to local storage for easy identification & for making authorized requests
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("myEmail", response.data.email);
                    navigate("/photos");
                
            } else{
                
                toast.error(response);
               
            }
            
           

            
           
        }
    };

    useEffect(() => {
        function authenticateUser() {
            const id = localStorage.getItem("id");
            /*
            👇🏻 If ID is false, redirects the user to the login page
            */
           if (id) {
                navigate("photos");
            } 
        }
        authenticateUser();

    }, [])

    // useEffect(() => {
    //     socket.on("loginSuccess", (data) => {
    //         toast.success(data.message);
    //         //👇🏻 Saves the user's id and email to local storage for easy identification & for making authorized requests
    //         localStorage.setItem("_id", data.data._id);
    //         localStorage.setItem("_myEmail", data.data._email);
    //         //👇🏻 Redirects the user to the Photos component
    //         navigate("/photos");
    //     });
    //     //👇🏻 Notifies the user of the error message
    //     socket.on("loginError", (error) => {
    //         toast.error(error);
    //     });
    // }, [socket, navigate]);


    return (
        <div className='login'>
            <h2 style={{ marginBottom: "30px" }}>Login</h2>
            <form className='login__form' method='POST' onSubmit={handleSignIn}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    className='input'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    className='input'
                    name='password'
                    id='password'
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>LOG IN</button>
                <p style={{ textAlign: "center" }}>
                    Don't have an account?{" "}
                    <Link className='link' to='/register'>
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;