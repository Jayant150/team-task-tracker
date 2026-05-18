import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

  const fetchTasks =
    async () => {

      const res =
        await API.get("/tasks");

      setTasks(res.data);

    };

  useEffect(() => {

    fetchTasks();

  }, []);

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      (task) =>
        task.status === "Done"
    ).length;

  const overdue =
    tasks.filter((task) => {

      return (
        task.dueDate &&
        new Date(task.dueDate)
        < new Date() &&
        task.status !== "Done"
      );

    }).length;

  return (

    <div>

      <Navbar />

      <div
        style={{
          padding: "20px"
        }}
      >

        <h1>
          Dashboard
        </h1>

        <h2>
          Total Tasks:
          {" "}
          {total}
        </h2>

        <h2>
          Completed Tasks:
          {" "}
          {completed}
        </h2>

        <h2>
          Overdue Tasks:
          {" "}
          {overdue}
        </h2>

      </div>

    </div>

  );

}

export default Dashboard;