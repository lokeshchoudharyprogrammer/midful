import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, useDisclosure, Input, Box, useToast, Divider, VStack, Select
} from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { CheckIcon, CloseIcon, AddIcon, EmailIcon, PhoneIcon, AtSignIcon, ExternalLinkIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { NotFound } from './NotFound'
import axios from 'axios'
import Style from "../Css/Dashboard.module.css"

export const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [userName, setuserName] = useState()
    const [mobile, setmobile] = useState()
    const [email, setemail] = useState()
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('lastInserted');
    const [searchBy, setSearchBy] = useState('userName');
    const [searchTerm, setSearchTerm] = useState('');
    const userId = localStorage.getItem("userId")
    const taskModalDisclosure = useDisclosure();
    const [editedTask, setEditedTask] = useState("");
    const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [editedTaskIndex, setEditedTaskIndex] = useState(null)
    const user = {
        userName, mobile, email, userId
    }




    const URL = 'http://localhost:3100/tasks'


    const [Data, SetData] = useState([])

    useEffect(() => {


        Fetch()

    }, [sort, searchBy, searchTerm])

    const Fetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3100/tasks`, {
                params: { sort, searchBy, searchTerm, userId },
            });
            SetData(response.data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };


    const updateFilter = () => {

        Fetch();
    };
    const handleDeletebtn = (id) => {

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }

        }


        fetch(URL + `${id}`, deleteMethod)
            .then(response => response.json())
            .then(data => toast({
                title: `${data.message}`,
                status: 'error',
                isClosable: true,
                position: "top-right",
                duration: 1000,
            }),

                Fetch()
            )
            .catch(error => console.log(error))



    }
    const handleAdduser = () => {
        console.log(user)

        fetch("http://localhost:3100/tasks", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            return res.json()
        }).then((res) => {
            toast({
                title: `New User Added`,
                status: 'success',
                isClosable: true,
                position: "top-right",
                duration: 1000,
            })
            Fetch()

        })
    }
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const [editedUser, setEditedUser] = useState({});


    const handleEdit = (user) => {
        setEditedUser(user);
        onEditModalOpen();
    };

    const handleSaveChanges = () => {
        // Add logic to save changes to the server
        onEditModalClose();
        console.log(editedUser)
        updateData(editedUser, editedUser._d)
    };

    const updateData = async (updatedUserData) => {
        console.log(updatedUserData)
        const url = `http://localhost:3100/tasks/${updatedUserData._id}`;

        try {
            const response = await fetch(url, {
                method: 'PATCH', // Use PATCH for update requests
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify(updatedUserData), // Convert the data to JSON format
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle the response as needed
            const responseData = await response.json();
            if (responseData) {

            }
            window.location.reload()
        } catch (error) {
            console.error('Error during update:', error.message);
            // Handle errors as needed
        }
    };

    const handleDelete = (id) => {

        const deleteMethod = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }

        }


        fetch(URL + `/${id}`, deleteMethod)
            .then(response => response.json())
            .then(data => toast({
                title: `${data.message}`,
                status: 'error',
                isClosable: true,
                position: "top-right",
                duration: 1000,
            }),

                Fetch(),
                window.location.reload()
            )
            .catch(error => console.log(error))


    };

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Button className={Style.AddUserbtn} onClick={onOpen}><AddIcon boxSize={5} pr={"7px"} />Add User </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily={"monospace"}>New User Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={3}>

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

            <VStack spacing={4} align="stretch" p={4}>
                <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="lastInserted">Last Inserted</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="lastModified">Last Modified</option>
                </Select>

                <Select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="userName">userName</option>
                    <option value="mobile">Mobile</option>
                    <option value="email">Email</option>
                </Select>

                <Input type="text" value={searchTerm} placeholder={`Search By ${searchBy}`} onChange={(e) => setSearchTerm(e.target.value)} />

                <Button colorScheme="teal" onClick={updateFilter}>
                    Apply Filter
                </Button>




            </VStack>


            <Modal isOpen={taskModalDisclosure.isOpen} onClose={taskModalDisclosure.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Reusing the same input fields as in the User Data Modal */}
                        <Input placeholder='Name' value={editedTask} onChange={(e) => setEditedTask(e.target.value)} type="name" />
                        <br />
                        <br />
                        <Input placeholder='Email' value={editedTask} onChange={(e) => setEditedTask(e.target.value)} type="email" />
                        <br />
                        <br />
                        <Input placeholder='Phone Number' value={editedTask} onChange={(e) => setEditedTask(e.target.value)} type="number" />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                        <Button colorScheme="gray" ml={3} onClick={taskModalDisclosure.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {Data.length !== 0 ? (
                <Box className={Style.container}>
                    {Data.map((user) => {
                        const { userName, mobile, email, _id } = user;

                        return (
                            <div key={_id} className={Style.boxStyle}>
                                <p>
                                    <AtSignIcon boxSize={5} pr={"7px"} />
                                    {userName}
                                </p>
                                <p>
                                    <PhoneIcon boxSize={5} pr={"7px"} />
                                    {mobile}
                                </p>
                                <p>
                                    <EmailIcon boxSize={5} pr={"7px"} /> {email}
                                </p>
                                <div className={Style.flexContainer}>
                                    <p className={Style.flexContainerBox}>
                                        <EditIcon onClick={() => handleEdit(user)} />
                                        <DeleteIcon onClick={() => handleDelete(user._id)} />
                                    </p>
                                    <Link to={`/userId/${_id}`}>
                                        <p style={{ fontFamily: "monospace" }}>
                                            View Details <ExternalLinkIcon boxSize={5} pl={"7px"} />
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit User</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input
                                    placeholder="Edit User Name"
                                    value={editedUser.userName}
                                    onChange={(e) => setEditedUser({ ...editedUser, userName: e.target.value })}
                                />
                                <Input
                                    placeholder="Edit Mobile"
                                    value={editedUser.mobile}
                                    onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
                                />
                                <Input
                                    placeholder="Edit Email"
                                    value={editedUser.email}
                                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                                <Button colorScheme="gray" ml={3} onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            ) : (
                <NotFound />
            )}
        </>
    )
}
