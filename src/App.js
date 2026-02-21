import logo from './logo.svg';
import './App.css';

import Header from "./Components/Header";
import PlayMat from './Components/PlayMat';

function App() {
  return (
    <div className="App">
      <Header initialTitle={"Enter Title Here"} /> {/* This stays put */}
      <main>
        <PlayMat />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
