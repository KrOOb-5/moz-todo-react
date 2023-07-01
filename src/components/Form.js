import React, {useState} from "react";

export default function Form(props) {
  const [name, setName] = useState(""); //the state, and a function that can be used to update the state later.


  function handleChange(e){
    setName(e.target.value); // you can access the input's value property.
  }
  

  function handleSubmit(e) {
    e.preventDefault(); // previne que a pagina refreshe
    if(name !== ""){
      props.addTask(name);
      setName("");
    }
  }
    return (
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange} //onChange Event -capture a user's input as they type
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }