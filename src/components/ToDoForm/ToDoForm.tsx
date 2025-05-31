import { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { addTodo, filteredTodo } from "../../features/todosSlice";
import { Button, Grid, TextField, Typography } from "@mui/material";

export const ToDoForm = () => {
  const [title, setTitle] = useState("");
  const [filterText, setFilterText] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (!title.trim()) return;
    dispatch(addTodo({ title }));
    setTitle("");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterText(value);
    dispatch(filteredTodo({ filter: value }));
  };

  return (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <Grid sx={{ display: "flex", flexDirection: "column", padding: "20px"}}>
        <Typography sx={{ marginBottom: "20px", fontWeight: "bold" }}>Введите название задачи</Typography>
        <TextField
          type="text"
          placeholder="Введите задачу"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button sx={{ marginTop: "20px" }} onClick={handleAddTodo}>Добавить</Button  >
      </Grid>
      <Grid sx={{padding: "20px"}}>
        <Typography sx={{ marginBottom: "20px", fontWeight: "bold" }}>Поиск задачи</Typography>
        <TextField
          type="text"
          placeholder="Поиск задачи"
          value={filterText}
          onChange={handleFilterChange}
        />
      </Grid>
      </Grid>
    </Grid>
  );
};
