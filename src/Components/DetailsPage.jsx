import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Style from "../Css/DetalisPage.module.css"
import { EmailIcon, PhoneIcon, AtSignIcon, ExternalLinkIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react';
export const DetailsPage = () => {
    let { UserId } = useParams();
    console.log(UserId)
    const toast = useToast()
    const [Data, SetData] = useState([])

    useEffect(() => {

        fetch(`https://jungle-green-pig-tie.cyclic.app/tasks/${UserId}`).then((res) => {
            return res.json()
        }).then((res) => {
            SetData(res)
        })

    }, [])
    const handleDeletebtn = (id) => {

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },

        }

        fetch(`https://jungle-green-pig-tie.cyclic.app/task/${id}`, deleteMethod)
            .then(response => response.json())
            .then(data => toast({
                title: `${data.message}`,
                status: 'error',
                isClosable: true,
                position: "top-right",
                duration: 1000,
            })

            )
            .catch(error => console.log(error))


    }

    return (
        <div className={Style.container}>
            <div key={Data?.userName} className={Style.boxStyle}>
                <p><AtSignIcon boxSize={5} pr={"7px"} />{Data?.userName}</p>
                <p><PhoneIcon boxSize={5} pr={"7px"} />{Data?.mobile}</p>
                <p><EmailIcon boxSize={5} pr={"7px"} /> {Data?.email}</p>
                
            </div>
        </div>
    )
}
