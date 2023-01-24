import React from "react";

export default function CmpletedList({ list }) {
  return (
    <div>
      {list.map((i) => {
        console.log(list);
        return (
          <div key={i.id} className="list">
            {i.text || i.value}
          </div>
        );
      })}
    </div>
  );
}
