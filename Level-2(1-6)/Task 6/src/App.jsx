import React from "react";
import UserCard from "./components/UserCard";

const App = () => {
  return (
    <div>
      <h1>PropTypes Validation Example</h1>

      <UserCard name="Thariga" age={19} isActive={true} />
      <UserCard name={123} age="twenty" isActive="yes" />
    </div>
  );
};

export default App;
