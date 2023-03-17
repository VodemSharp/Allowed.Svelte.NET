var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
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
const missing_component = {
  $$render: () => ""
};
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
const PageTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${$$result.head += `<!-- HEAD_svelte-1g2xq30_START -->${$$result.title = `<title>${escape(value)}</title>`, ""}<!-- HEAD_svelte-1g2xq30_END -->`, ""}`;
});
const LayoutView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { layout } = $$props;
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  return `${validate_component(layout || missing_component, "svelte:component").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
class NumberType {
  constructor(name, min, max, real = false) {
    __publicField(this, "name");
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "real");
    this.name = name;
    this.min = min;
    this.max = max;
    this.real = real;
  }
}
const numberTypes = [
  new NumberType("sbyte", -128, 127),
  new NumberType("byte", 0, 255),
  new NumberType("short", -32768, 32767),
  new NumberType("ushort", 0, 65535),
  new NumberType("int", -2147483648, 2147483647),
  new NumberType("uint", 0, 4294967295),
  new NumberType("long", -9223372036854776e3, 9223372036854776e3),
  new NumberType("ulong", 0, 18446744073709552e3),
  new NumberType("float", -34028234663852886e22, 34028234663852886e22, true),
  new NumberType("double", -17976931348623157e292, 17976931348623157e292, true),
  new NumberType("decimal", -7922816251426434e13, 7922816251426434e13, true)
];
class RouteService {
  isParameter(x) {
    return x[0] == "{" && x[x.length - 1] == "}";
  }
  countNecessaryParts(route2) {
    let counter = route2.length;
    for (let i = route2.length - 1; i >= 0; i--) {
      if (!route2[i].endsWith("?}") && !route2[i].startsWith("{*"))
        break;
      counter--;
    }
    return counter;
  }
  getSuitableByLength(routes2, route2) {
    return routes2.filter((r) => this.countNecessaryParts(r) <= route2.length && (r.length >= route2.length || r.some((x) => x.indexOf("{*") > -1)));
  }
  getParameterParts(routePart) {
    const parameter = routePart.substring(1, routePart.length - 1);
    const parameterParts = parameter.split(":");
    const type = parameterParts.length == 2 ? parameterParts[1].replace("?", "") : void 0;
    return { parameterParts, type };
  }
  isValidType(routePart, value) {
    const { parameterParts, type } = this.getParameterParts(routePart);
    if (parameterParts[0][0] != "*" && numberTypes.some((t) => t.name == type)) {
      const numberType = numberTypes.filter((t) => t.name == type)[0];
      const numberValue = Number(value);
      return value.indexOf("e") == -1 && !isNaN(numberValue) && (numberType.real || value.indexOf(".") == -1 && !numberType.real) && numberValue >= numberType.min && numberValue <= numberType.max;
    }
    return true;
  }
  getSuitableByContent(routes2, route2) {
    for (let i = 0; i < route2.length; i++) {
      for (let j = 0; j < routes2.length; j++) {
        if (i < routes2[j].length && (!this.isParameter(routes2[j][i]) && route2[i] != routes2[j][i] || this.isParameter(routes2[j][i]) && route2[i] != "" && !this.isValidType(routes2[j][i], route2[i]))) {
          routes2 = routes2.filter((r) => routes2.indexOf(r) != j);
          j--;
        }
      }
    }
    return routes2;
  }
  countFirstNotParameter(route2) {
    let counter = 0;
    for (let i = 0; i < route2.length; i++) {
      if (this.isParameter(route2[i]))
        break;
      counter++;
    }
    return counter;
  }
  getBestComparison(routes2) {
    let bestRoute = routes2[0];
    let bestRouteValue = this.countFirstNotParameter(routes2[0]);
    for (let i = 1; i < routes2.length; i++) {
      let routeValue = this.countFirstNotParameter(routes2[i]);
      if (routeValue > bestRouteValue) {
        bestRoute = routes2[i];
        bestRouteValue = routeValue;
      }
    }
    return bestRoute;
  }
  getActivePage(routes2, pathname) {
    const route2 = pathname.split("/");
    let result = this.getSuitableByLength(routes2, route2);
    result = this.getSuitableByContent(result, route2);
    if (result.length == 0)
      return void 0;
    return this.getBestComparison(result).join("/");
  }
  getParameters(route2, pathname) {
    const routeParts = route2.split("/");
    const parts = pathname.split("/");
    const result = {};
    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      if (this.isParameter(routePart)) {
        const { parameterParts, type } = this.getParameterParts(routePart);
        if (parameterParts[0][0] == "*") {
          result[parameterParts[0].substring(1)] = i < parts.length ? parts.slice(i).join("/") : void 0;
        } else {
          if (numberTypes.some((t) => t.name == type))
            result[parameterParts[0]] = i < parts.length ? Number(parts[i]) : 0;
          else
            result[parameterParts[0]] = i < parts.length ? parts[i] : void 0;
        }
      }
    }
    return result;
  }
}
const routerService = new RouteService();
class RouteStoreData {
  constructor(path = void 0, route2 = void 0) {
    __publicField(this, "path");
    __publicField(this, "route");
    this.path = path;
    this.route = route2;
  }
}
function createRouteStore(routes2, url2) {
  const routeData = new RouteStoreData();
  const { subscribe: subscribe2, set } = writable(routeData);
  let parsedRoutes = [];
  let routeKeys = Object.keys(routes2);
  for (let i = 0; i < routeKeys.length; i++) {
    parsedRoutes[i] = routeKeys[i].split("/");
  }
  url2.subscribe((x) => {
    const path = routerService.getActivePage(parsedRoutes, x.pathname);
    set(new RouteStoreData(path, path == void 0 ? void 0 : routes2[path]));
  });
  return {
    subscribe: subscribe2
  };
}
const Router = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { route: route2 = new RouteStoreData() } = $$props;
  if ($$props.route === void 0 && $$bindings.route && route2 !== void 0)
    $$bindings.route(route2);
  return `${route2.path ? `${slots.found ? slots.found({}) : ``}` : `${slots["not-found"] ? slots["not-found"]({}) : ``}`}`;
});
const RouteView = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let { defaultLayout } = $$props;
  let { route: route2 } = $$props;
  let { url: url2 } = $$props;
  if ($$props.defaultLayout === void 0 && $$bindings.defaultLayout && defaultLayout !== void 0)
    $$bindings.defaultLayout(defaultLayout);
  if ($$props.route === void 0 && $$bindings.route && route2 !== void 0)
    $$bindings.route(route2);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  props = routerService.getParameters(route2 == null ? void 0 : route2.path, url2 == null ? void 0 : url2.pathname);
  return `${route2.route.layout ? `${validate_component(route2.route.layout || missing_component, "svelte:component").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(route2.route.component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {})}`;
    }
  })}` : `${defaultLayout ? `${validate_component(defaultLayout || missing_component, "svelte:component").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(route2.route.component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {})}`;
    }
  })}` : `${validate_component(route2.route.component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {})}`}`}`;
});
class RouteData {
  constructor(component, layout = void 0) {
    __publicField(this, "component");
    __publicField(this, "layout");
    this.component = component;
    this.layout = layout;
  }
}
class PageStoreData {
  constructor(data, isFromSSR) {
    __publicField(this, "isSSR", false);
    __publicField(this, "isFromSSR", false);
    __publicField(this, "href", "");
    __publicField(this, "data", {});
    this.data = data;
    this.isFromSSR = isFromSSR;
    this.isSSR = typeof window == "undefined";
  }
}
const defaultRequestInit = {
  method: "GET",
  headers: {
    "Svdn-Data-Only": "1"
  }
};
function createPageStore(ssrData, url2) {
  const page2 = new PageStoreData(ssrData, true);
  const { subscribe: subscribe2, set, update } = writable(page2);
  url2.subscribe((x) => {
    update((p) => {
      if (p.href && p.href != x.href)
        p.data = {};
      p.href = x.href;
      return p;
    });
  });
  return {
    set,
    subscribe: subscribe2,
    update,
    isDataEmpty: () => {
      return Object.keys(page2.data).length == 0;
    },
    updateData: async (init = defaultRequestInit) => {
      const data = await (await fetch(page2.href, init)).json();
      update((p) => {
        p.data = data;
        return p;
      });
    }
  };
}
function createUrlStore(ssrUrl) {
  if (typeof window === "undefined") {
    return {
      subscribe: writable(new URL(ssrUrl)).subscribe
    };
  }
  const href = writable(window.location.href);
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  const updateHref = () => href.set(window.location.href);
  history.pushState = function() {
    originalPushState.apply(this, arguments);
    updateHref();
  };
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    updateHref();
  };
  window.addEventListener("popstate", updateHref);
  window.addEventListener("hashchange", updateHref);
  return {
    subscribe: derived(href, ($href) => new URL($href)).subscribe,
    navigate: function(url2) {
      history.pushState({}, "", url2);
    }
  };
}
const IndexLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"index-layout"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<p>About</p>
<p><a href="${"/"}">Index link</a></p>
<button>Go to Index</button>
${$page.data ? `<p>${escape($page.data.text)}</p>` : ``}`;
});
const svelteLogo = "/app/assets/svelte-a39f39b7.svg";
const Counter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { counter = 0 } = $$props;
  if ($$props.counter === void 0 && $$bindings.counter && counter !== void 0)
    $$bindings.counter(counter);
  return `<button>count is ${escape(counter)}</button>`;
});
const Index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".logo.svelte-141kimj{height:6em;padding:1.5em;will-change:filter}.logo.svelte-141kimj:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.svelte.svelte-141kimj:hover{filter:drop-shadow(0 0 2em #ff3e00aa)}.read-the-docs.svelte-141kimj{color:#888}",
  map: null
};
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { counter } = $$props;
  if ($$props.counter === void 0 && $$bindings.counter && counter !== void 0)
    $$bindings.counter(counter);
  $$result.css.add(css);
  return `<main><div><a href="${"https://vitejs.dev"}" target="${"_blank"}"><img src="${"/app/vite.svg"}" class="${"logo svelte-141kimj"}" alt="${"Vite Logo"}"></a>
        <a href="${"https://svelte.dev"}" target="${"_blank"}"><img${add_attribute("src", svelteLogo, 0)} class="${"logo svelte svelte-141kimj"}" alt="${"Svelte Logo"}"></a>
        <a href="${"https://dotnet.microsoft.com"}" target="${"_blank"}"><img src="${"/app/dotnet.svg"}" class="${"logo svelte-141kimj"}" alt="${"DotNet Logo"}"></a></div>
    <h1>Vite + Svelte + .NET</h1>

    <div class="${"card"}">${validate_component(Counter, "Counter").$$render($$result, { counter }, {}, {})}
        <button>Go to about</button></div>

    <p>Check out <a href="${"https://github.com/sveltejs/kit#readme"}" target="${"_blank"}">SvelteKit</a>, the official Svelte
        app framework powered by Vite!
    </p>

    <p class="${"read-the-docs svelte-141kimj"}">Click on the Vite and Svelte logos to learn more
    </p>
</main>`;
});
const MainLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"main-layout"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const NotFound = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(PageTitle, "PageTitle").$$render($$result, { value: "Not found" }, {}, {})}
${validate_component(LayoutView, "LayoutView").$$render($$result, { layout: MainLayout }, {}, {
    default: () => {
      return `<p role="${"alert"}">Sorry, there&#39;s nothing at this address.</p>`;
    }
  })}`;
});
const routes = {
  "/404": new RouteData(NotFound),
  "/{counter:double?}": new RouteData(Index, IndexLayout),
  "/about": new RouteData(About)
};
let url;
let page;
let route;
function createStores(ssrUrl, ssrData) {
  url = createUrlStore(ssrUrl);
  page = createPageStore(ssrData, url);
  route = createRouteStore(routes, url);
}
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $route, $$unsubscribe_route;
  let $url, $$unsubscribe_url;
  $$unsubscribe_route = subscribe(route, (value) => $route = value);
  $$unsubscribe_url = subscribe(url, (value) => $url = value);
  $$unsubscribe_route();
  $$unsubscribe_url();
  return `${validate_component(Router, "Router").$$render($$result, { route: $route }, {}, {
    "not-found": () => {
      return `<div slot="${"not-found"}">${validate_component(NotFound, "NotFound").$$render($$result, {}, {}, {})}</div>`;
    },
    found: () => {
      return `<div slot="${"found"}">${validate_component(RouteView, "RouteView").$$render(
        $$result,
        {
          route: $route,
          url: $url,
          defaultLayout: MainLayout
        },
        {},
        {}
      )}</div>`;
    }
  })}`;
});
const ServerApp = App;
async function render(url2, props) {
  createStores(url2, props);
  return ServerApp.render({ url: url2, ssrData: props });
}
export {
  render
};
