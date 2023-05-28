import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar bg='primary' expand='md'>
            <Container>
                <Navbar.Brand href='/'>Navbar Brand</Navbar.Brand>
                <Navbar.Toggle area-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/test'>Test</Nav.Link>
                        <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                            <NavDropdown.Item href='/uni/itu'>ITU</NavDropdown.Item>
                            <NavDropdown.Item href='/uni/dtu'>DTU</NavDropdown.Item>
                            <NavDropdown.Item href='/uni/cbs'>CBS</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href='/'>Home</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
