import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '../../context/ThemeContext';

export default function ModalDelete({ todo, todolist, setTodoList }) {
  const [open, setOpen] = React.useState(false);
  const { darkMode } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const filteredEditedTodos = todolist.filter(
      (elem) => elem._id !== todo._id
    );

    try {
      setTodoList(filteredEditedTodos);
      axios.delete(
        `https://todolist-c18aa-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo._id}.json`
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
        color="error"
        className="opacity-70 hover:opacity-100"
        aria-label="add an alarm"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent id={darkMode ? 'darkModal' : ''}>
          <DialogContentText>
            Are you sure you want to delete the to-do permanently?
          </DialogContentText>
          <form onSubmit={handleDelete}>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" color="success" type="submit">
                Delete
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
