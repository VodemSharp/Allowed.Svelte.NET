function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
Promise.resolve();
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const svelteLogo = "/app/assets/svelte-a39f39b7.svg";
const Counter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count = 0;
  return `<button>count is ${escape(count)}</button>`;
});
const App_svelte_svelte_type_style_lang = "";
const css = {
  code: ".logo.svelte-c9fbf7{height:6em;padding:1.5em;will-change:filter}.logo.svelte-c9fbf7:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.svelte.svelte-c9fbf7:hover{filter:drop-shadow(0 0 2em #ff3e00aa)}.read-the-docs.svelte-c9fbf7{color:#888}",
  map: null
};
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main><div><a href="${"https://vitejs.dev"}" target="${"_blank"}"><img src="${"/vite.svg"}" class="${"logo svelte-c9fbf7"}" alt="${"Vite Logo"}"></a>
    <a href="${"https://svelte.dev"}" target="${"_blank"}"><img${add_attribute("src", svelteLogo, 0)} class="${"logo svelte svelte-c9fbf7"}" alt="${"Svelte Logo"}"></a></div>
  <h1>Vite + Svelte + .NET</h1>

  <div class="${"card"}">${validate_component(Counter, "Counter").$$render($$result, {}, {}, {})}</div>

  <p>Check out <a href="${"https://github.com/sveltejs/kit#readme"}" target="${"_blank"}">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="${"read-the-docs svelte-c9fbf7"}">Click on the Vite and Svelte logos to learn more
  </p>
</main>`;
});
const ServerApp = App;
async function render(url, props) {
  return ServerApp.render({ url, ssrData: props });
}
export {
  render
};
