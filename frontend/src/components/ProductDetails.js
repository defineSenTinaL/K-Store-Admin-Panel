import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default class ProductDetails extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/basicDetails"}>Basic Details</Nav.Link>
            <Nav.Link as={Link} to={"/fullDetails"}>Full Details</Nav.Link>
            <Nav.Link as={Link} to={"/images"}>Images</Nav.Link>
            <Nav.Link as={Link} to={"/description"}>Description</Nav.Link>
            <Nav.Link as={Link} to={"/keyword"}>Keywords</Nav.Link>
            <Nav.Link as={Link} to={"/moreDetails"}>More Details</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
    </Navbar>
      </div>
      <div>
      <Routes>
          <Route path="/basicDetails">
            <BasicDetails />
          </Route>
          <Route path="/fullDetails">
            <FullDetails />
          </Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/description">
            <Description />
          </Route><Route path="/keyword">
            <Keyword />
          </Route><Route path="/moreDetails">
            <MoreDetails />
          </Route>
        </Routes>
      </div>
      </Router>
    )
  }
}

function BasicDetails() {
  return <h2>Basic Details</h2>;
}

function FullDetails() {
  return <h2>FulDetails</h2>;
}

function Images() {
  return <h2>Images</h2>;
}
function Description() {
  return <h2>Description</h2>;
}
function Keyword() {
  return <h2>Keyword</h2>;
}
function MoreDetails() {
  return <h2>MoreDetail</h2>;
}