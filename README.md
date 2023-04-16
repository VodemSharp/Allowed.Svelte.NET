# Allowed.Svelte.NET

`Allowed.Svelte.NET` is a framework that provides a bridge between `Svelte` and `ASP.NET Core` to build fast and
efficient web applications with a routing system for communication between front-end and server.

The framework was inspired by both `Blazor` and `Svelte`. While `Blazor` is a great platform for front-end development,
both of its models - `Blazor WebAssembly` and `Blazor Server` - have some critical disadvantages that cannot be resolved
in the near future. On the other hand, `Svelte` offers a [similar syntax](#comparison-of-blazor-and-svelte) to Blazor and is a great way for `.NET`
developers with experience in `Razor` syntax to create great web apps.

# Table of Contents

* [Features](#features)
    * [Pre-render](#pre-render)
    * [Routing](#routing)
* [Get started](#get-started)
* [Backend](#backend)
    * [Route methods](#route-methods)
    * [Server side data](#server-side-data)
* [Frontend](#frontend)
    * [Stores](#stores)
        * [PageStore](#pagestore)
        * [UrlStore](#urlstore)
        * [RouteStore](#routestore)
    * [Router](#router)
        * [Layouts](#layouts)
* [Comparison of Blazor and Svelte](#comparison-of-blazor-and-svelte)
    * [Counter](#counter)
    * [Operators](#operators)
* [Backlog](#backlog)

# Features

## Pre-render

Key feature of `Allowed.Svelte.NET` is its ability to prerender pages from .NET using Svelte. This means that pages are
generated on the server-side before being sent to the client, resulting in faster load times and a smoother user
experience. Additionally, this approach can improve search engine optimization (SEO), as search engines are better able
to index prerendered pages.

## Routing

`Allowed.Svelte.NET` includes a routing system that generates a route map based on `[HttpGet]` attributes. This approach
is similar to that used in Blazor, making it easy for developers to create dynamic and responsive web applications. It
fully represents the route map to the frontend, so there is no need to duplicate client-side routing logic.

# Get started

1. Install Allowed.Svelte.NET.Tools:

```
dotnet tool update -g Allowed.Svelte.NET.Tools --version 1.0.2
```

2. Install Allowed.Svelte.NET.Templates:

```
dotnet new install Allowed.Svelte.NET.Templates::1.0.2
```

3. Create a project (You can also create project using Visual Studio, Rider, etc.):

```
dotnet new svelte.net
```

4. Run project:

```
dotnet run
```

---

# Backend

## Route methods

This C# method is defining an action to handle a request for the "about" page in a Svelte application. The method is
decorated with the `SvelteRoute` attribute, which specifies the URL path to the page ("/about"), the page name ("About")
, and the layout name ("MainLayout").

```csharp
[SvelteRoute("/about/{section}", Page = "About", Layout = "MainLayout")]
public SvelteView<object> About()
{
    return new SvelteView<object>(new
    {
        Text = "Information about this framework"
    });
}
```

The method returns a `SvelteView` object, which represents a pre-rendered view of the page. This model can
be [accessed](#pagestore) in the client-side code of the page.
In the C# code, the `section` parameter can be used to process data for pre-rendering the page based on this parameter.
In the client-side code, the parameter can be accessed using `export let section: string;`.

## Server side data

To transfer data from the server (`ASP.NET Core`) to the client (`Svelte`), you can use the IServerSideData interface
and implement the `Get` method to retrieve the data from the server.

Here's an example implementation using the ConfigurationData class:

```csharp
public class ConfigurationData<T> : IServerSideData
    where T : class
{
    public string Section => "Configuration";
    private readonly string _sectionName;

    public ConfigurationData(string sectionName = "ClientData")
    {
        _sectionName = sectionName;
    }

    public Task<object?> Get(HttpContext httpContext)
    {
        return Task.FromResult<object?>(
            httpContext.RequestServices.GetRequiredService<IConfiguration>().GetSection(_sectionName).Get<T>());
    }
}
```

To add the ConfigurationData implementation to the DI container in ASP.NET Core, use the AddServerSideData extension
method provided by the Allowed.Svelte.NET framework:

```csharp
builder.Services.AddServerSideData(new ConfigurationData<T>("sectionName"));
```

Here, T is the type of data you want to transfer, and `sectionName` is the name of the configuration section where the
data is located.

Here is an example of accessing transferred data in `Svelte`:

```sveltehtml

<script lang="ts">
    import {ServerData} from "svelte-dotnet";
    import {page} from "../stores/RouterStores";

    class Configuration {
        apiConnection: string = '';
    }

    class AppServerData extends ServerData {
        configuration: Configuration = new Configuration();
    }

    $: data = <AppServerData>$page.data;
</script>
```

Overall, this allows for easy transfer of server-side data to the client, which can be useful for providing the client
with necessary information such as feature flags or application settings.

# Frontend

## Stores

There are three main stores used in Svelte.NET: [UrlStore](#urlstore), [PageStore](#pagestore),
and [RouteStore](#routeStore).

### UrlStore

The `UrlStore` is a `Svelte` store that extends the `Readable` store, which provides a subscribe method to observe
changes to the URL. The `UrlStore` also provides a navigate method to navigate without a reload from JavaScript.
Here is the `UrlStore` interface:

```typescript
interface UrlStore extends Readable<URL> {
    navigate?: {
        (url: string): void;
    };
}
```

This store is used in the [Router](#router) component and can be created like this:

```typescript
url = createUrlStore(ssrUrl);
```

However, in the template project, the creation of the `UrlStore` is already implemented in the `RouterStores.ts` file.

### PageStore

The `PageStore` is a Svelte store that provides access to the data model passed from the C# code. The data model is
contained in a `SvelteView` object that is returned by the server-side action method, as shown in the C# code you
provided earlier.

---

```typescript
interface PageStore extends Writable<PageStoreData> {
    isDataModelEmpty: {
        (): boolean;
    };
    updateDataModel: {
        (init?: RequestInit): Promise<void>;
    };
    updateIsEmpty: {
        (init?: RequestInit): Promise<void>;
    };
}
```

On the client-side, the `PageStore` is implemented as an interface `PageStore` which extends the `Writable` store
interface. It includes the following methods:

* `isDataModelEmpty`: This method returns a boolean value indicating whether the data model is empty. The data model can
  be empty if we redirect to another URL on the client-side or if the `SvelteView` model is empty.
* `updateDataModel`: This method updates the `PageStore` data model. It makes a request similar to the request used to
  get the Svelte page, but it passes a header `svdn-data-only="1"`, indicating that this is an API request and that the
  API should return JSON data (model) instead of HTML. The init parameter is an optional variable of type `RequestInit`,
  with a default value of `defaultRequestInit`.
* `updateIsEmpty`: This method calls `updateDataModel` if `isDataModelEmpty` is true.

---

```typescript
export class PageStoreData {
    isSSR: boolean;
    href: string;
    data: ServerData;

    constructor(ssrData: ServerData);
}
```

The `PageStoreData` class defines the shape of the data stored in the `PageStore`. It includes the following properties:

* isSSR: a boolean value indicating whether the page was rendered on the server-side.
* href: a string containing the current URL.
* data: an instance of the ServerData class containing the data model passed from the server.

---

```typescript
export class ServerData {
    model: object | undefined;
}
```

The ServerData class defines the shape of the server-side data passed to the PageStore. It includes the following
property:

* model: an optional object containing the data model.
* any other data parameters, that implemented `IServerSideData` [interface](#server-side-data).

---
`PageStore` is optional for routing, but very useful for pre-rendering:

```typescript
page = createPageStore(ssrData, url);
```

The template project already contains a `PageStore` creation in the `RouterStores.ts` file.

### RouteStore

```typescript
export class RouteData {
    component: object | undefined;
    layout: object | undefined;

    constructor(component: object | undefined, layout: object | undefined = undefined);
}

class RouteStoreData {
    path: string | undefined;
    route: RouteData | undefined;

    constructor(path?: string | undefined, route?: RouteData | undefined);
}
```

The `RouteStoreData` class is a store that defines the current page by storing information about the route and path. It
has two properties:

* path: a string that represents the route template for the current page.
* route: a RouteData object that contains information about the current route.

The RouteData class contains two properties:

* component: an object that represents the Svelte component for the current page.
* layout: an object that represents the Svelte layout component for the current page.

## Router

```sveltehtml

<script lang="ts">
    import {Router, RouteView, PageTitle, LayoutView} from "svelte-dotnet";
    import {url, route} from "./stores/RouterStores";
    import MainLayout from "./layouts/MainLayout.svelte";
</script>

<Router route="{$route}">
    <div slot="found">
        <RouteView route="{$route}" url="{$url}" defaultLayout="{MainLayout}"/>
    </div>
    <div slot="not-found">
        <PageTitle value="Not found"/>
        <LayoutView layout="{MainLayout}">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </div>
</Router>
```

The `Router` component is a `Svelte` component that allows for declarative routing. It provides a way to map URLs
to `Svelte` components and layouts.

The component takes a [route](#routestore) prop and [url](#urlstore) prop.

Inside the `Router` component, there are two slots - `found` and `not-found`. The `found` slot is rendered when a route
is matched, and the `not-found` slot is rendered when no matching route is found.

Inner components:

* the `RouteView` component is used to render the Svelte component for the current route. It takes the route and url
  props, and a `defaultLayout` prop that specifies the layout to use if none is specified in the route data.
* the `LayoutView` component is used to render the layout for the current route. It takes the layout prop, which is an
  optional reference to the layout component to use.
* the `PageTitle` component is used to set the document title for the current page.

Overall, the `Router` component provides a convenient way to handle routing in Svelte applications, similar to
the `Blazor` router.

### Layouts

A layout component is a wrapper component that defines the common structure and behavior for a group of related pages.
It typically includes common elements such as a header, a footer, a navigation menu, and a container for the main
content of the page.

Here's example of layout:

```sveltehtml

<div class="main-layout">
    <slot/>
</div>
```

When a page is rendered within a layout component, its content is inserted into the slot element of the layout
component.

# Comparison of Blazor and Svelte

To better understand the similarities between Blazor and Svelte, let's compare some examples:

## Counter

Blazor:

```csharp
<h1>Counter</h1>
<p>Current count: @count</p>
<button @onclick="HandleClick">Click me</button>

@code {
    private int count = 0;

    private void HandleClick()
    {
        count++;
    }
}
```

Svelte:

```sveltehtml
<script>
    let count = 0;

    function handleClick() {
      count += 1;
    }
</script>

<h1>Counter</h1>
<p>Current count: {count}</p>
<button on:click={handleClick}>Click me</button>
```

## Operators

>We used conditional logic in the view part only as an example. It's generally better to divide the logic in the if block into the script or code-behind for better maintainability and readability.

Blazor:

```csharp
<ul>
    @foreach (string day in Days)
    {
        @if (day.StartsWith("S"))
        {
            <li>@day</li>
        }
    }
</ul>

@code {
    private string[] Days = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
}
```

Svelte:

```sveltehtml
<script>
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
</script>

<ul>
    {#each days as day}
        {#if day.startsWith('S')}
            <li>{day}</li>
        {/if}
    {/each}
</ul>
```

# Backlog

- Different SSR modes. (For now it's using only hydralization client-side mode, which is not good in some cases.)
- Improvement of development mode. (For now destination files are built in the similar way as for production in
  development mode. However there is a watch system that checks changes and rebuilds client-side project without
  reloading .NET project.)
- More customization of naming, path of folders. Add more flexibility and modularity.
- Adapt misspelled links.
- WASM .NET Core code injection.
- Hot reload.