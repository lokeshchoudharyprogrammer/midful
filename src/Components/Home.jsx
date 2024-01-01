import React from 'react'
import { Link } from 'react-router-dom'
import Style from "../Css/Home.module.css"
export const Home = () => {

    return (
        <div className={Style.backgroundContainer}>
            <div className={Style.flexContainer}>
                <div className={Style.columnContainer}>
                    <h1 className={Style.textStyles}>Welcome to our Connectify Hub !</h1>
                    <img src='https://www.masaischool.com/images/new-homepage/yellow-vector.svg' alt='under-line' width="auto" />
                </div>
                <Link to="/sign-up">
                    <button className={Style.buttonStyles}>Get Start !</button></Link>
            </div>
            <div>
                <p className={Style.centerText}>Assignment provided by Mindful Gurukul</p>
            </div>
        </div>
    )
}
