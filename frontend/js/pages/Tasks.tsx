import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { TasksService } from '../api';
import { Task } from '../api';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskValues, setEditingTaskValues] = useState({ title: '', description: '' });
  const [showCreateForm, setShowCreateForm] = useState(false);

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
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId: number) => {
    try {
      const response = await TasksService.tasksUpdate({
        id: taskId,
        requestBody: {
          title: editingTaskValues.title,
          description: editingTaskValues.description,
        },
      });
      const updatedTasks = tasks.map((task) =>
        task.id === response.id ? response : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
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

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskValues({ title: task.title, description: task.description });
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskValues({ title: '', description: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingTaskValues({ ...editingTaskValues, [name]: value });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <Row>
        {tasks.map((task) => (
          <Col md={4} key={task.id} className="mb-4">
            <Card className="position-relative" style={{ minHeight: '10em' }}>
              <Button
                variant="link"
                className="position-absolute top-0 end-0 m-2 p-0 text-dark"
                onClick={() => handleDeleteTask(task.id)}
                style={{ fontSize: '1.5rem', lineHeight: '1' }}
              >
                &times;
              </Button>
              <Card.Body>
                {editingTaskId === task.id ? (
                  <>
                    <Form.Group controlId={`formEditTaskTitle-${task.id}`}>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={editingTaskValues.title}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId={`formEditTaskDescription-${task.id}`} className="mt-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={editingTaskValues.description}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      className="mt-3 me-2"
                      onClick={() => handleUpdateTask(task.id)}
                    >
                      Save
                    </Button>
                    <Button variant="secondary" className="mt-3" onClick={cancelEditingTask}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <Button variant="warning" onClick={() => startEditingTask(task)} className="me-2">
                      Edit
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}

        <Col md={4} className="mb-4">
          {showCreateForm ? (
            <Card>
              <Card.Body>
                <Form onSubmit={handleCreateTask}>
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
                  <Button variant="secondary" className="mt-3 ms-2" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Card onClick={() => setShowCreateForm(true)} className="d-flex align-items-center justify-content-center" style={{ minHeight: '10em', cursor: 'pointer' }}>
              <Card.Body className="text-center">
                <h1>+</h1>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TasksPage;
