import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import type { Language } from "../translations";

interface AppLayoutProps {
    children: ReactNode;
    language: Language;
    setLanguage: (lang: Language) => void;
    studentProfile: { name: string; age: number; grade: string } | null;
    onEditProfile: () => void;
}

export function AppLayout({ children, language, setLanguage, studentProfile, onEditProfile }: AppLayoutProps) {
    const navigate = useNavigate();

    return (
        <div className="app-shell">
            <nav className="topbar">
                <div className="topbar-left" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <div className="logo-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                    </div>
                    <div className="logo-text">
                        <h1 className="logo-title">Vidya-Setu</h1>
                        <span className="logo-subtitle">AI COMMAND CENTER</span>
                    </div>
                </div>

                <div className="topbar-right-group">
                    {studentProfile && (
                        <div className="topbar-middle topbar-profile-info">
                            <div className="status-indicator"></div>
                            <span className="operator-label">OPERATOR:</span>
                            <span className="operator-name">{studentProfile.name.toLowerCase()}</span>
                            <span className="operator-separator">/</span>
                            <span className="operator-role">{studentProfile.grade}</span>
                        </div>
                    )}

                    <div className="topbar-right">
                        <button className="lang-btn exit-btn" onClick={() => navigate('/')} title="Back to Landing Page">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Home
                        </button>
                        <div className="lang-toggle">
                            <span className="lang-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                {language === 'hi' ? 'भाषा' : 'LANGUAGE / ಭಾಷೆ'}
                            </span>
                            <button className={`lang-btn ${language === 'en' ? 'active' : 'inactive'}`} onClick={() => setLanguage("en")}>English</button>
                            <button className={`lang-btn ${language === 'kn' ? 'active' : 'inactive'}`} onClick={() => setLanguage("kn")}>ಕನ್ನಡ</button>
                            <button className={`lang-btn ${language === 'hi' ? 'active' : 'inactive'}`} onClick={() => setLanguage("hi")}>हिंदी</button>
                        </div>
                        {studentProfile && (
                            <button className="edit-profile-btn" onClick={onEditProfile}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
}
