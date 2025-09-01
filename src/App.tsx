import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodoPage } from "./TodoPage";
import { TasksProvider } from "./TodoPage/TaskProvider";

function App() {
  return (
    <TasksProvider>
      <TodoPage />
    </TasksProvider>
  );
}

export default App;
