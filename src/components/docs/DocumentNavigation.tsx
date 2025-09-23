import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "../../styles/DocumentNavigation.css";

interface DocSection {
    id: string;
    title: string;
    files: string[];
}

const DocumentNavigation = () => {
    const [sections, setSections] = useState<DocSection[]>([]);
    const location = useLocation();
    const { language } = useLanguage();

    useEffect(() => {
        loadDocumentStructure();
    }, [language]);

    const loadDocumentStructure = async () => {
        try {
            const response = await fetch("/md/docs-structure.json");
            if (response.ok) {
                const data = await response.json();
                setSections(data[language]?.sections || []);
            } else {
                // fallback to default structure
                setSections([
                    {
                        id: "001_INTRODUCTION",
                        title: language === "KOR" ? "소개" : "Introduction",
                        files: ["introduction_0.2.0.md"],
                    },
                ]);
            }
        } catch (error) {
            console.error("Error loading document structure:", error);
            // fallback to default structure
            setSections([
                {
                    id: "001_INTRODUCTION",
                    title: language === "KOR" ? "소개" : "Introduction",
                    files: ["introduction_0.2.0.md"],
                },
            ]);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getLatestVersion = (files: string[]) => {
        if (files.length === 0) return "";

        // Sort files by version number (assuming format: name_x.y.z.md)
        const sortedFiles = files.sort((a, b) => {
            const versionA = a.match(/(\d+)\.(\d+)\.(\d+)/);
            const versionB = b.match(/(\d+)\.(\d+)\.(\d+)/);

            if (!versionA || !versionB) return 0;

            const [, majorA, minorA, patchA] = versionA;
            const [, majorB, minorB, patchB] = versionB;

            if (majorA !== majorB) return parseInt(majorB) - parseInt(majorA);
            if (minorA !== minorB) return parseInt(minorB) - parseInt(minorA);
            return parseInt(patchB) - parseInt(patchA);
        });

        return sortedFiles[0];
    };

    const getCurrentPath = () => {
        const path = location.pathname;
        if (path === "/" || path === "/docs" || path === "/docs/") {
            return "/docs/001_INTRODUCTION";
        }
        return path;
    };

    return (
        <nav className="doc-navigation">
            <div className="nav-header">
                <h2>{language === "KOR" ? "문서" : "Documentation"}</h2>
            </div>
            <ul className="nav-list">
                {sections.map((section) => {
                    const sectionPath = `/docs/${section.id}`;
                    const isActive = getCurrentPath().startsWith(sectionPath);

                    return (
                        <li key={section.id} className={`nav-item ${isActive ? "active" : ""}`}>
                            <Link to={sectionPath} className="nav-link">
                                {section.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default DocumentNavigation;
