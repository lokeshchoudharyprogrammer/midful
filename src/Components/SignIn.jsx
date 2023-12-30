import React, { useState } from 'react'

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
                        type="text"
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
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="[A-Za-z0-9]+"

                        required
                    />


                    <button style={myBoxStyle} >Submit</button>
                </div >
            </div >
        </>
    )
}
