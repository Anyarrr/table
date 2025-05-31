import './App.css';
import { ToDoTable } from './components/ToDoTable/ToDoTable';
import { ToDoForm } from './components/ToDoForm/ToDoForm';

function App() {

  return (
    <div className="App">
      <ToDoForm />
      <ToDoTable/>
    </div>
  );
}

export default App;
