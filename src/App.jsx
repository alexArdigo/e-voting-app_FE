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
import CreateElectionPage from "./pages/Admin/Dashboard/CreateElectionForm";
import PartyAdd from "./pages/Admin/PartyFormContainer/PartyAdd";
import ProtectedRoute from "./services/ProtectedRoute";
import PendingAuthorizations from "./pages/Admin/Dashboard/PendingAuthorizations/PendingAuthorizations";
import ErrorBoundary from "./components/common/ErrorBoundary";
import PartyEdit from "./pages/Admin/PartyFormContainer/PartyEdit";
import PartyList from "./pages/Admin/PartyFormContainer/PartyList";
import Results from "./pages/Viewer/Results";

function App() {

    return (
        <>
            <ToastContainer/>
            <BrowserRouter>
                <UserProvider>
                    <ErrorBoundary
                        fallback={<h2>Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</h2>}>

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
                            <Route path="/party-form" element={<ProtectedRoute><PartyAdd/></ProtectedRoute>}/>


                            {/* Help and Contact Routes */}
                            <Route path="/help" element={<HelpPage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                            <Route path="/faq" element={<Faq/>}/>

                            {/* Viewer Routes */}
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/charts" element={<ProtectedRoute><ChartsContainer/></ProtectedRoute>}/>
                            <Route path="/profile/stats" element={<Graph/>}/>
                            <Route path="/results" element={<Results />}/>

                            {/* Admin Routes */}
                            <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
                            <Route path="/create-election"
                                   element={<ProtectedRoute><CreateElectionPage/></ProtectedRoute>}/>
                            <Route path="/admin/viewers"
                                   element={<ProtectedRoute><PendingAuthorizations/></ProtectedRoute>}/>
                            <Route path="/admin/edit/parties"
                                   element={<PartyList />} />
                            <Route path="/admin/edit/parties/:id"
                                   element={<PartyEdit />} />
                            <Route path="/admin/add/party"
                                   element={<PartyAdd />} />




                        </Routes>
                        <Footer/>
                    </ErrorBoundary>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
