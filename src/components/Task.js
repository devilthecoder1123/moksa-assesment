import { Paper, Typography } from "@mui/material";

const Task = ({ task }) => {
  return (
    <Paper sx={{ padding: 1, backgroundColor: "#fff", marginBottom: 1 }}>
      <Typography>{task.content}</Typography>
    </Paper>
  );
};

export default Task;
