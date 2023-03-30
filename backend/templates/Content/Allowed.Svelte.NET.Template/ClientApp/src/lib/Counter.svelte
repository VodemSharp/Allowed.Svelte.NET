<script lang="ts">
    export let counter: number = 0;

    const increment = () => {
        counter += 1;
    }
</script>

<button class="m-btn" on:click={increment}>
    <span>Count is {counter}</span>
</button>
