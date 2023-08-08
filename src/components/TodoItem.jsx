import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import ModalEdit from './madals/ModalEdit';
import { useState } from 'react';
import ModalDelete from './madals/ModalDelete';

const TodoItem = ({ todo, todolist, setTodoList }) => {
  const { darkMode } = useTheme();
  const [data, setData] = useState(todo);
  const { name, text, category } = data;

  return (
    <>
      <TableRow
        className={`${
          darkMode ? 'text-white' : 'hover:bg-gray'
        } transition-all`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell
          className={`${darkMode ? 'text-white' : ''}`}
          component="th"
          scope="row"
        >
          {category}
        </TableCell>
        <TableCell className={`${darkMode ? 'text-white' : ''}`} align="left">
          {name}
        </TableCell>
        <TableCell className={`${darkMode ? 'text-white' : ''}`} align="left">
          {text}
        </TableCell>
        <TableCell
          className={`${darkMode ? 'text-white' : ''} flex`}
          align="right"
        >
          <ModalEdit
            todo={todo}
            todolist={todolist}
            setTodoList={setTodoList}
            setData={setData}
          />

          <ModalDelete
            todo={todo}
            todolist={todolist}
            setTodoList={setTodoList}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TodoItem;
