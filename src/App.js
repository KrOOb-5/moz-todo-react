import {nanoid} from "nanoid";
import React, {useState} from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
//Editing from the UI
//tudo oque passo pelos componentes e prop
//map pensar conveyr belt 
function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks); //props.tasks === tasks
  

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed:false }; //id diferente (so o numero)
    setTasks([...tasks, newTask]); //spread syntax
  }
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {//this task is used inside this function
      if (id === task.id) {
        return {...task, name:newName };
      }
      return task;
    })
    setTasks(editedTaskList);
  }

  const taskList = tasks.map((task) => (
    <Todo 
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task"; //muda a string para "tasks" se a taskList tiver mais de que 1 object no array
  const headingText = `${taskList.length} ${tasksNoun} remaining`; //heading a ser atualizado consoante o lenght do array 

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;