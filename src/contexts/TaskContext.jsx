import React, { createContext, useEffect, useState } from "react";
import { addTask, deleteTask, fetchTasks } from "../services/tasks";

export const TaskContext = createContext({
  tasks: [],
});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleDeleteTask = async (id) => {
    const tasksClone = [...tasks];

    try {
      setTasks(tasks.filter((task) => task.id !== id));
      await deleteTask(id);
    } catch (error) {
      if (error.response && error.response.data.status === 404) {
        alert("task might have been deleted");
      }
      setTasks(tasksClone);
    }
  };

  const handleSubmit = (task) => {
    addTask(task)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 4000) {
          alert(error.response.data.message[0]);
        }
      });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        onDelete: handleDeleteTask,
        onSave: handleSubmit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
