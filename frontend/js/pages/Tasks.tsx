import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import { TasksService } from '../api';
import { Task } from '../api';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await TasksService.tasksList({ limit: 10, offset: 0 });
      setTasks(response.results);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await TasksService.tasksCreate({
        requestBody: {
          title: newTask.title,
          description: newTask.description,
        },
      });
      setTasks([...tasks, response]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTask) return;
    try {
      const response = await TasksService.tasksUpdate({
        id: editingTask.id,
        requestBody: {
          title: editingTask.title,
          description: editingTask.description,
        },
      });
      const updatedTasks = tasks.map((task) =>
        task.id === response.id ? response : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await TasksService.tasksDestroy({ id: taskId });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setShowModal(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleCreateTask} className="mb-4">
        <Form.Group controlId="formTaskTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTaskDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Task
        </Button>
      </Form>

      <Row>
        {tasks.map((task) => (
          <Col md={4} key={task.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button variant="warning" onClick={() => openEditModal(task)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingTask && (
            <Form onSubmit={handleUpdateTask}>
              <Form.Group controlId="formEditTaskTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task title"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEditTaskDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter task description"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, description: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TasksPage;
