// src/locales/translations.ts

export const translations = {
    ENG: {
        download: {
            title: "Download NewLearnNote",
            subtitle: "AI-powered knowledge management platform for collaborative learning",
            windowsButton: "Windows Beta",
            windowsDescription: "Windows 10 or later • v0.1.0",
            macosButton: "macOS (Coming Soon)",
            macosDescription: "macOS 10.15 or later",
            betaWarning: {
                title: "⚠️ Beta Version:",
                description: "This is a beta release. So issues may arise during usage.",
                githubIssues: "GitHub Issues",
            },
            installationGuide: {
                title: "Installation Guide",
                steps: [
                    'Click the "Windows (Beta)" button to download',
                    'Your browser may show a security warning - click "Keep" or "Save"',
                    "Run the downloaded .exe file",
                    'If Windows Defender SmartScreen appears, click "More info" → "Run anyway"',
                    "Follow the installation wizard",
                ],
            },
            securityWarning: {
                title: "Why am I seeing security warnings?",
                description:
                    "NewLearnNote is currently in beta and doesn't have a code signing certificate yet. This will be resolved in the official release. The app is safe to use - you can verify the source code on our",
                githubRepo: "GitHub repository",
            },
        },
    },
    KOR: {
        download: {
            title: "NewLearnNote 다운로드",
            subtitle: "AI 기반 협업 학습을 위한 지식 관리 플랫폼",
            windowsButton: "Windows 베타",
            windowsDescription: "Windows 10 이상 • v0.1.0",
            macosButton: "macOS (준비 중)",
            macosDescription: "macOS 10.15 이상",
            betaWarning: {
                title: "⚠️ 베타 버전:",
                description: "베타 버전으로 버그나 예상치 못한 동작이 발생할 수 있습니다.",
            },
            installationGuide: {
                title: "설치 가이드",
                steps: [
                    '"Windows 베타" 버튼을 클릭하여 다운로드',
                    '브라우저에서 보안 경고가 표시될 수 있습니다 - "유지" 또는 "저장" 클릭',
                    "다운로드한 .exe 파일 실행",
                    'Windows Defender SmartScreen이 나타나면 "추가 정보" → "실행" 클릭',
                    "설치 마법사를 따라 설치 진행",
                ],
            },
            securityWarning: {
                title: "보안 경고가 뜨는 이유는?",
                description:
                    "NewLearnNote는 현재 베타 버전으로 코드 서명 인증서가 없습니다. 정식 출시 시 해결될 예정입니다. 앱은 안전하며, 소스 코드는",
                githubRepo: "GitHub 저장소",
            },
        },
    },
};

export type TranslationKey = keyof typeof translations.ENG;
