import { useEffect, useState } from "react";

const API = "http://13.63.239.125:3000/todos"; // change if needed

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!text) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  // Toggle complete
  const toggleTodo = async (todo) => {
    await fetch(`${API}/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: todo.text,
        completed: !todo.completed,
      }),
    });

    fetchTodos();
  };

  return (
    <div
      style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "Arial" }}
    >
      <h2>🚀 Todo App</h2>

      {/* Input */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* List */}
      <div style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
