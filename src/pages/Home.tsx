import { useParams } from "react-router-dom";
import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import DocumentNavigation from "../components/docs/DocumentNavigation.tsx";
import MarkdownRenderer from "../components/docs/MarkdownRenderer.tsx";
import "../App.css";
import "../styles/DocsPage.css";

function Home() {
    const { sectionId } = useParams<{ sectionId?: string }>();

    // Default to introduction if no section is specified
    const currentSection = sectionId || "001_INTRODUCTION";

    return (
        <div className="app">
            <Header />
            <div className="docs-page-wrapper">
                <div className="docs-page-container">
                    <DocumentNavigation />
                    <main className="docs-page-content">
                        <MarkdownRenderer sectionId={currentSection} />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
