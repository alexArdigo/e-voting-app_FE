import UserProvider from "./services/UserContext.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Faq from "./pages/Faq.jsx";
import Home from "./pages/Home.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Instructions from "./pages/Instructions.jsx";
import "./css/App.css"
import ContactPage from "./pages/ContactPage.jsx";
import VoterProfile from "./pages/VoterProfile.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import VoteSubmittedPage from "./pages/VoteSubmittedPage.jsx";
import ConfirmElectionPage from "./pages/ConfirmElectionPage.jsx";
import SelectElectionPage from "./pages/SelectElectionPage.jsx";
import BallotPage from "./pages/BallotPage.jsx";
import Login from "./pages/Viewer/Login";
import Register from "./pages/Viewer/Register";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AuthWithToken from "./pages/AuthWithToken";
import AdminElection from "./components/specific/AdminElection";
import ChartsContainer from "./components/charts/ChartsContainer";
import ViewerSideBar from "./pages/Viewer/ViewerSideBar";
import CreateElectionPage from "./components/specific/CreateElectionForm";


function App() {

    return (
        <>

            <ToastContainer/>
            <BrowserRouter>
                <UserProvider>
                    <Header/>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/voter-data" element={<VoterProfile/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/instructions" element={<Instructions/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="/help" element={<HelpPage/>}/>
                        <Route path="/submitted" element={<VoteSubmittedPage/>}/>
                        <Route path="/confirm" element={<ConfirmElectionPage/>}/>
                        <Route path="/election" element={<SelectElectionPage/>}/>
                        <Route path="/ballot" element={<BallotPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/admin" element={<AdminPage/>}/>
                        <Route path="/graph" element={<ChartsContainer/>}/>
                        <Route path="/sideBar" element={<ViewerSideBar/>}/>
                        <Route path="/auth-with-token" element={<AuthWithToken/>}/>
                    </Routes>

                    <Footer/>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App
