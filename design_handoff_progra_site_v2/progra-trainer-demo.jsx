// Progra trainer demo — ~28.5s. Phone screens composed from the Progra design
// system; the DS stylesheet is mirrored into the stage so export renders it.
const FRAME = '#F3F6FA', INK = '#12171d', NAVY = '#142c49', CREAM = '#F7F5F0';
const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Hanken Grotesk', system-ui, -apple-system, sans-serif";
const APP_FONT = "var(--font-hanken), 'Hanken Grotesk', system-ui, sans-serif";
const GOAL = '#395AA0';
const END_AT = Date.UTC(2026, 10, 9, 19, 0, 0);
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

// Illustrated squat rack — the "photo".
const GYM_SHAPES =
  '<rect x="0" y="0" width="390" height="300" fill="#E4E8EE"/>' +
  '<rect x="0" y="236" width="390" height="12" fill="#C9D3E0"/>' +
  '<rect x="0" y="300" width="390" height="220" fill="#3A3F47"/>' +
  '<rect x="0" y="372" width="390" height="2" fill="#474D56"/><rect x="0" y="448" width="390" height="2" fill="#474D56"/>' +
  '<rect x="96" y="70" width="14" height="290" fill="#2B2F36"/><rect x="280" y="70" width="14" height="290" fill="#2B2F36"/>' +
  '<rect x="96" y="70" width="198" height="12" fill="#2B2F36"/><rect x="80" y="350" width="230" height="12" fill="#22262B"/>' +
  '<rect x="40" y="176" width="310" height="8" rx="4" fill="#9AA3AE"/>' +
  '<rect x="56" y="128" width="18" height="104" rx="4" fill="#1F2328"/><rect x="74" y="140" width="12" height="80" rx="3" fill="#2E333A"/>' +
  '<rect x="316" y="128" width="18" height="104" rx="4" fill="#1F2328"/><rect x="304" y="140" width="12" height="80" rx="3" fill="#2E333A"/>' +
  '<rect x="316" y="384" width="28" height="22" rx="10" fill="none" stroke="#22262B" stroke-width="7"/><circle cx="330" cy="424" r="26" fill="#22262B"/>' +
  '<rect x="60" y="392" width="22" height="50" rx="6" fill="#395AA0"/><rect x="64" y="384" width="14" height="10" rx="3" fill="#22314A"/>';
const gymUrl = (vb, w, h) => 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="' + vb + '">' + GYM_SHAPES + '</svg>');
const GYM_FULL = gymUrl('0 0 390 520', 390, 520);
const GYM_SQUARE = gymUrl('0 60 390 390', 390, 390);

const person = (n) => ({ displayName: n, username: n.toLowerCase().replace(/\s+/g, ''), avatarUrl: null });
const MAYA = person('Maya');
const CROWD = ['Coach Sam', 'Jordan', 'Priya', 'Kofi', 'Rosa', 'Noah'];
const FANS = ['Coach Sam', 'Priya', 'Kofi', 'Rosa'];
const LIKES = 18, PR_LIKES = 24;
const PLAN = [['Back squat', '5 × 5 · 205 lb'], ['Romanian deadlift', '4 × 8'], ['Walking lunges', '3 × 12'], ['Bike sprints', '10 min']];
const MAYA_ITEM = { sessionId: 'maya-legs', attribution: { isGoal: true, color: GOAL, text: 'Gym' }, workedMs: 72 * 60000, endedAt: END_AT, title: 'Leg day', description: 'All four on the plan, done.', photoUrl: GYM_SQUARE, isPrivate: false };
const SAM_COMMENT = [{ id: 'c1', parentId: null, author: person('Coach Sam'), body: 'Great depth on those squats!' }];

function Check({ size = 14, color = '#fff', width = 3 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M20 6 9 17l-5-5" /></svg>;
}
function Heart({ filled }) {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
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
function NavDock({ path }) {
  const { BottomNav } = window.Progra;
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 822, transform: 'translateZ(0)', pointerEvents: 'none' }}><BottomNav activePath={path} /></div>
      <div style={abs(0, 822, { width: 390, height: 22, background: 'rgba(255,255,255,0.96)' })} />
    </React.Fragment>
  );
}
function Field({ label, children }) {
  return <div className="flex flex-col" style={{ gap: 8, paddingBottom: 16 }}><span className="section-label">{label}</span>{children}</div>;
}
function StepBtn({ children }) {
  return <span className="border-control-border text-caption rounded-[10px] border-[1.5px]" style={{ width: 34, height: 30, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>{children}</span>;
}

function GoalScreen({ T, C }) {
  const vis = 1 - MOTION.settle(C.Session - 0.2, 0.4)(T);
  if (vis <= 0) return null;
  const { ChipRail, CHIP, CHIP_ON, CHIP_OFF, SectionHeader, Input, ColorSwatches, PrimaryButton } = window.Progra;
  const sheetIn = MOTION.enter(C.Goal + 0.05, 0.65)(T);
  const tap = C.Goal + 1.5;
  const saved = MOTION.settle(tap + 0.1, 0.3)(T), check = MOTION.pop(tap + 0.38, 0.45)(T), rowIn = MOTION.enter(tap + 0.35, 0.4)(T);
  const out = MOTION.settle(C.Session - 0.75, 0.5)(T);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center justify-between gap-3">
          <span className="section-label whitespace-nowrap">Mon, Nov 9</span>
          <ChipRail><span className={cx(CHIP, CHIP_ON)}>Today</span><span className={cx(CHIP, CHIP_OFF)}>Week</span><span className={cx(CHIP, CHIP_OFF)}>History</span></ChipRail>
        </div>
        <div className="stat-num text-[36px] leading-[0.9]" style={{ paddingTop: 14 }}>0m</div>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 18 }} />
        <section className="flex flex-col" style={{ paddingTop: 12 }}>
          <SectionHeader label="Goals this week" className="pb-2" />
          <div style={{ position: 'relative', height: 50 }}>
            <p className="text-caption border-divider border-t text-[13px]" style={{ position: 'absolute', left: 0, right: 0, top: 0, margin: 0, padding: '12px 0', opacity: 1 - rowIn }}>No goals yet — tap to add one.</p>
            <div className="border-divider flex items-center gap-2.5 border-t py-[7px]" style={{ position: 'absolute', left: 0, right: 0, top: 0, opacity: rowIn }}>
              <span className="h-5 w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: GOAL }} />
              <div className="flex min-w-0 flex-1 flex-col"><span className="text-body truncate text-[13px] leading-[1.25] font-semibold">Gym</span><span className="text-faint truncate text-[11px] leading-[1.3]">3 sessions a week</span></div>
              <span className="text-body shrink-0 text-[13px] font-semibold tabular-nums">0 / 3</span>
            </div>
          </div>
        </section>
      </div>
      <NavDock path="/" />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,23,29,' + (0.3 * sheetIn * (1 - out)) + ')' }} />
      <div className="bg-card text-ink flex flex-col rounded-t-[26px] shadow-[0_-12px_32px_-18px_rgba(18,23,29,.35)]" style={{ position: 'absolute', left: 8, right: 8, bottom: 0, padding: '0 20px 34px', transform: 'translateY(' + (mix(470, 0, sheetIn) + out * 470) + 'px)' }}>
        <div style={{ padding: '10px 0 12px' }}><div className="bg-warm-border mx-auto h-1 w-[38px] rounded-full" /></div>
        <div className="flex items-center gap-2.5" style={{ paddingBottom: 14 }}>
          <span className="font-serif text-[21px] leading-none font-medium tracking-[-0.01em]">Set a goal</span>
          <span className="flex-1" />
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + check + ')', opacity: Math.min(1, check * 1.5) }}><Check size={12} /></span>
        </div>
        <Field label="Name"><Input readOnly value="Gym" /></Field>
        <Field label="Color"><ColorSwatches value={GOAL} onChange={() => {}} /></Field>
        <Field label="Weekly target">
          <div className="flex items-center gap-3">
            <span className="text-body text-[13.5px] font-medium flex-1">Sessions a week</span>
            <StepBtn>−</StepBtn><span className="stat-num text-[21px]" style={{ width: 22, textAlign: 'center' }}>3</span><StepBtn>+</StepBtn>
          </div>
        </Field>
        <PrimaryButton style={{ marginTop: 4, transform: 'scale(' + (1 - press(T, tap) * 0.03) + ')' }}>
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ opacity: 1 - saved }}>Save goal</span><span style={{ position: 'absolute', opacity: saved }}><Check size={20} /></span>
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
}

const sessionTimes = (C) => ({ t0: C.Session + 0.4, f0: C.Session + 0.9, f1: C.Session + 4.8, stop: C.Photo + 3.6 });
function timerSecs(T, C) {
  const k = sessionTimes(C), Tc = Math.min(T, k.stop);
  if (Tc <= k.t0) return 0;
  if (Tc <= k.f0) return Tc - k.t0;
  const base = mix(k.f0 - k.t0, 4290, MOTION.settle(k.f0, k.f1 - k.f0)(Tc));
  return Tc <= k.f1 ? base : base + (Tc - k.f1);
}
const fmtClock = (s) => Math.floor(s / 3600) + ':' + String(Math.floor((s % 3600) / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0');
const checkAt = (C, i) => C.Session + 1.2 + i * 0.95;

function SessionScreen({ T, C }) {
  const vis = MOTION.enter(C.Session - 0.1, 0.45)(T) * (1 - MOTION.settle(C.Support - 0.15, 0.4)(T));
  if (vis <= 0) return null;
  const { PrimaryButton, CategoryMarker, SectionHeader } = window.Progra;
  const k = sessionTimes(C);
  const secs = timerSecs(T, C);
  const ended = T >= k.stop;
  const done = PLAN.filter((_, i) => T >= checkAt(C, i)).length;
  const ff = MOTION.enter(k.f0 - 0.05, 0.25)(T) * (1 - MOTION.enter(k.f1, 0.25)(T));
  const attached = T >= C.Photo + 2.6;
  const toast = MOTION.pop(k.stop + 0.18, 0.5)(T);
  const pulse = ended ? 0.35 : 0.55 + 0.45 * Math.abs(Math.sin(T * 2.4));
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis, transform: 'translateX(' + mix(36, 0, MOTION.enter(C.Session - 0.1, 0.55)(T)) + 'px)' }}>
      <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center gap-[7px]">
          <span aria-hidden="true" className="bg-brand size-[7px] rounded-full" style={{ opacity: pulse }} />
          <span className="text-brand text-[10px] font-semibold uppercase tracking-[0.14em]">{ended ? 'Clocked out' : 'Tracking'}</span>
          <span className="flex-1" /><span className="text-caption text-[10px] font-semibold tracking-[0.06em]">6:02 PM</span>
        </div>
        <span className="text-ink font-serif text-[26px] leading-[1.15] font-medium tracking-[-0.015em]" style={{ marginTop: 14 }}>Leg day</span>
        <span className="text-caption flex items-center gap-x-1 text-xs" style={{ marginTop: 6 }}>Goal ·<CategoryMarker isGoal color={GOAL} /><span className="text-body font-medium">Gym</span></span>
        <div className="flex items-center" style={{ marginTop: 16, gap: 12 }}>
          <span className="stat-num text-[52px] leading-[0.9]">{fmtClock(secs)}</span>
          <span className="text-brand rounded-full bg-[rgba(28,58,94,.08)] px-2.5 py-[3px] text-xs font-semibold" style={{ display: 'inline-flex', opacity: ff }}><svg width="18" height="10" viewBox="0 0 22 12"><path d="M1 1l9 5-9 5zM11 1l9 5-9 5z" fill="currentColor" /></svg></span>
        </div>
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 224, { width: 390 })} />
      <div style={abs(20, 236, { width: 350 })}><SectionHeader label="Today’s plan" meta={done + ' of ' + PLAN.length} /></div>
      {PLAN.map(([t, s], i) => {
        const p = MOTION.pop(checkAt(C, i), 0.35)(T), on = T >= checkAt(C, i);
        return (
          <div key={t} className="border-divider flex items-center gap-3 border-t" style={abs(20, 268 + i * 52, { width: 350, height: 52 })}>
            <span style={{ width: 22, height: 22, borderRadius: 7, boxSizing: 'border-box', border: '1.5px solid ' + (on ? 'var(--done)' : 'var(--control-border)'), background: on ? 'var(--done)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + (on ? mix(0.8, 1, Math.min(1, p)) : 1) + ')' }}>{on ? <Check size={12} /> : null}</span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className={cx('truncate text-[13px] leading-[1.25] font-semibold', on ? 'text-caption' : 'text-body')}>{t}</span>
              <span className="text-faint truncate text-[11px] leading-[1.3]">{s}</span>
            </div>
          </div>
        );
      })}
      <div style={abs(20, 500, { width: 350, display: 'flex', justifyContent: 'center' })}>
        <span className={SMALL_ACTION} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: 160, justifyContent: 'center', boxSizing: 'border-box', color: attached ? 'var(--body)' : undefined }}>
          {attached ? <img src={GYM_SQUARE} alt="" style={{ width: 20, height: 20, borderRadius: 5, objectFit: 'cover', display: 'block' }} /> : null}
          {attached ? 'Photo attached' : '+ Add photo'}
        </span>
      </div>
      <div style={abs(20, 732, { width: 350 })}><PrimaryButton size="screen" style={{ transform: 'scale(' + (1 - press(T, k.stop) * 0.03) + ')' }}>Clock out</PrimaryButton></div>
      <Toast p={toast} text="Session logged" />
    </div>
  );
}

function CameraScreen({ T, C }) {
  const o = MOTION.enter(C.Photo + 0.4, 0.4)(T);
  const mv = MOTION.settle(C.Photo + 2.0, 0.7)(T);
  if (o <= 0 || mv >= 1) return null;
  const shutter = C.Photo + 1.6;
  const flash = MOTION.enter(shutter + 0.02, 0.08)(T) - MOTION.settle(shutter + 0.1, 0.35)(T);
  const inner = MOTION.enter(shutter - 0.04, 0.08)(T) - MOTION.enter(shutter + 0.06, 0.25)(T);
  const zoom = mix(1, 1.05, MOTION.enter(C.Photo + 0.4, 1.2)(T));
  const grid = 'rgba(255,255,255,0.22)';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: '#121714', opacity: o * (1 - mv) }} />
      <div style={abs(mix(0, 123, mv), mix(104, 505, mv), { width: mix(390, 20, mv), height: mix(520, 20, mv), borderRadius: mix(0, 5, mv), overflow: 'hidden', opacity: o })}>
        <img src={GYM_FULL} alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none', objectFit: 'cover', transform: 'scale(' + zoom + ')' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: o * (1 - MOTION.settle(C.Photo + 1.9, 0.3)(T)) }}>
        <div style={abs(130, 104, { width: 1, height: 520, background: grid })} /><div style={abs(260, 104, { width: 1, height: 520, background: grid })} />
        <div style={abs(0, 277, { width: 390, height: 1, background: grid })} /><div style={abs(0, 451, { width: 390, height: 1, background: grid })} />
        <div style={abs(156, 691, { width: 78, height: 78, borderRadius: '50%', boxSizing: 'border-box', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', transform: 'scale(' + (1 - inner * 0.14) + ')' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: Math.max(0, flash) * 0.85 }} />
    </div>
  );
}

function useCardMetrics() {
  const refA = React.useRef(null), refB = React.useRef(null);
  const [m, setM] = React.useState(null);
  React.useLayoutEffect(() => {
    const measure = () => {
      const a = refA.current, b = refB.current;
      if (!a || !b) return;
      const btn = b.querySelector('button[aria-label$="kudos"]'), grp = btn && btn.parentElement;
      const next = { hA: a.offsetHeight, hB: b.offsetHeight, kx: btn ? btn.offsetLeft : 326, ky: btn ? btn.offsetTop : 470, kw: btn ? btn.offsetWidth : 40, kh: btn ? btn.offsetHeight : 22, gx: grp ? grp.offsetLeft : 284 };
      setM((p) => (p && Object.keys(next).every((key) => p[key] === next[key]) ? p : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (refA.current) ro.observe(refA.current);
    if (refB.current) ro.observe(refB.current);
    return () => ro.disconnect();
  }, []);
  return [refA, refB, m];
}

const PRH = 206;
function PrCard({ likes }) {
  const { AvatarInitials } = window.Progra;
  return (
    <article className="border-hairline flex flex-col border-b px-5 py-4" style={{ gap: 10, height: PRH, boxSizing: 'border-box', background: '#fff' }}>
      <div className="flex items-center gap-[11px]">
        <AvatarInitials name="Maya" username="maya" className="size-[34px] text-xs" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">Maya</span>
          <span className="text-caption text-xs leading-[1.3]">set a new personal record</span>
        </div>
        <span className="text-faint shrink-0 text-xs">just now</span>
      </div>
      <div style={{ borderRadius: 14, background: 'var(--inset)', padding: '14px 16px', display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <div className="flex flex-col" style={{ gap: 6, flex: 1 }}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#8F6C0A', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#D6A728' }} />New PR</span>
          <span className="text-ink font-serif text-[22px] font-medium tracking-[-0.015em]">Back squat</span>
          <span className="text-caption text-xs">+10 lb since October</span>
        </div>
        <span className="stat-num text-[36px] leading-[0.9]">225 lb</span>
      </div>
      <div className="flex items-center">
        <span className="flex-1" />
        <span className="border-hairline flex items-center gap-1 rounded-full border px-2.5 py-[3px] text-[11px] font-semibold tabular-nums" style={{ color: likes > 0 ? 'var(--brand)' : 'var(--disabled)' }}><Heart filled={likes > 0} />{likes > 0 ? likes : null}</span>
      </div>
    </article>
  );
}

const LIST_TOP = 130;
function FeedScreen({ T, C, showTaps }) {
  const { SessionCard, AvatarInitials } = window.Progra;
  const [refA, refB, m] = useCardMetrics();
  const vis = MOTION.enter(C.Support - 0.15, 0.4)(T);
  const shift = MOTION.settle(C.Support + 0.1, 0.8)(T), postIn = MOTION.enter(C.Support + 0.1, 0.5)(T);
  const t1 = C.Support + 0.9;
  const count = T < t1 ? 0 : Math.max(1, Math.round(LIKES * MOTION.settle(t1, 2.0)(T)));
  const pops = FANS.map((_, i) => MOTION.pop(t1 + 0.05 + i * 0.35, 0.45)(T));
  const cmP = MOTION.settle(C.Support + 3.2, 0.6)(T), withComment = T >= C.Support + 3.2;
  const prP = MOTION.settle(C.PR + 0.2, 0.8)(T);
  const prLikes = T < C.PR + 1.2 ? 0 : Math.round(PR_LIKES * MOTION.settle(C.PR + 1.2, 2.2)(T));
  const prSlot = PRH * prP;
  const hA = m ? m.hA : 520, hB = m ? m.hB : 556;
  const slotH = mix(0, hA, shift) + (hB - hA) * cmP;
  const top = LIST_TOP + prSlot;
  const kx = m ? m.kx + m.kw / 2 : 346, ky = top + (m ? m.ky + m.kh / 2 : 481);
  const avX = (m ? m.gx : 284) - 12 - (24 + (FANS.length - 1) * 18);
  const now = END_AT + 20000;
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <div aria-hidden="true" style={abs(0, 0, { width: 390, visibility: 'hidden' })}>
        <div ref={refA} style={{ position: 'absolute', left: 0, top: 0, width: 390 }}><SessionCard item={MAYA_ITEM} now={now} comments={[]} kudos={{ count: LIKES, mine: false }} author={MAYA} /></div>
        <div ref={refB} style={{ position: 'absolute', left: 0, top: 0, width: 390 }}><SessionCard item={MAYA_ITEM} now={now} comments={SAM_COMMENT} kudos={{ count: LIKES, mine: false }} author={MAYA} /></div>
      </div>
      <div style={abs(0, 58, { width: 390, padding: '0 20px', boxSizing: 'border-box' })}>
        <div className="flex items-center gap-3"><span className="section-label whitespace-nowrap">Northside Strength</span><span className="flex-1" /><span className="text-caption text-[10px] font-semibold tracking-[0.06em]">24 members</span></div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
          {CROWD.map((n, i) => <span key={n} style={{ display: 'flex', borderRadius: '50%', boxShadow: '0 0 0 2px #fff', marginLeft: i ? -7 : 0 }}><AvatarInitials name={n} username={n.toLowerCase().replace(/\s+/g, '')} className="size-[30px] text-[11px]" /></span>)}
          <span className="text-caption text-xs font-semibold" style={{ marginLeft: 10 }}>+18</span>
        </div>
      </div>
      <div className="bg-track border-hairline h-1.5 border-t" style={abs(0, LIST_TOP - 6, { width: 390 })} />
      <div style={abs(0, LIST_TOP, { width: 390, height: prSlot, overflow: 'hidden' })}>
        <div style={{ position: 'absolute', left: 0, top: prSlot - PRH, width: 390 }}><PrCard likes={prLikes} /></div>
      </div>
      <div style={abs(0, top, { width: 390, height: slotH, overflow: 'hidden' })}>
        <div style={{ position: 'absolute', left: 0, top: Math.min(0, slotH - hA), width: 390, opacity: postIn }}>
          <SessionCard item={MAYA_ITEM} now={now} comments={withComment ? SAM_COMMENT : []} kudos={{ count, mine: false }} author={MAYA} />
        </div>
      </div>
      <div style={abs(avX, ky - 12, { display: 'flex', alignItems: 'center' })}>
        {FANS.map((n, i) => <span key={n} style={{ display: 'flex', borderRadius: '50%', boxShadow: '0 0 0 2px #fff', marginLeft: i ? -6 : 0, transform: 'scale(' + pops[i] + ')', opacity: Math.min(1, pops[i] * 2) }}><AvatarInitials name={n} username={n.toLowerCase().replace(/\s+/g, '')} className="size-6 text-[10px]" /></span>)}
      </div>
      <Tap T={T} at={t1} x={kx} y={ky} on={showTaps} />
      <NavDock path="/feed" />
    </div>
  );
}

const NOV = [2, 4, 6, 9, 11, 13, 16, 18, 20, 23, 25];
const NOV_TARGET = 12, NOV_TODAY = 25, NOV_OFFSET = 6, NOV_DAYS = 30;
function ProgressScreen({ T, C }) {
  const H0 = C.Progress;
  const slide = MOTION.settle(H0 - 0.05, 0.6)(T);
  if (slide <= 0) return null;
  const { ChipRail, CHIP, CHIP_ON, CHIP_OFF, SectionHeader } = window.Progra;
  const pops = NOV.map((_, i) => MOTION.pop(H0 + 0.5 + i * 0.1, 0.3)(T));
  const done = pops.filter((p) => p > 0.5).length;
  const pct = Math.round(Math.round((100 * NOV.length) / NOV_TARGET) * MOTION.settle(H0 + 1.7, 0.9)(T));
  const cells = [];
  for (let i = 0; i < NOV_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= NOV_DAYS; d++) cells.push(d);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', transform: 'translateX(' + mix(390, 0, slide) + 'px)', boxShadow: '-12px 0 32px -18px rgba(18,23,29,.35)' }}>
      <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center justify-between gap-3">
          <span className="section-label whitespace-nowrap">History</span>
          <ChipRail><span className={cx(CHIP, CHIP_OFF)}>Today</span><span className={cx(CHIP, CHIP_OFF)}>Week</span><span className={cx(CHIP, CHIP_ON)}>History</span></ChipRail>
        </div>
        <div className="flex items-center" style={{ marginTop: 14, gap: 10 }}>
          <ChipRail><span className={cx(CHIP, CHIP_ON)}>Month</span><span className={cx(CHIP, CHIP_OFF)}>Year</span></ChipRail>
          <span className="flex-1" /><span className="text-ink font-serif text-[17px] font-medium tracking-[-0.01em]">November</span>
        </div>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 16 }} />
        <div className="flex" style={{ paddingTop: 16, gap: 36 }}>
          <div className="flex flex-col" style={{ gap: 8 }}><span className="stat-num text-[52px] leading-[0.9]">{done}</span><span className={STAT_LABEL}>Sessions</span></div>
          <div className="flex flex-col" style={{ gap: 8 }}><span className="stat-num text-[52px] leading-[0.9]">{pct}%</span><span className={STAT_LABEL}>Of goal</span></div>
        </div>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 18 }} />
        <section className="flex flex-col" style={{ paddingTop: 12 }}>
          <SectionHeader label="Sessions" meta={done + ' this month'} className="pb-2" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 6 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => <span key={'l' + i} className="text-faint text-[10px] font-semibold" style={{ textAlign: 'center' }}>{l}</span>)}
            {cells.map((day, i) => {
              if (day == null) return <span key={'b' + i} />;
              const k = NOV.indexOf(day), p = k >= 0 ? pops[k] : 0, future = day > NOV_TODAY;
              return (
                <span key={'d' + day} style={{ position: 'relative', height: 30, borderRadius: 8, background: future ? 'transparent' : 'var(--track)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: future ? 'var(--disabled)' : 'var(--caption)' }}>
                  {day}
                  {k >= 0 ? <span style={{ position: 'absolute', inset: 0, borderRadius: 8, background: GOAL, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + p + ')', opacity: Math.min(1, p * 2) }}>{day}</span> : null}
                </span>
              );
            })}
          </div>
        </section>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 16 }} />
        <section className="flex flex-col" style={{ paddingTop: 12 }}>
          <SectionHeader label="Goal completion" className="pb-2" />
          <div className="border-divider flex items-center gap-2.5 border-t py-[7px]">
            <span className="h-5 w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: GOAL }} />
            <div className="flex min-w-0 flex-1 flex-col"><span className="text-body truncate text-[13px] leading-[1.25] font-semibold">Gym</span><span className="text-faint truncate text-[11px] leading-[1.3]">{done} of {NOV_TARGET} sessions · 3 a week</span></div>
            <span className="text-body shrink-0 text-[13px] font-semibold tabular-nums">{pct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--track)', overflow: 'hidden', marginTop: 4 }}><div style={{ width: pct + '%', height: '100%', borderRadius: 3, background: GOAL }} /></div>
        </section>
      </div>
      <NavDock path="/" />
    </div>
  );
}

function StatusBar({ dark }) {
  const bar = (color, opacity) => (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <div style={abs(34, 15, { fontFamily: SANS, fontSize: 16, fontWeight: 600, color, fontVariantNumeric: 'tabular-nums' })}>9:41</div>
      <div style={abs(324, 18, { width: 25, height: 12, borderRadius: 4, boxSizing: 'border-box', border: '1.5px solid ' + color, padding: 1.5 })}><div style={{ width: '78%', height: '100%', borderRadius: 2, background: color }} /></div>
      <div style={abs(128, 831, { width: 134, height: 5, borderRadius: 3, background: color })} />
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 60 }}>
      {bar(INK, 1 - dark)}{bar('#fff', dark)}
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
  const camVis = MOTION.enter(C.Photo + 0.4, 0.4)(T) * (1 - MOTION.settle(C.Photo + 2.0, 0.6)(T));
  const taps = [[C.Goal + 1.5, 195, 786], ...PLAN.map((_, i) => [checkAt(C, i), 31, 294 + i * 52]), [C.Photo + 0.3, 195, 515], [C.Photo + 1.6, 195, 730], [C.Photo + 3.6, 195, 758]];
  const captions = [
    { at: C.Goal, until: C.Session - 0.15, text: 'Set a goal: the gym, 3× a week.' },
    { at: C.Session + 0.1, until: C.Photo - 0.15, text: 'Check off your plan as you train.' },
    { at: C.Photo + 0.1, until: C.Support - 0.15, text: 'Snap a photo and clock out.' },
    { at: C.Support + 0.1, until: C.PR - 0.15, text: 'Your trainer and crew cheer you on.' },
    { at: C.PR + 0.1, until: C.Progress - 0.15, text: 'Share your PRs.' },
    { at: C.Progress + 0.1, until: C.End - 0.35, text: 'Watch your progress add up.' },
  ];
  return (
    <div data-screen-label={'Trainer demo ' + Math.floor(time) + 's'} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: FRAME, fontFamily: SANS, color: INK }}>
      <style>{dsCss}</style>
      <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')' }}>
        {[[-17, 150, 30], [-17, 214, 62], [-17, 290, 62], [403, 246, 98]].map((b, i) => <div key={i} style={{ position: 'absolute', left: b[0], top: b[1], width: 4, height: b[2], borderRadius: 2, background: '#141A16' }} />)}
        <div style={{ position: 'absolute', left: -14, top: -14, width: 418, height: 872, borderRadius: 64, background: '#1A1F26', boxShadow: 'inset 0 0 0 2px #2E3540, 0 40px 80px -30px rgba(20,44,73,0.45)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, borderRadius: 50, overflow: 'hidden', background: '#fff', fontFamily: APP_FONT, color: 'var(--body)' }}>
          {ready ? <GoalScreen T={T} C={C} /> : null}
          {ready ? <SessionScreen T={T} C={C} /> : null}
          {ready ? <CameraScreen T={T} C={C} /> : null}
          {ready ? <FeedScreen T={T} C={C} showTaps={showTaps} /> : null}
          {ready ? <ProgressScreen T={T} C={C} /> : null}
          <StatusBar dark={camVis} />
          {taps.map((p, i) => <Tap key={i} T={T} at={p[0]} x={p[1]} y={p[2]} on={showTaps} />)}
        </div>
      </div>
      <Caption T={T} items={captions} sq={sq} />
      <EndCard T={T} C={C} H={H} sq={sq} logo={logo} />
    </div>
  );
}

function PrograTrainerDemo() {
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
window.PrograTrainerDemo = PrograTrainerDemo;
