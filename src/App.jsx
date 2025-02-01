import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Voca from './pages/Voca';
import List from './pages/List';
import New from './pages/New';
import { VocaProvider } from './contexts/VocaContext';
import Edit from './pages/Edit';

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(true); 

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중이에요</div>;
  } else {
    return (
      <VocaProvider>
        <div className="App">
          <Routes>
            <Route path="/" />
            <Route path="/voca/:id" element={<Voca />} />
            <Route path="/list" element={<List />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </VocaProvider>
     );
  }
}

export default App
