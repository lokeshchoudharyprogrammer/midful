import React from 'react'
import {
    Box, Flex, Spacer,
    Text,
    ButtonGroup, Button, MenuButton, Menu, MenuList, MenuItem
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'

import { Link } from 'react-router-dom';
export const Navbar = () => {
    const handleclick = () => {
        localStorage.clear();
        window.location.reload()
    }
    return (
        <>
            <Box bg="#2dd463" p={3} style={{
                alignItems: "center", justifyContent: "center", borderRadius: "3px", borderBottom: '2px solid',
                borderStyle: 'dashed', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", textAlign: 'center',
                position: 'sticky',
                top: '0',
                zIndex: '100',
            }}>
                <Flex align="center" width="90%">
                    <Box
                        mt={{ base: 0, md: 0 }}
                        display={{ base: 'flex', md: 'flex' }}
                        alignItems="center"
                        justify="space-between"
                    >
                        <Link to='/'>


                            <Text fontSize="xl" fontWeight="bold" color="white" style={{ fontFamily: "none", fontSize: "xx-large" }}>
                                ConnectifyHub
                            </Text>
                        </Link>
                    </Box>
                    <Spacer />

                    <Spacer />
                    <Box
                        mt={{ base: 0, md: 0 }}
                        display={{ base: 'flex', md: 'flex' }}
                        alignItems="center"
                        justify="space-between"
                    >

                        {/* Dropdown menu */}
                        <Menu>
                            <MenuButton
                                as={HamburgerIcon}
                                icon={<ChevronDownIcon />}
                                variant="ghost"
                                color="black"
                                ml={4}
                                style={{ fontSize: "26px" }}
                            />
                            <MenuList>

                                <MenuItem>
                                    <ButtonGroup gap='2'>
                                        <Link to='/sign-up'>
                                            <Button onClick={() => window.alert("This Is Sign Up")} style={{ background: "#2dd463", border: "none", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} colorScheme='black'>Sign Up</Button>
                                        </Link>
                                        <Link to='/login'>

                                            <Button onClick={() => window.alert("This Is Login ")} colorScheme='black' style={{ background: "#2dd463", border: "none", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}>Log in</Button>
                                        </Link>
                                        <br />
                                        <br />

                                        <Button onClick={handleclick} colorScheme='black' style={{ background: "#2dd463", border: "none", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}>Log Out</Button>

                                    </ButtonGroup>

                                </MenuItem>

                                {/* Add more menu items as needed */}
                            </MenuList>
                        </Menu>
                    </Box>

                </Flex>
            </Box>
        </>
    )
}
