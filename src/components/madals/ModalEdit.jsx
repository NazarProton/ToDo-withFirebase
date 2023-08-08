import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

export default function ModalEdit({ todo, todolist, setTodoList, setData }) {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm({});
  const { darkMode } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = (data) => {
    const newTask = { _id: todo._id, ...data };
    const indexOfEditedTodos = todolist.findIndex(
      (elem) => elem._id === todo._id
    );
    const EditedTodoList = todolist;
    EditedTodoList.splice(indexOfEditedTodos, 1, newTask);
    try {
      setTodoList(EditedTodoList);
      setData(newTask);
      axios.patch(
        `https://todolist-c18aa-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo._id}.json`,
        newTask
      );
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  return (
    <div className="w-fit">
      <IconButton
        onClick={handleClickOpen}
        color="success"
        aria-label="delete"
        className="opacity-70 hover:opacity-100"
      >
        <CreateIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent id={darkMode ? 'darkModal' : ''}>
          <DialogContentText>Сreating a new task.</DialogContentText>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
            <TextField
              autoFocus
              margin="dense"
              label="Category"
              type="text"
              name="category"
              fullWidth
              variant="standard"
              defaultValue={todo.category}
              {...register('category', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="standard"
              defaultValue={todo.name}
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="text"
              label="Text"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={todo.text}
              {...register('text', { required: true, minLength: 3 })}
            />

            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" color="success" type="submit">
                Edit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
