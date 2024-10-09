import './App.css';
import Counter from './app/features/counter/Counter';
import PostList from './app/features/posts/PostList';
import Functions from './functionalProgramming/Functions';
import LoDash from './functionalProgramming/LoDash';
import DarkMode from './htmlContent/DarkMode';

function App() {


  return (
    <div className="App">
      {/* <Counter/> */}
      <PostList/>
     {/* <Functions/>
     <LoDash/>
     <DarkMode/> */}
    </div>
  );
}

export default App;
