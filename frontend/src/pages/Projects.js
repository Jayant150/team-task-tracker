import Navbar from "../components/Navbar";
import React,
{
  useState,
  useEffect
}
from "react";

import API from "../services/api";

function Projects() {

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [projects,
    setProjects] =
    useState([]);

  const [editId,
    setEditId] =
    useState(null);


  const fetchProjects =
    async () => {

      const res =
        await API.get(
          "/projects"
        );

      setProjects(res.data);

    };


  useEffect(() => {

    fetchProjects();

  }, []);


  const createProject =
    async () => {

      if (editId) {

        await API.put(
          `/projects/${editId}`,
          {
            name,
            description
          }
        );

        setEditId(null);

      } else {

        await API.post(
          "/projects",
          {
            name,
            description
          }
        );

      }

      setName("");

      setDescription("");

      fetchProjects();

    };


  const deleteProject =
    async (id) => {

      await API.delete(
        `/projects/${id}`
      );

      fetchProjects();

    };


  return (

    <div>
<Navbar />
      <h1>Projects</h1>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <br /><br />

      <button
        onClick={createProject}
      >

        {editId
          ?
          "Update Project"
          :
          "Create Project"}

      </button>

      <hr />

      {projects.map((project) => (

        <div
          key={project._id}
          style={{
            border:
              "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{project.name}</h3>

          <p>
            {project.description}
          </p>

          <button
            onClick={() => {

              setName(
                project.name
              );

              setDescription(
                project.description
              );

              setEditId(
                project._id
              );

            }}
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() =>
              deleteProject(
                project._id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default Projects;