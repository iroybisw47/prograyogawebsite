// Progra member demo — 25s. The phone screens are composed from the Progra
// design system (window.Progra components + its utility classes). The DS
// stylesheet is mirrored inside the stage so video export renders the classes.
const CREAM = '#F7F5F0', SLATE = '#1F2A24', SAGE = '#4F7A62';
const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Hanken Grotesk', system-ui, -apple-system, sans-serif";
const APP_FONT = "var(--font-hanken), 'Hanken Grotesk', system-ui, sans-serif";
const GOAL = '#2E8B50';
const END_AT = Date.UTC(2026, 9, 26, 23, 0, 0);

const MOTION = {
  enter: (s, d = 0.5) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutCubic }),
  settle: (s, d = 0.8) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInOutCubic }),
  pop: (s, d = 0.45) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutBack }),
};
const mix = (a, b, p) => a + (b - a) * p;
const abs = (l, t, extra) => Object.assign({ position: 'absolute', left: l, top: t }, extra);
const cx = (...a) => a.filter(Boolean).join(' ');

function useDsReady() {
  const [ready, setReady] = React.useState(!!window.Progra);
  React.useEffect(() => {
    if (ready) return;
    const id = setInterval(() => { if (window.Progra) { setReady(true); clearInterval(id); } }, 100);
    return () => clearInterval(id);
  }, [ready]);
  return ready;
}

// Copy of the DS stylesheet for the exported svg (it only carries what's inside it).
function useDsCss() {
  const [css, setCss] = React.useState('');
  React.useEffect(() => {
    let tries = 0;
    const grab = () => {
      for (const ss of document.styleSheets) {
        if (!ss.href || ss.href.indexOf('_ds_bundle.css') < 0) continue;
        try {
          const t = Array.from(ss.cssRules).map((r) => r.cssText).join('\n');
          if (t) { setCss(t); return true; }
        } catch (e) { /* not ready */ }
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
    fetch(src).then((r) => r.blob()).then((b) => new Promise((res) => {
      const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b);
    })).then((d) => { if (live) setUrl(d); }).catch(() => {});
    return () => { live = false; };
  }, [src]);
  return url;
}

// Illustrated mat on a studio floor — the "photo".
const MAT_SHAPES =
  '<rect x="0" y="0" width="390" height="232" fill="#EDE6DA"/>' +
  '<rect x="238" y="34" width="108" height="146" rx="6" fill="#F9F6EF"/>' +
  '<path d="M238 107 H346 M292 34 V180" stroke="#E6DED0" stroke-width="4"/>' +
  '<rect x="0" y="232" width="390" height="288" fill="#D5B794"/>' +
  '<polygon points="246,234 346,234 390,318 300,318" fill="#ffffff" opacity="0.16"/>' +
  '<rect x="0" y="262" width="390" height="2" fill="#C7A680"/><rect x="0" y="300" width="390" height="2" fill="#C7A680"/>' +
  '<rect x="0" y="348" width="390" height="2" fill="#C7A680"/><rect x="0" y="408" width="390" height="2" fill="#C7A680"/>' +
  '<rect x="0" y="478" width="390" height="2" fill="#C7A680"/>' +
  '<polygon points="120,284 270,284 326,480 64,480" fill="#7FA48D"/>' +
  '<rect x="114" y="272" width="162" height="22" rx="11" fill="#6A917A"/>' +
  '<rect x="298" y="398" width="58" height="40" rx="6" fill="#E3C79F"/>' +
  '<rect x="298" y="390" width="58" height="12" rx="5" fill="#ECD5B2"/>';
const matUrl = (vb, w, h) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="' + vb + '">' + MAT_SHAPES + '</svg>');
const MAT_FULL = matUrl('0 0 390 520', 390, 520);
const MAT_SQUARE = matUrl('0 110 390 390', 390, 390);

const person = (n) => ({ displayName: n, username: n.toLowerCase(), avatarUrl: null });
const MAYA = person('Maya');
const CROWD = ['Jordan', 'Priya', 'Kofi', 'Rosa', 'Noah', 'Bea'];
const LIKES = 32;
const FANS = ['Priya', 'Kofi', 'Rosa', 'Noah'];
const CAPTION_TEXT = 'First class of the week.';
const MAYA_ITEM = { sessionId: 'maya-yoga', attribution: { isGoal: true, color: GOAL, text: 'Yoga' }, workedMs: 58 * 60000, endedAt: END_AT, title: 'Yoga class', description: CAPTION_TEXT, photoUrl: MAT_SQUARE, isPrivate: false };
const PRIYA_ITEM = { sessionId: 'priya-flow', attribution: { isGoal: true, color: '#D6A728', text: 'Mobility' }, workedMs: 60 * 60000, endedAt: END_AT - 2 * 3600000, title: 'Slow Flow', description: null, photoUrl: null, isPrivate: false };
const JORDAN_COMMENT = [{ id: 'c1', parentId: null, author: person('Jordan'), body: 'Wow, I wish I went this week!' }];

function Check({ size = 14, color = '#fff', width = 3 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Tap({ T, at, x, y, on }) {
  const a = MOTION.enter(at - 0.22, 0.2)(T);
  const lift = MOTION.settle(at + 0.1, 0.3)(T);
  const r = MOTION.enter(at, 0.55)(T);
  const ring = r > 0 && r < 1 ? 1 - r : 0;
  return (
    <React.Fragment>
      <div style={abs(x - 22, y - 22, { width: 44, height: 44, borderRadius: '50%', background: 'rgba(18,23,29,0.2)', opacity: on ? a * (1 - lift) : 0, transform: 'scale(' + mix(0.8, 1, a) + ')', pointerEvents: 'none' })} />
      <div style={abs(x - 30, y - 30, { width: 60, height: 60, borderRadius: '50%', boxSizing: 'border-box', border: '2px solid rgba(18,23,29,0.35)', opacity: on ? ring : 0, transform: 'scale(' + mix(0.5, 1.7, r) + ')', pointerEvents: 'none' })} />
    </React.Fragment>
  );
}

// BottomNav is position:fixed — the transformed box makes it the containing
// block, ending 22px above the screen edge to leave the home-indicator inset.
function NavDock({ path }) {
  const { BottomNav } = window.Progra;
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 822, transform: 'translateZ(0)', pointerEvents: 'none' }}>
        <BottomNav activePath={path} />
      </div>
      <div style={abs(0, 822, { width: 390, height: 22, background: 'rgba(255,255,255,0.96)' })} />
    </React.Fragment>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col" style={{ gap: 8, paddingBottom: 16 }}>
      <span className="section-label">{label}</span>
      {children}
    </div>
  );
}

function StepBtn({ children }) {
  return (
    <span className="border-control-border text-caption rounded-[10px] border-[1.5px]" style={{ width: 34, height: 30, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>{children}</span>
  );
}

function GoalScreen({ T, C }) {
  const vis = 1 - MOTION.settle(C.ClockIn - 0.2, 0.4)(T);
  if (vis <= 0) return null;
  const { ChipRail, CHIP, CHIP_ON, CHIP_OFF, SectionHeader, Input, ColorSwatches, PrimaryButton } = window.Progra;
  const sheetIn = MOTION.enter(C.Goal + 0.05, 0.65)(T);
  const tap = C.Goal + 1.5;
  const press = MOTION.enter(tap - 0.04, 0.1)(T) - MOTION.enter(tap + 0.08, 0.2)(T);
  const saved = MOTION.settle(tap + 0.1, 0.3)(T);
  const dip = MOTION.enter(tap + 0.3, 0.18)(T) - MOTION.settle(tap + 0.48, 0.4)(T);
  const check = MOTION.pop(tap + 0.38, 0.45)(T);
  const rowIn = MOTION.enter(tap + 0.35, 0.4)(T);
  const out = MOTION.settle(C.ClockIn - 0.75, 0.5)(T);
  const shown = sheetIn * (1 - out);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center justify-between gap-3">
          <span className="section-label whitespace-nowrap">Mon, Oct 26</span>
          <ChipRail>
            <span className={cx(CHIP, CHIP_ON)}>Today</span>
            <span className={cx(CHIP, CHIP_OFF)}>Week</span>
            <span className={cx(CHIP, CHIP_OFF)}>History</span>
          </ChipRail>
        </div>
        <div className="stat-num text-[36px] leading-[0.9]" style={{ paddingTop: 14 }}>0m</div>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 18 }} />
        <section className="flex flex-col" style={{ paddingTop: 12 }}>
          <SectionHeader label="Today" className="pb-2" />
          <p className="text-caption border-divider border-t text-[13px]" style={{ margin: 0, padding: '12px 0' }}>Nothing tracked yet today — tap to clock in.</p>
        </section>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 6 }} />
        <section className="flex flex-col" style={{ paddingTop: 12 }}>
          <SectionHeader label="Goals this week" className="pb-2" />
          <div style={{ position: 'relative', height: 50 }}>
            <p className="text-caption border-divider border-t text-[13px]" style={{ position: 'absolute', left: 0, right: 0, top: 0, margin: 0, padding: '12px 0', opacity: 1 - rowIn }}>No goals yet — tap to add one.</p>
            <div className="border-divider flex items-center gap-2.5 border-t py-[7px]" style={{ position: 'absolute', left: 0, right: 0, top: 0, opacity: rowIn }}>
              <span className="h-5 w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: GOAL }} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">Yoga</span>
                <span className="text-faint truncate text-[11px] leading-[1.3]">2 sessions a week</span>
              </div>
              <span className="text-body shrink-0 text-[13px] font-semibold tabular-nums">0 / 2</span>
            </div>
          </div>
        </section>
      </div>
      <NavDock path="/" />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,23,29,' + (0.3 * shown) + ')' }} />
      <div className="bg-card text-ink flex flex-col rounded-t-[26px] shadow-[0_-12px_32px_-18px_rgba(18,23,29,.35)]"
        style={{ position: 'absolute', left: 8, right: 8, bottom: 0, padding: '0 20px 34px', transform: 'translateY(' + (mix(470, 0, sheetIn) + out * 470 + dip * 8) + 'px)' }}>
        <div style={{ padding: '10px 0 12px' }}><div className="bg-warm-border mx-auto h-1 w-[38px] rounded-full" /></div>
        <div className="flex items-center gap-2.5" style={{ paddingBottom: 14 }}>
          <span className="font-serif text-[21px] leading-none font-medium tracking-[-0.01em]">Set a goal</span>
          <span className="flex-1" />
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + check + ')', opacity: Math.min(1, check * 1.5) }}><Check size={12} /></span>
        </div>
        <Field label="Name"><Input readOnly value="Yoga" /></Field>
        <Field label="Color"><ColorSwatches value={GOAL} onChange={() => {}} /></Field>
        <Field label="Weekly target">
          <div className="flex items-center gap-3">
            <span className="text-body text-[13.5px] font-medium flex-1">Sessions a week</span>
            <StepBtn>−</StepBtn>
            <span className="stat-num text-[21px]" style={{ width: 22, textAlign: 'center' }}>2</span>
            <StepBtn>+</StepBtn>
          </div>
        </Field>
        <PrimaryButton style={{ marginTop: 4, transform: 'scale(' + (1 - press * 0.03) + ')' }}>
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ opacity: 1 - saved }}>Save goal</span>
            <span style={{ position: 'absolute', opacity: saved }}><Check size={20} /></span>
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
}

const clockTimes = (C) => ({ t0: C.ClockIn + 0.35, f0: C.ClockIn + 0.9, f1: C.ClockIn + 2.4, stop: C.ClockIn + 2.85 });
function timerSecs(T, C) {
  const k = clockTimes(C);
  const Tc = Math.min(T, k.stop);
  if (Tc <= k.t0) return 0;
  if (Tc <= k.f0) return Tc - k.t0;
  const base = mix(k.f0 - k.t0, 3480, MOTION.settle(k.f0, k.f1 - k.f0)(Tc));
  return Tc <= k.f1 ? base : base + (Tc - k.f1);
}
const fmtClock = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = Math.floor(s % 60);
  return h + ':' + String(m).padStart(2, '0') + ':' + String(x).padStart(2, '0');
};

function ClockScreen({ T, C }) {
  const vis = MOTION.enter(C.ClockIn - 0.1, 0.45)(T) * (1 - MOTION.settle(C.Photo - 0.15, 0.4)(T));
  if (vis <= 0) return null;
  const { PrimaryButton, CategoryMarker } = window.Progra;
  const k = clockTimes(C);
  const slide = mix(36, 0, MOTION.enter(C.ClockIn - 0.1, 0.55)(T));
  const secs = timerSecs(T, C);
  const ff = MOTION.enter(k.f0 - 0.05, 0.25)(T) * (1 - MOTION.enter(k.f1, 0.25)(T));
  const press = MOTION.enter(k.stop - 0.04, 0.1)(T) - MOTION.enter(k.stop + 0.08, 0.2)(T);
  const toast = MOTION.pop(k.stop + 0.18, 0.5)(T);
  const ended = T >= k.stop;
  const pulse = ended ? 0.35 : 0.55 + 0.45 * Math.abs(Math.sin(T * 2.4));
  const chip = 'border-control-border text-caption h-[30px] rounded-[10px] border-[1.5px] px-3 text-xs font-semibold';
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis, transform: 'translateX(' + slide + 'px)' }}>
      <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center gap-[7px]">
          <span aria-hidden="true" className="bg-brand size-[7px] rounded-full" style={{ opacity: pulse }} />
          <span className="text-brand text-[10px] font-semibold uppercase tracking-[0.14em]">{ended ? 'Clocked out' : 'Tracking'}</span>
          <span className="flex-1" />
          <span className="text-caption text-[10px] font-semibold tracking-[0.06em]">6:02 PM</span>
        </div>
        <span className="text-ink font-serif text-[26px] leading-[1.15] font-medium tracking-[-0.015em]" style={{ marginTop: 16 }}>Yoga class</span>
        <span className="text-caption flex items-center gap-x-1 text-xs" style={{ marginTop: 6 }}>
          Goal ·<CategoryMarker isGoal color={GOAL} /><span className="text-body font-medium">Yoga</span>
        </span>
      </div>
      <div className="stat-num text-[52px] leading-[0.9]" style={abs(0, 340, { width: 390, textAlign: 'center' })}>{fmtClock(secs)}</div>
      <div style={abs(0, 404, { width: 390, display: 'flex', justifyContent: 'center', opacity: ff })}>
        <span className="text-brand rounded-full bg-[rgba(28,58,94,.08)] px-2.5 py-[3px] text-xs font-semibold" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg width="18" height="10" viewBox="0 0 22 12"><path d="M1 1l9 5-9 5zM11 1l9 5-9 5z" fill="currentColor" /></svg>
        </span>
      </div>
      <div style={abs(20, 618, { width: 350, display: 'flex', justifyContent: 'center', gap: 8 })}>
        <span className={chip} style={{ display: 'inline-flex', alignItems: 'center' }}>+ Add photo</span>
        <span className={chip} style={{ display: 'inline-flex', alignItems: 'center' }}>Notes</span>
      </div>
      <div style={abs(20, 672, { width: 350 })}>
        <span className="border-control-border text-body h-12 w-full rounded-[15px] border-[1.5px] text-sm font-semibold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>Pause</span>
      </div>
      <div style={abs(20, 732, { width: 350 })}>
        <PrimaryButton size="screen" style={{ transform: 'scale(' + (1 - press * 0.03) + ')' }}>Clock out</PrimaryButton>
      </div>
      <div className="bg-card border-hairline rounded-[14px] border" style={abs(95, 58, { width: 200, height: 46, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 10px 28px -14px rgba(18,23,29,.35)', opacity: Math.min(1, toast * 1.4), transform: 'translateY(' + mix(-14, 0, Math.min(1, toast)) + 'px) scale(' + mix(0.94, 1, toast) + ')' })}>
        <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={11} /></span>
        <span className="text-body text-[13.5px] font-semibold">Session logged</span>
      </div>
    </div>
  );
}

function PhotoScreens({ T, C }) {
  const camIn = MOTION.enter(C.Photo - 0.1, 0.45)(T);
  const leave = MOTION.settle(C.Post - 0.05, 0.5)(T);
  const o = camIn * (1 - leave);
  if (o <= 0) return null;
  const { PrimaryButton, CategoryMarker } = window.Progra;
  const shutter = C.Photo + 1.45;
  const flash = MOTION.enter(shutter + 0.02, 0.08)(T) - MOTION.settle(shutter + 0.1, 0.35)(T);
  const inner = MOTION.enter(shutter - 0.04, 0.08)(T) - MOTION.enter(shutter + 0.06, 0.25)(T);
  const mv = MOTION.settle(C.Photo + 1.95, 0.8)(T);
  const chromeOut = MOTION.settle(C.Photo + 1.9, 0.4)(T);
  const finIn = MOTION.enter(C.Photo + 2.15, 0.45)(T);
  const typeStart = C.Photo + 2.85, typeEnd = C.Photo + 4.2;
  const typed = Math.floor(CAPTION_TEXT.length * Math.max(0, Math.min(1, (T - typeStart) / (typeEnd - typeStart))));
  const saveTap = C.Photo + 4.55;
  const press = MOTION.enter(saveTap - 0.04, 0.1)(T) - MOTION.enter(saveTap + 0.08, 0.2)(T);
  const caret = T < saveTap && (T > typeStart && T < typeEnd + 0.05 ? true : Math.floor(T * 2.4) % 2 === 0);
  const zoom = mix(1, 1.05, MOTION.enter(C.Photo, 1.45)(T));
  const PH_Y = 232;
  const grid = 'rgba(255,255,255,0.22)';
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o, transform: 'translateY(' + mix(0, -40, leave) + 'px)' }}>
      <div style={{ position: 'absolute', inset: 0, background: '#121714' }} />
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: MOTION.settle(C.Photo + 1.95, 0.6)(T) }} />
      <div style={{ position: 'absolute', inset: 0, opacity: finIn }}>
        <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
          <div className="flex items-center gap-[7px]">
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={9} width={3.6} /></span>
            <span className="section-label">Session logged</span>
          </div>
          <span className="text-ink font-serif text-[26px] leading-[1.15] font-medium tracking-[-0.015em]" style={{ marginTop: 12 }}>Yoga class</span>
          <div style={{ marginTop: 14, borderRadius: 14, padding: '14px 16px', background: 'var(--inset)', display: 'flex', alignItems: 'flex-end', gap: 16 }}>
            <div className="flex flex-col" style={{ gap: 6 }}>
              <span className="stat-num text-[36px] leading-[0.9]">58m</span>
              <span className="text-disabled text-[9px] font-semibold uppercase tracking-[0.12em]">Worked</span>
            </div>
            <span className="flex-1" />
            <div className="flex flex-col" style={{ gap: 8, width: 150 }}>
              <span className="text-caption flex items-center gap-x-1 text-xs" style={{ justifyContent: 'flex-end' }}>
                <CategoryMarker isGoal color={GOAL} /><span className="text-body font-medium">Yoga</span>· 1 of 2
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                <span style={{ flex: 1, height: 6, borderRadius: 3, background: GOAL }} />
                <span style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--track)' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="border-control-border border-[1.5px]" style={abs(20, PH_Y + 366, { width: 350, minHeight: 50, boxSizing: 'border-box', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center' })}>
          <span className="text-body" style={{ fontSize: 15, whiteSpace: 'nowrap' }}>{CAPTION_TEXT.slice(0, typed)}</span>
          <span className="bg-brand" style={{ width: 2, height: 18, marginLeft: 1, opacity: caret ? 1 : 0 }} />
        </div>
        <div style={abs(20, 752, { width: 350 })}>
          <PrimaryButton size="screen" style={{ transform: 'scale(' + (1 - press * 0.03) + ')' }}>Save session</PrimaryButton>
        </div>
      </div>
      <div style={abs(mix(0, 20, mv), mix(104, PH_Y, mv), { width: mix(390, 350, mv), height: mix(520, 350, mv), borderRadius: mix(0, 14, mv), overflow: 'hidden' })}>
        <img src={MAT_FULL} alt="" style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none', objectFit: 'cover', objectPosition: '50% 85%', transform: 'scale(' + zoom + ')', transformOrigin: '50% 60%' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - chromeOut }}>
        <svg width="20" height="20" viewBox="0 0 20 20" style={abs(22, 66, { display: 'block' })}><path d="M4 4l12 12M16 4L4 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
        <div style={abs(130, 104, { width: 1, height: 520, background: grid })} />
        <div style={abs(260, 104, { width: 1, height: 520, background: grid })} />
        <div style={abs(0, 277, { width: 390, height: 1, background: grid })} />
        <div style={abs(0, 451, { width: 390, height: 1, background: grid })} />
        <div style={abs(156, 691, { width: 78, height: 78, borderRadius: '50%', boxSizing: 'border-box', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', transform: 'scale(' + (1 - inner * 0.14) + ')' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: Math.max(0, flash) * 0.85 }} />
    </div>
  );
}

// Heights of Maya's card with/without the comment, and where the kudos
// control lands — read from hidden copies so the reveal matches real layout.
function useCardMetrics() {
  const refA = React.useRef(null), refB = React.useRef(null);
  const [m, setM] = React.useState(null);
  React.useLayoutEffect(() => {
    const measure = () => {
      const a = refA.current, b = refB.current;
      if (!a || !b) return;
      const btn = b.querySelector('button[aria-label$="kudos"]');
      const grp = btn && btn.parentElement;
      const next = {
        hA: a.offsetHeight, hB: b.offsetHeight,
        kx: btn ? btn.offsetLeft : 326, ky: btn ? btn.offsetTop : 470, kw: btn ? btn.offsetWidth : 40, kh: btn ? btn.offsetHeight : 22,
        gx: grp ? grp.offsetLeft : 290,
      };
      setM((p) => (p && Object.keys(next).every((k) => p[k] === next[k]) ? p : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (refA.current) ro.observe(refA.current);
    if (refB.current) ro.observe(refB.current);
    return () => ro.disconnect();
  }, []);
  return [refA, refB, m];
}

const LIST_TOP = 130;
function FeedScreen({ T, C, showTaps }) {
  const { SessionCard, AvatarInitials } = window.Progra;
  const [refA, refB, m] = useCardMetrics();
  const vis = MOTION.enter(C.Post - 0.1, 0.4)(T);
  const shift = MOTION.settle(C.Post + 0.15, 0.85)(T);
  const postIn = MOTION.enter(C.Post + 0.15, 0.5)(T);
  const t1 = C.Support + 0.4;
  const ramp = MOTION.settle(t1, 2.6)(T);
  const count = T < t1 ? 0 : Math.max(1, Math.round(LIKES * ramp));
  const pops = FANS.map((_, i) => MOTION.pop(t1 + 0.05 + i * 0.4, 0.45)(T));
  const cmP = MOTION.settle(C.Comment + 0.3, 0.6)(T);
  const withComment = T >= C.Comment + 0.3;
  const hA = m ? m.hA : 520, hB = m ? m.hB : 556;
  const slotH = mix(0, hA, shift) + (hB - hA) * cmP;
  const cardTop = Math.min(0, slotH - hA);
  const kx = m ? m.kx + m.kw / 2 : 346, ky = LIST_TOP + (m ? m.ky + m.kh / 2 : 481);
  const avX = (m ? m.gx : 284) - 12 - (24 + (FANS.length - 1) * 18);
  const now = END_AT + 20000;
  const avatar = (n, p, first) => (
    <span style={{ display: 'flex', borderRadius: '50%', boxShadow: '0 0 0 2px #fff', marginLeft: first ? 0 : -6, transform: 'scale(' + p + ')', opacity: Math.min(1, p * 2) }}>
      <AvatarInitials name={n} username={n.toLowerCase()} className="size-6 text-[10px]" />
    </span>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <div aria-hidden="true" style={abs(0, 0, { width: 390, visibility: 'hidden' })}>
        <div ref={refA} style={{ position: 'absolute', left: 0, top: 0, width: 390 }}>
          <SessionCard item={MAYA_ITEM} now={now} comments={[]} kudos={{ count: LIKES, mine: false }} author={MAYA} />
        </div>
        <div ref={refB} style={{ position: 'absolute', left: 0, top: 0, width: 390 }}>
          <SessionCard item={MAYA_ITEM} now={now} comments={JORDAN_COMMENT} kudos={{ count: LIKES, mine: false }} author={MAYA} />
        </div>
      </div>
      <div style={abs(0, 58, { width: 390, padding: '0 20px', boxSizing: 'border-box' })}>
        <div className="flex items-center gap-3">
          <span className="section-label whitespace-nowrap">Tidewater Yoga</span>
          <span className="flex-1" />
          <span className="text-caption text-[10px] font-semibold tracking-[0.06em]">48 members</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
          {CROWD.map((n, i) => (
            <span key={n} style={{ display: 'flex', borderRadius: '50%', boxShadow: '0 0 0 2px #fff', marginLeft: i ? -7 : 0 }}>
              <AvatarInitials name={n} username={n.toLowerCase()} className="size-[30px] text-[11px]" />
            </span>
          ))}
          <span className="text-caption text-xs font-semibold" style={{ marginLeft: 10 }}>+42</span>
        </div>
      </div>
      <div className="bg-track border-hairline h-1.5 border-t" style={abs(0, LIST_TOP - 6, { width: 390 })} />
      <div style={abs(0, LIST_TOP, { width: 390, height: slotH, overflow: 'hidden' })}>
        <div style={{ position: 'absolute', left: 0, top: cardTop, width: 390, opacity: postIn }}>
          <SessionCard item={MAYA_ITEM} now={now} comments={withComment ? JORDAN_COMMENT : []} kudos={{ count, mine: false }} author={MAYA} />
        </div>
      </div>
      <div style={abs(0, LIST_TOP + slotH, { width: 390 })}>
        <SessionCard item={PRIYA_ITEM} now={now} comments={[]} kudos={{ count: 4, mine: true }} author={person('Priya')} />
      </div>
      <div style={abs(avX, ky - 12, { display: 'flex', alignItems: 'center' })}>
        {FANS.map((n, i) => <React.Fragment key={n}>{avatar(n, pops[i], i === 0)}</React.Fragment>)}
      </div>
      <Tap T={T} at={t1} x={kx} y={ky} on={showTaps} />
      <NavDock path="/feed" />
    </div>
  );
}

const NOV_SESSIONS = [3, 5, 10, 12, 17, 19, 24];
const NOV_TARGET = 8, NOV_TODAY = 25, NOV_OFFSET = 6, NOV_DAYS = 30;

function Chevron({ dir }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c3c8ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <path d={dir === 'left' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'} />
    </svg>
  );
}

function HistoryScreen({ T, C }) {
  const H0 = C.History;
  if (H0 == null) return null;
  const slide = MOTION.settle(H0 - 0.05, 0.6)(T);
  if (slide <= 0) return null;
  const { ChipRail, CHIP, CHIP_ON, CHIP_OFF, SectionHeader } = window.Progra;
  const pops = NOV_SESSIONS.map((_, i) => MOTION.pop(H0 + 0.55 + i * 0.16, 0.35)(T));
  const done = pops.filter((p) => p > 0.5).length;
  const goalPct = Math.round((100 * NOV_SESSIONS.length) / NOV_TARGET);
  const pct = Math.round(goalPct * MOTION.settle(H0 + 1.75, 1.0)(T));
  const cells = [];
  for (let i = 0; i < NOV_OFFSET; i++) cells.push(null);
  for (let day = 1; day <= NOV_DAYS; day++) cells.push(day);
  const letters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const statLabel = 'text-disabled text-[9px] font-semibold uppercase tracking-[0.12em]';
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', transform: 'translateX(' + mix(390, 0, slide) + 'px)', boxShadow: '-12px 0 32px -18px rgba(18,23,29,.35)' }}>
      <div style={abs(0, 62, { width: 390, padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center justify-between gap-3">
          <span className="section-label whitespace-nowrap">History</span>
          <ChipRail>
            <span className={cx(CHIP, CHIP_OFF)}>Today</span>
            <span className={cx(CHIP, CHIP_OFF)}>Week</span>
            <span className={cx(CHIP, CHIP_ON)}>History</span>
          </ChipRail>
        </div>
        <div className="flex items-center" style={{ marginTop: 14, gap: 10 }}>
          <ChipRail>
            <span className={cx(CHIP, CHIP_ON)}>Month</span>
            <span className={cx(CHIP, CHIP_OFF)}>Year</span>
          </ChipRail>
          <span className="flex-1" />
          <Chevron dir="left" />
          <span className="text-ink font-serif text-[17px] font-medium tracking-[-0.01em]">November</span>
          <Chevron dir="right" />
        </div>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 16 }} />
        <div className="flex" style={{ paddingTop: 16, gap: 36 }}>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <span className="stat-num text-[52px] leading-[0.9]">{done}</span>
            <span className={statLabel}>Sessions</span>
          </div>
          <div className="flex flex-col" style={{ gap: 8 }}>
            <span className="stat-num text-[52px] leading-[0.9]">{pct}%</span>
            <span className={statLabel}>Of goal</span>
          </div>
        </div>
        <div aria-hidden="true" className="bg-hairline h-px w-full" style={{ marginTop: 18 }} />
        <section className="flex flex-col" style={{ paddingTop: 12 }}>
          <SectionHeader label="Sessions" meta={done + ' this month'} className="pb-2" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 6 }}>
            {letters.map((l, i) => <span key={'l' + i} className="text-faint text-[10px] font-semibold" style={{ textAlign: 'center', paddingBottom: 2 }}>{l}</span>)}
            {cells.map((day, i) => {
              if (day == null) return <span key={'b' + i} />;
              const k = NOV_SESSIONS.indexOf(day);
              const p = k >= 0 ? pops[k] : 0;
              const future = day > NOV_TODAY;
              return (
                <span key={'d' + day} style={{ position: 'relative', height: 30, borderRadius: 8, background: future ? 'transparent' : 'var(--track)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: future ? 'var(--disabled)' : 'var(--caption)' }}>
                  {day}
                  {k >= 0 ? (
                    <span style={{ position: 'absolute', inset: 0, borderRadius: 8, background: GOAL, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + p + ')', opacity: Math.min(1, p * 2) }}>{day}</span>
                  ) : null}
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
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">Yoga</span>
              <span className="text-faint truncate text-[11px] leading-[1.3]">{done} of {NOV_TARGET} sessions · 2 a week</span>
            </div>
            <span className="text-body shrink-0 text-[13px] font-semibold tabular-nums">{pct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--track)', overflow: 'hidden', marginTop: 4 }}>
            <div style={{ width: pct + '%', height: '100%', borderRadius: 3, background: GOAL }} />
          </div>
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
      <div style={abs(324, 18, { width: 25, height: 12, borderRadius: 4, boxSizing: 'border-box', border: '1.5px solid ' + color, padding: 1.5 })}>
        <div style={{ width: '78%', height: '100%', borderRadius: 2, background: color }} />
      </div>
      <div style={abs(128, 831, { width: 134, height: 5, borderRadius: 3, background: color })} />
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 60 }}>
      {bar('#12171d', 1 - dark)}
      {bar('#fff', dark)}
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
      <div style={{ fontFamily: SERIF, fontSize: sq ? 48 : 68, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', color: SLATE, textWrap: 'balance', opacity: a, transform: 'translateY(' + mix(18, 0, a) + 'px)' }}>{cur ? cur.text : ''}</div>
    </div>
  );
}

function EndCard({ T, C, H, sq, logo }) {
  const wipe = MOTION.settle(C.End - 0.4, 0.5)(T);
  const mark = MOTION.pop(C.End - 0.05, 0.45)(T);
  const txt = MOTION.enter(C.End, 0.45)(T);
  return (
    <div style={{ position: 'absolute', inset: 0, background: SAGE, transform: 'translateY(' + mix(H, 0, wipe) + 'px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: sq ? 30 : 44, padding: '0 90px', textAlign: 'center' }}>
      <div style={{ height: sq ? 84 : 110, transform: 'scale(' + mark + ')' }}>
        {logo ? <img src={logo} alt="Progra" style={{ display: 'block', height: '100%', width: 'auto', maxWidth: 'none' }} /> : null}
      </div>
      <div style={{ fontFamily: SERIF, fontSize: sq ? 58 : 72, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', color: CREAM, maxWidth: 860, textWrap: 'balance', opacity: txt, transform: 'translateY(' + mix(18, 0, txt) + 'px)' }}>Progra. Build community. Keep showing up.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: txt }}>
        <div style={{ fontFamily: SANS, fontSize: sq ? 32 : 36, fontWeight: 600, color: CREAM }}>progra.world/studios</div>
        <div style={{ fontFamily: SANS, fontSize: sq ? 24 : 27, fontWeight: 500, color: CREAM }}>Progra is an iOS app.</div>
      </div>
    </div>
  );
}

function Piece({ fmt, showTaps, ready }) {
  const { T, CUES: C, time } = useComposition();
  const dsCss = useDsCss();
  const logo = useDataUrl('assets/progra-wordmark-cream.png');
  const sq = fmt === '1:1';
  const W = 1080, H = sq ? 1080 : 1920;
  const capTop = sq ? 30 : 110, capH = sq ? 170 : 300;
  const phoneTop = capTop + capH + (sq ? 14 : 40);
  const s = (H - phoneTop - (sq ? 34 : 70)) / 872;
  const tx = W / 2 - 195 * s, ty = phoneTop + 14 * s;
  const camVis = MOTION.enter(C.Photo - 0.1, 0.45)(T) * (1 - MOTION.settle(C.Photo + 1.95, 0.6)(T));
  const taps = [[C.Goal + 1.5, 195, 786], [C.ClockIn + 2.85, 195, 758], [C.Photo + 1.45, 195, 730], [C.Photo + 4.55, 195, 778]];
  const captions = [
    { at: C.Goal, until: C.ClockIn - 0.15, text: 'Two yoga sessions a week.' },
    { at: C.ClockIn + 0.1, until: C.Photo - 0.15, text: 'Clock in when you arrive.' },
    { at: C.Photo + 0.1, until: C.Post - 0.15, text: 'Share how it went.' },
    { at: C.Post + 0.1, until: C.Support - 0.15, text: 'Your studio group sees it.' },
    { at: C.Support + 0.1, until: C.Comment - 0.15, text: 'Friends cheer you on.' },
    { at: C.Comment + 0.1, until: (C.History != null ? C.History : C.End) - 0.15, text: 'That’s how a habit starts.' },
    { at: (C.History != null ? C.History : C.End) + 0.1, until: C.End - 0.35, text: 'See your month at a glance.' },
  ];
  return (
    <div data-screen-label={'Member demo ' + Math.floor(time) + 's'} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: CREAM, fontFamily: SANS, color: SLATE }}>
      <style>{dsCss}</style>
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')' }}>
          {[[-17, 150, 30], [-17, 214, 62], [-17, 290, 62], [403, 246, 98]].map((b, i) => <div key={i} style={{ position: 'absolute', left: b[0], top: b[1], width: 4, height: b[2], borderRadius: 2, background: '#141A16' }} />)}
          <div style={{ position: 'absolute', left: -14, top: -14, width: 418, height: 872, borderRadius: 64, background: '#1A211D', boxShadow: 'inset 0 0 0 2px #2E3732, 0 40px 80px -30px rgba(31,42,36,0.45)' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, borderRadius: 50, overflow: 'hidden', background: '#fff', fontFamily: APP_FONT, color: 'var(--body)' }}>
            {ready ? <GoalScreen T={T} C={C} /> : null}
            {ready ? <ClockScreen T={T} C={C} /> : null}
            {ready ? <PhotoScreens T={T} C={C} /> : null}
            {ready ? <FeedScreen T={T} C={C} showTaps={showTaps} /> : null}
            {ready ? <HistoryScreen T={T} C={C} /> : null}
            <StatusBar dark={camVis} />
            {taps.map((p, i) => <Tap key={i} T={T} at={p[0]} x={p[1]} y={p[2]} on={showTaps} />)}
          </div>
        </div>
      </div>
      <Caption T={T} items={captions} sq={sq} />
      <EndCard T={T} C={C} H={H} sq={sq} logo={logo} />
    </div>
  );
}

function PrograMemberDemo() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, format: '9:16', showTaps: true });
  const ready = useDsReady();
  const sq = t.format === '1:1';
  return (
    <React.Fragment>
      <CompositionStage width={1080} height={sq ? 1080 : 1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={CREAM}>
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

window.PrograMemberDemo = PrograMemberDemo;
