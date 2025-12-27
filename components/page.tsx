"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/ReusableComponents/Navbar";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert
} from "@mui/material";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function ComponentsPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data.slice(0, 20)); // Show first 20 todos
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return (
      <main>
        <MuiNavbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <MuiNavbar />
        <Box sx={{ p: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </main>
    );
  }

  return (
    <main>
      <MuiNavbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" fontWeight="bold">
          Components Showcase
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom textAlign="center" color="text.secondary">
          Todo Cards from JSON Placeholder API
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
          {todos.map((todo) => (
            <Box key={todo.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)', lg: '1 1 calc(25% - 18px)' } }}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      #{todo.id}
                    </Typography>
                    <Chip
                      label={todo.completed ? "Completed" : "Pending"}
                      color={todo.completed ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    component="p"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.4
                    }}
                  >
                    {todo.title}
                  </Typography>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    User ID: {todo.userId}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    fullWidth
                    onClick={() => console.log('Todo clicked:', todo.id)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </main>
  );
}
