"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Paper,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import PaletteIcon from "@mui/icons-material/Palette";
import BuildIcon from "@mui/icons-material/Build";

export default function AboutPage() {
  const technologies = [
    { name: "React", icon: <CodeIcon /> },
    { name: "Next.js", icon: <CodeIcon /> },
    { name: "Tailwind CSS", icon: <PaletteIcon /> },
    { name: "Material UI", icon: <BuildIcon /> },
  ];

  const learningAreas = [
    {
      title: "React Fundamentals",
      description:
        "Learning component-based architecture, hooks, state management, and modern React patterns.",
    },
    {
      title: "Next.js Framework",
      description:
        "Exploring server-side rendering, routing, API routes, and the App Router architecture.",
    },
    {
      title: "Tailwind CSS",
      description:
        "Mastering utility-first CSS framework for rapid UI development and responsive design.",
    },
    {
      title: "Material UI",
      description:
        "Building beautiful, accessible components using Material Design principles and theming.",
    },
  ];

  return (
    <Container maxWidth="lg" className="py-6 px-4">
      {/* Hero Section - Simple with background */}
      <Box 
        className="text-center mb-8 p-6 rounded-lg bg-blue-50"
      >
        <Typography variant="h4" component="h1" className="mb-3" sx={{ color: 'primary.main' }}>
          About This Project
        </Typography>
        <Typography variant="body1" color="text.secondary" className="text-center mx-auto">
          A learning project designed to explore and master modern web
          development technologies
        </Typography>
      </Box>

      {/* Technologies Section - Colored background */}
      <Paper 
        elevation={3} 
        className="p-5 mb-6 rounded-lg"
        sx={{
          background: ' #667eea',
          color: 'white'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          className="text-center mb-4"
          sx={{ color: 'white', fontWeight: 600 }}
        >
          Technologies Used
        </Typography>
        <Box className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <Chip
              key={tech.name}
              icon={tech.icon}
              label={tech.name}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Learning Areas Section - Cards with colored left border */}
      <Box className="mb-6">
        <Typography 
          variant="h6" 
          component="h2" 
          className="text-center mb-4"
          sx={{ 
            color: 'secondary.main',
            fontWeight: 600,
            borderBottom: '2px solid',
            borderColor: 'secondary.main',
            display: 'inline-block',
            pb: 1,
            px: 2
          }}
        >
          Learning Areas
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {learningAreas.map((area, index) => {
            const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
            return (
              <Card 
                key={index} 
                elevation={0}
                sx={{
                  borderLeft: `4px solid ${colors[index]}`,
                  backgroundColor: 'grey.50',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateX(4px)',
                    transition: 'all 0.2s ease'
                  }
                }}
              >
                <CardContent className="p-4">
                  <Typography 
                    variant="subtitle1" 
                    component="h3" 
                    className="mb-2" 
                    sx={{ 
                      fontWeight: 600,
                      color: colors[index]
                    }}
                  >
                    {area.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {area.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* Project Purpose Section - Different style with gray background */}
      <Box
        className="p-5 rounded-lg"
        sx={{
          backgroundColor: 'grey.100',
          border: '1px dashed',
          borderColor: 'grey.400'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          className="text-center mb-3"
          sx={{ 
            fontWeight: 600,
            color: 'grey.700'
          }}
        >
          Project Purpose
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          className="text-center"
          sx={{
            fontStyle: 'italic',
            color: 'grey.600'
          }}
        >
          This project serves as a comprehensive learning platform for modern
          web development. Through hands-on practice, it explores the
          fundamentals and advanced features of React, Next.js, Tailwind CSS, and
          Material UI. The goal is to build a solid foundation in these
          technologies while creating practical, real-world applications.
        </Typography>
      </Box>
    </Container>
  );
}

