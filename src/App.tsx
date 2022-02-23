import React, {FC} from 'react';
import './App.css';
import ContextProvider, {TaskContextProvider} from "./contexts/contextProvider";
import NavbarComponent from "./components/Navbar";
import TodoListComponent from "./components/todoList";

const  App: FC = () => {
  return (
    <div className="container">
        <TaskContextProvider>
            <header>
                <h1 className="header-title">todos</h1>
            </header>
            <div className='section-container'>
                <TodoListComponent/>
                <NavbarComponent/>
            </div>
        </TaskContextProvider>
    </div>
  );
}

export default App;
