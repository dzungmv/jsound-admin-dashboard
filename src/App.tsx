import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/common/PrivateRoute';
import LoginPage from './components/pages/Auth/Login';
import HomePage from './components/pages/Home';
import AddSong from './components/pages/Home/AddSong';
import AllSong from './components/pages/Home/AllSong';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }>
                        <Route path='/' element={<AllSong />} />
                        <Route path='/add-song' element={<AddSong />} />
                        <Route path='/artists' element={<h1>Artust</h1>} />
                    </Route>

                    <Route path='/login' element={<LoginPage />} />

                    <Route path='*' element={<h1>404</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
