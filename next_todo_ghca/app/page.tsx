"use client";

import React, { useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>TODOリスト</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいTODOを入力"
          style={{ color: "black" }}
        />
        <button
          onClick={addTodo}
          style={{
            marginLeft: "10px",
            border: "1px solid black",
            padding: "5px 10px",
          }}
        >
          追加
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button
              onClick={() => deleteTodo(index)}
              style={{
                marginLeft: "10px",
                border: "1px solid black",
                padding: "5px 10px",
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
