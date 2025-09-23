import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import ScrollToTop from "./components/common/ScrollToTop.tsx";
import "./App.css";
import Home from "./pages/Home.tsx";

function App() {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/docs" element={<Home />} />
                    <Route path="/docs/:sectionId" element={<Home />} />
                </Routes>
                <ScrollToTop />
            </Router>
        </LanguageProvider>
    );
}

export default App;
