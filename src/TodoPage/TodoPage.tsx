import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useTaskContext } from "./TaskProvider";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const TodoPage = () => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [listInput, setListInput] = useState("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const {
    state: list,
    handleAddTask,
    handleDeleteTask,
    handleCheckedTask,
    handleEditTask,
  } = useTaskContext();
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAdd = () => {
    if (!taskInput.trim()) return;
    const newId = list.length > 0 ? list[list.length - 1].id + 1 : 0;
    handleAddTask({ id: newId, value: taskInput, completed: false });
    setTaskInput("");
  };
  const handleEdit = (id: number, value: string) => {
    setEditTaskId(id);
    setListInput(value);
  };
  const handleEditAdd = () => {
    if (!editTaskId) return;
    handleEditTask(editTaskId, listInput);
    setEditTaskId(null);
  };
  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput(e.target.value);
  };
  const handleEditclose = () => {
    setEditTaskId(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ maxWidth: "800px" }}>
        <CardContent>
          <CardHeader title="TO-DO APP" />
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", gap: "2rem" }}>
                <TextField
                  type="text"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={taskInput}
                />
                <Button variant="contained" onClick={handleAdd}>
                  + Add TO-DO
                </Button>
              </Box>
              <Divider />
              {list.length > 0 ? (
                <List>
                  {list.map((item) => (
                    <ListItem
                      key={item.id.toString()}
                      secondaryAction={
                        <IconButton onClick={() => handleDeleteTask(item.id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      }
                    >
                      <Checkbox
                        checked={item.completed}
                        onClick={() => handleCheckedTask(item.id)}
                        disableRipple
                        sx={{ marginRight: "1rem" }}
                      />
                      {editTaskId === item.id ? (
                        <TextField
                          value={listInput}
                          onChange={handleListChange}
                          variant="standard"
                          slotProps={{
                            input: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleEditclose}
                                    size="small"
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      ) : (
                        <ListItemText primary={item.value} />
                      )}
                      {editTaskId === item.id ? (
                        <IconButton onClick={handleEditAdd}>
                          <AddIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleEdit(item.id, item.value)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="h5">No List available</Typography>
              )}
            </Stack>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodoPage;
