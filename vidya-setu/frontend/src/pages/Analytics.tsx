import { Activity, Clock, Target, Trophy, TrendingUp, Brain, Zap, CheckCircle, ChevronRight, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestResult {
    moduleId: number;
    score: number;
    total: number;
    timestamp: string;
}

interface AnalyticsProps {
    t: any;
    completedModules?: number[];
    testResults?: TestResult[];
}

export function Analytics({ t, completedModules = [], testResults = [] }: AnalyticsProps) {
    const navigate = useNavigate();

    const accuracy = testResults.length > 0
        ? Math.round(testResults.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / testResults.length * 1000) / 10
        : 0;

    return (
        <div className="analytics-container animate-fade-in-up" style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <main style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>

                {/* Header Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: 'transparent', color: 'var(--text-muted)', border: 'none',
                            cursor: 'pointer', marginBottom: '16px', fontSize: '0.9rem',
                            fontFamily: 'var(--font-sans)', fontWeight: 500,
                            padding: '8px 0', transition: 'color 0.2s', width: 'max-content'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        {t?.backToDashboard || "Back to Dashboard"}
                    </button>
                    <h1 style={{ color: '#f1f5f9', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                        {t?.learningAnalytics || "Your Learning Analytics"}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Brain size={16} color="var(--magenta)" />
                        <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>
                            {t?.performanceInsights || "Performance insights powered by Neural Engine v4.2"}
                        </p>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>

                    {/* Stat 1 */}
                    <div className="panel" style={{ position: 'relative', overflow: 'hidden', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)', transition: 'border-color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                        <div style={{ position: 'absolute', right: '-24px', top: '-24px', width: '96px', height: '96px', background: 'rgba(0, 240, 255, 0.05)', borderRadius: '50%', filter: 'blur(24px)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t?.timeInvested || "Time Invested"}</p>
                            <Clock color="var(--cyan)" size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.5))' }} />
                        </div>
                        <p style={{ color: '#f1f5f9', fontSize: '1.875rem', fontWeight: 700, marginBottom: '8px' }}>24h 42m</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0bda50', fontSize: '0.875rem', fontWeight: 500 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15l7-7 7 7" /></svg>
                            <span>12% {t?.thisWeek || "this week"}</span>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="panel" style={{ position: 'relative', overflow: 'hidden', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)', transition: 'border-color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(180, 0, 255, 0.3)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                        <div style={{ position: 'absolute', right: '-24px', top: '-24px', width: '96px', height: '96px', background: 'rgba(180, 0, 255, 0.05)', borderRadius: '50%', filter: 'blur(24px)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t?.averageAccuracy || "Average Accuracy"}</p>
                            <Target color="var(--magenta)" size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(180,0,255,0.5))' }} />
                        </div>
                        <p style={{ color: '#f1f5f9', fontSize: '1.875rem', fontWeight: 700, marginBottom: '8px' }}>{accuracy}%</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0bda50', fontSize: '0.875rem', fontWeight: 500 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15l7-7 7 7" /></svg>
                            <span>From {testResults.length} test{testResults.length === 1 ? '' : 's'}</span>
                        </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="panel" style={{ position: 'relative', overflow: 'hidden', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)', transition: 'border-color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                        <div style={{ position: 'absolute', right: '-24px', top: '-24px', width: '96px', height: '96px', background: 'rgba(0, 240, 255, 0.05)', borderRadius: '50%', filter: 'blur(24px)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t?.modulesMastered || "Modules Mastered"}</p>
                            <Trophy color="var(--cyan)" size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.5))' }} />
                        </div>
                        <p style={{ color: '#f1f5f9', fontSize: '1.875rem', fontWeight: 700, marginBottom: '8px' }}>{completedModules.length}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0bda50', fontSize: '0.875rem', fontWeight: 500 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15l7-7 7 7" /></svg>
                            <span>All time</span>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="panel" style={{ position: 'relative', overflow: 'hidden', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)', transition: 'border-color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(180, 0, 255, 0.3)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                        <div style={{ position: 'absolute', right: '-24px', top: '-24px', width: '96px', height: '96px', background: 'rgba(180, 0, 255, 0.05)', borderRadius: '50%', filter: 'blur(24px)' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t?.dailyStreak || "Daily Streak"}</p>
                            <Activity color="var(--magenta)" size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(180,0,255,0.5))' }} />
                        </div>
                        <p style={{ color: '#f1f5f9', fontSize: '1.875rem', fontWeight: 700, marginBottom: '8px' }}>12 {t?.days || "Days"}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0bda50', fontSize: '0.875rem', fontWeight: 500 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15l7-7 7 7" /></svg>
                            <span>1 {t?.day || "Day"}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>

                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 2 }}>

                        {/* Subject Time Distribution */}
                        <div className="panel flex flex-col gap-6" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                                <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{t?.subjectTimeDistribution || "Subject Time Distribution"}</h2>
                                <button style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--cyan)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>
                                    {t?.viewAll || "View All"} <ChevronRight size={16} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                        <p style={{ color: '#e2e8f0', fontWeight: 500 }}>Advanced Physics</p>
                                        <p style={{ color: 'var(--cyan)', fontFamily: 'monospace', fontSize: '0.875rem' }}>45%</p>
                                    </div>
                                    <div style={{ height: '6px', width: '100%', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', background: 'var(--cyan)', width: '45%', boxShadow: '0 0 10px rgba(0,240,255,0.8)' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                        <p style={{ color: '#e2e8f0', fontWeight: 500 }}>Multivariable Calculus</p>
                                        <p style={{ color: 'var(--magenta)', fontFamily: 'monospace', fontSize: '0.875rem' }}>30%</p>
                                    </div>
                                    <div style={{ height: '6px', width: '100%', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', background: 'var(--magenta)', width: '30%', boxShadow: '0 0 10px rgba(180,0,255,0.8)' }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                        <p style={{ color: '#e2e8f0', fontWeight: 500 }}>Computer Science</p>
                                        <p style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '0.875rem' }}>15%</p>
                                    </div>
                                    <div style={{ height: '6px', width: '100%', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', background: '#00ff88', width: '15%', boxShadow: '0 0 10px rgba(0,255,136,0.8)' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Cognitive Analysis */}
                        <div className="panel" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <Brain color="var(--cyan)" size={24} />
                                <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{t?.aiCognitiveAnalysis || "AI Cognitive Analysis"}</h2>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                {/* Strong Points */}
                                <div style={{ background: 'rgba(30, 41, 59, 0.4)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                        <CheckCircle size={16} color="#0bda50" />
                                        <h3 style={{ color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{t?.strongPoints || "Strong Points"}</h3>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', marginTop: '8px' }}></div>
                                            <div>
                                                <p style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 500 }}>Logical Reasoning</p>
                                                <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>Top 5% among peers in deductive problem solving.</p>
                                            </div>
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', marginTop: '8px' }}></div>
                                            <div>
                                                <p style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 500 }}>Pattern Recognition</p>
                                                <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>Exceptional speed in algorithmic visual tasks.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Areas for Growth */}
                                <div style={{ background: 'rgba(30, 41, 59, 0.4)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(180, 0, 255, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                        <TrendingUp size={16} color="#ff4444" style={{ transform: 'rotate(180deg)' }} />
                                        <h3 style={{ color: '#e2e8f0', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{t?.areasForGrowth || "Areas for Growth"}</h3>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--magenta)', marginTop: '8px' }}></div>
                                            <div>
                                                <p style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 500 }}>Conceptual Depth</p>
                                                <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>Struggles with theoretical derivations in Physics.</p>
                                            </div>
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--magenta)', marginTop: '8px' }}></div>
                                            <div>
                                                <p style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 500 }}>Time Management</p>
                                                <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>Tends to over-allocate time on complex single questions.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI Improvement Plan */}
                    <div style={{ flex: 1 }}>
                        <div className="panel" style={{ position: 'relative', overflow: 'hidden', padding: '32px', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 240, 255, 0.2)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '128px', height: '128px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '50%', filter: 'blur(48px)' }}></div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '128px', height: '128px', background: 'rgba(180, 0, 255, 0.1)', borderRadius: '50%', filter: 'blur(48px)' }}></div>

                            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <Zap color="var(--cyan)" size={24} className="animate-pulse-glow" />
                                    <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', textShadow: '0 0 10px rgba(0, 238, 255, 0.4)' }}>{t?.aiImprovementPlan || "AI Improvement Plan"}</h2>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '32px' }}>{t?.aiImprovementDesc || "Neural network generated steps to optimize your learning curve today."}</p>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {/* Step 1 */}
                                    <div style={{ display: 'flex', gap: '16px' }} className="group">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.2)', border: '1px solid rgba(0, 240, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 0 15px rgba(0, 238, 255, 0.3)', zIndex: 10, transition: 'all 0.3s' }}
                                                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--cyan)'; e.currentTarget.style.color = '#0f172a'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)'; e.currentTarget.style.color = 'var(--cyan)'; }}>1</div>
                                            <div style={{ width: '1px', height: '100%', background: '#334155', marginTop: '8px' }}></div>
                                        </div>
                                        <div style={{ paddingBottom: '24px' }}>
                                            <h4 style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: '4px' }}>Revisit Quantum Entanglement Quiz</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Your accuracy was 65%. A quick review of Bell's Theorem is recommended.</p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div style={{ display: 'flex', gap: '16px' }} className="group">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(180, 0, 255, 0.2)', border: '1px solid rgba(180, 0, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--magenta)', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 0 15px rgba(180, 0, 255, 0.3)', zIndex: 10, transition: 'all 0.3s' }}
                                                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--magenta)'; e.currentTarget.style.color = '#0f172a'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(180, 0, 255, 0.2)'; e.currentTarget.style.color = 'var(--magenta)'; }}>2</div>
                                            <div style={{ width: '1px', height: '100%', background: '#334155', marginTop: '8px' }}></div>
                                        </div>
                                        <div style={{ paddingBottom: '24px' }}>
                                            <h4 style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: '4px' }}>Practice Calculus Integrations</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Complete the 'Integration by Parts' micro-module to strengthen foundation.</p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div style={{ display: 'flex', gap: '16px' }} className="group">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1e293b', border: '1px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700, fontSize: '0.875rem', zIndex: 10, transition: 'all 0.3s' }}
                                                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.5)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#94a3b8'; }}>3</div>
                                        </div>
                                        <div>
                                            <h4 style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: '4px' }}>Read: Cognitive Load Theory</h4>
                                            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>A suggested 5-min read to improve your study session efficiency.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="animate-pulse-glow"
                                    style={{
                                        marginTop: '32px', width: '100%', padding: '16px', borderRadius: '12px',
                                        background: 'linear-gradient(to right, rgba(0, 240, 255, 0.8), rgba(180, 0, 255, 0.8))',
                                        color: 'white', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em',
                                        textTransform: 'uppercase', transition: 'all 0.3s',
                                        border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(180, 0, 255, 0.6)'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 238, 255, 0.4)'; }}
                                >
                                    <Navigation size={18} />
                                    {t?.activateLearningPath || "Activate Learning Path"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
