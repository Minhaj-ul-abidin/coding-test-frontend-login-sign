import "./App.css";
import { useState } from "react";


import { getSigner } from "./utils";
import axios from "axios";
function App() {
  const [authorized, setAuthorized] = useState(false);
  const [authResponse, setAuthResponse] = useState("");
  //
  const login = async () => {
    console.log("Clicked");
    const res = await axios.get("http://localhost:8888/token");
    const mess = res.data;
    console.log(mess);
    const signer = await getSigner();
    const rawSignature = await signer.signMessage(`${mess}`);
    const userAddr = await signer.getAddress();

    const response = await axios.post("http://localhost:8888/auth", {
      address: userAddr,
      signature: rawSignature,
      nonce: mess,
    });
    if (response.data) {
      setAuthorized(true);
      setAuthResponse(response.data);
    }
    console.log(userAddr);
  };
  const helloWorld = <h1> {authResponse} </h1>;
  return (
    <div>
      {!authorized ? <button onClick={login}>login</button> : helloWorld}
    </div>
  );
}

export default App;
