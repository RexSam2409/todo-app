import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

interface TaskState {
  id: number;
  value: string;
  completed: boolean;
}

interface TaskContextType {
  state: TaskState[];
  handleAddTask: (task: TaskState) => void;
  handleDeleteTask: (id: TaskState["id"]) => void;
  handleCheckedTask: (id: TaskState["id"]) => void;
  handleEditTask: (id: TaskState["id"], value: TaskState["value"]) => void;
}

export const ADD_TASK = "ADD_TASK" as const;
export const TOGGLE_TASK = "TOGGLE_TASK" as const;
export const DELETE_TASK = "DELETE_TASK" as const;
export const EDIT_TASK = "EDIT_TASK" as const;

type Action =
  | { type: typeof ADD_TASK; payload: TaskState }
  | { type: typeof DELETE_TASK; payload: TaskState["id"] }
  | { type: typeof TOGGLE_TASK; payload: TaskState["id"] }
  | {
      type: typeof EDIT_TASK;
      payload: { id: TaskState["id"]; value: TaskState["value"] };
    };

const TasksContext = createContext<TaskContextType | null>(null);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TasksProvider");
  }
  return context;
};

const taskReducer = (state: TaskState[], action: Action): TaskState[] => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter((item) => item.id !== action.payload);
    case TOGGLE_TASK:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
    case EDIT_TASK:
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, value: action.payload.value }
          : item
      );
    default:
      return state;
  }
};
const initializer = (): TaskState[] => {
  const stored = localStorage.getItem("TODO");
  return stored ? JSON.parse(stored) : [];
};
export const TasksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, [], initializer);

  const handleAddTask = (task: TaskState) => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  const handleDeleteTask = (id: TaskState["id"]) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };
  const handleCheckedTask = (id: TaskState["id"]) => {
    dispatch({ type: TOGGLE_TASK, payload: id });
  };
  const handleEditTask = (id: number, value: string) => {
    dispatch({ type: EDIT_TASK, payload: { id, value } });
  };

  useEffect(() => {
    localStorage.setItem("TODO", JSON.stringify(state));
  }, [state]);
  return (
    <TasksContext.Provider
      value={{
        state,
        handleAddTask,
        handleDeleteTask,
        handleCheckedTask,
        handleEditTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
