import { useNavigate } from 'react-router-dom';
import type { Language } from '../translations';

interface LandingPageProps {
    language?: Language;
    setLanguage?: (lang: Language) => void;
    t?: any;
}

export function LandingPage({ language = "en", setLanguage, t }: LandingPageProps) {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Top Navigation - Simplified for Landing */}
            <nav className="topbar landing-nav">
                <div className="topbar-left">
                    <div className="logo-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                    </div>
                    <div className="logo-text">
                        <h1 className="logo-title">Vidya-Setu</h1>
                        {/* No subtitle on landing based on screenshot? Actually screenshot shows none or simple text */}
                    </div>
                </div>
                <div className="topbar-center hidden-mobile">
                    <ul className="nav-links">
                        <li><a href="#" className="active">{t?.home || "Home"}</a></li>
                        <li><a href="#features">{t?.features || "Features"}</a></li>
                        <li><a href="#about">{t?.aboutUs || "About Us"}</a></li>
                        <li><a href="#ecosystem">{t?.ecosystem || "Our Ecosystem"}</a></li>
                    </ul>
                </div>
                <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div className="language-toggle">
                        <button
                            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage?.('en')}
                        >
                            EN
                        </button>
                        <button
                            className={`lang-btn ${language === 'kn' ? 'active' : ''}`}
                            onClick={() => setLanguage?.('kn')}
                        >
                            ಕನ್ನಡ
                        </button>
                        <button
                            className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
                            onClick={() => setLanguage?.('hi')}
                        >
                            हिंदी
                        </button>
                    </div>

                    <button className="nav-btn" onClick={() => navigate('/dashboard')} style={{
                        background: 'transparent', border: 'none', color: '#e2e8f0',
                        fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', padding: '8px 16px'
                    }}>
                        Log In
                    </button>
                    <button className="auth-btn primary-btn" onClick={() => navigate('/dashboard')} style={{
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#0f172a', fontWeight: 700
                    }}>
                        Sign Up
                    </button>
                </div>
            </nav >

            {/* Main Hero Section */}
            < main className="hero-section" id="about" >
                <div className="hero-card animate-fade-in-up">
                    <div className="badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span>MODERN AI EDUCATIONAL PLATFORM</span>
                    </div>
                    <h1 className="hero-headline">{t?.landingHeroTitle || "Master Any Subject\nwith AI"}</h1>
                    <p className="hero-subheadline">
                        {t?.landingHeroSubtitle || "Experience the future of learning. Generate custom modules, take smart assessments, and track your progress with real-time analytics."}
                    </p>
                    <button className="primary-enter-btn animate-pulse-glow" onClick={() => navigate('/dashboard')}>
                        Start Learning for Free
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                </div>

                {/* Feature Grid */}
                <div className="feature-grid" id="features">
                    <div className="feature-card animate-fade-in-up delay-100">
                        <div className="feature-icon purple-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                        </div>
                        <h3>{t?.feature1Title || "AI Module Generation"}</h3>
                        <p>{t?.feature1Desc || "Instantly create highly-structured, personalized learning curriculums tailored to your exact needs and context."}</p>
                    </div>
                    <div className="feature-card animate-fade-in-up delay-200">
                        <div className="feature-icon mint-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                <path d="M9 16l2 2 4-4"></path>
                            </svg>
                        </div>
                        <h3>{t?.feature2Title || "Smart Assessments"}</h3>
                        <p>{t?.feature2Desc || "Test your knowledge with adaptive quizzes that identify your weak points and help you master the material faster."}</p>
                    </div>
                    <div className="feature-card animate-fade-in-up delay-300" id="ecosystem">
                        <div className="feature-icon blue-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                        </div>
                        <h3>{t?.feature3Title || "Real-time Analytics"}</h3>
                        <p>{t?.feature3Desc || "Track your learning journey with comprehensive dashboards, progress indicators, and actionable insights."}</p>
                    </div>
                </div>
            </main >

            {/* Background elements to match mockup */}
            < div className="bg-floating-icon flask-icon animate-float" >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 255, 128, 0.05)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3h6"></path>
                    <path d="M10 3v4.5l-3.5 8C5.5 17.5 6 21 8.5 21h7c2.5 0 3-3.5 2-5.5l-3.5-8V3"></path>
                </svg>
            </div >
            <div className="bg-floating-icon book-icon animate-float" style={{ animationDelay: '2s' }}>
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 0, 255, 0.05)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            </div>
        </div >
    );
}
