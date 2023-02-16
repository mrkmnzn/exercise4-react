import http from "./http";

export function fetchTasks() {
  return http.get("/tasks");
}

export function addTask(tasks) {
  const taskClone = { ...tasks };
  Object.keys(taskClone).forEach((key) => {
    if (
      taskClone[key] === "" ||
      taskClone[key] === null ||
      taskClone[key] === undefined
    ) {
      delete taskClone[key];
    }
  });

  return http.post("/tasks", taskClone);
}

export function deleteTask(id) {
  return http.delete(`/tasks/${id}`);
}
