import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useTheme } from '../../context/ThemeContext';

export default function PaginationOutlined({ todolist, setPageNumber }) {
  const { darkMode } = useTheme();
  let todoListLength = todolist.length;
  let countItemsOnPage = 10;
  let pagesInfo = todoListLength / countItemsOnPage;
  let pagesCount =
    todoListLength < countItemsOnPage
      ? 1
      : pagesInfo > Math.round(pagesInfo)
      ? pagesInfo + 1
      : Math.round(pagesInfo);

  return (
    <div className="w-full flex justify-center mt-3">
      {todoListLength > countItemsOnPage ? (
        <Stack spacing={2}>
          <Pagination
            id={darkMode ? 'pagination' : ''}
            defaultPage={1}
            onChange={(e, newPage) => {
              setPageNumber(newPage);
            }}
            count={pagesCount}
            variant="outlined"
            color="primary"
          />
        </Stack>
      ) : (
        ''
      )}
    </div>
  );
}
