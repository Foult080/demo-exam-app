import React from "react";
import Navigate from "./Components/Navigate";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navigate />
      <Dashboard />
    </div>
  );
};

export default App;
