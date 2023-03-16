import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/Home';
import AllSong from './components/pages/Home/AllSong';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />}>
                        <Route path='/' element={<AllSong />} />
                        <Route path='/artists' element={<h1>Artust</h1>} />
                    </Route>
                    <Route path='*' element={<h1>404</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
