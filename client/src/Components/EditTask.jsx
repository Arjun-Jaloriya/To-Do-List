import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../Redux/Slices/TaskSlice";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { task } = useSelector((store) => store.task);

  const [data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    const oldtask = task.find((t) => t._id === id); // Strict equality check
    if (oldtask) {
      setData({
        title: oldtask.title,
        description: oldtask.description,
      });
    }
  }, [task, id]); // Dependency array ensures the effect runs when task is updated

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, description } = data;
    dispatch(updateTask({ id, title, description }));
    navigate("/");
  };

  return (
    <>
      <h1 className="text-center mt-2">Update Task</h1>
      <div className="container">
        <div className="row justify-content-center p-5">
          <div className="col-md-6 bg-light ">
            <Form onSubmit={handleUpdate}>
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
                  value={data.title}
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
                  value={data.description}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-secondary">
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
