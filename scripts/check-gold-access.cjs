const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const languages = ["it", "en", "ar", "zh", "ru"];
const HeroCTA = () => null;
const placeholder = () => null;

// Load the real TSX component with only browser/UI dependencies stubbed. This
// checks the props it sends to both layouts without opening Telegram or a browser.
function loader(language) {
  const cache = new Map();
  const stubs = {
    "@/components/LanguageProvider": { useLanguage: () => ({ language }), T: placeholder },
    "@/components/Navbar": { Navbar: placeholder },
    "@/components/Footer": { Footer: placeholder },
    "@/components/FAQ": { FAQ: placeholder },
    "framer-motion": { motion: new Proxy({}, { get: (_, tag) => tag }) },
    "lucide-react": { Check: placeholder },
    "./ui/Container": { Container: placeholder },
    "./ui/CornerBrackets": { CornerBrackets: placeholder },
    "./ui/HeroCTA": { HeroCTA },
    "./ui/CopyTradingGraphic": { CopyTradingGraphic: placeholder },
  };
  function load(file) {
    let absolute = path.resolve(root, file);
    if (!path.extname(absolute)) {
      absolute = [".ts", ".tsx"].map(ext => absolute + ext).find(fs.existsSync);
    }
    assert.ok(absolute, `Missing source: ${file}`);
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const module = { exports: {} };
    cache.set(absolute, module);
    const source = fs.readFileSync(absolute, "utf8");
    const compiled = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true,
    } }).outputText;
    const localRequire = specifier => {
      if (Object.hasOwn(stubs, specifier)) return stubs[specifier];
      if (specifier.startsWith("@/")) return load(specifier.slice(2));
      if (specifier.startsWith(".")) return load(path.resolve(path.dirname(absolute), specifier));
      return require(specifier);
    };
    vm.runInThisContext(`(function(require, module, exports) {\n${compiled}\n})`, { filename: absolute })(localRequire, module, module.exports);
    return module.exports;
  }
  return load;
}

function descendants(node, predicate, output = []) {
  if (Array.isArray(node)) node.forEach(child => descendants(child, predicate, output));
  else if (node && typeof node === "object" && node.props) {
    if (predicate(node)) output.push(node);
    descendants(node.props.children, predicate, output);
  }
  return output;
}

for (const language of languages) {
  const load = loader(language);
  const { EliteAccess } = load("components/EliteAccess.tsx");
  const buttons = descendants(EliteAccess(), element => element.type === HeroCTA);
  const goldButtons = buttons.filter(element => element.props.label === "Scopri le sale Gold");
  assert.equal(goldButtons.length, 2, `${language}: desktop and mobile Gold CTA must both exist`);
  const expectedHome = `https://t.me/SkitlaSalaSegnaliBot?start=gold_v1_site_home_${language}`;
  assert.deepEqual(goldButtons.map(element => element.props.href), [expectedHome, expectedHome]);
  assert.ok(buttons.filter(element => element.props.label !== "Scopri le sale Gold")
    .every(element => element.props.href === "https://t.me/SKITLAService"), "Membership links must remain unchanged");

  const GoldPage = load("app/gold/page.tsx").default;
  const links = descendants(GoldPage(), element => element.type === "a").map(element => element.props.href);
  assert.ok(links.includes(expectedHome), `${language}: direct Gold access link`);
  assert.ok(links.includes(`https://t.me/SkitlaSalaSegnaliBot?start=gold_v1_site_reports_${language}`), `${language}: reports link`);
}

const load = loader("it");
const { LanguageSelect } = load("components/LanguageProvider.tsx");
const selector = require("react-dom/server").renderToStaticMarkup(require("react").createElement(LanguageSelect));
const selectableLanguages = [...selector.matchAll(/<option value="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(selectableLanguages, languages, "The Gold checks must cover every selectable website language");
const { GOLD_ACCESS } = load("content/gold-access.ts");
const { FAQS } = load("content/faq.ts");
const { EN } = load("content/translations.ts");
const { INTERNATIONAL } = load("content/international.ts");
const copy = new Set([
  ...Object.values(GOLD_ACCESS),
  ...FAQS.flatMap(item => [item.question, item.answer]),
  "Apri il percorso Gold nel bot",
  "Il tuo percorso verso le sale Gold",
  "Scopri le due sale Gold, i percorsi con FPG, Exness e Memento e le membership SKITLA.",
  "Partnership: FPG, Exness, Memento, Bitunix, BingX e Bitget.",
]);
for (const text of copy) {
  assert.ok(EN[text]?.trim(), `Missing English translation: ${text}`);
  assert.equal(INTERNATIONAL[text]?.length, 3, `Missing international translations: ${text}`);
  for (const translated of INTERNATIONAL[text]) assert.ok(translated.trim(), `Empty translation: ${text}`);
  const handles = text.match(/@[A-Za-z0-9_]+/g) || [];
  for (const translated of [EN[text], ...INTERNATIONAL[text]]) {
    for (const handle of handles) assert.ok(translated.includes(handle), `Lost support handle ${handle}`);
  }
}

console.log(`Gold checks passed: desktop/mobile CTA and Gold-page links in ${languages.length} languages; ${copy.size} translated copy entries with support handles preserved.`);
