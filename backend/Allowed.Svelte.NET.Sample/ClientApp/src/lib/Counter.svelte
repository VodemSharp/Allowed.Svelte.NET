<script lang="ts">
    export let counter: number = 0;

    const increment = () => {
        counter += 1;
    }
</script>

<button on:click={increment}>
    Count is {counter}
</button>
