import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, useDisclosure, Input, Box, useToast
} from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { CheckIcon, CloseIcon, AddIcon, EmailIcon, PhoneIcon, AtSignIcon, ExternalLinkIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { NotFound } from './NotFound'
export const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [userName, setuserName] = useState()
    const [mobile, setmobile] = useState()
    const [email, setemail] = useState()
    const user = {
        userName, mobile, email
    }
    const dummyData = [
        {
            userName: 'JohnDoe',
            mobile: '123-456-7890',
            email: 'john.doe@example.com',
        },
        {
            userName: 'JaneSmith',
            mobile: '987-654-3210',
            email: 'jane.smith@example.com',
        },
        {
            userName: 'BobJohnson',
            mobile: '555-123-4567',
            email: 'bob.johnson@example.com',
        },
        {
            userName: 'AliceWilliams',
            mobile: '333-555-7777',
            email: 'alice.williams@example.com',
        },
        {
            userName: 'ChrisAnderson',
            mobile: '888-444-2222',
            email: 'chris.anderson@example.com',
        },

    ];

    const [Data, SetData] = useState([])
    const URL = "http://localhost:3100/tasks"

    useEffect(() => {

        fetch(URL).then((res) => {
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
    const handleAdduser = () => {

        fetch("http://localhost:3100/tasks", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res)=>{
           return res.json()
        }).then((res)=>{
            console.log(res)
        })
    }

    return (
        <>
            <Button style={{ float: "right", marginTop: "23px", marginRight: "23px" }} fontFamily={"monospace"} onClick={onOpen}><AddIcon boxSize={5} pr={"7px"} />Add User </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily={"monospace"}>New User Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={3}>
                        {/* Add User Name, Mobile and Email address – Save & Cancel Button */}
                        <Input placeholder='Name' onChange={(e) => setuserName(e.target.value)} type="name" />
                        <br />
                        <br />
                        <Input placeholder='Email' onChange={(e) => setemail(e.target.value)} type="email" />
                        <br />
                        <br />
                        <Input placeholder='Phone Number' onChange={(e) => setmobile(e.target.value)} type="number" />

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleAdduser} colorScheme='teal' variant='outline' mr={"9px"}><CheckIcon boxSize={5} pr={"7px"} /> Save</Button>
                        <Button colorScheme='red' mr={3} onClick={onClose} >
                            <CloseIcon boxSize={5} pr={"7px"} />   Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {Data.length === 0 ? <NotFound /> :

                <Box style={{ margin: "auto", marginTop: "84px", display: "flex", flexWrap: "wrap", gap: "20px", width: "95%", justifyContent: "center" }}>
                    {
                        Data.map((user) => {
                            const { userName, mobile, email, _id } = user

                            return (
                                <>
                                    <div key={userName} style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", padding: "12px", borderRadius: "9px", width: "300px" }}>
                                        <p><AtSignIcon boxSize={5} pr={"7px"} />{userName}</p>
                                        <p><PhoneIcon boxSize={5} pr={"7px"} />{mobile}</p>
                                        <p><EmailIcon boxSize={5} pr={"7px"} /> {email}</p>
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

                                                    handleDeletebtn(_id);
                                                }} />
                                            </p>
                                            <Link to={`/userId/${_id}`}>

                                                <p style={{ fontFamily: "monospace" }}> View Details
                                                    <ExternalLinkIcon boxSize={5} pl={"7px"} />
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )

                        })
                    }
                </Box>

            }
        </>
    )
}
