import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(
        res.data.message ||
        "Registration successful"
      );

      navigate("/");

    } catch (error) {

      console.log(error);
    
      if (error.response) {
    
        alert(
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message
        );
    
      } else {
    
        alert("Registration failed");
    
      }
    
    }

  };

  return (

    <div>

      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>

  );

}

export default Register;