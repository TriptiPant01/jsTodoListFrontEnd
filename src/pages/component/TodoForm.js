import React, { useState } from "react";

export default function TodoForm(props) {
  const [value, setValue] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.onsubmit({
      id: Math.floor(Math.random() * 10000),
      text: value,
    });
    setValue("");
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        placeholder="Please enter your list"
        className="input"
        onChange={onInputChange}
        value={value}
      />
    </form>
  );
}
