import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const myComponentStyle = {
    padding: '8px',
    width: 'auto',
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
    fontSize: '-0.125rem',
    lineHeight: '1.25rem',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
};


const myBoxStyle = {
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
    padding: '12px',
    borderRadius: '9px',
    marginTop: '12px',
    borderColor: '#536DFE',
    backgroundColor: '#EEF2FF',
    fontFamily: '"JetBrains Mono", monospace',
    boxSizing: 'border-box',
    color: '#536DFE',
    boxShadow: 'rgba(83, 109, 254, 0.2) 0 2px 4px, rgba(83, 109, 254, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
};
export const SignIn = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const toast = useToast()

    const navigate = useNavigate();
    const handleSubmit = () => {

        fetch("http://localhost:3100/login", {
            method: "POST",
            body: JSON.stringify({
                email, password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                console.log(json?.user);
                if (json?.user) {
                    console.log(json?.user, "Yes user");
                    localStorage.setItem("userId", json?.user._id)
                    localStorage.setItem("userid", JSON.stringify(json))
                }
                toast({
                    title: `${json?.message}`,
                    status: 'success',
                    isClosable: true,
                    position: "top-right",
                    duration: 1000,
                });
                if (json?.token) {

                    navigate('/dashboard')
                    window.location.reload();
                }


            }
            );
    }
    return (
        <>
            <div style={{
                background: 'rgb(238, 242, 255)',
                margin: '0px',
                paddingTop: '10px',
                height: '98vh',
            }}>
                <h1 style={{
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    marginTop: '80px',
                    fontSize: 'xx-large',
                }}>Sign In</h1>
                <div style={{ display: "flex", borderStyle: 'dotted', justifyContent: "center", flexDirection: "column", width: "300px", margin: "auto", marginTop: "23px", gap: "25px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px", padding: "22px", borderRadius: "12px" }}>

                    <input
                        style={myComponentStyle}
                        id='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        pattern="[A-Za-z0-9]+"
                        title="Alphanumeric only"
                        required
                        placeholder='Email'
                    />


                    <input
                        style={myComponentStyle}

                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="[A-Za-z0-9]+"

                        required
                    />


                    <button onClick={handleSubmit} style={myBoxStyle} >Submit</button>
                </div >
            </div >
        </>
    )
}
