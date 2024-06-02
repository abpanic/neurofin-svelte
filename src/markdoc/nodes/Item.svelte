<script lang="ts">
    import { isInDocs } from '$lib/layouts/Docs.svelte';

    import { isInPolicy } from '$markdoc/layouts/Policy.svelte';

    const inDocs = isInDocs();

    const inPolicy = isInPolicy();

    $: classes = (() => {
        if (inDocs) return '';

        if (inPolicy) return '';
        return 'web-paragraph-lg';
    })();
</script>

<li><p class={classes}><slot /></p></li>
