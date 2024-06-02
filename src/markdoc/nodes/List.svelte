<script lang="ts">
    
    import { isInPolicy } from '$markdoc/layouts/Policy.svelte';
    import { setContext } from 'svelte';

    export let ordered: boolean;

    setContext('no-paragraph', true);

    const inPolicy = isInPolicy();
    
</script>

<svelte:element
    this={ordered ? 'ol' : 'ul'}
    class:web-numeric-list={ordered}
    class:web-pink-dots={!ordered}
    class:in-policy={inPolicy}></svelte:element><slot />
    

<style lang="scss">
    .in-policy {
        gap: 0rem;
        margin-block-end: 2rem;
    }

    ol.in-policy {
        :global(li) {
            gap: 0.25rem;
        }

        :global(li:before) {
            content: counter(numeric-list) '.  ';
            padding-inline-end: 0;
        }

        :global(.in-policy) {
            padding-inline-start: 0.5rem;
            margin-block-end: 0;
        }

        :global(.in-policy li:before) {
            content: counter(numeric-list-level-2, lower-latin) '.  ';
            padding-inline-end: 0;
        }
    }

    
</style>
