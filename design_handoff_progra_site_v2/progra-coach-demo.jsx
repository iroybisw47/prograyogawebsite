// Progra coach demo — 20s. The trainer's side: roster → per-client plan →
// live check-offs → progress over time. Same frame/system as the trainer demo.
const FRAME = '#F3F6FA', INK = '#12171d', NAVY = '#142c49', CREAM = '#F7F5F0';
const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Hanken Grotesk', system-ui, -apple-system, sans-serif";
const APP_FONT = "var(--font-hanken), 'Hanken Grotesk', system-ui, sans-serif";
const GOAL = '#395AA0', LAPSE = '#E07042';
const SMALL_ACTION = 'border-control-border text-caption h-[30px] rounded-[10px] border-[1.5px] px-3 text-xs font-semibold';
const STAT_LABEL = 'text-disabled text-[9px] font-semibold uppercase tracking-[0.12em]';

const MOTION = {
  enter: (s, d = 0.5) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutCubic }),
  settle: (s, d = 0.8) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInOutCubic }),
  pop: (s, d = 0.45) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutBack }),
};
const mix = (a, b, p) => a + (b - a) * p;
const abs = (l, t, extra) => Object.assign({ position: 'absolute', left: l, top: t }, extra);
const cx = (...a) => a.filter(Boolean).join(' ');
const press = (T, at) => MOTION.enter(at - 0.04, 0.1)(T) - MOTION.enter(at + 0.08, 0.2)(T);

function useDsReady() {
  const [ready, setReady] = React.useState(!!window.Progra);
  React.useEffect(() => {
    if (ready) return;
    const id = setInterval(() => { if (window.Progra) { setReady(true); clearInterval(id); } }, 100);
    return () => clearInterval(id);
  }, [ready]);
  return ready;
}
function useDsCss() {
  const [css, setCss] = React.useState('');
  React.useEffect(() => {
    let tries = 0;
    const grab = () => {
      for (const ss of document.styleSheets) {
        if (!ss.href || ss.href.indexOf('_ds_bundle.css') < 0) continue;
        try { const t = Array.from(ss.cssRules).map((r) => r.cssText).join('\n'); if (t) { setCss(t); return true; } } catch (e) { /* not ready */ }
      }
      return false;
    };
    if (grab()) return;
    const id = setInterval(() => { if (grab() || ++tries > 60) clearInterval(id); }, 250);
    return () => clearInterval(id);
  }, []);
  return css;
}
function useDataUrl(src) {
  const [url, setUrl] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    fetch(src).then((r) => r.blob()).then((b) => new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); }))
      .then((d) => { if (live) setUrl(d); }).catch(() => {});
    return () => { live = false; };
  }, [src]);
  return url;
}

function Check({ size = 14, color = '#fff', width = 3 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M20 6 9 17l-5-5" /></svg>;
}
function Tap({ T, at, x, y, on }) {
  const a = MOTION.enter(at - 0.22, 0.2)(T), lift = MOTION.settle(at + 0.1, 0.3)(T), r = MOTION.enter(at, 0.55)(T);
  const ring = r > 0 && r < 1 ? 1 - r : 0;
  return (
    <React.Fragment>
      <div style={abs(x - 22, y - 22, { width: 44, height: 44, borderRadius: '50%', background: 'rgba(18,23,29,0.2)', opacity: on ? a * (1 - lift) : 0, transform: 'scale(' + mix(0.8, 1, a) + ')', pointerEvents: 'none' })} />
      <div style={abs(x - 30, y - 30, { width: 60, height: 60, borderRadius: '50%', boxSizing: 'border-box', border: '2px solid rgba(18,23,29,0.35)', opacity: on ? ring : 0, transform: 'scale(' + mix(0.5, 1.7, r) + ')', pointerEvents: 'none' })} />
    </React.Fragment>
  );
}
function Toast({ p, text }) {
  if (p <= 0) return null;
  return (
    <div style={abs(0, 58, { width: 390, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 })}>
      <div className="bg-card border-hairline rounded-[14px] border" style={{ height: 46, padding: '0 16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 28px -14px rgba(18,23,29,.35)', opacity: Math.min(1, p * 1.4), transform: 'translateY(' + mix(-14, 0, Math.min(1, p)) + 'px) scale(' + mix(0.94, 1, p) + ')' }}>
        <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={11} /></span>
        <span className="text-body text-[13.5px] font-semibold whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
}
function TopBar({ title, right }) {
  const { BackButton } = window.Progra;
  return (
    <div className="flex items-center gap-3" style={abs(20, 56, { width: 350, height: 36 })}>
      <BackButton /><span className="section-label whitespace-nowrap">{title}</span><span className="flex-1" />{right}
    </div>
  );
}
function ClientHeader({ tab }) {
  const { AvatarInitials, ChipRail, CHIP, CHIP_ON, CHIP_OFF } = window.Progra;
  return (
    <React.Fragment>
      <TopBar title="Client" />
      <div className="flex items-center gap-3" style={abs(20, 104, { width: 350 })}>
        <AvatarInitials name="Maya" username="maya" className="size-10 text-sm" />
        <div className="flex flex-col" style={{ gap: 2, whiteSpace: 'nowrap' }}>
          <span className="text-ink font-serif text-[22px] font-medium tracking-[-0.015em]" style={{ lineHeight: 1.1 }}>Maya</span>
          <span className="text-caption text-xs">Strength · 3× a week</span>
        </div>
      </div>
      <div style={abs(20, 160, {})}>
        <ChipRail><span className={cx(CHIP, tab === 'plan' ? CHIP_ON : CHIP_OFF)}>Plan</span><span className={cx(CHIP, tab === 'progress' ? CHIP_ON : CHIP_OFF)}>Progress</span></ChipRail>
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 204, { width: 390 })} />
    </React.Fragment>
  );
}

const ROSTER = [
  { n: 'Maya', sub: 'Strength · 3× a week', v: '2 / 3' },
  { n: 'Jordan', sub: 'Hypertrophy · 4× a week', v: '3 / 4' },
  { n: 'Priya', sub: 'Small group · 2× a week', v: '1 / 2' },
  { n: 'Kofi', sub: 'Last session 9 days ago', v: '0 / 3', lapse: true },
  { n: 'Rosa', sub: 'Conditioning · 3× a week', v: '2 / 3' },
];
function RosterScreen({ T, C }) {
  const vis = 1 - MOTION.settle(C.Plan + 0.3, 0.3)(T);
  if (vis <= 0) return null;
  const { AvatarInitials, SectionHeader, CategoryMarker } = window.Progra;
  const pick = C.Roster + 2.4, hl = MOTION.enter(pick, 0.2)(T);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <TopBar title="Clients" right={<span className={SMALL_ACTION} style={{ display: 'inline-flex', alignItems: 'center' }}>+ Add</span>} />
      <div className="flex" style={abs(20, 108, { gap: 32 })}>
        <div className="flex flex-col" style={{ gap: 4 }}><span className="stat-num text-[21px]">12</span><span className={STAT_LABEL}>Clients</span></div>
        <div className="flex flex-col" style={{ gap: 4 }}><span className="stat-num text-[21px]">9</span><span className={STAT_LABEL}>Active this week</span></div>
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 172, { width: 390 })} />
      <div style={abs(20, 184, { width: 350 })}><SectionHeader label="This week" meta="Sessions" /></div>
      {ROSTER.map((r, i) => {
        const p = MOTION.enter(C.Roster + 0.3 + i * 0.12, 0.4)(T);
        return (
          <div key={r.n} className="border-divider flex items-center gap-3 border-t" style={abs(0, 216 + i * 56, { width: 390, height: 56, padding: '0 20px', boxSizing: 'border-box', opacity: p, background: i === 0 ? 'rgba(28,58,94,' + (0.06 * hl) + ')' : 'transparent' })}>
            <AvatarInitials name={r.n} username={r.n.toLowerCase()} className="size-9 text-xs" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">{r.n}</span>
              <span className="text-faint flex items-center gap-x-1 truncate text-[11px] leading-[1.3]">{r.lapse ? <CategoryMarker color={LAPSE} /> : null}{r.sub}</span>
            </div>
            <span className="text-body shrink-0 text-[13px] font-semibold tabular-nums">{r.v}</span>
          </div>
        );
      })}
    </div>
  );
}

const PLAN = [['Back squat', '5 × 5 · 205 lb'], ['Romanian deadlift', '4 × 8 · 135 lb'], ['Walking lunges', '3 × 12 · 30 lb DBs'], ['Bike sprints', '10 min']];
const addAt = (C, i) => C.Plan + 0.7 + i * 0.85;
const doneAt = (C, i) => C.Checked + 0.6 + i * 0.75;
function PlanScreen({ T, C }) {
  const slide = MOTION.settle(C.Plan - 0.05, 0.55)(T);
  const vis = 1 - MOTION.settle(C.Progress - 0.1, 0.3)(T);
  if (slide <= 0 || vis <= 0) return null;
  const { PrimaryButton, SectionHeader } = window.Progra;
  const added = PLAN.filter((_, i) => T >= addAt(C, i)).length;
  const sendTap = C.Plan + 4.4, sent = T >= sendTap + 0.05;
  const toast = MOTION.pop(sendTap + 0.15, 0.45)(T) * (1 - MOTION.settle(C.Checked + 0.2, 0.3)(T));
  const live = MOTION.enter(C.Checked, 0.4)(T);
  const done = PLAN.filter((_, i) => T >= doneAt(C, i)).length;
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(T * 2.4));
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis, transform: 'translateX(' + mix(390, 0, slide) + 'px)', boxShadow: '-12px 0 32px -18px rgba(18,23,29,.35)' }}>
      <ClientHeader tab="plan" />
      <div style={abs(20, 216, { width: 350 })}><SectionHeader label="Thursday · Leg day" meta={live > 0 ? done + ' of ' + PLAN.length + ' done' : added + ' exercises'} /></div>
      {PLAN.map(([t, s], i) => {
        const p = MOTION.enter(addAt(C, i), 0.4)(T);
        if (p <= 0) return null;
        const on = T >= doneAt(C, i), cp = MOTION.pop(doneAt(C, i), 0.35)(T);
        return (
          <div key={t} className="border-divider flex items-center gap-3 border-t" style={abs(20, 248 + i * 56, { width: 350, height: 56, opacity: p, transform: 'translateY(' + mix(8, 0, p) + 'px)' })}>
            <span style={{ width: 22, height: 22, borderRadius: 7, boxSizing: 'border-box', border: '1.5px solid ' + (on ? 'var(--done)' : 'var(--control-border)'), background: on ? 'var(--done)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + (on ? mix(0.8, 1, Math.min(1, cp)) : 1) + ')' }}>{on ? <Check size={12} /> : null}</span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className={cx('truncate text-[13px] leading-[1.25] font-semibold', on ? 'text-caption' : 'text-body')}>{t}</span>
              <span className="text-faint truncate text-[11px] leading-[1.3]">{s}</span>
            </div>
          </div>
        );
      })}
      <span className="text-caption text-xs font-medium" style={abs(20, 248 + added * 56 + 16, { opacity: (1 - live) * (sent ? 0 : 1) })}>+ Add exercise</span>
      <div style={abs(20, 500, { width: 350, display: 'flex', justifyContent: 'center', opacity: live })}>
        <span className="text-brand rounded-full bg-[rgba(28,58,94,.08)] px-2.5 py-[3px] text-xs font-semibold" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span className="bg-brand size-[7px] rounded-full" style={{ opacity: done === PLAN.length ? 1 : pulse }} />{done === PLAN.length ? 'Session complete · 1h 12m' : 'Maya is training now'}
        </span>
      </div>
      <div style={abs(20, 732, { width: 350, opacity: 1 - live })}>
        <PrimaryButton size="screen" style={{ transform: 'scale(' + (1 - press(T, sendTap) * 0.03) + ')' }}>{sent ? 'Plan sent' : 'Send to Maya'}</PrimaryButton>
      </div>
      <Toast p={toast} text="Plan sent to Maya" />
    </div>
  );
}

const WEIGHTS = [185, 190, 195, 200, 205, 210, 215, 225];
const VOLUME = [9.2, 9.6, 10.1, 10.4, 10.9, 11.3, 11.8, 12.4];
function ProgressScreen({ T, C }) {
  const P0 = C.Progress, slide = MOTION.settle(P0 - 0.05, 0.55)(T);
  if (slide <= 0) return null;
  const { ChipRail, CHIP, CHIP_ON, CHIP_OFF, SectionHeader } = window.Progra;
  const k = MOTION.settle(P0 + 0.5, 1.0)(T);
  const draw = MOTION.settle(P0 + 0.7, 1.6)(T);
  const bars = VOLUME.map((_, i) => MOTION.settle(P0 + 1.3 + i * 0.1, 0.5)(T));
  const W = 350, H = 130, lo = 180, hi = 230;
  const pts = WEIGHTS.map((w, i) => [8 + (i * (W - 16)) / (WEIGHTS.length - 1), 8 + (1 - (w - lo) / (hi - lo)) * (H - 16)]);
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const stat = (v, label, delta) => (
    <div className="flex flex-col" style={{ gap: 4, flex: 1 }}>
      <span className="stat-num text-[21px]">{v}</span><span className={STAT_LABEL}>{label}</span>
      <span className="text-[11px] font-semibold" style={{ color: 'var(--done)' }}>{delta}</span>
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', transform: 'translateX(' + mix(390, 0, slide) + 'px)', boxShadow: '-12px 0 32px -18px rgba(18,23,29,.35)' }}>
      <ClientHeader tab="progress" />
      <div style={abs(20, 218, {})}>
        <ChipRail><span className={cx(CHIP, CHIP_ON, 'whitespace-nowrap')}>Back squat</span><span className={cx(CHIP, CHIP_OFF, 'whitespace-nowrap')}>Deadlift</span><span className={cx(CHIP, CHIP_OFF, 'whitespace-nowrap')}>Bench</span></ChipRail>
      </div>
      <div className="flex" style={abs(20, 262, { width: 350, gap: 12 })}>
        {stat(Math.round(mix(185, 225, k)) + ' lb', 'Top set', '+40 lb')}
        {stat(mix(9.2, 12.4, k).toFixed(1) + 'k lb', 'Weekly volume', '+18%')}
        {stat(Math.round(11 * k) + ' / 12', 'Sessions', 'This month')}
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 344, { width: 390 })} />
      <div style={abs(20, 356, { width: 350 })}><SectionHeader label="Top set · last 8 weeks" meta="lb" /></div>
      <svg width={W} height={H} viewBox={'0 0 ' + W + ' ' + H} style={abs(20, 390, { display: 'block', overflow: 'visible' })}>
        {[0, 0.5, 1].map((g) => <line key={g} x1="0" x2={W} y1={8 + g * (H - 16)} y2={8 + g * (H - 16)} stroke="#f1f3f5" strokeWidth="1" />)}
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={GOAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
        {pts.map((p, i) => {
          const on = draw >= i / (pts.length - 1);
          return <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4.5 : 3} fill={i === pts.length - 1 ? GOAL : '#fff'} stroke={GOAL} strokeWidth="2" opacity={on ? 1 : 0} />;
        })}
      </svg>
      <div className="flex" style={abs(20, 526, { width: 350 })}>
        <span className="text-faint text-[10px] font-semibold uppercase tracking-[0.06em]">8 wk ago</span><span className="flex-1" /><span className="text-faint text-[10px] font-semibold uppercase tracking-[0.06em]">This week</span>
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 552, { width: 390 })} />
      <div style={abs(20, 564, { width: 350 })}><SectionHeader label="Weekly volume" meta="k lb" /></div>
      <div style={abs(20, 598, { width: 350, height: 110, display: 'flex', alignItems: 'flex-end', gap: 8 })}>
        {VOLUME.map((v, i) => <span key={i} style={{ flex: 1, height: 110 * (v / 12.4) * bars[i], borderRadius: '6px 6px 2px 2px', background: GOAL, opacity: i === VOLUME.length - 1 ? 1 : 0.35 }} />)}
      </div>
    </div>
  );
}

const person = (n) => ({ displayName: n, username: n.toLowerCase(), avatarUrl: null });
const NOW = Date.UTC(2026, 10, 12, 20, 0, 0);
const PHOTO = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="390" height="260" viewBox="0 0 390 260"><rect width="390" height="170" fill="#E4E8EE"/><rect y="150" width="390" height="10" fill="#C9D3E0"/><rect y="170" width="390" height="90" fill="#3A3F47"/><rect x="96" y="30" width="14" height="150" fill="#2B2F36"/><rect x="280" y="30" width="14" height="150" fill="#2B2F36"/><rect x="40" y="96" width="310" height="8" rx="4" fill="#9AA3AE"/><rect x="56" y="50" width="18" height="100" rx="4" fill="#1F2328"/><rect x="74" y="62" width="12" height="76" rx="3" fill="#2E333A"/><rect x="316" y="50" width="18" height="100" rx="4" fill="#1F2328"/><rect x="304" y="62" width="12" height="76" rx="3" fill="#2E333A"/></svg>');
const POSTS = [
  { key: 'maya', author: person('Maya'), base: 6, item: { sessionId: 'm1', attribution: { isGoal: true, color: GOAL, text: 'Gym' }, workedMs: 72 * 60000, endedAt: NOW - 4 * 60000, title: 'Leg day', description: 'All four on the plan, done.', photoUrl: PHOTO, isPrivate: false } },
  { key: 'jordan', author: person('Jordan'), base: 3, item: { sessionId: 'j1', attribution: { isGoal: true, color: '#2E8B50', text: 'Hypertrophy' }, workedMs: 58 * 60000, endedAt: NOW - 2 * 3600000, title: 'Push day', description: 'Bench felt strong today.', photoUrl: null, isPrivate: false } },
];
function NavDock({ path }) {
  const { BottomNav } = window.Progra;
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 822, transform: 'translateZ(0)', pointerEvents: 'none' }}><BottomNav activePath={path} /></div>
      <div style={abs(0, 822, { width: 390, height: 22, background: 'rgba(255,255,255,0.96)' })} />
    </React.Fragment>
  );
}
function useFeedMetrics() {
  const r0 = React.useRef(null), r1 = React.useRef(null);
  const [m, setM] = React.useState(null);
  React.useLayoutEffect(() => {
    const measure = () => {
      const next = [r0.current, r1.current].map((el) => {
        if (!el) return null;
        const b = el.querySelector('button[aria-label$="kudos"]');
        return { h: el.offsetHeight, x: b ? b.offsetLeft + b.offsetWidth / 2 : 346, y: b ? b.offsetTop + b.offsetHeight / 2 : 200 };
      });
      if (next.some((n) => !n)) return;
      setM((p) => (p && JSON.stringify(p) === JSON.stringify(next) ? p : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    [r0.current, r1.current].forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);
  return [[r0, r1], m];
}
const FEED_TOP = 132;
function FeedScreen({ T, C, showTaps }) {
  const { SessionCard, AvatarInitials } = window.Progra;
  const [refs, m] = useFeedMetrics();
  const F0 = C.Feed;
  const slide = MOTION.settle(F0 - 0.05, 0.55)(T);
  const vis = 1 - MOTION.settle(C.Progress - 0.1, 0.3)(T);
  const taps = [F0 + 1.4, F0 + 2.7];
  const tops = [FEED_TOP, FEED_TOP + (m ? m[0].h : 470)];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis, transform: 'translateX(' + mix(390, 0, slide) + 'px)', boxShadow: '-12px 0 32px -18px rgba(18,23,29,.35)' }}>
      <div style={abs(0, 58, { width: 390, padding: '0 20px', boxSizing: 'border-box' })}>
        <div className="flex items-center gap-3"><span className="section-label whitespace-nowrap">Your clients</span><span className="flex-1" /><span className="text-caption text-[10px] font-semibold tracking-[0.06em]">12 clients</span></div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
          {['Maya', 'Jordan', 'Priya', 'Kofi', 'Rosa', 'Noah'].map((n, i) => <span key={n} style={{ display: 'flex', borderRadius: '50%', boxShadow: '0 0 0 2px #fff', marginLeft: i ? -7 : 0 }}><AvatarInitials name={n} username={n.toLowerCase()} className="size-[30px] text-[11px]" /></span>)}
          <span className="text-caption text-xs font-semibold" style={{ marginLeft: 10 }}>+6</span>
        </div>
      </div>
      <div className="bg-track border-hairline h-1.5 border-t" style={abs(0, FEED_TOP - 6, { width: 390 })} />
      {POSTS.map((p, i) => {
        const liked = T >= taps[i];
        return (
          <div key={p.key} ref={refs[i]} style={abs(0, tops[i], { width: 390 })}>
            <SessionCard item={p.item} now={NOW} comments={[]} kudos={{ count: p.base + (liked ? 1 : 0), mine: liked }} author={p.author} />
          </div>
        );
      })}
      {m ? POSTS.map((p, i) => {
        const fl = MOTION.enter(taps[i], 0.8)(T);
        return (
          <React.Fragment key={'t' + i}>
            <Tap T={T} at={taps[i]} x={m[i].x} y={tops[i] + m[i].y} on={showTaps} />
            {fl > 0 && fl < 1 ? <span className="text-brand text-xs font-semibold" style={abs(m[i].x - 8, tops[i] + m[i].y - 22 - 26 * fl, { opacity: 1 - fl })}>+1</span> : null}
          </React.Fragment>
        );
      }) : null}
      <NavDock path="/feed" />
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 60 }}>
      <div style={abs(34, 15, { fontFamily: SANS, fontSize: 16, fontWeight: 600, color: INK, fontVariantNumeric: 'tabular-nums' })}>9:41</div>
      <div style={abs(324, 18, { width: 25, height: 12, borderRadius: 4, boxSizing: 'border-box', border: '1.5px solid ' + INK, padding: 1.5 })}><div style={{ width: '78%', height: '100%', borderRadius: 2, background: INK }} /></div>
      <div style={abs(128, 831, { width: 134, height: 5, borderRadius: 3, background: INK })} />
      <div style={abs(135, 11, { width: 120, height: 34, borderRadius: 20, background: '#000' })} />
    </div>
  );
}
function Caption({ T, items, sq }) {
  let cur = null;
  for (const it of items) if (T >= it.at && T < it.until) cur = it;
  const a = cur ? MOTION.enter(cur.at, 0.45)(T) * (1 - MOTION.settle(cur.until - 0.3, 0.3)(T)) : 0;
  return (
    <div style={{ position: 'absolute', left: 80, right: 80, top: sq ? 30 : 110, height: sq ? 170 : 300, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontFamily: SERIF, fontSize: sq ? 48 : 68, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', color: INK, textWrap: 'balance', opacity: a, transform: 'translateY(' + mix(18, 0, a) + 'px)' }}>{cur ? cur.text : ''}</div>
    </div>
  );
}
function EndCard({ T, C, H, sq, logo }) {
  const wipe = MOTION.settle(C.End - 0.4, 0.5)(T), mark = MOTION.pop(C.End - 0.05, 0.45)(T), txt = MOTION.enter(C.End, 0.45)(T);
  return (
    <div style={{ position: 'absolute', inset: 0, background: NAVY, transform: 'translateY(' + mix(H, 0, wipe) + 'px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: sq ? 30 : 44, padding: '0 90px', textAlign: 'center' }}>
      <div style={{ height: sq ? 84 : 110, transform: 'scale(' + mark + ')' }}>{logo ? <img src={logo} alt="Progra" style={{ display: 'block', height: '100%', width: 'auto', maxWidth: 'none' }} /> : null}</div>
      <div style={{ fontFamily: SERIF, fontSize: sq ? 58 : 72, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', color: CREAM, maxWidth: 860, textWrap: 'balance', opacity: txt, transform: 'translateY(' + mix(18, 0, txt) + 'px)' }}>Build accountability. Keep clients longer.</div>
      <div style={{ fontFamily: SANS, fontSize: sq ? 24 : 27, fontWeight: 500, color: CREAM, opacity: txt }}>Progra is an iOS app.</div>
    </div>
  );
}

function Piece({ fmt, showTaps, ready }) {
  const { T, CUES: C, time } = useComposition();
  const dsCss = useDsCss();
  const logo = useDataUrl('assets/progra-wordmark-cream.png');
  const sq = fmt === '1:1';
  const W = 1080, H = sq ? 1080 : 1920;
  const capTop = sq ? 30 : 110, capH = sq ? 170 : 300, phoneTop = capTop + capH + (sq ? 14 : 40);
  const s = (H - phoneTop - (sq ? 34 : 70)) / 872;
  const tx = W / 2 - 195 * s, ty = phoneTop + 14 * s;
  const taps = [[C.Roster + 2.4, 195, 244], ...PLAN.map((_, i) => [addAt(C, i) - 0.15, 70, 248 + i * 56 + 24]), [C.Plan + 4.4, 195, 758]];
  const captions = [
    { at: C.Roster, until: C.Plan - 0.15, text: 'All your clients in one place.' },
    { at: C.Plan + 0.1, until: C.Checked - 0.15, text: 'Build a plan for each client.' },
    { at: C.Checked + 0.1, until: C.Feed - 0.15, text: 'Watch it get checked off.' },
    { at: C.Feed + 0.1, until: C.Progress - 0.15, text: 'See every post and cheer them on.' },
    { at: C.Progress + 0.1, until: C.End - 0.35, text: 'Track weight and volume over time.' },
  ];
  return (
    <div data-screen-label={'Coach demo ' + Math.floor(time) + 's'} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: FRAME, fontFamily: SANS, color: INK }}>
      <style>{dsCss}</style>
      <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')' }}>
        {[[-17, 150, 30], [-17, 214, 62], [-17, 290, 62], [403, 246, 98]].map((b, i) => <div key={i} style={{ position: 'absolute', left: b[0], top: b[1], width: 4, height: b[2], borderRadius: 2, background: '#141A16' }} />)}
        <div style={{ position: 'absolute', left: -14, top: -14, width: 418, height: 872, borderRadius: 64, background: '#1A1F26', boxShadow: 'inset 0 0 0 2px #2E3540, 0 40px 80px -30px rgba(20,44,73,0.45)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, borderRadius: 50, overflow: 'hidden', background: '#fff', fontFamily: APP_FONT, color: 'var(--body)' }}>
          {ready ? <RosterScreen T={T} C={C} /> : null}
          {ready ? <PlanScreen T={T} C={C} /> : null}
          {ready ? <FeedScreen T={T} C={C} showTaps={showTaps} /> : null}
          {ready ? <ProgressScreen T={T} C={C} /> : null}
          <StatusBar />
          {taps.map((p, i) => <Tap key={i} T={T} at={p[0]} x={p[1]} y={p[2]} on={showTaps} />)}
        </div>
      </div>
      <Caption T={T} items={captions} sq={sq} />
      <EndCard T={T} C={C} H={H} sq={sq} logo={logo} />
    </div>
  );
}

function PrograCoachDemo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, format: '9:16', showTaps: true });
  const ready = useDsReady();
  const sq = t.format === '1:1';
  return (
    <React.Fragment>
      <CompositionStage width={1080} height={sq ? 1080 : 1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={FRAME}>
        <Piece fmt={t.format} showTaps={t.showTaps !== false} ready={ready} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Video" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakRadio label="Format" value={t.format} options={['9:16', '1:1']} onChange={(v) => setTweak('format', v)} />
        <TweakToggle label="Show taps" value={t.showTaps !== false} onChange={(v) => setTweak('showTaps', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.PrograCoachDemo = PrograCoachDemo;
