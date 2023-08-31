<script lang="ts">
    import {onMount} from "svelte";
    import {mdb} from "../client/Variables";
    import {url} from "../stores/RouterStores";
    import {PageTitle} from "svelte-dotnet";

    let emailInput: HTMLElement;
    let passwordInput: HTMLElement;

    onMount(() => {
        new mdb.Input(emailInput).init();
        new mdb.Input(passwordInput).init();
    });

    function navigate() {
        url.navigate("/");
    }
</script>

<PageTitle value="Sign in"/>

<form>
    <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        <p class="lead fw-normal mb-0 me-3">Sign in with</p>
        <button type="button" class="btn btn-primary btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
        </button>

        <button type="button" class="btn btn-primary btn-floating mx-1">
            <i class="fab fa-twitter"></i>
        </button>

        <button type="button" class="btn btn-primary btn-floating mx-1">
            <i class="fab fa-linkedin-in"></i>
        </button>
    </div>

    <div class="divider d-flex align-items-center my-4">
        <p class="text-center fw-bold mx-3 mb-0">Or</p>
    </div>

    <!-- Email input -->
    <div class="form-outline mb-4" bind:this={emailInput}>
        <input type="email" id="form3Example3" class="form-control form-control-lg"
               placeholder="Enter a valid email address"/>
        <label class="form-label" for="form3Example3">Email address</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-3" bind:this={passwordInput}>
        <input type="password" id="form3Example4" class="form-control form-control-lg"
               placeholder="Enter password"/>
        <label class="form-label" for="form3Example4">Password</label>
    </div>

    <div class="d-flex justify-content-between align-items-center">
        <!-- Checkbox -->
        <div class="form-check mb-0">
            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3"/>
            <label class="form-check-label" for="form2Example3">
                Remember me
            </label>
        </div>
        <a href="/" class="text-body">Forgot password?</a>
    </div>

    <div class="text-center text-lg-start mt-4 pt-2">
        <button type="button" class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;" on:click={navigate}>Login
        </button>
        <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/"
                                                                          class="link-danger">Register</a></p>
    </div>
</form>

<style>
    .divider:after,
    .divider:before {
        content: "";
        flex: 1;
        height: 1px;
        background: #eee;
    }
</style>