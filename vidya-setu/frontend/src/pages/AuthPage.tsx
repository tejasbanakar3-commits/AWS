import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function AuthPage() {
    const [tab, setTab] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [linkSent, setLinkSent] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);

    const validateGmail = (val: string) => {
        if (!val.endsWith('@gmail.com')) {
            setEmailError('Only @gmail.com addresses are accepted');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (e.target.value.includes('@')) validateGmail(e.target.value);
        else setEmailError('');
    };

    const handleSendLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateGmail(email)) return;
        setIsSending(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                    emailRedirectTo: `${window.location.origin}/dashboard`,
                }
            });
            if (error) throw error;
            setLinkSent(true);
        } catch (err: any) {
            setEmailError(err.message || 'Failed to send link. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    const handleOAuth = async (provider: 'google' | 'azure' | 'twitter') => {
        setOauthLoading(provider);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: { redirectTo: `${window.location.origin}/dashboard` }
            });
            if (error) throw error;
        } catch (err: any) {
            alert(`OAuth error: ${err.message}`);
            setOauthLoading(null);
        }
    };

    const bgStyle: React.CSSProperties = {
        minHeight: '100vh', width: '100vw',
        background: 'linear-gradient(135deg, #050914 0%, #0d1225 50%, #0a0a1f 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    };

    const cardStyle: React.CSSProperties = {
        width: '100%', maxWidth: '440px', margin: '24px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '28px', padding: '40px 36px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        position: 'relative', zIndex: 10
    };

    const orbs = [
        { size: 400, top: '-10%', left: '-10%', color: 'rgba(79,70,229,0.25)' },
        { size: 300, top: '60%', right: '-5%', color: 'rgba(139,92,246,0.2)' },
        { size: 250, top: '30%', left: '60%', color: 'rgba(245,158,11,0.1)' },
    ];

    const globalStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        @keyframes float-orb { from { transform:translate(0,0) scale(1); } to { transform:translate(20px,30px) scale(1.05); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse-glow { 0%,100% { box-shadow:0 8px 28px rgba(245,158,11,0.45); } 50% { box-shadow:0 8px 40px rgba(245,158,11,0.7); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    `;

    const OrbsBg = () => (
        <>
            {orbs.map((orb, i) => (
                <div key={i} style={{
                    position: 'absolute', borderRadius: '50%', width: orb.size, height: orb.size,
                    background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                    top: orb.top, left: (orb as any).left, right: (orb as any).right,
                    animation: `float-orb ${6 + i * 2}s ease-in-out infinite alternate`,
                    pointerEvents: 'none', filter: 'blur(40px)'
                }} />
            ))}
        </>
    );

    // ── "Link Sent" confirmation screen ──────────────────────────────────────
    if (linkSent) {
        return (
            <div style={bgStyle}>
                <OrbsBg />
                <div style={{ ...cardStyle, textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
                    <div style={{
                        width: '72px', height: '72px', borderRadius: '20px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px', fontSize: '32px',
                        animation: 'pulse-glow 2s ease-in-out infinite'
                    }}>✉️</div>
                    <h2 style={{ color: '#f1f5f9', fontSize: '1.7rem', fontWeight: 800, margin: '0 0 10px' }}>
                        Check Your Inbox!
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 24px' }}>
                        We sent a sign-in link to<br />
                        <strong style={{ color: '#f59e0b', fontSize: '1rem' }}>{email}</strong>
                    </p>

                    <div style={{
                        background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)',
                        borderRadius: '16px', padding: '20px', marginBottom: '28px', textAlign: 'left'
                    }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 10px', fontWeight: 700 }}>What to do next:</p>
                        {[
                            '📬 Open your Gmail inbox',
                            '🔍 Find the email from "Supabase Auth"',
                            '🔗 Click the "Confirm your mail" link',
                            "✅ You'll be logged into Vidya-Setu automatically!"
                        ].map((step, i) => (
                            <p key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '4px 0', lineHeight: 1.5 }}>{step}</p>
                        ))}
                    </div>

                    <p style={{ color: '#475569', fontSize: '0.8rem', margin: '0 0 16px' }}>
                        Didn't receive it? Check your spam folder.
                    </p>
                    <button onClick={() => { setLinkSent(false); setEmail(''); setEmailError(''); }} style={{
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px', color: '#94a3b8', padding: '10px 24px',
                        cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s'
                    }}>← Try a Different Email</button>
                </div>
                <style>{globalStyles}</style>
            </div>
        );
    }

    // ── Main auth form ────────────────────────────────────────────────────────
    return (
        <div style={bgStyle}>
            <OrbsBg />
            <div style={cardStyle}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 12px', fontSize: '26px',
                        boxShadow: '0 8px 24px rgba(245,158,11,0.4)'
                    }}>🌉</div>
                    <h1 style={{ color: '#f1f5f9', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px' }}>Vidya-Setu</h1>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Bridge to Knowledge</p>
                </div>

                {/* Tab toggle */}
                <div style={{
                    display: 'flex', background: 'rgba(255,255,255,0.04)',
                    borderRadius: '999px', padding: '4px', marginBottom: '28px',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    {(['signin', 'signup'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            flex: 1, padding: '10px', borderRadius: '999px', border: 'none',
                            cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.25s ease',
                            background: tab === t ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                            color: tab === t ? '#0f172a' : '#94a3b8',
                            boxShadow: tab === t ? '0 4px 12px rgba(245,158,11,0.35)' : 'none'
                        }}>
                            {t === 'signin' ? 'Sign In' : 'Sign Up'}
                        </button>
                    ))}
                </div>

                {/* OAuth Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {[
                        {
                            provider: 'google' as const, label: 'Continue with Google',
                            icon: (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>)
                        },
                        {
                            provider: 'azure' as const, label: 'Continue with Microsoft',
                            icon: (<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#f25022" d="M1 1h10v10H1z" /><path fill="#00a4ef" d="M13 1h10v10H13z" /><path fill="#7fba00" d="M1 13h10v10H1z" /><path fill="#ffb900" d="M13 13h10v10H13z" /></svg>)
                        },
                        {
                            provider: 'twitter' as const, label: 'Continue with X',
                            icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>)
                        }
                    ].map(({ provider, label, icon }) => (
                        <button key={provider} onClick={() => handleOAuth(provider as any)} disabled={!!oauthLoading}
                            style={{
                                width: '100%', padding: '13px 20px',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '14px', color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600,
                                cursor: oauthLoading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: '12px',
                                opacity: oauthLoading && oauthLoading !== provider ? 0.5 : 1
                            }}
                            onMouseEnter={e => { if (!oauthLoading) e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                            {oauthLoading === provider
                                ? <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#f59e0b', animation: 'spin 0.7s linear infinite' }} />
                                : icon}
                            {oauthLoading === provider ? 'Redirecting...' : label}
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ color: '#475569', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>or continue with email</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                {/* Email Form */}
                <form onSubmit={handleSendLink} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <input
                            type="email" value={email} onChange={handleEmailChange}
                            placeholder="yourname@gmail.com" required
                            style={{
                                width: '100%', padding: '14px 18px',
                                background: 'rgba(255,255,255,0.06)',
                                border: `1px solid ${emailError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '14px', color: '#f1f5f9', fontSize: '0.95rem', outline: 'none',
                                transition: 'all 0.2s', boxSizing: 'border-box'
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = emailError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                        />
                        {emailError
                            ? <p style={{ color: '#f87171', fontSize: '0.78rem', margin: '6px 0 0 4px' }}>⚠ {emailError}</p>
                            : <p style={{ color: '#475569', fontSize: '0.75rem', margin: '6px 0 0 4px' }}>Only @gmail.com addresses accepted</p>
                        }
                    </div>

                    <button type="submit" disabled={isSending || !email}
                        style={{
                            width: '100%', padding: '15px',
                            background: isSending ? 'rgba(245,158,11,0.4)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                            border: 'none', borderRadius: '14px', color: '#0f172a', fontWeight: 800,
                            fontSize: '1rem', cursor: isSending || !email ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(245,158,11,0.35)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                        onMouseEnter={e => { if (!isSending && email) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                        {isSending
                            ? <><div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#0f172a', animation: 'spin 0.7s linear infinite' }} /> Sending Link...</>
                            : '🔗 Send Sign-in Link'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', color: '#334155', fontSize: '0.75rem', marginTop: '20px', lineHeight: 1.5 }}>
                    By continuing, you agree to Vidya-Setu's Terms of Service
                </p>
            </div>
            <style>{globalStyles}</style>
        </div>
    );
}
