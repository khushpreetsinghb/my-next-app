"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Pagination,
  Box,
} from "@mui/material";
import Loading from "@/components/ReusableComponents/Loading";

export default function TodoCards() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 20;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  if (loading) {
    return (
      <Loading 
        size={60} 
        message="Fetching todos..." 
        height="400px"
      />
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentTodos.map((todo) => (
          <Card key={todo.id} className="shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-101">
            <CardContent className="flex flex-col gap-2">
              <Typography variant="h6" className="line-clamp-2">
                {todo.title}
              </Typography>

              <Chip
                label={todo.completed ? "Completed" : "Pending"}
                color={todo.completed ? "success" : "warning"}
                size="small"
                className="w-fit"
              />

              <Typography variant="caption" className="text-gray-500">
                User ID: {todo.userId} — Todo ID: {todo.id}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Box display="flex" justifyContent="center" alignItems="center" className="mt-8">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          className="shadow-md"
        />
      </Box>
    </div>
  );
}
