import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import DocumentNavigation from "../components/docs/DocumentNavigation.tsx";
import MarkdownRenderer from "../components/docs/MarkdownRenderer.tsx";
import "../App.css";
import "../styles/Home.css";
import "../styles/DocsPage.css";

function Home() {
    const { sectionId } = useParams<{ sectionId?: string }>();
    const { language } = useLanguage();

    // Default to introduction if no section is specified
    const currentSection = sectionId || "001_INTRODUCTION";

    const downloadTexts = {
        ENG: {
            text: "You can download",
            appName: "NewLearn Note",
            linkText: "this page",
        },
        KOR: {
            text: "에서",
            appName: "NewLearn Note",
            linkText: "이곳",
            prefix: "를 다운로드 할 수 있습니다.",
        },
    };

    return (
        <div className="app">
            <Header />
            <div className="docs-page-wrapper">
                <div className="docs-page-container">
                    <DocumentNavigation />
                    <main className="docs-page-content">
                        {/* currentSection이 introduction 또는 overview일 때 다운로드 안내 표시 */}
                        {(currentSection === "001_INTRODUCTION" || currentSection === "002_OVERVIEW") && (
                            <div className="download-notice">
                                {language === "ENG" ? (
                                    <p>
                                        {downloadTexts.ENG.text} <strong>{downloadTexts.ENG.appName}</strong> in{" "}
                                        <Link to="/downloads/demo">{downloadTexts.ENG.linkText}</Link>
                                    </p>
                                ) : (
                                    <p>
                                        <Link to="/downloads/demo">{downloadTexts.KOR.linkText}</Link>
                                        {downloadTexts.KOR.text} <strong>{downloadTexts.KOR.appName}</strong>
                                        {downloadTexts.KOR.prefix}
                                    </p>
                                )}
                            </div>
                        )}
                        <MarkdownRenderer sectionId={currentSection} />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
