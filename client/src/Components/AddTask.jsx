import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createTask } from "../Redux/Slices/TaskSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createTask(task));
    navigate("/");
  };
  return (
    <>
      <h1 className="text-center mt-2">AddTask</h1>
      <div className="container">
        <div className="row justify-content-center p-5">
          <div className="col-md-6 bg-light ">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Enter Title"
                  onChange={handleChange}
                  value={task.title}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  placeholder="Enter Description"
                  onChange={handleChange}
                  value={task.description}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-secondary">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
