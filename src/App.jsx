import UserProvider from "./services/UserContext.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Faq from "./pages/Voter/Faq.jsx";
import Home from "./pages/Voter/Home.jsx";
import AuthPage from "./pages/Voter/AuthPage.jsx";
import Instructions from "./pages/Voter/Instructions.jsx";
import "./App.css";
import ContactPage from "./pages/Voter/ContactPage.jsx";
import VoterProfile from "./pages/Voter/VoterProfile.jsx";
import HelpPage from "./pages/Voter/HelpPage.jsx";
import VoteSubmittedPage from "./pages/Voter/VoteSubmittedPage.jsx";
import ConfirmElectionPage from "./pages/Voter/ConfirmElectionPage.jsx";
import SelectElectionPage from "./pages/Voter/SelectElectionPage.jsx";
import BallotPage from "./pages/Voter/BallotPage.jsx";
import Login from "./pages/Viewer/Login";
import Register from "./pages/Viewer/Register";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import AuthWithToken from "./pages/Voter/AuthWithToken";
import Admin from "./pages/Admin/Admin";
import ChartsContainer from "./pages/Viewer/charts/ChartsContainer";
import Graph from "./pages/Viewer/Graph";
import CreateElectionPage from "./components/specific/Admin/CreateElectionForm";
import PartyForm from "./pages/PartyForm";
import ProtectedRoute from "./services/ProtectedRoute";
import PedingAuthorizations from "./components/specific/Admin/PedingAuthorizations";


function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <UserProvider>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/instructions" element={<Instructions/>}/>

                        {/* CMD Routes */}
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/auth-with-token" element={<AuthWithToken/>}/>
                        <Route path="/voter-data" element={<ProtectedRoute><VoterProfile/></ProtectedRoute>}/>

                        {/* Election and voting Routes */}
                        <Route path="/election" element={<ProtectedRoute><SelectElectionPage/></ProtectedRoute>}/>
                        <Route path="/confirm" element={<ProtectedRoute><ConfirmElectionPage/></ProtectedRoute>}/>
                        <Route path="/ballot" element={<ProtectedRoute><BallotPage/></ProtectedRoute>}/>
                        <Route path="/submitted" element={<ProtectedRoute><VoteSubmittedPage/></ProtectedRoute>}/>

                        {/* Party form */}
                        <Route path="/party-form" element={<ProtectedRoute><PartyForm/></ProtectedRoute>}/>


                        {/* Help and Contact Routes */}
                        <Route path="/help" element={<HelpPage/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="/faq" element={<Faq/>}/>

                        {/* Viewer Routes */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/side-bar" element={<ProtectedRoute><ChartsContainer/></ProtectedRoute>}/>
                        <Route path="/graph" element={<Graph/>}/>

                        {/* Admin Routes */}
                        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
                        <Route path="/create-election" element={<ProtectedRoute><CreateElectionPage/></ProtectedRoute>}/>
                        <Route path="/admin/viewers" element={<ProtectedRoute><PedingAuthorizations/></ProtectedRoute>}/>

                    </Routes>
                    <Footer/>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
