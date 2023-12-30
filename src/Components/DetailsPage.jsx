import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { CheckIcon, CloseIcon, AddIcon, EmailIcon, PhoneIcon, AtSignIcon, ExternalLinkIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react';
export const DetailsPage = () => {
    let { UserId } = useParams();
    console.log(UserId)
    const toast = useToast()
    const [Data, SetData] = useState([])

    useEffect(() => {

        fetch(`http://localhost:3100/tasks/${UserId}`).then((res) => {
            return res.json()
        }).then((res) => {
            SetData(res)
        })

    }, [])
    const handleDeletebtn = (id) => {

        const deleteMethod = {
            method: 'DELETE', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },

        }

        console.log(id)
        fetch(URL + `/${id}`, deleteMethod)
            .then(response => response.json()) // parses JSON response into an object
            .then(data => toast({
                title: `${data.message}`,
                status: 'error',
                isClosable: true,
                position: "top-right",
                duration: 1000,
            })

            )
            .catch(error => console.log(error)) // logs the error to the console


    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div key={Data?.userName} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", padding: "12px", borderRadius: "9px", width: "300px" }}>
                <p><AtSignIcon boxSize={5} pr={"7px"} />{Data?.userName}</p>
                <p><PhoneIcon boxSize={5} pr={"7px"} />{Data?.mobile}</p>
                <p><EmailIcon boxSize={5} pr={"7px"} /> {Data?.email}</p>
                <div style={{
                    display: 'flex',
                    marginTop: '12px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <p style={{ display: "flex", gap: "12px" }}>
                        <EditIcon />
                        <DeleteIcon onClick={() => {

                            handleDeletebtn(Data?._id)
                        }} />
                    </p>

                </div>
            </div>
        </div>
    )
}
