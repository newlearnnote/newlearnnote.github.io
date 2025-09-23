import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "../../styles/Header.css";

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLanguageChange = (lang: 'KOR' | 'ENG') => {
        setLanguage(lang);
    };

    return (
        <header className="header">
            <div className="container" id="header-container">
                <Link to="https://newlearnnote.github.io/#/" className="logo">
                    <img width="32px" height="32px" src="/logo.png" alt="newlearnnote Logo" />
                    <p className="logo-text">NewLearn Note</p>
                </Link>
                <button className="hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`menu-section ${isMenuOpen ? "open" : ""}`}>
                    <div className="language-switcher">
                        <button
                            className={`lang-btn ${language === 'KOR' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('KOR')}
                        >
                            KOR
                        </button>
                        <span className="lang-divider">|</span>
                        <button
                            className={`lang-btn ${language === 'ENG' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('ENG')}
                        >
                            ENG
                        </button>
                    </div>
                    <div>
                        <a href="https://github.com/1Dohyeon" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
