import {nanoid} from "nanoid";
import React, {useState} from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
// Completing a task
//tudo oque passo pelos componentes e prop
//map pensar conveyr belt 
function App(props) {
  //console.log(props);
  const [tasks, setTasks] = useState(props.tasks); //props.tasks === tasks
  

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed:false }; //id diferente (so o numero)
    setTasks([...tasks, newTask]); //spread operator
  }
  
  function toggleTaskCompleted(id) {
    console.log(tasks[0]);
  }

  const taskList = tasks.map((task) => (
    <Todo 
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
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