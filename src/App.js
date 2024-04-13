import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import ReviewPage from "./pages/ReviewPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultPage from "./pages/SearchResultPage";

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
                <Route
                    path="/searchresultpage"
                    element={<SearchResultPage></SearchResultPage>}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
