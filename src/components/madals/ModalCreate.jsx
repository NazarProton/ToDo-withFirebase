import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useTheme } from '../../context/ThemeContext';

export default function ModalCreate({ todolist, setTodoList }) {
  const [open, setOpen] = React.useState(false);
  const { darkMode } = useTheme();
  const { register, handleSubmit } = useForm({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = (data) => {
    const newId = nanoid();
    const newTask = { _id: newId, ...data };
    const newTodoList = [newTask, ...todolist];
    try {
      axios.put(
        `https://todolist-c18aa-default-rtdb.europe-west1.firebasedatabase.app/todos/${newId}.json`,
        newTask
      );
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  return (
    <div className="w-fit">
      <Button variant="outlined" onClick={handleClickOpen}>
        add+
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent id={darkMode ? 'darkModal' : ''}>
          <DialogContentText>Сreating a new task.</DialogContentText>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
            <TextField
              autoFocus
              margin="dense"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
              {...register('category', { required: true, minLength: 3 })}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              {...register('name', { required: true, minLength: 3 })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="text"
              label="Text"
              type="text"
              fullWidth
              variant="standard"
              {...register('text', { required: true, minLength: 3 })}
            />

            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" color="success" type="submit">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
