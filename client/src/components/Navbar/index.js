import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../SignUp/index';
import LoginForm from '../Login/index';
import ReviewForm from '../ReviewForm/index';

import Auth from '../../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
          <Nav.Link as={Link} to='/'>
            <FontAwesomeIcon
              icon='cube'
              size='2x'
            />
          </Nav.Link>
            <Nav className='ml-auto'>
              
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/Profile'>My Bloc Dashboard</Nav.Link>
                  <Nav.Link onClick={() => setShowReviewModal(true)}>Add Review</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowLoginModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Login / Sign Up Modal */}
      <Modal
        size='lg'
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowLoginModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowLoginModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      {/* Add Review Modal */}
      <Modal
        size='lg'
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              Add Review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm handleModalClose={() => setShowReviewModal(false)} />
          </Modal.Body>
        </Tab.Container>
      </Modal>    
    </>
  );
};

export default AppNavbar;
