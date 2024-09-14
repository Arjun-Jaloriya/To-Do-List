import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteTask,
  fetchTask,
  updateTaskStatus,
} from "../Redux/Slices/TaskSlice";
import axios from "axios";

const Tasks = () => {
  const dispatch = useDispatch();
  const { task, loading, error } = useSelector((store) => store.task);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask({ id }));
  };

  const handleStatusChange = (id, isCompleted) => {
    axios
      .patch(`http://localhost:5000/api/task/${id}/status`, {
        isCompleted: !isCompleted,
      })
      .then((response) => {
        toast.success("Task status updated");
        dispatch(fetchTask()); 
      })
      .catch((error) => {
        toast.error("Failed to update task status");
      });
  };

  return (
    <>
      <h1 className="text-center mt-2">TO-DO LIST</h1>
      <div className="container">
        <div className="row justify-content-center align-items-center p-5">
          <div className="col-md-8 bg-light ">
            <Link to={"/create"} className="btn btn-primary m-1">
              Add Task
            </Link>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Actions</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {task?.map((tasks, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{tasks?.title}</td>
                      <td>{tasks?.description}</td>
                      <td>
                        <Link
                          to={`/update/${tasks._id}`}
                          className="btn btn-dark me-2"
                          disabled={tasks.isCompleted}
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={() => handleDelete(tasks._id)}
                          className="btn btn-danger me-2"
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={tasks.isCompleted}
                            disabled={tasks.isCompleted} // Disable checkbox if already completed
                            onChange={() =>
                              handleStatusChange(tasks._id, tasks.isCompleted)
                            } // Call handleStatusChange on checkbox change
                          />
                          <label className="form-check-label">
                            {tasks.isCompleted ? "Completed" : "Pending"}
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
