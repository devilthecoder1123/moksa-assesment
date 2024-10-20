import { Box, Typography, Paper } from "@mui/material";
import Task from "./Task";

const Column = ({ column }) => {
  return (
    <Paper sx={{ padding: 2, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {column.name}
      </Typography>
      <Box sx={{ minHeight: 300, backgroundColor: "#f4f6f8", padding: 1 }}>
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Box>
    </Paper>
  );
};

export default Column;
