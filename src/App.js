import "./App.css";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { CheckCircle, Edit, Delete } from "@mui/icons-material";

function App() {
  const dummyData = [
    { id: 1, task: "Task 1", status: false },
    { id: 2, task: "Task 2", status: false },
    { id: 3, task: "Task 3", status: false },
  ];

  const [tasks, setTasks] = useState(dummyData);
  const [addInput, setAddInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState("");

  //Add Task
  const addTask = () => {
    if (!addInput) return window.alert("Field is required");

    let id = Date.now();
    let newObj = {
      id: id,
      task: addInput,
      status: false,
    };

    setTasks((prev) => [...prev, newObj]);

    setAddInput("");
  };

  //Handle Edit Field
  const editField = (id, value) => {
    setEditId(id);
    setEditInput(value);
  };

  //Edit Task
  const editTask = (id) => {
    if (!editTask) return window.alert("Field is required");

    let newObj = {
      id: id,
      task: editInput,
      status: false,
    };

    let filteredTask = tasks.filter((item) => item.id !== id);

    let newTasks = [...filteredTask, newObj];

    setTasks(newTasks);
    setEditInput("");
  };

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = tasks.filter((item) => item.id !== id);

    setTasks(newTasks);
  };

  //Completed Task
  const completedTask = (id) => {
    let newTasks = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }

      return item;
    });

    setTasks(newTasks);
  };

  return (
    <div className='App'>
      <div className='projectName'>AGEEE DEV'S TODO LIST</div>

      <div className='inputWrapper'>
        <div className='inputContainer'>
          <input
            onChange={(e) => setAddInput(e.target.value)}
            type='text'
            placeholder='Add Task'
            value={addInput}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className='inputContainer'>
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            type='text'
            placeholder='Edit Task'
          />
          <button onClick={() => editTask(editId)}>Edit</button>
          <button onClick={() => setEditInput("")} className='cancel'>
            Cancel
          </button>
        </div>
      </div>

      <div className='content'>
        {!tasks.length && <div className='noTask'>No Task Available</div>}
        {tasks
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((item) => {
            return (
              <div key={item.id} className='listItem'>
                <p>{item.task}</p>

                <div className='actionBtns'>
                  <IconButton
                    onClick={() => completedTask(item.id)}
                    color={item.status ? "success" : "null"}
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    color='primary'
                    onClick={() => editField(item.id, item.task)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color='error' onClick={() => deleteTask(item.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
