import {nanoid} from "nanoid";
import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
//Filtering tasks in the UI
//tudo o que passo pelos componentes(funcoes) e prop
//var.map pensar conveyr belt 

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//Defining these outside because we dont want this to be recaculated every time app runs
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed, //shows completed prop is false
  Completed: (task) => task.completed,
  //Delete: (task) => task.delete,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);



export default function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks); //props.tasks === tasks
  const [filter, setFilter] = useState("All");

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
      />
  ));


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

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);


  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}