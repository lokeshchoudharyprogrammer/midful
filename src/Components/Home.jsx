import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {

    return (
        <div style={{ background: "#2dd463", height: "100vh" }}>


            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center" }}>

                    <h1 style={{
                        color: "white",
                        fontSize: '24px',
                        
                        fontFamily: 'monospace',
                    }} className="text-center mt-5">Welcome to our Connectify Hub !</h1>
                    <img src='https://www.masaischool.com/images/new-homepage/yellow-vector.svg' alt='under-line' width="auto" />
                </div>
                <Link to="/sign-up">
                    <button style={{
                        padding: "11px 32px 14px 35px",
                        borderRadius: "6px",
                        border: "none",
                        boxShadow: "rgb(0 0 0) 0px 10px 15px -3px, rgb(0 0 0) 0px 4px 6px -2px",
                        fontFamily: "monospace",
                        background: "black",
                        color: "white",
                        fontSize: "larger"
                    }}>Get Start !</button></Link>
            </div>

            <div>
                <p style={{
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: 'medium'
                }}>Assignment provided by Mindful Gurukul</p>
            </div>
        </div>
    )
}
