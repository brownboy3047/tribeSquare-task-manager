// components
import Header from "./components/Header";
import ShowTasks from "./components/ShowTasks";
import AddTask from "./components/AddTask";

// style
import "./App.css";
function App() {
  return (
    <>
      <main className="app">
        <Header />
        <ShowTasks />
        <AddTask />
      </main>
    </>
  );
}

export default App;
