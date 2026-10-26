// Progra studio admin demo — 21.5s. Same frame, captions and design-system
// screens as the member demo; the DS stylesheet is mirrored into the stage so
// video export renders its classes.
const CREAM = '#F7F5F0', SLATE = '#1F2A24', SAGE = '#4F7A62';
const SERIF = "'Newsreader', Georgia, serif";
const SANS = "'Hanken Grotesk', system-ui, -apple-system, sans-serif";
const APP_FONT = "var(--font-hanken), 'Hanken Grotesk', system-ui, sans-serif";
const GROUP = '#2E8B50', LAPSE = '#E07042';
const STUDIO = 'Tidewater Yoga';
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

function Toast({ p, text }) {
  if (p <= 0) return null;
  return (
    <div style={abs(0, 58, { width: 390, display: 'flex', justifyContent: 'center', pointerEvents: 'none' })}>
      <div className="bg-card border-hairline rounded-[14px] border" style={{ height: 46, padding: '0 16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 28px -14px rgba(18,23,29,.35)', opacity: Math.min(1, p * 1.4), transform: 'translateY(' + mix(-14, 0, Math.min(1, p)) + 'px) scale(' + mix(0.94, 1, p) + ')' }}>
        <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={11} /></span>
        <span className="text-body text-[13.5px] font-semibold whitespace-nowrap">{text}</span>
      </div>
    </div>
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

function Stat({ n, label }) {
  return (
    <div className="flex flex-col" style={{ gap: 4 }}>
      <span className="stat-num text-[21px]">{n}</span>
      <span className={STAT_LABEL}>{label}</span>
    </div>
  );
}

function TopBar({ rail }) {
  const { BackButton, ChipRail, CHIP, CHIP_ON, CHIP_OFF } = window.Progra;
  return (
    <div className="flex items-center gap-3" style={abs(20, 56, { width: 350, height: 36 })}>
      <BackButton />
      <span className="section-label whitespace-nowrap">Studio</span>
      <span className="flex-1" />
      {rail ? (
        <ChipRail>
          <span className={cx(CHIP, rail === 'members' ? CHIP_ON : CHIP_OFF)}>Members</span>
          <span className={cx(CHIP, rail === 'insights' ? CHIP_ON : CHIP_OFF)}>Insights</span>
        </ChipRail>
      ) : null}
    </div>
  );
}

const CLASS_TYPES = ['Vinyasa', 'Slow Flow', 'Hot Yoga', 'Yin'];
function CreateScreen({ T, C }) {
  const vis = 1 - MOTION.settle(C.Invite - 0.15, 0.4)(T);
  if (vis <= 0) return null;
  const { Input, ColorSwatches, PrimaryButton, CHIP, CHIP_ON } = window.Progra;
  const linkOn = T >= C.Create + 0.35;
  const sheetIn = MOTION.enter(C.Create + 0.5, 0.6)(T);
  const typeStart = C.Create + 1.15, typeEnd = C.Create + 2.0;
  const typed = STUDIO.slice(0, Math.floor(STUDIO.length * Math.max(0, Math.min(1, (T - typeStart) / (typeEnd - typeStart)))));
  const chipAt = [C.Create + 2.15, C.Create + 2.4, null, C.Create + 2.65];
  const tap = C.Create + 3.15;
  const saved = MOTION.settle(tap + 0.1, 0.3)(T);
  const check = MOTION.pop(tap + 0.38, 0.45)(T);
  const out = MOTION.settle(C.Invite - 0.6, 0.5)(T);
  const shown = sheetIn * (1 - out);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <TopBar />
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 102, { width: 390 })} />
      <p className="text-caption text-[13px]" style={abs(20, 116, { width: 350, margin: 0 })}>No group yet — create one for your studio.</p>
      <span className={cx('text-xs font-medium', linkOn ? 'text-brand' : 'text-caption')} style={abs(20, 146, {})}>+ Create group</span>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,23,29,' + (0.3 * shown) + ')' }} />
      <div className="bg-card text-ink flex flex-col rounded-t-[26px] shadow-[0_-12px_32px_-18px_rgba(18,23,29,.35)]"
        style={{ position: 'absolute', left: 8, right: 8, bottom: 0, padding: '0 20px 34px', transform: 'translateY(' + (mix(470, 0, sheetIn) + out * 470) + 'px)' }}>
        <div style={{ padding: '10px 0 12px' }}><div className="bg-warm-border mx-auto h-1 w-[38px] rounded-full" /></div>
        <div className="flex items-center gap-2.5" style={{ paddingBottom: 14 }}>
          <span className="font-serif text-[21px] leading-none font-medium tracking-[-0.01em]">New group</span>
          <span className="flex-1" />
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--done)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(' + check + ')', opacity: Math.min(1, check * 1.5) }}><Check size={12} /></span>
        </div>
        <Field label="Studio name"><Input readOnly value={typed} /></Field>
        <Field label="Classes">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CLASS_TYPES.map((n, i) => {
              const at = chipAt[i];
              const p = at != null ? MOTION.pop(at, 0.35)(T) : 0;
              const on = at != null && T >= at + 0.05;
              return (
                <span key={n} className={cx(CHIP, on ? CHIP_ON : 'text-caption')} style={{ border: '1.5px solid ' + (on ? 'var(--brand)' : 'var(--control-border)'), transform: 'scale(' + (on ? mix(0.92, 1, Math.min(1, p)) : 1) + ')' }}>{n}</span>
              );
            })}
          </div>
        </Field>
        <Field label="Color"><ColorSwatches value={GROUP} onChange={() => {}} /></Field>
        <PrimaryButton style={{ marginTop: 4, transform: 'scale(' + (1 - press(T, tap) * 0.03) + ')' }}>
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ opacity: 1 - saved }}>Create group</span>
            <span style={{ position: 'absolute', opacity: saved }}><Check size={20} /></span>
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
}

const JOINERS = ['Jordan', 'Priya', 'Kofi', 'Rosa', 'Noah'];
function MembersScreen({ T, C }) {
  const vis = MOTION.enter(C.Invite - 0.15, 0.45)(T) * (1 - MOTION.settle(C.Insights + 0.5, 0.2)(T));
  if (vis <= 0) return null;
  const { AvatarInitials, PrimaryButton, SectionHeader } = window.Progra;
  const shareTap = C.Invite + 1.0;
  const toast = MOTION.pop(shareTap + 0.15, 0.45)(T) * (1 - MOTION.settle(shareTap + 1.7, 0.3)(T));
  const count = Math.round(48 * MOTION.settle(C.Invite + 1.7, 2.6)(T));
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: vis }}>
      <TopBar rail="members" />
      <div style={abs(20, 110, { width: 350, display: 'flex', flexDirection: 'column' })}>
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] shrink-0 rounded-[2px]" style={{ height: 24, backgroundColor: GROUP }} />
          <span className="text-ink font-serif text-[22px] font-medium tracking-[-0.015em]">{STUDIO}</span>
        </div>
        <span className="text-caption text-[13px]" style={{ marginTop: 6 }}>Vinyasa · Slow Flow · Yin</span>
        <div className="flex" style={{ marginTop: 18, gap: 32 }}>
          <Stat n={count} label="Members" />
          <Stat n={3} label="Classes" />
        </div>
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 236, { width: 390 })} />
      <div style={abs(20, 248, { width: 350 })}>
        <SectionHeader label="Invite members" className="pb-2" />
        <div className="border-control-border border-[1.5px] flex items-center" style={{ height: 46, borderRadius: 12, padding: '0 7px 0 14px', boxSizing: 'border-box' }}>
          <span className="text-body text-[13px] flex-1">progra.world/join/tidewater</span>
          <span className={SMALL_ACTION} style={{ display: 'inline-flex', alignItems: 'center' }}>Copy</span>
        </div>
        <PrimaryButton style={{ marginTop: 12, transform: 'scale(' + (1 - press(T, shareTap) * 0.03) + ')' }}>Share invite link</PrimaryButton>
      </div>
      <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 404, { width: 390 })} />
      <div style={abs(20, 416, { width: 350 })}>
        <SectionHeader label="Members" meta={String(count)} className="pb-2" />
      </div>
      {JOINERS.map((n, i) => {
        const p = MOTION.enter(C.Invite + 1.7 + i * 0.4, 0.4)(T);
        return (
          <div key={n} className="border-divider flex items-center gap-3 border-t" style={abs(20, 448 + i * 54, { width: 350, height: 54, opacity: p, transform: 'translateY(' + mix(10, 0, p) + 'px)' })}>
            <AvatarInitials name={n} username={n.toLowerCase()} className="size-9 text-xs" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">{n}</span>
              <span className="text-faint truncate text-[11px] leading-[1.3]">Joined just now</span>
            </div>
          </div>
        );
      })}
      <Toast p={toast} text="Invite link copied" />
    </div>
  );
}

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const ACTIVE = [18, 22, 27, 31, 35, 41];
const CLASS_ROWS = [
  { name: 'Vinyasa', when: 'Mon · Wed · Fri, 7 AM', pct: 86, color: '#395AA0' },
  { name: 'Slow Flow', when: 'Tue · Thu, 6 PM', pct: 74, color: '#D6A728' },
  { name: 'Yin', when: 'Sun, 5 PM', pct: 61, color: '#A084B3' },
];
const LAPSING = [
  { name: 'Rosa', days: 19, was: '2× a week' },
  { name: 'Noah', days: 16, was: '3× a week' },
  { name: 'Bea', days: 14, was: 'weekly' },
  { name: 'Sam', days: 12, was: '2× a week' },
];
const SCROLL = 330;

function InsightsScreen({ T, C }) {
  const slide = MOTION.settle(C.Insights - 0.05, 0.55)(T);
  if (slide <= 0) return null;
  const { AvatarInitials, SectionHeader, CategoryMarker } = window.Progra;
  const I0 = C.Insights, L0 = C.Lapsing;
  const active = Math.round(41 * MOTION.settle(I0 + 0.5, 1.0)(T));
  const bars = ACTIVE.map((_, i) => MOTION.settle(I0 + 0.6 + i * 0.12, 0.6)(T));
  const att = CLASS_ROWS.map((c, i) => Math.round(c.pct * MOTION.settle(I0 + 1.6 + i * 0.2, 0.8)(T)));
  const scroll = SCROLL * MOTION.settle(L0 + 0.1, 0.9)(T);
  const lapIn = LAPSING.map((_, i) => MOTION.pop(L0 + 0.9 + i * 0.12, 0.4)(T));
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', transform: 'translateX(' + mix(390, 0, slide) + 'px)', boxShadow: '-12px 0 32px -18px rgba(18,23,29,.35)' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 900, transform: 'translateY(' + -scroll + 'px)' }}>
        <div style={abs(20, 108, { width: 350 })}>
          <SectionHeader label="Active members" meta="November" />
        </div>
        <div style={abs(20, 140, { width: 350, display: 'flex', alignItems: 'flex-end', gap: 12 })}>
          <span className="stat-num text-[52px] leading-[0.9]">{active}</span>
          <span className="text-caption text-xs" style={{ paddingBottom: 4 }}><span style={{ color: 'var(--done)', fontWeight: 600 }}>+6</span> vs October</span>
        </div>
        <div style={abs(20, 208, { width: 350, height: 110, display: 'flex', alignItems: 'flex-end', gap: 10 })}>
          {ACTIVE.map((v, i) => (
            <span key={i} style={{ flex: 1, height: 110 * (v / 41) * bars[i], borderRadius: '6px 6px 2px 2px', background: GROUP, opacity: i === ACTIVE.length - 1 ? 1 : 0.35 }} />
          ))}
        </div>
        <div style={abs(20, 326, { width: 350, display: 'flex', gap: 10 })}>
          {MONTHS.map((mo) => <span key={mo} className="text-faint text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ flex: 1, textAlign: 'center' }}>{mo}</span>)}
        </div>
        <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 356, { width: 390 })} />
        <div style={abs(20, 368, { width: 350 })}>
          <SectionHeader label="Class attendance" meta="This month" />
        </div>
        {CLASS_ROWS.map((c, i) => (
          <div key={c.name} style={abs(20, 400 + i * 58, { width: 350 })}>
            <div className="flex items-center gap-2.5" style={{ height: 40 }}>
              <span className="h-5 w-[3px] shrink-0 rounded-[2px]" style={{ backgroundColor: c.color }} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">{c.name}</span>
                <span className="text-faint truncate text-[11px] leading-[1.3]">{c.when}</span>
              </div>
              <span className="text-body shrink-0 text-[13px] font-semibold tabular-nums">{att[i]}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--track)', overflow: 'hidden' }}>
              <div style={{ width: att[i] + '%', height: '100%', borderRadius: 3, background: c.color }} />
            </div>
          </div>
        ))}
        <div aria-hidden="true" className="bg-hairline h-px" style={abs(0, 586, { width: 390 })} />
        <div style={abs(20, 598, { width: 350 })}>
          <SectionHeader label="Lapsing" meta={LAPSING.length + ' members'} />
        </div>
        {LAPSING.map((p, i) => {
          return (
            <div key={p.name} className="border-divider flex items-center gap-3 border-t" style={abs(20, 630 + i * 54, { width: 350, height: 54 })}>
              <AvatarInitials name={p.name} username={p.name.toLowerCase()} className="size-9 text-xs" />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-body truncate text-[13px] leading-[1.25] font-semibold">{p.name}</span>
                <span className="text-faint flex items-center gap-x-1 text-[11px] leading-[1.3] whitespace-nowrap">
                  <span style={{ display: 'flex', transform: 'scale(' + lapIn[i] + ')' }}><CategoryMarker color={LAPSE} /></span>
                  Last class {p.days} days ago · was {p.was}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={abs(0, 0, { width: 390, height: 98, background: '#fff', borderBottom: '1px solid ' + (scroll > 4 ? 'var(--hairline)' : 'transparent'), boxSizing: 'border-box' })} />
      <TopBar rail="insights" />
    </div>
  );
}

function StatusBar() {
  const ink = '#12171d';
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 60 }}>
      <div style={abs(34, 15, { fontFamily: SANS, fontSize: 16, fontWeight: 600, color: ink, fontVariantNumeric: 'tabular-nums' })}>9:41</div>
      <div style={abs(324, 18, { width: 25, height: 12, borderRadius: 4, boxSizing: 'border-box', border: '1.5px solid ' + ink, padding: 1.5 })}>
        <div style={{ width: '78%', height: '100%', borderRadius: 2, background: ink }} />
      </div>
      <div style={abs(128, 831, { width: 134, height: 5, borderRadius: 3, background: ink })} />
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
      <div style={{ fontFamily: SERIF, fontSize: sq ? 58 : 72, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', color: CREAM, maxWidth: 860, textWrap: 'balance', opacity: txt, transform: 'translateY(' + mix(18, 0, txt) + 'px)' }}>Build community at your studio.</div>
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
  const taps = [[C.Create + 0.35, 64, 154], [C.Create + 3.15, 195, 786], [C.Invite + 1.0, 195, 362]];
  const captions = [
    { at: C.Create, until: C.Invite - 0.15, text: 'Create your studio group.' },
    { at: C.Invite + 0.1, until: C.Insights - 0.15, text: 'Invite your members.' },
    { at: C.Insights + 0.1, until: C.Lapsing - 0.15, text: 'See who’s showing up.' },
    { at: C.Lapsing + 0.1, until: C.End - 0.35, text: 'Spot who’s drifting before they leave.' },
  ];
  return (
    <div data-screen-label={'Studio demo ' + Math.floor(time) + 's'} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: CREAM, fontFamily: SANS, color: SLATE }}>
      <style>{dsCss}</style>
      <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')' }}>
        {[[-17, 150, 30], [-17, 214, 62], [-17, 290, 62], [403, 246, 98]].map((b, i) => <div key={i} style={{ position: 'absolute', left: b[0], top: b[1], width: 4, height: b[2], borderRadius: 2, background: '#141A16' }} />)}
        <div style={{ position: 'absolute', left: -14, top: -14, width: 418, height: 872, borderRadius: 64, background: '#1A211D', boxShadow: 'inset 0 0 0 2px #2E3732, 0 40px 80px -30px rgba(31,42,36,0.45)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, borderRadius: 50, overflow: 'hidden', background: '#fff', fontFamily: APP_FONT, color: 'var(--body)' }}>
          {ready ? <CreateScreen T={T} C={C} /> : null}
          {ready ? <MembersScreen T={T} C={C} /> : null}
          {ready ? <InsightsScreen T={T} C={C} /> : null}
          <StatusBar />
          {taps.map((p, i) => <Tap key={i} T={T} at={p[0]} x={p[1]} y={p[2]} on={showTaps} />)}
        </div>
      </div>
      <Caption T={T} items={captions} sq={sq} />
      <EndCard T={T} C={C} H={H} sq={sq} logo={logo} />
    </div>
  );
}

function PrograStudioDemo() {
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

window.PrograStudioDemo = PrograStudioDemo;
