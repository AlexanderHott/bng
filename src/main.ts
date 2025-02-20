import './style.css'


const url = new URL(window.location.href);
const query = url.searchParams.get("q")?.trim();

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <h1>!BNG${query ? "?q=" + query : ""}</h1>
  <pre>https://bng.0xott.zip?q=%s</pre>
`

