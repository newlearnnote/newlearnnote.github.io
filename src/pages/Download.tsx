import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { translations } from "../locales/download.ts";
import "../App.css";
import "../styles/Download.css";

function Download() {
    const { language } = useLanguage();
    const t = translations[language].download;

    // GitHub Release 다운로드 URL
    const GITHUB_RELEASE_URL =
        "https://github.com/newlearnnote/desktop-app/releases/download/v0.1.0-beta/NewLearnNote.Setup.0.1.0.exe";

    const handleWindowsDownload = () => {
        window.location.href = GITHUB_RELEASE_URL;
    };

    const handleMacOSDemo = () => {
        const message = language === "KOR" ? "macOS 버전 - 준비 중입니다!" : "macOS version - Coming soon!";
        alert(message);
    };

    return (
        <div className="app">
            <Header />
            <div className="download-page">
                <div className="download-container">
                    <div className="download-content">
                        <h1 className="download-title">{t.title}</h1>
                        <p className="download-subtitle">{t.subtitle}</p>

                        <div className="download-buttons">
                            <button className="download-button windows" onClick={handleWindowsDownload}>
                                <div className="button-icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3 5.45L9.5 4.5v5.5H3V5.45zM3 14v-3.5h6.5v5.5L3 14zm7.5-9.5L21 3v7h-10.5V4.5zm0 6.5H21v7l-10.5-1.5V11z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div className="button-content">
                                    <span className="button-title">{t.windowsButton}</span>
                                    <span className="button-description">{t.windowsDescription}</span>
                                </div>
                                <div className="button-arrow">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 2v13m0 0l-4-4m4 4l4-4"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </button>

                            <button className="download-button macos" onClick={handleMacOSDemo}>
                                <div className="button-icon">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div className="button-content">
                                    <span className="button-title">{t.macosButton}</span>
                                    <span className="button-description">{t.macosDescription}</span>
                                </div>
                                <div className="button-arrow">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 2v13m0 0l-4-4m4 4l4-4"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        <div className="download-note">
                            <p>
                                <strong>{t.betaWarning.title}</strong> {t.betaWarning.description}{" "}
                            </p>
                        </div>

                        <div className="download-info">
                            <h3>{t.installationGuide.title}</h3>
                            <ol>
                                {t.installationGuide.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>

                            <h3>{t.securityWarning.title}</h3>
                            <p>
                                {t.securityWarning.description}{" "}
                                <a
                                    href="https://github.com/newlearnnote/desktop-app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t.securityWarning.githubRepo}
                                </a>
                                {language === "KOR" ? "에서 확인할 수 있습니다." : "."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Download;
