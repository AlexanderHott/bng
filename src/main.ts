import { bangs } from "./bangs";
import "./style.css";

const DEFAULT_BANG = "brave" satisfies (typeof bangs)[number]["t"];

function logo() {
  // https://manytools.org/hacker-tools/ascii-banner/
  const logoString = `%c\
  ..        ...     ..           ...     ...           ....        .
 888B.   .=*8888x <"?88h.     .=*8888n.."%888:      .x88" \`^x~  xH(\`
48888E  X>  '8888H> '8888    X    ?8888f '8888     X888   x8 \` 8888h
'8888' '88h. \`8888   8888    88x. '8888X  8888>   88888  888.  %8888
 Y88F  '8888 '8888    "88>  '8888k 8888X  '"*8h. <8888X X8888   X8?
 '88    \`888 '8888.xH888x.   "8888 X888X .xH8    X8888> 488888>"8888x
  8F      X" :88*~  \`*8888>    \`8" X888!:888X    X8888>  888888 '8888L
  4     ~"   !"\`      "888>   =~\`  X888 X888X    ?8888X   ?8888>'8888X
  .      .H8888h.      ?88     :h. X8*\` !888X     8888X h  8888 '8888~
 u8N.   :"^"88888h.    '!     X888xX"   '8888..:   ?888  -:8*"  <888"
"*88%   ^    "88888hx.+"    :~\`888f     '*888*"     \`*88.      :88%
  ""           ^"**""           ""        \`"\`          ^"~====""\`

       https://github.com/AlexanderHOtt/bng | https://0xott.zip
`;
  console.log(logoString, "font-weight: bold");
}

function getRedirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim();

  if (!query) {
    return;
  }

  const bangIdx = query?.lastIndexOf("!");
  let bang;
  let original;
  if (bangIdx < 0) {
    bang = localStorage.getItem("default-bang") ?? DEFAULT_BANG;
    original = query;
  } else {
    bang = query?.substring(bangIdx + 1, query.length);
    original = query.substring(0, bangIdx);
  }

  let selectedBang = bangs.find((b) => b.t === bang);
  if (!selectedBang) {
    console.log("couldn't find url for bang", bang);
    return;
  }

  const searchUrl = selectedBang.u.replace("{{{s}}}", original);
  return searchUrl;
}

function defaultPage() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
  <h1>!BNG</h1>
  <pre>https://bng.0xott.zip?q=%s</pre>
`;
}

function main() {
  logo();
  const url = getRedirectUrl();
  if (url) {
    window.location.replace(url);
  }
  defaultPage();
}

main();
