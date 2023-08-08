import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TodoItem from './TodoItem';
import ToolBar from './ui/ToolBar';
import { useTheme } from '../context/ThemeContext';
import PaginationOutlined from './ui/Pagination';
import ModalCreate from './madals/ModalCreate';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const TableOfTodos = () => {
  const [todolist, setTodolist] = useState();
  const [searchList, setSearchList] = useState(todolist);
  const { darkMode } = useTheme();
  const [sortDirection, setSortDirection] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const counItemsPerPage = 10;
  const toggleSortDirection = () => {
    setSortDirection(sortDirection && sortDirection === 'asc' ? 'desc' : 'asc');
    sortByCategory();
  };

  function getItemsForPage(allItemsList) {
    const startIndex = (pageNumber - 1) * counItemsPerPage;
    const endIndex = startIndex + counItemsPerPage;
    const croppedlist = allItemsList.slice(startIndex, endIndex);
    return croppedlist;
  }

  useEffect(() => {
    axios
      .get(
        'https://todolist-c18aa-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
      )
      .then(({ data }) => {
        const dataArray = Object.values(data);
        setTodolist(dataArray);
        setSearchList(dataArray);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = searchList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    searchTerm === '' ? setSearchList(todolist) : setSearchList(filtered);
  };

  const sortByCategory = () => {
    const sortedList = [...searchList];
    sortedList.sort((a, b) => {
      const compareResult = a.category.localeCompare(b.category);
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
    setSearchList(sortedList);
  };

  return (
    <div>
      <ToolBar onSearch={handleSearch} />
      <TableContainer
        component={Paper}
        className={`${darkMode ? 'bg-whiteInherit' : ''}`}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {['Category', 'Name', 'Text', ''].map((elem, index) => (
                <TableCell
                  className={`${darkMode ? 'text-white font-orb' : ''} ${
                    index !== 3 ? '' : 'flex justify-end'
                  } ${index === 0 ? 'cursor-pointer' : ''}`}
                  onClick={() => (index === 0 ? toggleSortDirection() : '')}
                  key={index}
                  align="left"
                >
                  {index !== 3 ? (
                    <>
                      {elem}
                      {index === 0 && sortDirection ? (
                        sortDirection === 'asc' ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        ''
                      )}
                    </>
                  ) : (
                    <ModalCreate
                      todolist={searchList}
                      setTodoList={setSearchList}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList &&
              getItemsForPage(searchList).map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  todolist={searchList}
                  setTodoList={setSearchList}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {searchList ? (
        <PaginationOutlined
          todolist={searchList}
          setPageNumber={setPageNumber}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default TableOfTodos;
