import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "../../styles/MarkdownRenderer.css";

interface MarkdownRendererProps {
    sectionId: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ sectionId }) => {
    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const { language } = useLanguage();

    useEffect(() => {
        loadMarkdownContent();
    }, [sectionId, language]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadMarkdownContent = async () => {
        setLoading(true);
        setError("");

        try {
            // First, try to get the latest version file for this section
            const latestFile = await getLatestFileForSection(sectionId);

            if (latestFile) {
                const response = await fetch(`/md/${language}/${sectionId}/${latestFile}`);

                if (response.ok) {
                    const content = await response.text();
                    setMarkdownContent(content);
                } else {
                    throw new Error(`Failed to load document: ${response.status}`);
                }
            } else {
                throw new Error("No files found for this section");
            }
        } catch (err) {
            console.error("Error loading markdown:", err);
            setError(err instanceof Error ? err.message : "Unknown error occurred");
            const notFoundMessage =
                language === "KOR"
                    ? "# 문서를 찾을 수 없습니다\n\n요청하신 문서를 찾을 수 없습니다."
                    : "# Document Not Found\n\nThe requested document could not be found.";
            setMarkdownContent(notFoundMessage);
        } finally {
            setLoading(false);
        }
    };

    const getLatestFileForSection = async (sectionId: string): Promise<string | null> => {
        try {
            // Fetch docs-structure.json to get file information
            const structureResponse = await fetch("/md/docs-structure.json");
            if (!structureResponse.ok) {
                throw new Error("Failed to load docs structure");
            }

            const structure = await structureResponse.json();
            const languageData = structure[language];

            if (!languageData || !languageData.sections) {
                throw new Error("Invalid docs structure");
            }

            // Find the section
            const section = languageData.sections.find((s: any) => s.id === sectionId);
            if (!section || !section.files || section.files.length === 0) {
                return null;
            }

            const files = section.files;

            // Sort files by version number (assuming format: name_x.y.z.md)
            const sortedFiles = files.sort((a: string, b: string) => {
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
        } catch (error) {
            console.error("Error getting latest file:", error);
            return null;
        }
    };

    if (loading) {
        return (
            <div className="markdown-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>{language === "KOR" ? "문서를 불러오는 중..." : "Loading document..."}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="markdown-container">
                <div className="error-message">
                    <h2>{language === "KOR" ? "오류가 발생했습니다" : "An error occurred"}</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="markdown-container">
            <article className="markdown-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => <h1 className="doc-h1">{children}</h1>,
                        h2: ({ children }) => <h2 className="doc-h2">{children}</h2>,
                        h3: ({ children }) => <h3 className="doc-h3">{children}</h3>,
                        h4: ({ children }) => <h4 className="doc-h4">{children}</h4>,
                        h5: ({ children }) => <h5 className="doc-h5">{children}</h5>,
                        h6: ({ children }) => <h6 className="doc-h6">{children}</h6>,
                        p: ({ children }) => <p className="doc-paragraph">{children}</p>,
                        ul: ({ children }) => <ul className="doc-list">{children}</ul>,
                        ol: ({ children }) => <ol className="doc-list doc-list-ordered">{children}</ol>,
                        li: ({ children }) => <li className="doc-list-item">{children}</li>,
                        code: ({ inline, children }) =>
                            inline ? (
                                <code className="doc-code-inline">{children}</code>
                            ) : (
                                <code className="doc-code-block">{children}</code>
                            ),
                        pre: ({ children }) => <pre className="doc-pre">{children}</pre>,
                        blockquote: ({ children }) => <blockquote className="doc-blockquote">{children}</blockquote>,
                        a: ({ href, children }) => (
                            <a href={href} className="doc-link" target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        ),
                        table: ({ children }) => (
                            <div className="doc-table-wrapper">
                                <table className="doc-table">{children}</table>
                            </div>
                        ),
                        th: ({ children }) => <th className="doc-th">{children}</th>,
                        td: ({ children }) => <td className="doc-td">{children}</td>,
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </article>
        </div>
    );
};

export default MarkdownRenderer;
