import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  editTodo,
  removeTodo,
  sotrTodo,
  toggleTodo,
} from "../../features/todosSlice";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ClearIcon from "@mui/icons-material/Clear";

export const ToDoTable = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleChecked = (id: string) => {
    dispatch(toggleTodo({ id }));
  };

  const handleSave = (id: string) => {
    if (editTitle.trim()) {
      dispatch(editTodo({ id, title: editTitle }));
    }
    setEditId(null);
  };

  const handleRemove = (id: string) => {
    dispatch(removeTodo({ id }));
  };

  const handleSort = () => {
    dispatch(sotrTodo());
  };

  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "80%", overflow: "hidden" }}>
        <Table sx={{ borderCollapse: "collapse", backgroundColor: '#f5f5f5' }} border={1}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Статус
                <Button onClick={handleSort}>
                  <SwapVertIcon />
                </Button>
              </TableCell>
              <TableCell
                sx={{ width: "36%", textAlign: "center", fontWeight: "bold" }}
              >
                Задача
              </TableCell>
              <TableCell
                sx={{ width: "36%", textAlign: "center", fontWeight: "bold" }}
              >
                Дата
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Удалить
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleChecked(item.id)}
                  />
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center" }}
                  onClick={() => {
                    setEditId(item.id);
                    setEditTitle(item.title);
                  }}
                >
                  {editId === item.id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => handleSave(item.id)}
                    />
                  ) : (
                    item.title
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {item.createdAt}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center" }}
                  onClick={() => handleRemove(item.id)}
                >
                  <ClearIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};
