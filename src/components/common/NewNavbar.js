import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {Link} from "react-router-dom";
import { isAuthenticated } from "../api/authenticationApi"


const NewNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Namkeen Bytes</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {
              isAuthenticated()?<><NavItem><NavLink tag={Link} to="/checkout">Checkout</NavLink></NavItem></>:<></>
            }
            {
              isAuthenticated()?<></>:<><NavItem><NavLink tag={Link} to="/login">Login</NavLink></NavItem></>
            }
            {
              isAuthenticated()?<></>:<><NavItem><NavLink tag={Link} to="/signup">Signup</NavLink></NavItem></>
            }
            {
              isAuthenticated()?<><NavItem><NavLink tag={Link} to="/logout">Logout</NavLink></NavItem></>:<></>
            }
            {/* <NavItem> */}
              {/* <NavLink href="https://github.com/reactstrap/reactstrap"></NavLink> */}
              {/* <NavLink tag={Link} to="/test">Test</NavLink> */}
              {/* <Link to="/test">Test</Link> */}
            {/* </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NewNavbar;