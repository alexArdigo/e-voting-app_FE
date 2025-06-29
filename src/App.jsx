import UserProvider from "./services/UserContext.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Faq from "./pages/Faq.jsx";
import Home from "./pages/Home.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Instructions from "./pages/Instructions.jsx";
import "./css/App.css"
import HalfLogo from "./pages/HalfLogo.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import VoterProfile from "./pages/VoterProfile.jsx";
import HelpPage from "./pages/HelpPage.jsx";


function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/voter-data" element={<VoterProfile/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/instructions" element={<Instructions/>}/>
                        <Route path="/default" element={<HalfLogo/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="/help" element={<HelpPage/>}/>
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App
