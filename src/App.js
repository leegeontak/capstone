import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import ReviewPage from "./pages/ReviewPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage></MainPage>}></Route>
                <Route
                    path="/reviewpage"
                    element={<ReviewPage></ReviewPage>}
                ></Route>
                <Route
                    path="/signuppage"
                    element={<SignUpPage></SignUpPage>}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
