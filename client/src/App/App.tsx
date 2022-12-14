import {Routes, Route} from "react-router-dom";
import './App.css';

import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import PasswordReset from "../pages/PasswordReset"
import ForgotPassword from "../pages/ForgotPassword"
import UserPage from "../pages/UserPage";
import {Settings} from "../pages/Settings";
import {PageNotFound} from "../pages/PageNotFound";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="signIn" element={<SignIn/>}/>
                <Route path="/forgot-password" element ={<ForgotPassword/>}/>
                <Route path="/password-reset/:resetToken" element ={<PasswordReset/>}/>
                <Route path="/:username" element={<UserPage/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/path-not-found" element={<PageNotFound/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>

        </div>
    );
}

export default App;
