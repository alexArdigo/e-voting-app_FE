import UserProvider from "./services/UserContext.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import AuthWithToken from "./pages/Voter/AuthWithToken";
import Admin from "./pages/Admin/Dashboard/Admin";
import ChartsContainer from "./pages/Viewer/charts/ChartsContainer";
import Viewer from "./pages/Viewer/Viewer";
import CreateElectionPage from "./pages/Admin/Dashboard/CreateElectionForm";
import PartyAdd from "./pages/Admin/PartyFormContainer/PartyAdd";
import ProtectedRoute from "./services/ProtectedRoute";
import AdminRoute from "./services/AdminRoute";
import ViewerRoute from "./services/ViewerRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
import PartyEdit from "./pages/Admin/PartyFormContainer/PartyEdit";
import PartyList from "./pages/Admin/PartyFormContainer/PartyList";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import ViewerDashboard from "./pages/Viewer/ViewerDashboard";
import PendingAuthorizationsOriginal from "./pages/Admin/Dashboard/PendingAuthorizations/PendingAuthorizationsOriginal";

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


                            {/* Help and Contact Routes */}
                            <Route path="/help" element={<HelpPage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                            <Route path="/faq" element={<Faq/>}/>


                            {/* User Auth */}
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>

                            {/* Viewer Routes */}
                            <Route path="/viewer" element={<ViewerRoute><ViewerDashboard/></ViewerRoute>}>
                                <Route index element={<Viewer/>}/>
                                <Route path="charts" element={<ChartsContainer/>}/>
                            </Route>

                            {/* Admin Routes */}
                            <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>}>
                                <Route index element={<Admin/>}/>
                                <Route path="create-election" element={<CreateElectionPage/>}/>
                                <Route path="viewers" element={<PendingAuthorizationsOriginal/>}/>
                                <Route path="edit/parties" element={<PartyList/>}/>
                                <Route path="edit/parties/:id" element={<PartyEdit/>}/>
                                <Route path="add/party" element={<PartyAdd/>}/>
                                <Route path="party-form" element={<PartyAdd/>}/>
                            </Route>


                        </Routes>
                        <Footer/>
                    </ErrorBoundary>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
