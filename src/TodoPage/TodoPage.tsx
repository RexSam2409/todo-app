import {
  Box,
  Card,
  CardActions,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
    const newId = list.length > 0 ? list[list.length - 1].id + 1 : 1;
    handleAddTask({ id: newId, value: taskInput, completed: false });
    setTaskInput("");
  };
  const handleEdit = (id: number, value: string) => {
    setEditTaskId(id);
    setListInput(value);
  };
  const handleEditAdd = () => {
    console.log("editTaskId", editTaskId);
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
      <Card variant="outlined" sx={{ maxWidth: "800px" }} elevation={4}>
        <CardContent>
          <CardHeader
            title="TO-DO APP"
            sx={{
              "& .MuiCardHeader-title": {
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "primary.main",
              },
            }}
          />
          <CardContent>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  type="text"
                  variant="outlined"
                  onChange={handleTextChange}
                  value={taskInput}
                  size="small"
                />
                <IconButton
                  onClick={handleAdd}
                  disableFocusRipple
                  sx={{ color: "primary.main" }}
                >
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </Box>
              <Divider />
              {list.length > 0 ? (
                <List
                  sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
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
                          size="small"
                          sx={{ width: "150px" }}
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
                        <ListItemText
                          primary={item.value}
                          sx={{
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                          }}
                        />
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
                <Typography variant="subtitle2">No List available</Typography>
              )}
            </Stack>
          </CardContent>
          <CardActions>
            <Typography> Total: {list.length}</Typography>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodoPage;
