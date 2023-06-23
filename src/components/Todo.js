import React from "react";

function Todo(props) {
  //console.log(props); 
  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input id={props.id} type="checkbox" defaultChecked={props.completed} />
        <label className="todo-label" htmlFor={props.id}> 
          {props.name} 
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn">
          Edit <span className="visually-hidden">{props.name}</span> 
        </button>
        <button type="button" className="btn btn__danger">
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
//Span if setting visually-visible relates the button to the activity "delete {props.name}" this was more to help screen-readers
//htmlFor is for when you submit dai ter um id especifico
export default Todo;