import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserData";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Profile() {
  let { token } = useContext(UserContext);

  const navigate = useNavigate();

  console.log(token);

  let [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    async function getUserData() {
      if (token.refresh_token != null)
        {
         let res = await axios.get("http://localhost:8000/api/auth/userDetails", 
          {
          "headers": {
          "Authorization": `Bearer ${token.refresh_token}`,
            },
         });
        setUser(res.data);

      }
    }
    console.log(user)
    getUserData();
  }, []);

  return (
    <div>
      <center>
        <h1>Hello By Profile</h1>
        {
          user.name != "" && (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <img src={user.avatar} alt="avatar" />
              <button onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate("/auth");
              }} >Logout</button>
            </div>
          )
        }
      
      </center>
    </div>
  );
}
