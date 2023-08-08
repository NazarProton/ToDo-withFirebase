import './App.scss';
import { ThemeProvider } from './context/ThemeContext';
import TableOfTodos from './components/TableOfTodos';

function App() {
  return (
    <ThemeProvider>
      <TableOfTodos />
    </ThemeProvider>
  );
}

export default App;
