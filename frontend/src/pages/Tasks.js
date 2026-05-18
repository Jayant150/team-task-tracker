import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/tasks.css";
import React, { useState, useEffect } from "react";
import API from "../services/api";

function Tasks() {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch tasks");

    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch projects");

    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await API.get("/users");

      setUsers(res.data);

    } catch (err) {

      console.log(err);

      toast.error("Failed to fetch users");

    }
  };

  // CREATE OR UPDATE TASK
  const createTask = async () => {

    try {

      if (editId) {

        await API.put(
          `/tasks/${editId}`,
          {
            title,
            status,
            priority,
            dueDate,
            project,
            assignedTo
          }
        );

        toast.success("Task Updated");

        setEditId(null);

      } else {

        await API.post(
          "/tasks",
          {
            title,
            status,
            priority,
            dueDate,
            project,
            assignedTo
          }
        );

        toast.success("Task Created");

      }

      setTitle("");
      setStatus("Todo");
      setPriority("Low");
      setDueDate("");
      setProject("");
      setAssignedTo("");

      fetchTasks();

    } catch (err) {

      console.log(err);

      toast.error("Task operation failed");

    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

      toast.error("Task Deleted");

    } catch (err) {

      console.log(err);

      toast.error("Delete failed");

    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchTasks();

    fetchProjects();

    fetchUsers();

  }, []);

  // SEARCH + FILTER
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      task.status === filterStatus;

    return matchesSearch && matchesStatus;

  });

  return (

    <div className="container">

      <Navbar />

      <h1 className="heading">
        Tasks
      </h1>

      {/* SEARCH */}
      <input
        className="input"
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* FILTER */}
      <select
        className="select"
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value)
        }
      >

        <option>All</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>

      </select>

      {/* TITLE */}
      <input
        className="input"
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      {/* STATUS */}
      <select
        className="select"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >

        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>

      </select>

      {/* PRIORITY */}
      <select
        className="select"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >

        <option>Low</option>
        <option>Medium</option>
        <option>High</option>

      </select>

      {/* DUE DATE */}
      <input
        className="input"
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      {/* PROJECT */}
      <select
        className="select"
        value={project}
        onChange={(e) =>
          setProject(e.target.value)
        }
      >

        <option value="">
          Select Project
        </option>

        {projects.map((p) => (

          <option
            key={p._id}
            value={p._id}
          >
            {p.name}
          </option>

        ))}

      </select>

      {/* ASSIGN USER */}
      <select
        className="select"
        value={assignedTo}
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
      >

        <option value="">
          Assign User
        </option>

        {users.map((u) => (

          <option
            key={u._id}
            value={u._id}
          >
            {u.name}
          </option>

        ))}

      </select>

      {/* BUTTON */}
      <button
        className="button"
        onClick={createTask}
      >

        {editId
          ? "Update Task"
          : "Create Task"}

      </button>

      <hr />

      {/* TASK LIST */}
      {filteredTasks.map((task) => (

        <div
          key={task._id}
          className="task-card"
        >

          <h3>{task.title}</h3>

          <p>
            Status: {task.status}
          </p>

          <p>
            Priority: {task.priority}
          </p>

          <p>
            Project:
            {" "}
            {
              task.project
                ? task.project.name
                : "No Project"
            }
          </p>

          <p>
            Assigned To:
            {" "}
            {
              task.assignedTo
                ? task.assignedTo.name
                : "Nobody"
            }
          </p>

          <p>
            Due Date:
            {" "}
            {
              task.dueDate
                ? new Date(
                    task.dueDate
                  ).toLocaleDateString()
                : "No date"
            }
          </p>

          {/* EDIT */}
          <button
            className="button"
            onClick={() => {

              setTitle(task.title);

              setStatus(task.status);

              setPriority(task.priority);

              setDueDate(task.dueDate);

              setProject(
                task.project
                  ? task.project._id
                  : ""
              );

              setAssignedTo(
                task.assignedTo
                  ? task.assignedTo._id
                  : ""
              );

              setEditId(task._id);

            }}
          >
            Edit
          </button>

          {" "}

          {/* DELETE */}
          <button
            className="button"
            onClick={() =>
              deleteTask(task._id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default Tasks;