import React, { useState } from 'react';
import './App.css';
import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const addContact = () => {
    if (!editMode) {
      setContacts([...contacts, { name, phone }]);
    } else {
      const newContacts = [...contacts];
      newContacts[editIndex] = { name, phone };
      setContacts(newContacts);
      setEditMode(false);
      setEditIndex(null);
    }
    setName('');
    setPhone('');
  };

  const deleteContact = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const editContact = (index) => {
    setEditMode(true);
    setEditIndex(index);
    const contact = contacts[index];
    setName(contact.name);
    setPhone(contact.phone);
  };

  return (
    <Container className="app-container">
      <Row>
        <Col>
          <h1>Contact App</h1>
        </Col>
      </Row>
      <Row>
        <Col className="add-contact-form">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={handlePhoneChange}
              />
            </Form.Group>

            <Button variant="primary" block onClick={addContact}>
              {editMode ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="contact-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="edit-button"
                      onClick={() => editContact(index)}
                      block
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete-button"
                      onClick={() => deleteContact(index)}
                      block
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;