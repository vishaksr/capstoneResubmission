import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
const Header = () => {
    const [loginuser, setLoginUser] = useState('')
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setLoginUser(user)
        }
    }, [])
    // console.log(loginuser);
    return (
        <div>
            <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <Link
                            to="/"
                            className='navbar-brand'
                        >
                            APP
                        </Link>
                    </Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
                    {/* <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                        </Nav> */}
                    <Form className="d-flex">
                        <div className=' text-primary py-2 px-3 me-4'>
                            {loginuser && loginuser.name}
                        </div>
                        <Link
                            to='/login'
                            className='nav-link active text-white font-weight-bold bg-danger py-2 px-3 rounded'
                            onClick={() => {
                                localStorage.removeItem('user')
                            }}
                        >
                            LogOut
                        </Link>


                    </Form>
                    {/* </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
