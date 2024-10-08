import React, { useState } from 'react';
import { Container, Row, Col, Tab, ListGroup, Form, Button } from 'react-bootstrap';
import { todoItems } from '../todoItems'; // Ensure this has at least 4 items

function getColorVariant(dueDate) {
    const daysRemaining = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));

    if (daysRemaining > 7) {
        return 'primary'; // More than 7 days away
    } else if (daysRemaining > 4) {
        return 'success'; // Between 5 to 7 days
    } else if (daysRemaining > 2) {
        return 'warning'; // Between 3 to 4 days
    } else {
        return 'danger'; // 2 days or less
    }
}

function TodoList() {
    const [todos, setTodos] = useState(todoItems);
    const [newTodo, setNewTodo] = useState({ title: '', dueDate: '' });
    const [activeTab, setActiveTab] = useState(`#todo0`);

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.title && newTodo.dueDate) {
            const updatedTodos = [...todos, { ...newTodo, description: 'New task' }];
            setTodos(updatedTodos);
            setNewTodo({ title: '', dueDate: '' });
            setActiveTab(`#todo${updatedTodos.length - 1}`); // Set the new todo as active
        }
    };

    return (
        <Container>
            <h1>Assignment 2: Qubaisuddin Mohammed's ToDoList</h1>

            <Row>
                {/* Form column */}
                <Col sm={3}>
                    <Form onSubmit={handleAddTodo} className="p-3 bg-success bg-opacity-25 text-dark">
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add todo item"
                                value={newTodo.title}
                                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newTodo.dueDate}
                                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">Add Todo</Button>
                    </Form>
                </Col>

                {/* Tabs column */}
                <Col sm={3}>
                    <ListGroup role="tablist"> {/* Ensuring the role is set */}
                        {todos.map((item, index) => (
                            <ListGroup.Item
                                key={index}
                                eventKey={`#todo${index}`}
                                variant={getColorVariant(item.dueDate)}
                                action
                                onClick={() => setActiveTab(`#todo${index}`)}
                                className={`list-group-item-${getColorVariant(item.dueDate)}`} // Add class for test validation
                                role="tab" // Each item has the correct role
                                href={`#todo${index}`} // Use href to link to the corresponding Tab.Pane
                                data-due-date={item.dueDate} // Store due date for test validation
                            >
                                {item.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                {/* Descriptions column */}
                <Col sm={6}>
                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Tab.Content>
                            {todos.map((item, index) => (
                                <Tab.Pane key={index} eventKey={`#todo${index}`} role="tabpanel"> {/* Each panel has the correct role */}
                                    <h5>Description:</h5>
                                    <p contentEditable>{item.description}</p>
                                    <h5>Due Date:</h5>
                                    <input type="date" defaultValue={item.dueDate} />
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
}

export default TodoList;
