"use client";

import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "TODO_ITEM";

interface TodoItemProps {
  todo: string;
  index: number;
  moveTodo: (fromIndex: number, toIndex: number) => void;
  deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  moveTodo,
  deleteTodo,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => {
        ref(drop(node));
      }}
    >
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
  );
};

const Home = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hello");
      const { message } = await res.json();
      setMessage(message);
    };
    fetchData();
  }, []);

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

  const moveTodo = (fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
        <p>{message ? message : "Loading..."}</p>
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
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              moveTodo={moveTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

export default Home;
