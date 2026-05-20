import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useInView, useScroll, useTransform, animate as motionAnimate } from 'motion/react';


// ------------ Tokens ------------
const c = {
  cream: '#FFF9F0',
  warmWhite: '#FFFCF5',
  coral: '#3E9360',
  coralDark: '#2F7349',
  coralSoft: '#A7E8C2',
  ink: '#1A1714',
  body: '#3D3832',
  muted: '#7A7268',
  sand: '#E8E0D4',
  sandDeep: '#D9CEBC',
  success: '#1F8A5B',
};

const sans = `Helvetica, 'Helvetica Neue', Arial, sans-serif`;
const serif = sans;

// ------------ Scroll animation wrapper ------------
function FadeIn({ children, delay = 0, y = 28, style = {}, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ------------ Small components ------------

function MapPinIcon({ size = 14, color = c.muted }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function KomosLogo({ height = 28, color = 'currentColor', style = {} }) {
  return (
    <svg
      viewBox="0 0 1175 398"
      height={height}
      style={{ display: 'block', color, ...style }}
      aria-label="Komos"
      role="img"
    >
      <path d="M877.17 167.64L876.94 232.34C876.79 269.7 909.23 305.19 949.4 305.34C989.57 305.49 1022.25 273.05 1022.4 232.88L1022.63 165.37C1022.78 125.2 990.34 92.52 950.17 92.37C910 92.22 877.32 124.66 877.17 167.63V167.64ZM914.82 231.51L915.02 165.98C915.08 147.28 930.3 132.17 949.01 132.25H951.04C969.72 132.34 984.81 147.53 984.74 166.22L984.54 231.75C984.48 250.45 969.26 265.56 950.55 265.48H948.52C929.84 265.39 914.75 250.2 914.82 231.51Z" fill="currentColor" />
      <path d="M517.801 167.64L517.571 232.34C517.421 269.7 549.861 305.19 590.031 305.34C630.201 305.49 662.881 273.05 663.031 232.88L663.261 165.37C663.411 125.2 630.971 92.52 590.801 92.37C550.631 92.22 517.951 124.66 517.801 167.63V167.64ZM555.451 231.51L555.651 165.98C555.711 147.28 570.931 132.17 589.641 132.25H591.671C610.351 132.34 625.441 147.53 625.371 166.22L625.171 231.75C625.111 250.45 609.891 265.56 591.181 265.48H589.151C570.471 265.39 555.381 250.2 555.451 231.51Z" fill="currentColor" />
      <path d="M520.51 100.3H473.33L426.15 192.17V130.48C426.15 112.34 411.44 97.63 393.3 97.63H382.23V300.09H393.3C411.44 300.09 426.15 285.38 426.15 267.24V205.56L473.33 297.42H520.51L469.89 198.86L520.51 100.3Z" fill="currentColor" />
      <path d="M1164.54 229.01L1081.02 147.49H1174.22V133.16C1174.22 115.02 1159.51 100.31 1141.37 100.31H1035.5V146.79C1035.5 155.48 1039.03 163.81 1045.27 169.85L1125.49 250.24H1065.53C1047.39 250.24 1032.68 264.95 1032.68 283.09V297.42H1174.23V251.97C1174.23 243.32 1170.74 235.04 1164.55 229L1164.54 229.01Z" fill="currentColor" />
      <path d="M802.461 146.43L773.701 212.06C773.101 213.86 767.101 213.85 766.501 212.06L737.741 146.43C724.671 115.34 707.101 101.64 680.301 101.64V298.76H722.921V195.15L738.541 241.48C749.011 270.62 791.021 271.09 801.661 241.48L817.281 195.15V298.76H859.901V101.64C833.101 101.64 815.531 115.34 802.461 146.43Z" fill="currentColor" />
      <path d="M80.63 165.51C86.16 168.88 93.08 164.25 92.2 157.84C77.47 49.91 0 0 0 0V58.28C9.08 88.85 29.79 134.5 80.63 165.51Z" fill="currentColor" />
      <path d="M58.78 209.39C61.77 207.92 62.01 203.73 59.2 201.95C31.67 184.4 12.71 166.33 0 148.76V255.18C17.02 224.36 58.78 209.38 58.78 209.38V209.39Z" fill="currentColor" />
      <path d="M80.84 245.61C80.84 245.61 39.4 254.88 0 314.67V397.72H21.87C47.79 372.81 81.17 327.5 91.82 253.66C92.71 247.51 86.42 242.87 80.84 245.61Z" fill="currentColor" />
      <path d="M210.301 157.84C209.421 164.25 216.351 168.88 221.871 165.51C272.711 134.5 293.421 88.85 302.501 58.28V0C302.501 0 225.031 49.91 210.301 157.84Z" fill="currentColor" />
      <path d="M243.3 201.94C240.49 203.72 240.73 207.92 243.72 209.38C243.72 209.38 285.48 224.36 302.5 255.18V148.76C289.79 166.33 270.83 184.4 243.3 201.94Z" fill="currentColor" />
      <path d="M221.66 245.61C216.09 242.87 209.79 247.52 210.68 253.66C221.33 327.51 254.7 372.82 280.63 397.72H302.5V314.67C263.1 254.88 221.67 245.6 221.66 245.6V245.61Z" fill="currentColor" />
      <path d="M231 0H71.5C155.76 102.32 158.83 289.5 80.17 397.72H222.32C143.67 289.5 146.74 102.32 231 0Z" fill="currentColor" />
    </svg>
  );
}

function CheckIcon({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SectionLabel({ children, accent = false, style = {} }) {
  return (
    <div style={{
      fontFamily: sans,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: accent ? c.coral : c.muted,
      ...style,
    }}>{children}</div>
  );
}

// ------------ Decorative nature background ------------
function NatureBackdrop() {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#FFF9F0" />
          <stop offset="60%" stopColor="#FBEFD9" />
          <stop offset="100%" stopColor="#F3D9B0" />
        </linearGradient>
        <radialGradient id="warmGlow" cx="0.82" cy="0.22" r="0.55">
          <stop offset="0%"  stopColor="#FBE5B3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FBE5B3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1600" height="900" fill="url(#skyGrad)" />
      <rect x="0" y="0" width="1600" height="900" fill="url(#warmGlow)" />
    </svg>
  );
}

// ------------ Nav ------------
function Nav() {
  return (
    <header style={{
      width: '100%',
      borderBottom: `1px solid ${c.sand}`,
      background: 'rgba(255, 249, 240, 0.78)',
      backdropFilter: 'saturate(140%) blur(8px)',
      WebkitBackdropFilter: 'saturate(140%) blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '18px 28px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <div style={{ color: c.ink, display: 'flex', alignItems: 'center' }}>
          <KomosLogo height={26} />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: sans,
          fontSize: 13,
          color: c.muted,
        }}>
          <MapPinIcon size={13} color={c.muted} />
          <span>City-based community</span>
        </div>
      </div>
    </header>
  );
}

// ------------ Waitlist form ------------
function WaitlistForm({ count, onJoined, centered = false, onDark = false }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const validate = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'submitting' || state === 'success') return;
    const v = email.trim().toLowerCase();
    if (!validate(v)) {
      setError('Please enter a valid email.');
      setState('error');
      return;
    }
    setError('');
    setState('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again.');
        setState('error');
        return;
      }
      if (!data.existing) onJoined('new');
      setTimeout(() => setState('success'), 380);
    } catch {
      setError('Something went wrong. Try again.');
      setState('error');
    }
  };

  const isSuccess = state === 'success';
  const isSubmitting = state === 'submitting';

  return (
    <div style={{ maxWidth: 520, width: '100%', margin: centered ? '0 auto' : undefined }}>
      <form onSubmit={submit} style={{ display: 'flex', gap: 10, alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px', position: 'relative', display: 'flex' }}>
          <input
            type="email"
            value={email}
            disabled={isSuccess || isSubmitting}
            onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="your@email.com"
            aria-label="Email address"
            style={{
              flex: 1,
              width: '100%',
              fontFamily: sans,
              fontSize: 15.5,
              color: c.ink,
              padding: '14px 16px',
              background: c.warmWhite,
              border: `1.5px solid ${focused ? c.coral : (state === 'error' ? c.coralDark : c.sand)}`,
              borderRadius: 10,
              outline: 'none',
              transition: 'border-color 160ms ease, background 160ms ease',
              opacity: isSuccess ? 0.7 : 1,
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="komos-waitlist-btn"
          style={{
            background: isSuccess ? c.success : c.coral,
            color: '#fff',
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.005em',
            padding: '14px 22px',
            border: 'none',
            borderRadius: 10,
            cursor: isSuccess ? 'default' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 180ms ease, transform 120ms ease',
            boxShadow: isSuccess
              ? '0 1px 0 rgba(0,0,0,0.04)'
              : '0 1px 0 rgba(0,0,0,0.04), 0 6px 18px rgba(62, 147, 96, 0.28)',
            transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
            minWidth: 168,
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => { if (!isSuccess && !isSubmitting) e.currentTarget.style.background = c.coralDark; }}
          onMouseLeave={(e) => { if (!isSuccess && !isSubmitting) e.currentTarget.style.background = c.coral; }}
        >
          {isSuccess ? (
            <><CheckIcon size={16} /><span>You're in!</span></>
          ) : isSubmitting ? 'Joining…' : 'Join the waitlist'}
        </button>
      </form>
      <div style={{
        marginTop: 12,
        minHeight: 20,
        fontFamily: sans,
        fontSize: 13.5,
        color: state === 'error'
          ? (onDark ? '#FFB4A1' : c.coralDark)
          : (onDark ? 'rgba(255, 249, 240, 0.78)' : c.muted),
        display: 'flex',
        alignItems: 'center',
        justifyContent: centered ? 'center' : 'flex-start',
        gap: 10,
        flexWrap: 'wrap',
        textShadow: onDark ? '0 1px 12px rgba(0,0,0,0.25)' : 'none',
      }}>
        {state === 'error' ? (
          <span>{error}</span>
        ) : isSuccess ? (
          <span style={{ color: onDark ? c.cream : c.body }}>
            We'll be in touch when your city opens up.
          </span>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: onDark ? c.coralSoft : c.coral }} />
            <span>We don't spam. You'll only receive an invitation for early access to the platform.</span>
          </span>
        )}
      </div>
    </div>
  );
}

// ------------ App mockup components ------------
function VerifiedBadge({ size = 12, color = c.coral }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5 4.5 5.4v6.2c0 4.7 3.2 8.4 7.5 9.9 4.3-1.5 7.5-5.2 7.5-9.9V5.4L12 2.5z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 12 11 14.5 15.5 9.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard({ title, when, where, going, hosted, accent = false }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.62)',
      backdropFilter: 'blur(14px) saturate(170%)',
      WebkitBackdropFilter: 'blur(14px) saturate(170%)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      borderRadius: 14,
      padding: '14px 14px 12px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: accent ? c.coralSoft : '#F0E9DA',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, color: accent ? c.coralDark : c.body, fontWeight: 700,
        }}>
          {accent ? '↗' : '☕'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: c.ink, letterSpacing: '-0.005em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          <div style={{ fontSize: 10.5, color: c.muted, marginTop: 2 }}>{when} · {where}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex' }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width: 18, height: 18, borderRadius: '50%',
                background: ['#E8C6A8','#C9DDC4','#E0D2C0','#D9CEBC'][i],
                border: '1.5px solid #fff',
                marginLeft: i === 0 ? 0 : -5,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 10.5, color: c.body, fontWeight: 600 }}>{going} going</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: c.muted }}>
          <VerifiedBadge size={11} color={c.coral} />
          <span>{hosted}</span>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, active = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 10px', borderRadius: 10,
      background: active ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
      color: active ? c.coralDark : c.body,
      fontSize: 11.5, fontWeight: active ? 700 : 500,
      cursor: 'default',
      border: active ? '1px solid rgba(255,255,255,0.7)' : '1px solid transparent',
      boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.6)' : 'none',
      backdropFilter: active ? 'blur(8px)' : 'none',
      WebkitBackdropFilter: active ? 'blur(8px)' : 'none',
    }}>
      <span style={{
        width: 14, height: 14, borderRadius: 5,
        background: active ? c.coral : 'transparent',
        border: active ? 'none' : `1.5px solid ${c.muted}`,
        flexShrink: 0,
      }} />
      <span>{label}</span>
    </div>
  );
}

function PhoneMapMockup() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -55]);

  const avatars = [
    { sx: -70, sy: -86,  bg: '#E8C6A8', fg: '#8C4A23', initial: 'M', delay: 0    },
    { sx:  76, sy: -78,  bg: '#C9DDC4', fg: '#2F7349', initial: 'T', delay: 1.4  },
    { sx:  86, sy:  -8,  bg: '#E0D2C0', fg: '#7A4F2A', initial: 'I', delay: 2.8  },
    { sx: -80, sy:  60,  bg: '#D9CEBC', fg: '#6B5A3D', initial: 'L', delay: 4.2  },
    { sx: -94, sy: -34,  bg: '#C5DCEC', fg: '#284B6E', initial: 'S', delay: 5.6  },
  ];

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="komos-phone-float komos-mockup-phone"
      style={{ y,
        position: 'absolute',
        right: 'clamp(10px, 3vw, 50px)',
        top: 'clamp(-20px, 0vw, 10px)',
        width: 'clamp(180px, 19vw, 230px)',
        aspectRatio: '9 / 19',
        zIndex: 5,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 14px 28px rgba(15, 42, 30, 0.14)) drop-shadow(0 4px 8px rgba(15, 42, 30, 0.06))',
      }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        background: '#0E1714', borderRadius: 32, padding: 6,
        boxShadow: '0 6px 16px rgba(15, 42, 30, 0.10), inset 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 26,
          overflow: 'hidden', background: '#F4EFE3',
          position: 'relative', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
            width: '36%', height: 16, background: '#0E1714', borderRadius: 999, zIndex: 6,
          }} />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 16px 4px', fontSize: 9, fontWeight: 700, color: c.ink,
            position: 'relative', zIndex: 5,
          }}>
            <span>9:41</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              width: 14, height: 7, border: `1px solid ${c.ink}`, borderRadius: 1.5, padding: 1,
            }}>
              <span style={{ flex: 1, background: c.ink, borderRadius: 0.5, height: '100%' }} />
            </span>
          </div>
          <div style={{
            padding: '10px 14px 8px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 8, position: 'relative', zIndex: 5,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPinIcon size={11} color={c.coral} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: c.ink }}>Lisbon · Map</span>
            </div>
            <span style={{ fontSize: 9, color: c.muted, fontWeight: 600 }}>8 nearby</span>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <rect x="0" y="0" width="200" height="280" fill="#F4EFE3" />
              <path d="M0 0 L72 0 L82 30 L62 64 L0 54 Z" fill="#C9DDC4" opacity="0.75" />
              <circle cx="22" cy="22" r="3" fill="#9CC1A5" opacity="0.65" />
              <circle cx="42" cy="36" r="3" fill="#9CC1A5" opacity="0.65" />
              <circle cx="58" cy="18" r="2.5" fill="#9CC1A5" opacity="0.65" />
              <path d="M0 222 Q 60 202, 100 232 T 200 240 L 200 280 L 0 280 Z" fill="#C5D8DC" opacity="0.7" />
              <g fill="#ECE5D6">
                <rect x="82" y="50"  width="40" height="30" rx="3" />
                <rect x="130" y="40" width="50" height="40" rx="3" />
                <rect x="20" y="80"  width="35" height="35" rx="3" />
                <rect x="80" y="100" width="42" height="40" rx="3" />
                <rect x="132" y="92" width="50" height="50" rx="3" />
                <rect x="20" y="150" width="35" height="40" rx="3" />
                <rect x="70" y="170" width="42" height="35" rx="3" />
                <rect x="130" y="160" width="52" height="45" rx="3" />
              </g>
              <path d="M-4 132 L204 110" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
              <g stroke="#FFFFFF" strokeWidth="1.4" opacity="0.55">
                <line x1="62" y1="0" x2="62" y2="220" />
                <line x1="124" y1="0" x2="124" y2="220" />
                <line x1="0" y1="68" x2="200" y2="68" />
              </g>
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 4 }}>
              <div className="komos-pin-pulse" style={{
                position: 'absolute', top: -16, left: -16,
                width: 32, height: 32, borderRadius: '50%', background: c.coral,
              }} />
              <div style={{
                position: 'absolute', top: -13, left: -13,
                width: 26, height: 26, borderRadius: '50%',
                background: c.coral, border: '2.5px solid #fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}>
                <MapPinIcon size={11} color="#fff" />
              </div>
            </div>
            {avatars.map((av, i) => (
              <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 3 }}>
                <div
                  className="komos-av"
                  style={{
                    position: 'absolute',
                    width: 22, height: 22, top: -11, left: -11,
                    borderRadius: '50%', background: av.bg,
                    border: '2px solid #fff', boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: av.fg,
                    '--sx': av.sx + 'px',
                    '--sy': av.sy + 'px',
                    animationDelay: av.delay + 's',
                  }}
                >
                  {av.initial}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '8px 10px 12px', background: 'linear-gradient(180deg, rgba(244,239,227,0) 0%, rgba(244,239,227,0.92) 35%, rgba(244,239,227,1) 100%)' }}>
            <div style={{
              background: 'rgba(255, 252, 245, 0.85)',
              backdropFilter: 'blur(10px) saturate(160%)',
              WebkitBackdropFilter: 'blur(10px) saturate(160%)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              borderRadius: 12, padding: '8px 11px',
              boxShadow: '0 6px 14px rgba(15, 42, 30, 0.10)',
            }}>
              <div style={{ fontSize: 8.5, color: c.coral, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Sunset hike</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.ink, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cristo Rei · 8 going</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WebAppMockup() {
  return (
    <div className="komos-mockup-root" style={{
      position: 'relative',
      marginTop: 'clamp(40px, 6vw, 64px)',
      width: '100%',
      maxWidth: 980,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div className="komos-mockup-badge" style={{
        position: 'absolute', left: 'clamp(-12px, 1vw, 14px)', top: 'clamp(50px, 8vw, 90px)',
        background: 'rgba(255, 255, 255, 0.62)', backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)', border: '1px solid rgba(255, 255, 255, 0.65)',
        borderRadius: 18, padding: '12px 14px',
        boxShadow: '0 10px 28px rgba(15, 42, 30, 0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
        display: 'flex', alignItems: 'center', gap: 10, zIndex: 3, maxWidth: 230,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1E8D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <VerifiedBadge size={16} color={c.coral} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: c.ink, lineHeight: 1.2 }}>Verified Erasmus</div>
          <div style={{ fontSize: 10.5, color: c.muted, marginTop: 1 }}>Maria · NOVA Lisbon</div>
        </div>
      </div>

      <div className="komos-mockup-badge" style={{
        position: 'absolute', left: 'clamp(-12px, 1vw, 14px)', bottom: 'clamp(40px, 7vw, 90px)',
        background: 'rgba(255, 255, 255, 0.62)', backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)', border: '1px solid rgba(255, 255, 255, 0.65)',
        borderRadius: 18, padding: '12px 14px',
        boxShadow: '0 10px 28px rgba(15, 42, 30, 0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
        zIndex: 3, maxWidth: 250, textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 11,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E0EBDC', color: '#2F5A43', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>S</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 10, color: c.coralDark, marginBottom: 3, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>New plan · 2 min ago</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: c.ink, lineHeight: 1.3 }}>Sara invited you to a Sunday picnic at Parque Eduardo VII</div>
        </div>
      </div>

      <PhoneMapMockup />

      <div className="komos-mockup-window" style={{
        position: 'relative', width: '100%', aspectRatio: '16 / 10',
        background: 'rgba(255, 252, 245, 0.62)',
        backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        borderRadius: 20,
        boxShadow: '0 24px 60px rgba(15, 42, 30, 0.14), 0 6px 14px rgba(15, 42, 30, 0.06), inset 0 1px 0 rgba(255,255,255,0.55)',
        overflow: 'hidden', zIndex: 2, display: 'flex', flexDirection: 'column',
        border: '1px solid rgba(255, 255, 255, 0.55)',
        WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 72%, rgba(0,0,0,0.35) 92%, transparent 100%)',
        maskImage: 'linear-gradient(180deg, #000 0%, #000 72%, rgba(0,0,0,0.35) 92%, transparent 100%)',
      }}>
        <div style={{
          height: 38,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(244, 238, 222, 0.30))',
          backdropFilter: 'blur(12px) saturate(180%)', WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          borderBottom: '1px solid rgba(217, 206, 188, 0.45)',
          display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', flexShrink: 0,
        }}>
          <span style={{ display: 'inline-flex', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)' }} />
          </span>
          <div style={{
            flex: 1, margin: '0 auto', maxWidth: 280,
            background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.65)', borderRadius: 999,
            padding: '4px 14px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: c.body,
            justifyContent: 'center',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: c.coral }} />
            <span style={{ color: c.muted }}>komos.app</span>
            <span style={{ color: c.ink, fontWeight: 600 }}>/lisbon</span>
          </div>
          <span style={{ width: 36 }} />
        </div>

        <div className="komos-app-body" style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div className="komos-app-sidebar" style={{
            width: 'clamp(132px, 18%, 170px)',
            borderRight: '1px solid rgba(217, 206, 188, 0.45)',
            background: 'linear-gradient(180deg, rgba(247, 241, 228, 0.55), rgba(247, 241, 228, 0.25))',
            backdropFilter: 'blur(16px) saturate(160%)', WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0,
          }}>
            <div style={{ color: c.ink, padding: '2px 8px 6px' }}>
              <KomosLogo height={16} color={c.ink} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <SidebarItem label="Plans" active />
              <SidebarItem label="Map" />
              <SidebarItem label="People" />
              <SidebarItem label="Chats" />
            </div>
            <div style={{
              marginTop: 'auto', padding: '10px', borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid rgba(255, 255, 255, 0.6)`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E8C6A8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#8C4A23', flexShrink: 0 }}>M</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: c.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Maria Silva</div>
                <div style={{ fontSize: 9.5, color: c.muted, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <VerifiedBadge size={9} color={c.coral} />
                  <span>Erasmus · NOVA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="komos-app-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: c.cream }}>
            <div style={{
              padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              borderBottom: `1px solid rgba(217, 206, 188, 0.45)`, flexShrink: 0,
            }}>
              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontSize: 9.5, color: c.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MapPinIcon size={10} color={c.coral} />
                  <span>Your city · Lisbon</span>
                </div>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 22, lineHeight: 1.05, color: c.ink, letterSpacing: '-0.025em', marginTop: 3 }}>Plans this week</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10.5, color: c.muted, fontWeight: 600, flexShrink: 0 }}>
                <span><strong style={{ color: c.coral, fontWeight: 700 }}>23</strong> plans</span>
                <span style={{ width: 1, height: 12, background: 'rgba(217, 206, 188, 0.7)' }} />
                <span><strong style={{ color: c.ink, fontWeight: 700 }}>142</strong> verified</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 6, padding: '12px 20px 10px', flexShrink: 0, overflow: 'hidden' }}>
              {[{ l: 'All', active: true }, { l: 'Coffee' }, { l: 'Outdoors' }, { l: 'Language' }, { l: 'Food' }, { l: 'Nightlife' }].map(p => (
                <span key={p.l} style={{
                  fontSize: 10.5, fontWeight: 600, padding: '5px 12px', borderRadius: 999,
                  background: p.active ? c.ink : 'rgba(255, 255, 255, 0.55)',
                  color: p.active ? c.cream : c.body,
                  border: p.active ? `1px solid ${c.ink}` : '1px solid rgba(255, 255, 255, 0.65)',
                  backdropFilter: p.active ? 'none' : 'blur(8px)',
                  WebkitBackdropFilter: p.active ? 'none' : 'blur(8px)',
                  boxShadow: p.active ? '0 4px 10px rgba(0,0,0,0.18)' : 'inset 0 1px 0 rgba(255,255,255,0.5)',
                  whiteSpace: 'nowrap',
                }}>{p.l}</span>
              ))}
            </div>

            <div style={{ padding: '4px 20px 18px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, flex: 1, minHeight: 0, alignContent: 'start' }}>
              <PlanCard title="Sunset hike to Cristo Rei" when="Tonight 18:30" where="Cais do Sodré" going={8} hosted="Tomás" accent />
              <PlanCard title="PT ↔ EN language meetup" when="Tue 19:00" where="Café Tati" going={5} hosted="Inés" />
              <PlanCard title="Saturday market run" when="Sat 10:00" where="LX Factory" going={4} hosted="Luca" />
              <PlanCard title="Coffee + study session" when="Wed 15:00" where="Hello, Kristof" going={6} hosted="Anna" />
              <PlanCard title="Beach day at Carcavelos" when="Sun 11:00" where="Train from Cais" going={11} hosted="Diego" accent />
              <PlanCard title="Fado night intro" when="Thu 21:00" where="Alfama" going={7} hosted="Beatriz" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------ Hero ------------
function Hero({ count, onJoined }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: c.cream }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 38%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.15) 85%, transparent 100%)',
        maskImage: 'linear-gradient(180deg, #000 0%, #000 38%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.15) 85%, transparent 100%)',
      }}>
        <NatureBackdrop />
      </div>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255, 249, 240, 0) 0%, rgba(255, 249, 240, 0) 35%, rgba(255, 249, 240, 0.45) 65%, rgba(255, 249, 240, 0.92) 88%, rgba(255, 249, 240, 1) 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 1100, width: '100%',
        margin: '0 auto', padding: 'clamp(56px, 9vw, 110px) 28px clamp(28px, 4vw, 60px)',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 14px', background: 'rgba(167, 232, 194, 0.45)',
            color: c.coralDark, fontFamily: sans, fontSize: 12.5, fontWeight: 600,
            letterSpacing: '0.04em', borderRadius: 999,
            border: `1px solid rgba(62, 147, 96, 0.25)`,
            backdropFilter: 'blur(8px) saturate(180%)', WebkitBackdropFilter: 'blur(8px) saturate(180%)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.coral }} />
          For Erasmus &amp; ESC participants
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          style={{
            fontFamily: serif, fontWeight: 700, color: c.ink,
            fontSize: 'clamp(40px, 6.4vw, 72px)', lineHeight: 1.06, letterSpacing: '-0.025em',
            margin: '26px 0 22px', maxWidth: 900, textWrap: 'balance',
          }}
        >
          Find your people in a new city.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
          style={{
            fontFamily: sans, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.5,
            color: c.body, maxWidth: 720, margin: '0 0 38px', textWrap: 'balance',
          }}
        >
          You moved abroad. You know nobody. Komos is the verified,
          city-scoped community that changes that.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <WaitlistForm count={count} onJoined={onJoined} centered />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <WebAppMockup />
        </motion.div>
      </div>
    </section>
  );
}

// ------------ Problem / Solution ------------
function ShieldCheckIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5 4.5 5.4v6.2c0 4.7 3.2 8.4 7.5 9.9 4.3-1.5 7.5-5.2 7.5-9.9V5.4L12 2.5z" />
      <path d="M8.6 12.2l2.4 2.4L15.7 9.5" />
    </svg>
  );
}

function CityPinIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 20.5h18" /><path d="M5.5 20.5V11l3.5-2.5v12" />
      <path d="M9 20.5v-8h3.5v8" /><path d="M12.5 20.5V9l3.5 2v9.5" />
      <path d="M16 20.5v-5.5l3 1v4.5" /><circle cx="9" cy="5.4" r="1.6" />
      <path d="M9 6.9v1.6" />
    </svg>
  );
}

function PlanIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8.5" cy="8" r="2.6" /><circle cx="16" cy="9.2" r="2.2" />
      <path d="M3 20c0-3 2.5-5.5 5.5-5.5S14 17 14 20" />
      <path d="M13.5 20c0-2.3 1.7-4.2 4-4.2 1.4 0 2.6.7 3.3 1.8" />
    </svg>
  );
}

function GlobeIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
      <path d="M12 3c2.6 3 3.9 6 3.9 9s-1.3 6-3.9 9c-2.6-3-3.9-6-3.9-9s1.3-6 3.9-9z" />
    </svg>
  );
}

function BentoCard({ children, style = {}, ...rest }) {
  return (
    <div style={{
      background: 'rgba(255, 252, 245, 0.62)', backdropFilter: 'blur(20px) saturate(170%)',
      WebkitBackdropFilter: 'blur(20px) saturate(170%)', border: '1px solid rgba(255, 255, 255, 0.6)',
      borderRadius: 22, padding: '26px 26px 24px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 6px 18px rgba(15, 42, 30, 0.05)',
      display: 'flex', flexDirection: 'column', gap: 14, ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

function IconChip({ icon: Icon, accent = false }) {
  return (
    <div style={{
      width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: accent
        ? 'linear-gradient(135deg, rgba(167,232,194,0.85), rgba(62,147,96,0.30))'
        : 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(241,232,217,0.6))',
      color: accent ? c.coralDark : c.coral,
      border: '1px solid rgba(255, 255, 255, 0.7)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.65)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', flexShrink: 0,
    }}>
      <Icon size={26} />
    </div>
  );
}

function CardTitle({ children }) {
  return <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: c.ink, letterSpacing: '-0.018em', lineHeight: 1.18 }}>{children}</div>;
}

function CardBody({ children }) {
  return <div style={{ fontFamily: sans, fontSize: 14.5, lineHeight: 1.6, color: c.body, textWrap: 'pretty' }}>{children}</div>;
}

function CardEyebrow({ children, accent = true }) {
  return <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: accent ? c.coral : c.muted, textTransform: 'uppercase' }}>{children}</span>;
}

function ProblemSolution() {
  return (
    <section style={{ borderBottom: `1px solid ${c.sand}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px, 7vw, 80px) 28px clamp(64px, 9vw, 110px)' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <SectionLabel accent style={{ display: 'inline-block' }}>Why Komos exists</SectionLabel>
          <h2 style={{ fontFamily: serif, fontWeight: 700, color: c.ink, fontSize: 'clamp(28px, 3.4vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '14px auto 0', maxWidth: 720, textWrap: 'balance' }}>
            Mobility leaves your social life to chance. We fix that.
          </h2>
        </FadeIn>

        <div className="komos-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 'clamp(14px, 1.8vw, 20px)' }}>
          <FadeIn style={{ gridColumn: 'span 3', gridRow: 'span 2' }} delay={0.05}>
          <BentoCard style={{ height: '100%', padding: '30px 30px 28px', gap: 18, minHeight: 380, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <CardEyebrow accent={false}>The reality</CardEyebrow>
                <span style={{ fontFamily: sans, fontSize: 11.5, color: c.muted, fontWeight: 500 }}>EU mobility · annual</span>
              </div>
              <IconChip icon={GlobeIcon} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontFamily: serif, fontWeight: 700, color: c.ink, fontSize: 'clamp(56px, 7vw, 92px)', lineHeight: 0.92, letterSpacing: '-0.04em' }}>
                  1.5<span style={{ color: c.coral }}>M</span>
                </div>
                <div style={{ fontFamily: sans, fontSize: 17, fontWeight: 600, color: c.ink, lineHeight: 1.3, letterSpacing: '-0.012em', marginTop: 10, maxWidth: 360 }}>
                  People relocate every year through EU mobility programmes.
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(217, 206, 188, 0.55)' }} />
              <CardBody>
                Most arrive alone. They don't know who else is around. The social side is left to luck: a random roommate, a WhatsApp group, an ESN event you hear about too late. Between those moments, you're on your own.
              </CardBody>
            </div>
          </BentoCard>
          </FadeIn>

          <FadeIn style={{ gridColumn: 'span 3' }} delay={0.12}>
          <BentoCard style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconChip icon={ShieldCheckIcon} accent />
              <CardEyebrow>01 / Trust</CardEyebrow>
            </div>
            <CardTitle>Verified &amp; safe</CardTitle>
            <CardBody>Only confirmed Erasmus and ESC participants. No strangers, no guessing. Safe by design, not just by moderation.</CardBody>
          </BentoCard>
          </FadeIn>

          <FadeIn style={{ gridColumn: 'span 3' }} delay={0.2}>
          <BentoCard style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconChip icon={CityPinIcon} />
              <CardEyebrow>02 / Local</CardEyebrow>
            </div>
            <CardTitle>City-scoped</CardTitle>
            <CardBody>See who's in your city right now. Not a global feed: your city, your people, this week.</CardBody>
          </BentoCard>
          </FadeIn>

          <FadeIn style={{ gridColumn: 'span 6' }} delay={0.1}>
          <BentoCard style={{ padding: '26px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconChip icon={PlanIcon} accent />
              <CardEyebrow>03 / Action</CardEyebrow>
            </div>
            <CardTitle>Plan-first, not profile-first</CardTitle>
            <CardBody>Connect through doing something together, not endless browsing.</CardBody>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Coffee run', 'Sunset hike', 'Language meetup', 'Market trip'].map(label => (
                <span key={label} style={{
                  fontSize: 12, padding: '6px 12px', borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.65)', color: c.body, fontWeight: 600,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                }}>{label}</span>
              ))}
            </div>
          </BentoCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ------------ Feature showcase ------------
function ShowcaseArt() {
  return (
    <svg viewBox="0 0 700 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="skyArt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE0B6" /><stop offset="55%" stopColor="#F4B69E" /><stop offset="100%" stopColor="#E89A6E" />
        </linearGradient>
        <linearGradient id="waterArt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9C4A8" /><stop offset="100%" stopColor="#C4A78A" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="700" height="520" fill="url(#skyArt)" />
      <circle cx="500" cy="280" r="44" fill="#FFF1CC" opacity="0.95" />
      <path d="M0 360 L120 320 L220 345 L320 305 L430 340 L540 310 L640 345 L700 325 L700 380 L0 380 Z" fill="#B16A48" opacity="0.55" />
      <g fill="#7C3F26" opacity="0.85" transform="translate(440 240)">
        <rect x="20" y="60" width="14" height="42" /><rect x="14" y="100" width="26" height="6" />
        <rect x="22" y="20" width="10" height="40" /><circle cx="27" cy="14" r="9" />
      </g>
      <path d="M0 400 L100 380 L210 395 L340 370 L460 392 L580 372 L700 388 L700 440 L0 440 Z" fill="#9C4D2F" opacity="0.7" />
      <rect x="0" y="430" width="700" height="40" fill="url(#waterArt)" />
      <g stroke="#FFFFFF" strokeWidth="1" opacity="0.35">
        <line x1="40" y1="448" x2="160" y2="448" /><line x1="220" y1="454" x2="320" y2="454" />
        <line x1="370" y1="446" x2="500" y2="446" /><line x1="540" y1="455" x2="640" y2="455" />
      </g>
      <rect x="0" y="470" width="700" height="50" fill="#6E4128" />
      <g transform="translate(280 478)"><circle cx="0" cy="0" r="4" fill="#F4EFE3" /><rect x="-2" y="3" width="4" height="10" fill="#F4EFE3" /></g>
      <g transform="translate(420 478)"><circle cx="0" cy="0" r="4" fill="#F4EFE3" /><rect x="-2" y="3" width="4" height="10" fill="#F4EFE3" /></g>
    </svg>
  );
}

function FeatureShowcase() {
  return (
    <section style={{ background: c.cream, borderBottom: `1px solid ${c.sand}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(64px, 9vw, 110px) 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FadeIn>
          <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: c.coral, textTransform: 'uppercase' }}>Inside Komos</span>
          <h2 style={{ fontFamily: serif, fontWeight: 700, color: c.ink, fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1.06, letterSpacing: '-0.028em', margin: '22px 0 12px', maxWidth: 760, textWrap: 'balance' }}>
            Built for showing up, not scrolling.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.55, color: c.muted, margin: '0 auto clamp(36px, 5vw, 60px)', maxWidth: 540, textWrap: 'balance', textAlign: 'center' }}>
            Every screen pushes you toward one thing: meeting your people in real life, this week.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} style={{ width: '100%', maxWidth: 960 }}>
        <div style={{ width: '100%', maxWidth: 960,
          width: '100%', maxWidth: 960, borderRadius: 22,
          background: 'rgba(251, 247, 238, 0.62)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          boxShadow: '0 20px 50px rgba(15, 42, 30, 0.10), 0 6px 14px rgba(15, 42, 30, 0.05), inset 0 1px 0 rgba(255,255,255,0.55)',
          border: '1px solid rgba(255, 255, 255, 0.6)', overflow: 'hidden',
        }}>
          <div style={{ height: 36, background: 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(240,234,221,0.45))', borderBottom: `1px solid rgba(217, 206, 188, 0.5)`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px' }}>
            <span style={{ display: 'inline-flex', gap: 6 }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
            </span>
          </div>

          <div className="komos-showcase" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(320px, 38vw, 460px)' }}>
            <div style={{ padding: 'clamp(28px, 4vw, 56px)', display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'left', justifyContent: 'center' }}>
              <CardEyebrow>Plan · Tonight 18:30</CardEyebrow>
              <h3 style={{ fontFamily: serif, fontWeight: 700, color: c.ink, fontSize: 'clamp(22px, 2.4vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.022em', margin: 0, textWrap: 'balance' }}>
                Sunset hike to Cristo Rei
              </h3>
              <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.6, color: c.body, margin: 0, maxWidth: 380 }}>
                Meet at Cais do Sodré, ferry over, walk up for the golden hour over Lisbon, grab a drink after. Verified Erasmus + ESC only.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.body, padding: '6px 12px', borderRadius: 999, background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.65)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <MapPinIcon size={12} color={c.coral} />Cais do Sodré
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.body, padding: '6px 12px', borderRadius: 999, background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.65)' }}>
                  Hosted by Tomás · NOVA
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <div style={{ display: 'flex' }}>
                  {['#E8C6A8','#C9DDC4','#E0D2C0','#D9CEBC','#C5B49A'].map((bg, i) => (
                    <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: bg, border: '2px solid #fff', marginLeft: i === 0 ? 0 : -8 }} />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: c.body, fontWeight: 600 }}>
                  <strong style={{ color: c.ink, fontWeight: 700 }}>8 going</strong> · 3 more invited
                </span>
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <ShowcaseArt />
            </div>
          </div>
        </div>
        </FadeIn>

        <div className="komos-feat-cols" style={{ marginTop: 'clamp(48px, 6vw, 72px)', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'clamp(24px, 3vw, 48px)', width: '100%', maxWidth: 980, textAlign: 'left' }}>
          {[
            { title: 'Verified in seconds.', body: 'Show your Erasmus or ESC paperwork once. No catfishing, no randos. Only people who actually moved.' },
            { title: 'Your week, your city.', body: "Plans appear only for confirmed participants near you. No global feed, no FOMO from places you'll never go." },
            { title: 'Just show up.', body: 'Tap join, get the time and place, meet your people. No DMs to compose, no profiles to swipe.' },
          ].map(({ title, body }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <p style={{ margin: 0, fontFamily: sans, fontSize: 15, lineHeight: 1.6, color: c.muted, textWrap: 'pretty' }}>
                <strong style={{ color: c.ink, fontWeight: 700 }}>{title}</strong>{' '}{body}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------ Stats strip ------------
function AnimatedNumber({ target, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const controls = motionAnimate(motionVal, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = motionVal.on('change', (v) => {
      setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString());
    });
    return () => { controls.stop(); unsub(); };
  }, [isInView]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function Stat({ value, label }) {
  // Parse "1.5M" → { target: 1.5, decimals: 1, suffix: 'M' }
  //        "86%"  → { target: 86,  decimals: 0, suffix: '%' }
  const match = value.match(/^([\d.]+)([A-Za-z%]*)$/);
  const target   = match ? parseFloat(match[1]) : 0;
  const decimals = (match?.[1] ?? '').includes('.') ? (match[1].split('.')[1]?.length ?? 0) : 0;
  const suffix   = match?.[2] ?? '';

  return (
    <div style={{ textAlign: 'center', padding: '8px 12px' }}>
      <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: 1, color: c.cream, letterSpacing: '-0.03em', marginBottom: 12 }}>
        <AnimatedNumber target={target} decimals={decimals} suffix={suffix} />
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.45, color: '#C9BFAE', maxWidth: 220, margin: '0 auto', textWrap: 'pretty' }}>{label}</div>
    </div>
  );
}

function StatsStrip() {
  return (
    <section style={{ background: c.ink, color: c.cream }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) 28px' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          <div style={{ fontFamily: sans, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: c.coral }}>From our research</div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(28px, 4vw, 48px) clamp(20px, 3vw, 32px)', alignItems: 'start' }}>
          {[
            { value: '1.5M', label: 'Erasmus & ESC participants move to a new city every year' },
            { value: '100%', label: 'of surveyed participants arrived alone' },
            { value: '86%', label: 'knew absolutely nobody in their new city' },
            { value: '57%', label: 'took over a month to build a social circle' },
          ].map(({ value, label }, i) => (
            <FadeIn key={value} delay={i * 0.1} y={20}>
              <Stat value={value} label={label} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------ Footer ------------
function SocialIcon({ kind, href, label }) {
  const [hover, setHover] = useState(false);
  const paths = {
    linkedin: <><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.62-1.18 2.13-2.4 4.38-2.4 4.68 0 5.55 3.08 5.55 7.08V24h-5v-7.2c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.88-2.77 3.81V24h-5V8z" /></>,
    facebook: <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.408 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />,
    instagram: <><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.417 2.175 8.797 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></>,
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 36, height: 36, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: hover ? '#fff' : c.body, background: hover ? c.coral : 'transparent', border: `1px solid ${hover ? c.coral : c.sand}`, transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease', textDecoration: 'none' }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paths[kind]}</svg>
    </a>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${c.sand}`, background: c.cream }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ color: c.ink, display: 'flex', alignItems: 'center' }}>
          <KomosLogo height={24} />
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <SocialIcon kind="linkedin" href="https://www.linkedin.com/company/komos-platform" label="Komos on LinkedIn" />
          <SocialIcon kind="instagram" href="https://www.instagram.com/komosplatform/?hl=en" label="Komos on Instagram" />
          <SocialIcon kind="facebook" href="https://www.facebook.com/komosplatform" label="Komos on Facebook" />
        </div>
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14.5, color: c.muted, textAlign: 'left', flex: '1 1 220px', minWidth: 220 }}>
          Built by an ESC participant who lived the problem firsthand.
        </div>
      </div>
    </footer>
  );
}

// ------------ App ------------
export default function App() {
  const [count, setCount] = useState(1247);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stored = await storage.getItem('komos:waitlist:count');
        if (cancelled) return;
        if (stored != null) {
          const n = parseInt(stored, 10);
          if (!isNaN(n)) setCount(n);
        } else {
          await storage.setItem('komos:waitlist:count', '1247');
        }
      } finally {
        // no-op
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleJoined = (next) => {
    if (typeof next === 'number') setCount(next);
  };

  return (
    <div style={{ background: c.cream, minHeight: '100vh' }}>
      <Nav />
      <main>
        <Hero count={count} onJoined={handleJoined} />
        <ProblemSolution />
        <FeatureShowcase />
        <StatsStrip />
      </main>
      <Footer />
    </div>
  );
}
