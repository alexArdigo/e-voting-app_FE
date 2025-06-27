
import './assets/mystyle.css';
import VoterData from "./pages/VoterData.jsx";
import UserProvider from "./services/UserContext.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<VoterData/>}/>
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App
