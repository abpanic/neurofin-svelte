<script lang="ts">
    import { isInDocs } from '$lib/layouts/Docs.svelte';
    

    export let href: string;

    const isExternal = ['http://', 'https://'].some((prefix) => href.startsWith(prefix));
    const target = isExternal ? '_blank' : undefined;
    const rel = isExternal ? 'noopener nofollow' : undefined;


    const inDocs = isInDocs();

    $: classes = (() => {
        if (inDocs) return 'web-link web-paragraph-md';
        return '';
    })();
</script>



<a class={classes} data-in-changelog={inDocs ? '' : undefined} {href} {target} {rel}
    ><slot /><span class="icon-cheveron-right" style:font-size="16px" /></a
>

<style>
    a {
        display: flex;
    }

    [data-in-changelog]:last-child {
        padding-block-start: 1rem;
    }
</style>
