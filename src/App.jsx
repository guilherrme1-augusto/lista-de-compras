import { useState, useEffect, useRef } from "react";

const GREEN = "#2E7D4F";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box}
body{margin:0}
.app{--bg:#F3F5F2;--surface:#fff;--text:#1A2B22;--muted:#5E6E65;--border:#DDE4DF;--primary:#2E7D4F;--primary-hover:#256842;
  --hero:#2E7D4F;--link:#2E7D4F;--dash:#9CC4AC;--green-text:#1E5A38;--tint:#EEF5F0;--tint-hover:#E0EEE5;--input:#F8FAF8;
  --faint:#94A39A;--line:#EEF1EE;--check:#B9C4BD;--done:#9AA69F;--icon:#A3AFA8;--danger:#C0392B;--danger-tint:#FBEDEB;
  --inv-bg:#1A2B22;--inv-text:#fff;--shadow-panel:0 1px 2px rgba(26,43,34,.06);--shadow-drag:rgba(26,43,34,.18);color-scheme:light}
/* modo escuro: verde-grafite, sem preto puro */
.app.dark{--bg:#0E1512;--surface:#17211C;--text:#E4ECE7;--muted:#9AAEA3;--border:#2B3A32;--primary:#2E7D4F;--primary-hover:#34905B;
  --hero:#1D5C39;--link:#6CC592;--dash:#3D6B51;--green-text:#8FD1A9;--tint:#1E3127;--tint-hover:#264033;--input:#111A15;
  --faint:#6D8177;--line:#223029;--check:#4B6055;--done:#6A7C72;--icon:#7B8E83;--danger:#FF7B6E;--danger-tint:#3A201D;
  --inv-bg:#E4ECE7;--inv-text:#0E1512;--shadow-panel:0 1px 2px rgba(0,0,0,.4);--shadow-drag:rgba(0,0,0,.5);color-scheme:dark}
.app.dark .btn.danger{background:#B23A2E}
.icon-btn{width:36px;height:36px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);color:var(--text);display:grid;place-items:center;cursor:pointer;padding:0;flex:none}
.icon-btn:hover{border-color:var(--primary)}
.top-actions{display:flex;align-items:center;gap:8px}

.app{min-height:100vh;background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;padding:20px 16px 64px;-webkit-font-smoothing:antialiased}
.wrap{max-width:520px;margin:0 auto}

.topbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:20px}
.brand{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:800;letter-spacing:-.02em;margin:0}
.logo{width:34px;height:34px;border-radius:10px;background:var(--primary);display:grid;place-items:center;flex:none}
.who{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--muted)}
.who strong{color:var(--text);font-weight:700}
.btn-sm{background:var(--surface);border:1.5px solid var(--border);color:var(--text);border-radius:10px;padding:7px 12px;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.btn-sm:hover{border-color:var(--link)}

.tabs{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 14px;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:none;border:1.5px solid var(--border);background:var(--surface);color:var(--text);border-radius:999px;padding:9px 16px;font:inherit;font-size:14px;font-weight:600;cursor:pointer}
.tab.on{background:var(--inv-bg);color:var(--inv-text);border-color:var(--inv-bg)}
.tab.new{border-style:dashed;color:var(--link);background:transparent;border-color:var(--dash)}
.tab.org{display:flex;align-items:center;gap:6px;color:var(--muted);background:transparent;border-color:transparent}
.tab.org:hover{color:var(--link)}
.tab.finish{background:var(--primary);border-color:var(--link);color:#fff}
.tabs.organizing{flex-wrap:wrap;overflow:visible}
.org-hint{font-size:13px;color:var(--muted);margin:0 0 10px}
.otab{flex:none;display:flex;align-items:center;gap:2px;border:1.5px dashed var(--dash);background:var(--surface);border-radius:999px;padding:4px;
  font-size:14px;font-weight:600;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;
  transition:box-shadow .15s,transform .15s,border-color .15s}
.otab .nm{display:flex;align-items:center;gap:6px;padding:0 6px}
.otab .nm svg{color:var(--faint);flex:none}
.otab.dragging{cursor:grabbing;border-style:solid;border-color:var(--link);box-shadow:0 10px 20px var(--shadow-drag);transform:scale(1.05);z-index:1;position:relative}
.arrow{width:30px;height:30px;border-radius:50%;border:0;background:var(--tint);color:var(--green-text);font:inherit;font-size:17px;font-weight:700;line-height:1;cursor:pointer;display:grid;place-items:center;padding:0;flex:none}
.arrow:hover{background:var(--tint-hover)}
.arrow:disabled{opacity:.3;cursor:default}
.newlist{display:flex;gap:8px;margin:0 0 16px}

.hero{background:var(--hero);color:#fff;border-radius:20px 20px 0 0;padding:22px 20px 20px}
.hero-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.title{font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1.1;margin:0;word-break:break-word}
.sub{font-size:14px;margin:6px 0 0;opacity:.85;line-height:1.5}
.pill{flex:none;font-size:12px;font-weight:600;background:rgba(255,255,255,.16);padding:5px 10px;border-radius:999px;white-space:nowrap}
.pill.err{background:#FFD23F;color:#1A2B22}
.bar{height:8px;background:rgba(255,255,255,.22);border-radius:999px;margin-top:14px;overflow:hidden}
.bar i{display:block;height:100%;background:#FFD23F;border-radius:999px;transition:width .35s ease}

.panel{background:var(--surface);border-radius:0 0 20px 20px;padding:18px 20px 20px;box-shadow:var(--shadow-panel)}

.in{height:48px;width:100%;min-width:0;border:1.5px solid var(--border);border-radius:12px;padding:0 14px;font:inherit;font-size:16px;background:var(--input);color:var(--text)}
.in::placeholder{color:var(--faint)}
.in:focus{outline:none;border-color:var(--link);background:var(--surface);box-shadow:0 0 0 3px rgba(46,125,79,.15)}
.add{display:flex;flex-direction:column;gap:8px}
.add-row{display:flex;gap:8px;flex-wrap:wrap}
.add .qty-in{width:74px;flex:none}
.add .unit-in{width:86px;flex:none}
.add .price-in{flex:1;min-width:120px}
.add .btn{flex:1;min-width:120px}
select.in,select.edit-in{appearance:none;-webkit-appearance:none;cursor:pointer;padding-right:26px;
  background-image:linear-gradient(45deg,transparent 50%,var(--muted) 50%),linear-gradient(135deg,var(--muted) 50%,transparent 50%);
  background-position:calc(100% - 15px) 21px,calc(100% - 10px) 21px;background-size:5px 5px,5px 5px;background-repeat:no-repeat}
select.edit-in{background-position:calc(100% - 15px) 17px,calc(100% - 10px) 17px}
.price{flex:none;white-space:nowrap;font-size:13px;font-weight:700;color:var(--text)}
.row.done .price{color:var(--done)}
.money{font-size:14px;margin:4px 0 0;font-weight:600}
.btn{height:48px;background:var(--primary);color:#fff;border:0;border-radius:12px;padding:0 18px;font:inherit;font-size:15px;font-weight:700;cursor:pointer;flex:none}
.btn:hover{background:var(--primary-hover)}
.btn:disabled{opacity:.6;cursor:default}
.btn.ghost{background:var(--surface);color:var(--text);border:1.5px solid var(--border)}
.btn.danger{background:#C0392B}


.cats-label{display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:600;color:var(--muted);margin:14px 0 8px}
.cats{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px 2px 4px;margin:0 -2px}
.cats::-webkit-scrollbar{display:none}
.cat{flex:none;display:flex;align-items:center;gap:6px;border:1.5px solid var(--border);background:var(--surface);border-radius:999px;padding:7px 12px;font:inherit;font-size:13px;font-weight:600;color:var(--text);cursor:pointer}
.cat:hover{border-color:var(--dash)}
.cat.on{background:var(--tint);border-color:var(--link);color:var(--green-text)}
.cat.new{border-style:dashed;color:var(--link);border-color:var(--dash)}
.newcat{display:flex;gap:8px;margin-top:10px}
.group-h{display:flex;align-items:center;gap:8px;margin-top:20px;padding-bottom:2px;font-size:13px;font-weight:700;color:var(--green-text)}
.groups>div:first-child .group-h{margin-top:14px}
.group-h .n{color:var(--faint);font-weight:600}
.items{list-style:none;margin:0;padding:0}
.row{display:flex;align-items:center;gap:12px;min-height:56px;border-bottom:1px solid var(--line)}
.row:last-child{border-bottom:0}
.check{width:24px;height:24px;border:2px solid var(--check);border-radius:50%;background:var(--surface);flex:none;cursor:pointer;display:grid;place-items:center;padding:0;transition:background .15s,border-color .15s}
.check svg{opacity:0;transform:scale(.5);transition:opacity .15s,transform .2s}
.row.done .check{background:var(--primary);border-color:var(--link)}
.row.done .check svg{opacity:1;transform:none}
.name{flex:1;min-width:0;font-size:16px;font-weight:500;cursor:pointer;display:flex}
.label{position:relative;display:inline-block;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .2s}
.label::after{content:'';position:absolute;left:0;right:0;top:52%;height:1.5px;background:var(--done);transform:scaleX(0);transform-origin:left;transition:transform .25s ease}
.row.done .label{color:var(--done)}
.row.done .label::after{transform:scaleX(1)}
.qty{flex:none;max-width:96px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;color:var(--green-text);background:var(--tint);border-radius:8px;padding:3px 8px}
.row.done .qty{color:var(--done);background:var(--bg)}
.del{border:0;background:none;color:var(--icon);font-size:22px;line-height:1;cursor:pointer;width:34px;height:34px;border-radius:8px;flex:none}
.del:hover{color:var(--danger);background:var(--danger-tint)}

.edit{border:0;background:none;color:var(--icon);cursor:pointer;width:30px;height:34px;border-radius:8px;flex:none;display:grid;place-items:center;padding:0}
.edit:hover{color:var(--link);background:var(--tint)}
.row.editing{align-items:flex-start;padding:12px 0}
.row.editing .check{margin-top:9px}
.edit-box{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}
.edit-line{display:flex;gap:8px}
.edit-in{width:100%;min-width:0;height:40px;border:1.5px solid var(--border);border-radius:10px;padding:0 10px;font:inherit;font-size:16px;color:var(--text);background:var(--input)}
.edit-in:focus{outline:none;border-color:var(--link);background:var(--surface);box-shadow:0 0 0 3px rgba(46,125,79,.15)}
.edit-in.bad{border-color:var(--danger);box-shadow:0 0 0 3px rgba(192,57,43,.15)}
.edit-line{flex-wrap:wrap}
.edit-in.qty-e{width:70px;flex:none}
.edit-in.unit-e{width:84px;flex:none}
.edit-in.price-e{flex:1;min-width:110px}
.edit-actions{display:flex;gap:8px;align-items:center;justify-content:flex-end}
.btn.sm{height:38px;padding:0 14px;font-size:14px;border-radius:10px}
.dup{font-size:13px;font-weight:600;color:var(--danger);margin-right:auto}
.items-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;font-size:13px;color:var(--muted);line-height:1.4}
.items-bar .right{margin-left:auto;flex:none}
.btn-sm.primary{background:var(--primary);border-color:var(--link);color:#fff}
.orgbtn{display:flex;align-items:center;gap:6px;background:none;border:0;color:var(--muted);font:inherit;font-size:13px;font-weight:700;cursor:pointer;padding:4px 2px}
.orgbtn:hover{color:var(--link)}
.row.org{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;cursor:grab;background:var(--surface);border-radius:10px;transition:box-shadow .15s,transform .15s}
.row.org .name{cursor:grab}
.row.dragging{cursor:grabbing;box-shadow:0 10px 22px var(--shadow-drag);transform:scale(1.02);position:relative;z-index:1;border-bottom-color:transparent}
.sorts{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:10px}
.sorts small{font-size:13px;font-weight:600;color:var(--muted);margin-right:2px}
.grip{width:24px;height:24px;display:grid;place-items:center;color:var(--faint);flex:none}
.arrows{display:flex;gap:6px;flex:none}
.empty{text-align:center;padding:30px 0 18px;color:var(--muted);font-size:15px;line-height:1.5}
.empty strong{display:block;color:var(--text);font-size:16px;margin-bottom:2px}
.sec{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:14px;border-top:1px solid var(--line);font-size:13px;font-weight:700;color:var(--muted)}
.linkbtn{background:none;border:0;color:var(--link);font:inherit;font-weight:700;cursor:pointer;padding:4px 2px}
.linkbtn:hover{text-decoration:underline;text-underline-offset:3px}
.foot .confirm-q{margin-right:auto}
.foot .push{margin-left:auto}
.foot{margin-top:18px;padding-top:14px;border-top:1px solid var(--line);display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:14px;color:var(--muted)}

.field{display:block;margin-bottom:14px}
.field span{display:block;font-size:14px;font-weight:600;margin-bottom:6px}
.keep{display:flex;gap:10px;align-items:center;font-size:14px;margin:4px 0 18px;cursor:pointer}
.keep input{width:18px;height:18px;accent-color:var(--link)}
.error{color:var(--danger);background:var(--danger-tint);border-radius:10px;padding:10px 12px;font-size:14px;margin:0 0 14px;line-height:1.4}
.switch{margin:16px 0 0;font-size:14px;color:var(--muted);text-align:center}
.note{margin-top:18px;font-size:12px;color:var(--muted);text-align:center;line-height:1.5}
.loading{font-size:16px;font-weight:600;color:var(--muted);text-align:center;padding-top:30vh}

button:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
@media (max-width:420px){
  .add .qty-in{width:72px}
  .title{font-size:26px}
  .who .hello{display:none}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

// ---------- armazenamento ----------
// No navegador os dados ficam no localStorage.
// Para sincronizar entre aparelhos, troque só estas três funções por chamadas à sua API.
const PREFIX = "lista:";

async function sGet(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
async function sSet(key, val) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(val));
    return true;
  } catch (e) {
    console.error("Erro ao salvar", e);
    return false; // aba anônima ou armazenamento cheio
  }
}
async function sDel(key) {
  try { localStorage.removeItem(PREFIX + key); } catch {}
}

// Quantidade: apenas números inteiros positivos (1 a 999)
const onlyInt = (v) => {
  const m = String(v ?? "").match(/\d+/); // primeiro número inteiro: "1.5" -> 1, "2 kg" -> 2
  return m ? m[0].replace(/^0+/, "").slice(0, 3) : "";
};

// Preço: guardado em centavos. Ao digitar, os números preenchem da direita (1250 -> R$ 12,50)
const toCents = (v) => {
  const d = String(v ?? "").replace(/\D/g, "").replace(/^0+/, "").slice(0, 8); // até R$ 999.999,99
  return d ? parseInt(d, 10) : null;
};
const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
// Unidades de medida; quem não escolher fica com "un."
const UNITS = [
  { id: "un", label: "un." },
  { id: "kg", label: "kg" },
  { id: "g", label: "g" },
  { id: "L", label: "L" },
  { id: "ml", label: "ml" },
  { id: "pct", label: "pct" },
  { id: "cx", label: "cx" },
  { id: "dz", label: "dz" },
];
const unitLabel = (u) => UNITS.find((x) => x.id === u)?.label || "un.";

const lineTotal = (i) => (i.price || 0) * (Number(i.qty) || 1);

const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

async function hash(text) {
  if (window.crypto?.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 5381;
  for (const ch of text) h = ((h << 5) + h + ch.charCodeAt(0)) | 0;
  return "x" + (h >>> 0).toString(16);
}

const DEFAULT_CATS = [
  { id: "hortifruti", name: "Hortifruti", icon: "🥬" },
  { id: "carnes", name: "Carnes", icon: "🥩" },
  { id: "frios", name: "Frios e laticínios", icon: "🧀" },
  { id: "padaria", name: "Padaria", icon: "🍞" },
  { id: "mercearia", name: "Mercearia", icon: "🥫" },
  { id: "bebidas", name: "Bebidas", icon: "🥤" },
  { id: "limpeza", name: "Limpeza", icon: "🧽" },
  { id: "higiene", name: "Higiene", icon: "🧴" },
  { id: "outros", name: "Outros", icon: "📦" },
];

const NONE = { id: "none", name: "Sem categoria", icon: "" };

// Listas com uma destas palavras no nome ganham as categorias de mercado acima.
// Maiúsculas e acentos não importam ("MERCADO", "Compras do mês", "Feira da semana").
// "mercado" vale também dentro de outra palavra: supermercado, hipermercado, minimercado.
const GROCERY_WORDS = ["mercado", "compras", "compra", "feira", "rancho", "despensa"];
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const isGrocery = (name) => {
  const n = norm(name);
  if (n.includes("mercado")) return true;
  return n.split(/[^a-z0-9-]+/).some((w) => GROCERY_WORDS.includes(w)); // "sexta-feira" não conta
};

// Categorias disponíveis numa lista: mercado = padrão + criadas; outras = só as criadas
const listCats = (l) =>
  isGrocery(l.name)
    ? [...DEFAULT_CATS.filter((c) => c.id !== "outros"), ...(l.categories || []), DEFAULT_CATS.at(-1)]
    : l.categories || [];
const fallbackCat = (l) => (isGrocery(l.name) ? "outros" : "none");
const validCatIds = (l) => new Set([...listCats(l).map((c) => c.id), ...(isGrocery(l.name) ? [] : ["none"])]);

const makeList = (name) => ({ id: uid(), name, items: [], categories: [], catActive: fallbackCat({ name }) });

const newData = () => {
  const l = makeList("Mercado");
  return { lists: [l], activeId: l.id, history: [], itemCats: {} };
};

// Ordenações rápidas dos itens (dentro de cada categoria)
const createdOf = (i) => i.createdAt ?? (parseInt(String(i.id).slice(-8), 36) || 0);
const byName = (a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base", numeric: true });
const SORTS = [
  { id: "az", label: "A → Z", fn: byName },
  { id: "za", label: "Z → A", fn: (a, b) => byName(b, a) },
  // itens sem quantidade ficam por último
  { id: "qtyDesc", label: "Maior quantidade", fn: (a, b) => (Number(b.qty) || 0) - (Number(a.qty) || 0) || byName(a, b) },
  { id: "qtyAsc", label: "Menor quantidade", fn: (a, b) => (Number(a.qty) || Infinity) - (Number(b.qty) || Infinity) || byName(a, b) },
  // itens sem preço ficam por último
  { id: "priceDesc", label: "Maior preço", fn: (a, b) => (b.price || 0) - (a.price || 0) || byName(a, b) },
  { id: "priceAsc", label: "Menor preço", fn: (a, b) => (a.price || Infinity) - (b.price || Infinity) || byName(a, b) },
  { id: "new", label: "Mais recentes", fn: (a, b) => createdOf(b) - createdOf(a) },
  { id: "old", label: "Mais antigos", fn: (a, b) => createdOf(a) - createdOf(b) },
];

function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M3.5 9.5l3.5 3.5 7.5-8.5" fill="none" stroke="#FFD23F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button className="icon-btn" onClick={onToggle} aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={dark ? "Modo claro" : "Modo escuro"}>
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}

// ---------- app ----------
export default function App() {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState(null);
  // tema: "light", "dark" ou null (segue o sistema até a pessoa escolher)
  const [theme, setTheme] = useState(null);
  const mq = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const [systemDark, setSystemDark] = useState(!!mq?.matches);

  useEffect(() => {
    if (!mq) return;
    const fn = (e) => setSystemDark(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);

  const dark = theme ? theme === "dark" : systemDark;
  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    setTheme(next);
    sSet("pref:theme", next);
  };

  useEffect(() => {
    (async () => {
      const t = await sGet("pref:theme");
      if (t === "light" || t === "dark") setTheme(t);
      const s = await sGet("session");
      if (s?.username) {
        const u = await sGet("user:" + s.username);
        if (u) setUser({ username: u.username, name: u.name });
      }
      setBooting(false);
    })();
  }, []);

  const logout = async () => {
    await sDel("session");
    setUser(null);
  };

  return (
    <div className={"app" + (dark ? " dark" : "")}>
      <style>{CSS}</style>
      <div className="wrap">
        {booting ? (
          <div className="loading">Carregando…</div>
        ) : user ? (
          <Lists user={user} onLogout={logout} themeToggle={<ThemeToggle dark={dark} onToggle={toggleTheme} />} />
        ) : (
          <Auth onAuth={setUser} themeToggle={<ThemeToggle dark={dark} onToggle={toggleTheme} />} />
        )}
      </div>
    </div>
  );
}

// ---------- login / cadastro ----------
function Auth({ onAuth, themeToggle }) {
  const [mode, setMode] = useState("entrar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [keep, setKeep] = useState(true);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setErr("");
    const u = email.trim().toLowerCase(); // o e-mail é a identificação da conta
    if (mode === "criar" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(u))
      return setErr("Digite um e-mail válido, como nome@email.com.");
    if (!u) return setErr("Digite seu e-mail.");
    if (mode === "criar" && !name.trim()) return setErr("Digite seu nome.");
    if (pw.length < 8) return setErr("A senha precisa ter pelo menos 8 caracteres.");

    setBusy(true);
    const existing = await sGet("user:" + u);

    if (mode === "criar") {
      if (existing) {
        setBusy(false);
        return setErr("Já existe uma conta com esse e-mail. Entre com a sua senha.");
      }
      const salt = uid();
      const rec = { username: u, email: u, name: name.trim(), salt, passHash: await hash(salt + pw), createdAt: Date.now() };
      const ok = (await sSet("user:" + u, rec)) && (await sSet("data:" + u, newData()));
      if (!ok) {
        setBusy(false);
        return setErr("Não foi possível criar a conta agora. Tente de novo.");
      }
      if (keep) await sSet("session", { username: u });
      onAuth({ username: u, name: rec.name });
    } else {
      if (!existing || (await hash(existing.salt + pw)) !== existing.passHash) {
        setBusy(false);
        return setErr("E-mail ou senha incorretos.");
      }
      if (keep) await sSet("session", { username: u });
      else await sDel("session");
      onAuth({ username: u, name: existing.name });
    }
  };

  const onKey = (e) => e.key === "Enter" && !busy && submit();
  const creating = mode === "criar";

  return (
    <>
      <header className="topbar">
        <h1 className="brand"><Logo />Lista</h1>
        {themeToggle}
      </header>

      <div className="hero">
        <h2 className="title">{creating ? "Crie sua conta" : "Entre na sua conta"}</h2>
        <p className="sub">
          {creating ? "Suas listas ficam salvas e prontas quando você voltar." : "Suas listas estão do jeito que você deixou."}
        </p>
      </div>

      <div className="panel">
        {creating && (
          <label className="field">
            <span>Seu nome</span>
            <input className="in" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={onKey}
              autoComplete="name" placeholder="Como quer ser chamado" />
          </label>
        )}
        <label className="field">
          <span>E-mail</span>
          <input className="in" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={onKey}
            autoCapitalize="none" autoCorrect="off" autoComplete="email" inputMode="email" placeholder="nome@email.com" />
        </label>
        <label className="field">
          <span>Senha</span>
          <input className="in" type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={onKey}
            autoComplete={creating ? "new-password" : "current-password"} placeholder={creating ? "Mínimo de 8 caracteres" : ""} />
        </label>

        <label className="keep">
          <input type="checkbox" checked={keep} onChange={(e) => setKeep(e.target.checked)} />
          Continuar conectado
        </label>

        {err && <p className="error" role="alert">{err}</p>}

        <button className="btn" style={{ width: "100%" }} onClick={submit} disabled={busy}>
          {busy ? "Aguarde…" : creating ? "Criar conta" : "Entrar"}
        </button>

        <p className="switch">
          {creating ? "Já tem conta? " : "Ainda não tem conta? "}
          <button className="linkbtn" onClick={() => { setMode(creating ? "entrar" : "criar"); setErr(""); }}>
            {creating ? "Entrar" : "Criar conta"}
          </button>
        </p>
      </div>
      <p className="note">
        Protótipo: a conta fica guardada neste navegador. Para entrar do celular e do computador com as mesmas
        listas, falta ligar um servidor.
      </p>
    </>
  );
}

// ---------- listas ----------
function Lists({ user, onLogout, themeToggle }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("saved");
  const [itemName, setItemName] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("un");
  const [price, setPrice] = useState(null); // centavos
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);
  const [confirmUncheck, setConfirmUncheck] = useState(false);
  const [organizing, setOrganizing] = useState(false);
  const [dragId, setDragId] = useState(null);
  const tabEls = useRef({});
  const [orgItems, setOrgItems] = useState(false);
  const [dragItem, setDragItem] = useState(null);
  const [lastSort, setLastSort] = useState(null);
  const rowEls = useRef({});
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const loaded = useRef(false);
  const dataRef = useRef(null);
  const itemRef = useRef(null);
  const key = "data:" + user.username;

  useEffect(() => {
    (async () => {
      let d = await sGet(key);
      if (!d || !d.lists?.length) d = newData();
      if (!d.lists.some((l) => l.id === d.activeId)) d.activeId = d.lists[0].id;
      if (!d.history) d.history = [];
      if (!d.itemCats) d.itemCats = {};
      const oldCustom = (d.categories || []).filter((c) => c.custom);
      d.lists = d.lists.map((l) => {
        const groc = isGrocery(l.name);
        const categories = l.categories || (groc ? oldCustom : oldCustom.filter((c) => l.items.some((i) => i.cat === c.id)));
        const base = { ...l, categories };
        const valid = validCatIds(base);
        const fb = fallbackCat(base);
        return {
          ...base,
          catActive: valid.has(l.catActive) ? l.catActive : groc && valid.has(d.catActive) ? d.catActive : fb,
          items: l.items.map((i) => ({ ...i, qty: onlyInt(i.qty), cat: valid.has(i.cat) ? i.cat : fb })),
        };
      });
      delete d.categories;
      delete d.catActive;
      setData(d);
    })();
  }, [key]);

  useEffect(() => {
    dataRef.current = data;
    if (!data) return;
    if (!loaded.current) { loaded.current = true; return; }
    setStatus("saving");
    const t = setTimeout(async () => {
      const ok = await sSet(key, data);
      setStatus(ok ? "saved" : "error");
    }, 400);
    return () => clearTimeout(t);
  }, [data, key]);

  useEffect(() => { setConfirmDel(false); setConfirmUncheck(false); setOrgItems(false); setLastSort(null); }, [data?.activeId]);

  const logout = async () => {
    if (dataRef.current) await sSet(key, dataRef.current);
    onLogout();
  };

  if (!data) return <div className="loading">Carregando suas listas…</div>;

  const active = data.lists.find((l) => l.id === data.activeId);
  const pending = active.items.filter((i) => !i.done);
  const done = active.items.filter((i) => i.done);
  const total = active.items.length;
  const hasPrices = active.items.some((i) => i.price);
  const sumAll = active.items.reduce((s, i) => s + lineTotal(i), 0);
  const sumCart = done.reduce((s, i) => s + lineTotal(i), 0);
  const pct = total ? Math.round((done.length / total) * 100) : 0;

  const grocery = isGrocery(active.name);
  const cats = listCats(active);
  const valid = validCatIds(active);
  const fb = fallbackCat(active);
  const catMap = Object.fromEntries([...cats, NONE].map((c) => [c.id, c]));
  const catOf = (i) => (valid.has(i.cat) ? i.cat : fb);
  const chipCats = grocery ? cats : cats.length ? [...cats, NONE] : [];
  const showGroups = grocery || cats.length > 0;
  const groups = [...cats, ...(grocery ? [] : [NONE])]
    .map((c) => ({ cat: c, items: pending.filter((i) => catOf(i) === c.id) }))
    .filter((g) => g.items.length);
  const activeCat = catMap[valid.has(active.catActive) ? active.catActive : fb];

  const updateActive = (fn) =>
    setData((d) => ({ ...d, lists: d.lists.map((l) => (l.id === d.activeId ? fn(l) : l)) }));

  // O item entra na categoria selecionada no momento
  const addItem = (rawName, rawQty = "", fromSuggestion = false, cents = null, un = "un") => {
    const n = rawName.trim();
    const q = onlyInt(rawQty);
    const pr = cents && cents > 0 ? cents : null;
    if (!n) return;
    setData((d) => {
      const low = n.toLowerCase();
      const l0 = d.lists.find((l) => l.id === d.activeId);
      const ok = validCatIds(l0);
      const selected = ok.has(l0.catActive) ? l0.catActive : fallbackCat(l0);
      const remembered = d.itemCats[low];
      const cat = fromSuggestion && remembered && ok.has(remembered) ? remembered : selected;
      const lists = d.lists.map((l) => {
        if (l.id !== d.activeId) return l;
        const existing = l.items.find((i) => i.name.toLowerCase() === low);
        if (existing) {
          return { ...l, items: l.items.map((i) => (i.id === existing.id ? { ...i, done: false, qty: q || i.qty, unit: q ? un : i.unit, price: pr ?? i.price ?? null, cat } : i)) };
        }
        return { ...l, items: [{ id: uid(), name: n, qty: q, unit: un, price: pr, cat, done: false, createdAt: Date.now() }, ...l.items] };
      });
      const history = [n, ...d.history.filter((h) => h.toLowerCase() !== low)].slice(0, 30);
      const itemCats = cat === "none" ? d.itemCats : { ...d.itemCats, [low]: cat };
      return { ...d, lists, history, itemCats };
    });
  };

  const selectCat = (id) => updateActive((l) => ({ ...l, catActive: id }));

  const createCat = () => {
    const n = newCatName.trim();
    if (!n) return;
    const dup = [...cats, NONE].find((c) => c.name.toLowerCase() === n.toLowerCase());
    if (dup) {
      selectCat(dup.id);
    } else {
      const c = { id: uid(), name: n, icon: "🏷️", custom: true };
      updateActive((l) => ({ ...l, categories: [...(l.categories || []), c], catActive: c.id }));
    }
    setNewCatName("");
    setNewCatOpen(false);
  };

  // Itens da categoria excluída vão para "Outros" (mercado) ou "Sem categoria" (demais listas)
  const deleteCat = (id) =>
    setData((d) => ({
      ...d,
      lists: d.lists.map((l) => {
        if (l.id !== d.activeId) return l;
        const f = fallbackCat(l);
        return {
          ...l,
          categories: (l.categories || []).filter((c) => c.id !== id),
          catActive: f,
          items: l.items.map((i) => (i.cat === id ? { ...i, cat: f } : i)),
        };
      }),
      itemCats: Object.fromEntries(Object.entries(d.itemCats).filter(([, v]) => v !== id)),
    }));

  // ---- ordem das listas ----
  const moveList = (id, dir) =>
    setData((d) => {
      const i = d.lists.findIndex((l) => l.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= d.lists.length) return d;
      const lists = [...d.lists];
      [lists[i], lists[j]] = [lists[j], lists[i]];
      return { ...d, lists };
    });

  // Arrastar com mouse ou dedo: a lista vai para a posição onde o ponteiro está
  const startDrag = (e, id) => {
    if (e.target.closest("button")) return; // setas não iniciam arraste
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    setDragId(id);
    const onMove = (ev) => {
      const x = ev.clientX;
      const y = ev.clientY;
      setData((d) => {
        const others = d.lists.filter((l) => l.id !== id);
        let idx = 0;
        for (const l of others) {
          const el = tabEls.current[l.id];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          const before = r.bottom < y || (y >= r.top && y <= r.bottom && r.left + r.width / 2 < x);
          if (before) idx++;
        }
        const cur = d.lists.findIndex((l) => l.id === id);
        if (cur === idx) return d;
        const lists = [...others];
        lists.splice(idx, 0, d.lists[cur]);
        return { ...d, lists };
      });
    };
    const onUp = () => {
      setDragId(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // ---- ordem dos itens (dentro da mesma categoria) ----
  const groupIdsOf = (l, itemId) => {
    const ok = validCatIds(l);
    const f = fallbackCat(l);
    const co = (i) => (ok.has(i.cat) ? i.cat : f);
    const grouped = isGrocery(l.name) || (l.categories || []).length > 0;
    const it = l.items.find((i) => i.id === itemId);
    if (!it) return [];
    return l.items.filter((i) => !i.done && (!grouped || co(i) === co(it))).map((i) => i.id);
  };
  // troca só as posições do grupo, sem mexer nos outros itens da lista
  const reorderGroup = (l, groupIds, newIds) => {
    const set = new Set(groupIds);
    const byId = Object.fromEntries(l.items.map((i) => [i.id, i]));
    let k = 0;
    return { ...l, items: l.items.map((i) => (set.has(i.id) ? byId[newIds[k++]] : i)) };
  };

  const sortItems = (sortId) => {
    const fn = SORTS.find((x) => x.id === sortId).fn;
    updateActive((l) => ({ ...l, items: [...l.items].sort(fn) }));
    setLastSort(sortId);
  };

  const moveItem = (id, dir) => {
    setLastSort(null);
    updateActive((l) => {
      const ids = groupIdsOf(l, id);
      const i = ids.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= ids.length) return l;
      const n = [...ids];
      [n[i], n[j]] = [n[j], n[i]];
      return reorderGroup(l, ids, n);
    });
  };

  const startItemDrag = (e, id) => {
    if (e.target.closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    setDragItem(id);
    setLastSort(null);
    const onMove = (ev) => {
      const y = ev.clientY;
      // rola a tela quando o dedo chega perto da borda
      if (y < 70) window.scrollBy(0, -12);
      else if (y > window.innerHeight - 70) window.scrollBy(0, 12);
      setData((d) => {
        let changed = false;
        const lists = d.lists.map((l) => {
          if (l.id !== d.activeId) return l;
          const ids = groupIdsOf(l, id);
          const others = ids.filter((x) => x !== id);
          let idx = 0;
          for (const oid of others) {
            const el = rowEls.current[oid];
            if (!el) continue;
            const r = el.getBoundingClientRect();
            if (r.top + r.height / 2 < y) idx++;
          }
          if (ids.indexOf(id) === idx) return l;
          changed = true;
          const n = [...others];
          n.splice(idx, 0, id);
          return reorderGroup(l, ids, n);
        });
        return changed ? { ...d, lists } : d;
      });
    };
    const onUp = () => {
      setDragItem(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const rowProps = (i, groupIds) => {
    const pos = groupIds.indexOf(i.id);
    return {
      organizing: orgItems,
      dragging: dragItem === i.id,
      canUp: pos > 0,
      canDown: pos < groupIds.length - 1,
      onMove: moveItem,
      onDragStart: startItemDrag,
      rowRef: (el) => (rowEls.current[i.id] = el),
    };
  };

  const submitItem = () => {
    addItem(itemName, qty, false, price, unit);
    setItemName("");
    setQty("");
    setUnit("un");
    setPrice(null);
    itemRef.current?.focus();
  };

  const toggle = (id) => updateActive((l) => ({ ...l, items: l.items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)) }));
  // "×" apaga o item de vez: sai da lista
  const remove = (id) =>
    setData((d) => {
      const list = d.lists.find((l) => l.id === d.activeId);
      const item = list?.items.find((i) => i.id === id);
      if (!item) return d;
      const low = item.name.toLowerCase();
      const { [low]: _, ...itemCats } = d.itemCats;
      return {
        ...d,
        lists: d.lists.map((l) => (l.id === d.activeId ? { ...l, items: l.items.filter((i) => i.id !== id) } : l)),
        history: d.history.filter((h) => h.toLowerCase() !== low),
        itemCats,
      };
    });
  // Edita nome, quantidade e preço; devolve false se o novo nome já existir em outro item da lista
  const editItem = (id, { name: raw, qty: rawQty, unit: un, price: cents }) => {
    const item = active.items.find((i) => i.id === id);
    if (!item) return true;
    const n = raw.trim() || item.name; // nome vazio mantém o anterior
    const q = onlyInt(rawQty);
    const pr = cents && cents > 0 ? cents : null;
    const low = n.toLowerCase();
    if (active.items.some((i) => i.id !== id && i.name.toLowerCase() === low)) return false;
    const oldLow = item.name.toLowerCase();
    setData((d) => {
      const lists = d.lists.map((l) =>
        l.id === d.activeId ? { ...l, items: l.items.map((i) => (i.id === id ? { ...i, name: n, qty: q, unit: un || "un", price: pr } : i)) } : l
      );
      const history = d.history
        .map((h) => (h.toLowerCase() === oldLow ? n : h))
        .filter((h, idx, arr) => arr.findIndex((x) => x.toLowerCase() === h.toLowerCase()) === idx);
      const itemCats = { ...d.itemCats };
      if (oldLow in itemCats && oldLow !== low) {
        itemCats[low] = itemCats[oldLow];
        delete itemCats[oldLow];
      }
      return { ...d, lists, history, itemCats };
    });
    return true;
  };

  // Tira tudo do carrinho: os itens voltam para a lista, na ordem em que estavam
  const uncheckAll = () => updateActive((l) => ({ ...l, items: l.items.map((i) => (i.done ? { ...i, done: false } : i)) }));

  const createList = () => {
    const n = newName.trim();
    if (!n) return;
    const l = makeList(n);
    setData((d) => ({ ...d, lists: [...d.lists, l], activeId: l.id }));
    setNewName("");
    setNewOpen(false);
  };

  const deleteList = () =>
    setData((d) => {
      const lists = d.lists.filter((l) => l.id !== d.activeId);
      return { ...d, lists, activeId: lists[0].id };
    });

  const onItemKey = (e) => e.key === "Enter" && submitItem();

  return (
    <>
      <header className="topbar">
        <h1 className="brand"><Logo />Lista</h1>
        <div className="who">
          <span className="hello">Olá, <strong>{user.name}</strong></span>
          {themeToggle}
          <button className="btn-sm" onClick={logout}>Sair</button>
        </div>
      </header>

      {organizing ? (
        <>
          <p className="org-hint">Arraste as listas ou use as setas para mudar a ordem.</p>
          <nav className="tabs organizing" aria-label="Ordem das listas">
            {data.lists.map((l, idx) => (
              <div key={l.id} ref={(el) => (tabEls.current[l.id] = el)}
                className={"otab" + (dragId === l.id ? " dragging" : "")}
                onPointerDown={(e) => startDrag(e, l.id)}>
                <button className="arrow" disabled={idx === 0} onClick={() => moveList(l.id, -1)}
                  aria-label={"Mover " + l.name + " para a esquerda"}>‹</button>
                <span className="nm">
                  <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden="true">
                    {[3, 7, 11].map((cy) => [3, 7].map((cx) => <circle key={cx + "-" + cy} cx={cx} cy={cy} r="1.3" fill="currentColor" />))}
                  </svg>
                  {l.name}
                </span>
                <button className="arrow" disabled={idx === data.lists.length - 1} onClick={() => moveList(l.id, 1)}
                  aria-label={"Mover " + l.name + " para a direita"}>›</button>
              </div>
            ))}
            <button className="tab finish" onClick={() => setOrganizing(false)}>Concluir</button>
          </nav>
        </>
      ) : (
        <nav className="tabs" aria-label="Suas listas">
          {data.lists.map((l) => (
            <button key={l.id} className={"tab" + (l.id === data.activeId ? " on" : "")}
              onClick={() => setData((d) => ({ ...d, activeId: l.id }))}>
              {l.name}
            </button>
          ))}
          <button className="tab new" onClick={() => setNewOpen((v) => !v)}>+ Nova lista</button>
          {data.lists.length > 1 && (
            <button className="tab org" onClick={() => { setOrganizing(true); setNewOpen(false); }}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3L2 6l3 3M2 6h9M11 7l3 3-3 3M14 10H5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Organizar
            </button>
          )}
        </nav>
      )}

      {newOpen && !organizing && (
        <div className="newlist">
          <input className="in" autoFocus value={newName} placeholder="Nome da lista, ex.: Farmácia"
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") createList(); if (e.key === "Escape") setNewOpen(false); }} />
          <button className="btn" onClick={createList}>Criar</button>
          <button className="btn ghost" onClick={() => setNewOpen(false)}>Cancelar</button>
        </div>
      )}

      <section className="hero">
        <div className="hero-top">
          <h2 className="title">{active.name}</h2>
          <span className={"pill" + (status === "error" ? " err" : "")} aria-live="polite">
            {status === "saving" ? "Salvando…" : status === "error" ? "Erro ao salvar" : "Salvo"}
          </span>
        </div>
        <p className="sub">
          {total === 0 ? "Nenhum item ainda" : `${done.length} de ${total} ${total === 1 ? "item" : "itens"} no carrinho`}
        </p>
        {hasPrices && (
          <p className="money">No carrinho: {brl(sumCart)} de {brl(sumAll)}</p>
        )}
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da compra">
          <i style={{ width: pct + "%" }} />
        </div>
      </section>

      <section className="panel">
        <div className="add">
          <input ref={itemRef} className="in" value={itemName} placeholder="Adicionar item"
            aria-label="Nome do item" onChange={(e) => setItemName(e.target.value)} onKeyDown={onItemKey} />
          <div className="add-row">
            <input className="in qty-in" value={qty} placeholder="Qtd."
              type="text" inputMode="numeric" pattern="[0-9]*" maxLength={3}
              aria-label="Quantidade, opcional (apenas números inteiros)"
              onChange={(e) => setQty(onlyInt(e.target.value))}
              onKeyDown={(e) => {
                // bloqueia qualquer tecla que não seja número (vírgula, ponto, sinal, letras)
                if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
                onItemKey(e);
              }} />
            <select className="in unit-in" value={unit} aria-label="Unidade de medida"
              onChange={(e) => setUnit(e.target.value)}>
              {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
            <input className="in price-in" value={price ? brl(price) : ""} placeholder="Preço (R$)"
              type="text" inputMode="numeric"
              aria-label="Preço por unidade, opcional"
              onChange={(e) => setPrice(toCents(e.target.value))}
              onKeyDown={(e) => {
                if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
                onItemKey(e);
              }} />
            <button className="btn" onClick={submitItem}>Adicionar</button>
          </div>
        </div>

        <div className="cats-label">
          <span>Categoria do item</span>
          {activeCat.custom && (
            <button className="linkbtn" style={{ color: "var(--danger)", fontSize: 13 }} onClick={() => deleteCat(activeCat.id)}
              title={"Os itens dessa categoria vão para " + catMap[fb].name}>
              Excluir “{activeCat.name}”
            </button>
          )}
        </div>
        <div className="cats" role="radiogroup" aria-label="Categoria do item">
          {chipCats.map((c) => (
            <button key={c.id} role="radio" aria-checked={c.id === activeCat.id}
              className={"cat" + (c.id === activeCat.id ? " on" : "")} onClick={() => selectCat(c.id)}>
              {c.icon && <span aria-hidden="true">{c.icon}</span>}{c.name}
            </button>
          ))}
          <button className="cat new" onClick={() => setNewCatOpen((v) => !v)}>+ Nova categoria</button>
        </div>

        {newCatOpen && (
          <div className="newcat">
            <input className="in" autoFocus value={newCatName}
              placeholder={grocery ? "Ex.: Pet, Bebê, Congelados" : "Nome da categoria"}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") createCat(); if (e.key === "Escape") setNewCatOpen(false); }} />
            <button className="btn" onClick={createCat}>Criar</button>
            <button className="btn ghost" onClick={() => setNewCatOpen(false)}>Cancelar</button>
          </div>
        )}

        {pending.length > 1 && (
          <div className="items-bar">
            {orgItems && (
              <span>
                {showGroups ? "Ordene, arraste ou use as setas. Cada item fica na sua categoria." : "Ordene, arraste ou use as setas."}
              </span>
            )}
            <span className="right">
              {orgItems ? (
                <button className="btn-sm primary" onClick={() => { setOrgItems(false); setLastSort(null); }}>Concluir</button>
              ) : (
                <button className="orgbtn" onClick={() => setOrgItems(true)}>
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M5 2v12M2 5l3-3 3 3M11 14V2M8 11l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Organizar itens
                </button>
              )}
            </span>
          </div>
        )}

        {pending.length > 1 && orgItems && (
          <div className="sorts" role="group" aria-label="Ordenar itens">
            <small>Ordenar por:</small>
            {SORTS.map((o) => (
              <button key={o.id} className={"cat" + (lastSort === o.id ? " on" : "")} aria-pressed={lastSort === o.id}
                onClick={() => sortItems(o.id)}>
                {o.label}
              </button>
            ))}
          </div>
        )}

        {pending.length === 0 ? (
          <div className="empty">
            {done.length ? (
              <><strong>Tudo no carrinho</strong>Use “Desmarcar todos”, no rodapé, para começar uma nova compra.</>
            ) : (
              <><strong>Sua lista está vazia</strong>Adicione o primeiro item no campo acima.</>
            )}
          </div>
        ) : !showGroups ? (
          <ul className="items" style={{ marginTop: 10 }}>
            {pending.map((i) => (
              <Row key={i.id} item={i} onToggle={toggle} onRemove={remove} onEdit={editItem} {...rowProps(i, pending.map((x) => x.id))} />
            ))}
          </ul>
        ) : (
          <div className="groups">
            {groups.map((g) => (
              <div key={g.cat.id}>
                <div className="group-h">
                  {g.cat.icon && <span aria-hidden="true">{g.cat.icon}</span>}{g.cat.name}<span className="n">{g.items.length}</span>
                </div>
                <ul className="items">
                  {g.items.map((i) => (
                    <Row key={i.id} item={i} onToggle={toggle} onRemove={remove} onEdit={editItem} {...rowProps(i, g.items.map((x) => x.id))} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {done.length > 0 && (
          <>
            <div className="sec">
              <span>No carrinho ({done.length})</span>
            </div>
            <ul className="items" style={{ marginTop: 0 }}>
              {done.map((i) => <Row key={i.id} item={i} onToggle={toggle} onRemove={remove} onEdit={editItem} />)}
            </ul>
          </>
        )}

        {/* ações que mexem na lista toda: pequenas, no rodapé e sempre com confirmação */}
        {(done.length > 0 || data.lists.length > 1) && (
          <div className="foot">
            {confirmUncheck ? (
              <>
                <span className="confirm-q">
                  Desmarcar {done.length === 1 ? "o item marcado" : `os ${done.length} itens marcados`}?
                </span>
                <button className="btn sm" onClick={() => { uncheckAll(); setConfirmUncheck(false); }}>Desmarcar</button>
                <button className="btn ghost sm" onClick={() => setConfirmUncheck(false)}>Cancelar</button>
              </>
            ) : confirmDel ? (
              <>
                <span className="confirm-q">Excluir “{active.name}” de vez?</span>
                <button className="btn danger sm" onClick={deleteList}>Excluir</button>
                <button className="btn ghost sm" onClick={() => setConfirmDel(false)}>Cancelar</button>
              </>
            ) : (
              <>
                {done.length > 0 && (
                  <button className="linkbtn" onClick={() => setConfirmUncheck(true)}>Desmarcar todos</button>
                )}
                {data.lists.length > 1 && (
                  <button className="linkbtn push" style={{ color: "var(--danger)" }} onClick={() => setConfirmDel(true)}>Excluir lista</button>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
}

const Chevron = ({ up }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d={up ? "M3 9l4-4 4 4" : "M3 5l4 4 4-4"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const digitsOnly = (e) => {
  if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
};

function Row({ item, onToggle, onRemove, onEdit, organizing, dragging, canUp, canDown, onMove, onDragStart, rowRef }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.name);
  const [dQty, setDQty] = useState(item.qty || "");
  const [dUnit, setDUnit] = useState(item.unit || "un");
  const [dPrice, setDPrice] = useState(item.price || null);
  const [dup, setDup] = useState(false);

  const startEdit = () => {
    setDraft(item.name);
    setDQty(item.qty || "");
    setDUnit(item.unit || "un");
    setDPrice(item.price || null);
    setDup(false);
    setEditing(true);
  };
  const cancel = () => setEditing(false);
  const save = () => {
    if (onEdit(item.id, { name: draft, qty: dQty, unit: dUnit, price: dPrice })) setEditing(false);
    else setDup(true);
  };
  const keys = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  };

  return (
    organizing ? (
      <li ref={rowRef} className={"row org" + (dragging ? " dragging" : "")} onPointerDown={(e) => onDragStart(e, item.id)}>
        <span className="grip" aria-hidden="true">
          <svg width="10" height="14" viewBox="0 0 10 14">
            {[3, 7, 11].map((cy) => [3, 7].map((cx) => <circle key={cx + "-" + cy} cx={cx} cy={cy} r="1.3" fill="currentColor" />))}
          </svg>
        </span>
        <span className="name"><span className="label">{item.name}</span></span>
        {item.qty && <span className="qty">{item.qty} {unitLabel(item.unit)}</span>}
        {item.price ? <span className="price">{brl(item.price)}</span> : null}
        <span className="arrows">
          <button className="arrow" disabled={!canUp} onClick={() => onMove(item.id, -1)} aria-label={"Mover " + item.name + " para cima"}><Chevron up /></button>
          <button className="arrow" disabled={!canDown} onClick={() => onMove(item.id, 1)} aria-label={"Mover " + item.name + " para baixo"}><Chevron /></button>
        </span>
      </li>
    ) : (
    <li ref={rowRef} className={"row" + (item.done ? " done" : "") + (editing ? " editing" : "")}>
      <button className="check" role="checkbox" aria-checked={item.done}
        aria-label={(item.done ? "Desmarcar " : "Marcar ") + item.name} onClick={() => onToggle(item.id)}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 6.5l2.5 2.5L10 3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {editing ? (
        <div className="edit-box">
          <input className={"edit-in" + (dup ? " bad" : "")} autoFocus value={draft}
            aria-label={"Nome de " + item.name} aria-invalid={dup}
            onFocus={(e) => e.target.select()}
            onChange={(e) => { setDraft(e.target.value); setDup(false); }}
            onKeyDown={keys} />
          <div className="edit-line">
            <input className="edit-in qty-e" value={dQty} placeholder="Qtd."
              inputMode="numeric" pattern="[0-9]*" maxLength={3} aria-label="Quantidade, opcional"
              onChange={(e) => setDQty(onlyInt(e.target.value))}
              onKeyDown={(e) => { digitsOnly(e); keys(e); }} />
            <select className="edit-in unit-e" value={dUnit} aria-label="Unidade de medida"
              onChange={(e) => setDUnit(e.target.value)}>
              {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
            <input className="edit-in price-e" value={dPrice ? brl(dPrice) : ""} placeholder="Preço (R$)"
              inputMode="numeric" aria-label="Preço por unidade, opcional"
              onChange={(e) => setDPrice(toCents(e.target.value))}
              onKeyDown={(e) => { digitsOnly(e); keys(e); }} />
          </div>
          <div className="edit-actions">
            {dup && <span className="dup" role="alert">Esse nome já está na lista</span>}
            <button className="btn ghost sm" onClick={cancel}>Cancelar</button>
            <button className="btn sm" onClick={save}>Salvar</button>
          </div>
        </div>
      ) : (
        <>
          <span className="name" onClick={() => onToggle(item.id)}>
            <span className="label">{item.name}</span>
          </span>
          {item.qty && <span className="qty">{item.qty} {unitLabel(item.unit)}</span>}
        {item.price ? <span className="price">{brl(item.price)}</span> : null}
          <button className="edit" aria-label={"Editar " + item.name} title="Editar nome, quantidade e preço" onClick={startEdit}>
            <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M11.2 2.3a1.4 1.4 0 0 1 2 0l.5.5a1.4 1.4 0 0 1 0 2L6 12.5 2.5 13.5l1-3.5z" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M10 3.5l2.5 2.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button className="del" aria-label={"Remover " + item.name} onClick={() => onRemove(item.id)}>×</button>
        </>
      )}
    </li>
    )
  );
}