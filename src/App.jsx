import VoterData from "./pages/VoterData.jsx";
import UserProvider from "./services/UserContext.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Faq from "./pages/Faq.jsx";
import Home from "./pages/Home.jsx";
import "./App.css"
import DefaultPage from "./pages/DefaultPage.jsx";


function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/voter-data" element={<VoterData/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                        <Route path="/default" element={<DefaultPage/>}/>
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App
