import React, { useState } from "react";

import API from "../services/api";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const handleReset = async () => {

    try {

      const res = await API.put(
        "/auth/reset-password",
        {
          email,
          newPassword
        }
      );

      alert(res.data.message);

    } catch (err) {

      alert(
        err.response?.data?.message
      );

    }

  };

  return (

    <div>

      <h2>Reset Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleReset}>
        Reset Password
      </button>

    </div>

  );

}

export default ForgotPassword;