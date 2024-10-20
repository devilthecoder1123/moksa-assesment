import { useState, useEffect } from "react";
import { Box, Grid, TextField, Typography, Container } from "@mui/material";
import Column from "./Column";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Animation for sliding in from the left
const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AnimatedTitle = styled(Typography)`
  animation: ${slideIn} 1s ease forwards; // 1 second animation
  background: linear-gradient(to right, rgb(211, 229, 27), rgb(106, 227, 97));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
 
`;

const GradientButton = styled.button`
  background-image: linear-gradient(to right, #d3e51b, #6ae361, #07f199);
  color: white; // Adjust text color as needed
  position: relative;
  padding: 12px 24px; // Adjust padding as needed
  border: none; // Remove default border if needed
  border-radius: 8px; // Adjust border radius as needed
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(to right, #6ae361, #07f199, rgba(106, 227, 97, 0));
  }
`;

const TaskBoard = () => {
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newTask, setNewTask] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  useEffect(() => {
    const savedColumns = localStorage.getItem("columns");
    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);
      if (Array.isArray(parsedColumns)) {
        setColumns(parsedColumns);
      } else {
        setColumns([]);
      }
    }
  }, []);

  const handleAddColumn = () => {
    if (newColumnName.trim() === "") return;
    const newColumn = {
      id: Date.now(), // Ensure unique ID
      name: newColumnName,
      tasks: [],
    };
    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
    setNewColumnName("");
  };

  const handleAddTask = () => {
    if (newTask.trim() === "" || !selectedColumn) return;

    const selectedColumnId = Number(selectedColumn);
    
    const updatedColumns = columns.map((column) => {
      if (column.id === selectedColumnId) {
        column.tasks.push({ id: Date.now(), content: newTask });
      }
      return column;
    });

    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
    setNewTask(""); // Clear the input
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mb: 4, mt: 4 }}>
        <AnimatedTitle variant="h4" gutterBottom>
          Welcome to Task Manager
        </AnimatedTitle>
        <AnimatedTitle variant="subtitle1" gutterBottom>
          Created by Faisal Khan❤️❤️
        </AnimatedTitle>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'rgb(7, 241, 153)' }}>
          Add a New Column
        </Typography>
        <Box display="flex" mb={2}>
          <TextField
            label="New Column"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            sx={{ marginRight: 2, flexGrow: 1 }}
          />
          <GradientButton onClick={handleAddColumn}>
            Add Column
          </GradientButton>
        </Box>
      </Box>

      {/* Conditional rendering for Add Task section */}
      {columns.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'rgb(7, 241, 153)' }}>
            Add a New Task
          </Typography>
          <Box display="flex" mb={2}>
            <TextField
              label="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              sx={{ marginRight: 2, flexGrow: 1 }}
            />
            <TextField
              select
              SelectProps={{
                native: true,
              }}
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              sx={{ marginRight: 2 }}
            >
              <option value="">Select a column</option>
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
            </TextField>
            <GradientButton onClick={handleAddTask}>
              Add Task
            </GradientButton>
          </Box>
        </Box>
      )}

      <Grid container spacing={2}>
        {columns.map((column) => (
          <Grid item xs={4} key={column.id}>
            <Column column={column} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TaskBoard;
