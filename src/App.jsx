import { useState } from "react";
import "./App.css";
import { Form } from "./componensts/Form";
import { Table } from "./componensts/Table";
const hrPerWeek = 24 * 7;
function App() {
  const [taskList, setTaskList] = useState([]);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };
    if (ttlHr + taskObj.hr > hrPerWeek) {
      return alert("Sorry boss not ehough time fit this task from last week");
    }
    setTaskList([...taskList, obj]);
  };

  const switchTask = (id, type) => {
    setTaskList(
      taskList.map((item) => {
        if (item.id === id) {
          item.type = type;
        }
        return item;
      })
    );
  };
  const randomIdGenerator = (length = 6) => {
    const str = "qwertyuiopasdfghjklzxcvbnmQWRTYUIOPASDFGHJKLZXCVBNM0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      id += str[randomIndex];
    }
    return id;
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure that you wanna delete?")) {
      setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="wrapper pt-5">
      {/* <!-- Title  --> */}
      <div className="container">
        <h1 className="text-center">Time Management</h1>

        {/* <!-- Form  --> */}
        <Form addTaskList={addTaskList} />
        {/* <!-- Tables  --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />
        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{ttlHr}</span> hrs
        </div>
        {/* <!-- Bad list table  --> */}
      </div>
    </div>
  );
}

export default App;
