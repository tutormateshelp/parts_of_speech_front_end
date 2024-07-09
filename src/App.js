import "./App.css";
import Header from "./components/header";
import POS_analyzer from "./components/pos_analyzer";

function App() {
   return (
    <div className=" justify-center items-center flex flex-col">
      <Header />
      <POS_analyzer />
    </div>
  );
}

export default App;
