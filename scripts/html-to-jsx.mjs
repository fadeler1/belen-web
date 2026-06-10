import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node html-to-jsx.mjs <html-file>");
  process.exit(1);
}

let html = fs.readFileSync(file, "utf8");

const trackMatch = html.match(/<div id="physicsTrack"[^>]*>([\s\S]*)<\/div>\s*<\/main>/);
if (!trackMatch) {
  console.error("Could not find physicsTrack");
  process.exit(1);
}

let content = trackMatch[1];

// Fix known malformed HTML from original files
content = content.replace(
  /(<h2[^>]*>[^<]*<span[^>]*><\/span>[^<]*)<\/span>(<\/h2>)/g,
  "$1$2"
);
content = content.replace(
  /(<p className="captionTitle"[^>]*>[^<]*<span className="break">[^<]*)(<\/p>)/g,
  "$1</span>$2"
);
content = content.replace(
  /(<p class="captionTitle"[^>]*>[^<]*<span class="break">[^<]*)(<\/p>)/g,
  "$1</span>$2"
);

const replacements = [
  [/class=/g, "className="],
  [/for=/g, "htmlFor="],
  [/tabindex=/g, "tabIndex="],
  [/readonly/g, "readOnly"],
  [/autoplay/g, "autoPlay"],
  [/crossorigin/g, "crossOrigin"],
  [/view-transition-name:/g, "viewTransitionName:"],
  [/style="([^"]*)"/g, (_, s) => {
    const obj = s.split(";").filter(Boolean).map((p) => {
      const [k, ...v] = p.split(":");
      const key = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${key}: '${v.join(":").trim()}'`;
    }).join(", ");
    return `style={{ ${obj} }}`;
  }],
  [/href="index\.html"/g, 'href="/"'],
  [/href="search\.html"/g, 'href="/search"'],
  [/href="categoria\.html"/g, 'href="/categoria"'],
  [/href="producto\.html"/g, 'href="/producto"'],
  [/action="search\.html"/g, 'action="/search"'],
  [/src="static\//g, 'src="/static/'],
  [/<br>/g, "<br />"],
  [/<img([^>]*)(?<!\/)>/g, "<img$1 />"],
  [/<input([^>]*)(?<!\/)>/g, "<input$1 />"],
  [/referrerpolicy=/g, "referrerPolicy="],
  [/<iframe([^>]*)><\/iframe>/g, "<iframe$1></iframe>"],
  [/&#x2713;/g, "✓"],
  [/allowfullscreen=""/g, "allowFullScreen"],
];

for (const [from, to] of replacements) {
  content = content.replace(from, to);
}

// Fix captionTitle spans after className conversion
content = content.replace(
  /(<p className="captionTitle"[^>]*>[\s\S]*?<span className="break">[^<]*)(<\/p>)/g,
  "$1</span>$2"
);

console.log(content.trim());
