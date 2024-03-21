import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [username, setUsername] = useState("");
  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.regusername.value;
    const password = event.target.regpassword.value;
    axios
      .post("http://localhost:8000/register", { username, password })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfull");
        } else {
          alert("Failed");
        }
        console.log(response);
      });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.logusername.value;
    const password = event.target.logpassword.value;
    axios
      .post("http://localhost:8000/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfull");
          setUsername(response.data[0]?.username);
        } else {
          alert("Failed");
        }
        console.log(response);
      });
  };

  return (
    <div className="container">
      <h1>{username}</h1>
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            id="regusername"
            placeholder="Username"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            id="regpassword"
            className="input-field"
          />
          <input type="submit" value="Register" className="submit-btn" />
        </form>
      </div>
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            id="logusername"
            placeholder="Username"
            className="input-field"
          />
          <input
            type="password"
            id="logpassword"
            placeholder="Password"
            className="input-field"
          />
          <input type="submit" value="Login" className="submit-btn" />
        </form>
      </div>
    </div>
  );
}

export default App;
