import React from "react";
import Navbar from "./Navbar";

function Home() {
    return (
      <div>
        <Navbar />
        <div className="container space">
          <div className="content">
            <h1>Welcome To Auth App</h1>
            <p>This is a simple Authentication and Authorization log in and log out react application</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;