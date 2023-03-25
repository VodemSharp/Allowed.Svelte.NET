using Allowed.Svelte.NET.Tools.Routers;

namespace Allowed.Svelte.NET.Tools.Tests;

[TestClass]
public class RouterServiceTest
{
    [TestMethod]
    [DataRow("users", "", "/users")]
    [DataRow("users", "{id}", "/users/{id}")]
    [DataRow("/users", "", "/users")]
    [DataRow("/users", "{id}", "/users/{id}")]
    [DataRow("/users", "/{id}", "/{id}")]
    public void TestJoinTemplates(string controllerTemplate, string routeTemplate, string result)
    {
        controllerTemplate = RouterService.NormalizeControllerTemplate(controllerTemplate);
        routeTemplate = RouterService.NormalizeRouteTemplate(routeTemplate);
        Assert.AreEqual(RouterService.JoinTemplates(controllerTemplate, routeTemplate), result);
    }
}