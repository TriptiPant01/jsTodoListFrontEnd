import React from "react";

export default function TodoList({
  list,
  onEdit,
  onDelete,
  edit,
  handleSubmit,
  updateEdit,
}) {
  return (
    <div>
      {list.map((i) => {
        return i._id === edit ? (
          <div className="edit-todo">
            <input
              placeholder="Update Your Todo"
              onChange={(e) => updateEdit(e.target.value)}
            />
            <button onClick={() => handleSubmit(edit)}>Update Todo</button>
          </div>
        ) : (
          <div key={i.id} className="list">
            {i.text || i.value}
            <div className="listEdit">
              {/* <input type={"checkbox"} onChange={() => onDelete(i.id)} /> */}
              <button onClick={() => onDelete(i._id)}>Completed</button>
              <button onClick={() => onEdit(i)}>Edit</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
