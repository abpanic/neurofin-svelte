<script lang="ts">
    import { DEFAULT_DESCRIPTION, DEFAULT_HOST } from '$lib/utils/metadata';
    import { Main } from '$lib/layouts';
    import { TITLE_SUFFIX } from '$routes/titles';
    import FooterNav from '../../lib/components/FooterNav.svelte';
    import MainFooter from '../../lib/components/MainFooter.svelte';
    import { socials } from '$lib/constants';

    let email = '';
    let firstName = '';
    let subject = '';
    let message = '';
    let error: string | undefined;
    let submitted = false;

    async function handleSubmit() {
        error = undefined;
        const response = await fetch('https://growth.appwrite.io/v1/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                firstName,
                subject,
                message
            })
        });
        if (response.status >= 400) {
            error = response.status >= 500 ? 'Server Error.' : 'Error submitting form.';
            return;
        }

        submitted = true;
    }

    const title = 'Contact us' + TITLE_SUFFIX;
    const description = DEFAULT_DESCRIPTION;
    const ogImage = DEFAULT_HOST + '/images/open-graph/website.png';
</script>

<svelte:head>
    <!-- Titles -->
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />
    <!-- Desscription -->
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
    <!-- Image -->
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="u-position-absolute" style="pointer-events:none;">
    <enhanced:img src="./bg.png" alt="" />
</div>

<Main>
    <div class="web-big-padding-section">
        <div class="web-big-padding-section-level-1">
            <div class="web-big-padding-section-level-2">
                <div class="web-container">
                    <div class="web-grid-1-1-opt-2 u-gap-32">
                        <div>
                            <div
                                class="web-u-max-inline-size-none-mobile"
                                class:web-u-max-width-380={!submitted}
                            >
                                {#if submitted}
                                    <section class="u-flex-vertical web-u-gap-20">
                                        <h1 class="web-display web-u-color-text-primary">
                                            Thank you for your message
                                        </h1>
                                        <p class="web-description web-u-padding-block-end-32">
                                            Your message has been sent successfully. We appreciate
                                            your feedback, our team will try to get back to you as
                                            soon as possible.
                                        </p>
                                        <a
                                            href="/"
                                            class="web-button is-secondary web-u-margin-block-end-32"
                                        >
                                            <span>Back to homepage</span>
                                        </a>
                                    </section>
                                {:else}
                                    <section class="u-flex-vertical web-u-gap-20">
                                        <h1 class="web-display web-u-color-text-primary">
                                            Contact Us
                                        </h1>
                                        <p class="web-description web-u-padding-block-end-40">
                                            We'd love your input: questions, feature requests, bugs
                                            or compliments.
                                        </p>
                                    </section>
                                {/if}
                                <section
                                    class="u-flex-vertical u-gap-12 web-u-padding-block-start-40 web-u-sep-block-start"
                                >
                                    <h2 class="web-label web-u-color-text-primary">Follow us</h2>
                                    <ul class="u-flex u-gap-8">
                                        {#each socials as social}
                                            <li>
                                                <a
                                                    href={social.link}
                                                    class="web-icon-button"
                                                    aria-label={social.label}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span class={social.icon} aria-hidden="true" />
                                                </a>
                                            </li>
                                        {/each}
                                    </ul>
                                </section>
                                <div
                                    class="web-is-only-mobile web-u-margin-block-start-40 web-u-padding-block-start-40 web-u-sep-block-start"
                                />
                            </div>
                        </div>
                        {#if !submitted}
                            <form
                                method="post"
                                on:submit|preventDefault={handleSubmit}
                                class="u-flex-vertical u-gap-16"
                            >
                                <div class="u-flex u-main-end">
                                    <ul
                                        class="web-form-list is-two-columns u-gap-16 u-width-full-line web-u-max-width-580 web-u-max-inline-size-none-mobile"
                                    >
                                        <li class="web-form-item">
                                            <input
                                                required
                                                class="web-input-text"
                                                type="text"
                                                placeholder="Name"
                                                aria-label="Name"
                                                bind:value={firstName}
                                            />
                                        </li>
                                        <li class="web-form-item">
                                            <input
                                                required
                                                class="web-input-text"
                                                type="email"
                                                placeholder="Email address"
                                                aria-label="Email address"
                                                bind:value={email}
                                            />
                                        </li>
                                        <li class="web-form-item is-column-span-2">
                                            <input
                                                required
                                                class="web-input-text"
                                                type="text"
                                                name="subject"
                                                placeholder="Subject"
                                                aria-label="Subject"
                                                bind:value={subject}
                                            />
                                        </li>
                                        <li class="web-form-item is-column-span-2">
                                            <textarea
                                                required
                                                name="message"
                                                class="web-input-text"
                                                placeholder="Your message"
                                                aria-label="Message"
                                                bind:value={message}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    class="u-flex u-gap-16 u-main-space-between web-u-flex-vertical-reverse-mobile"
                                >
                                    <p class="web-caption-400 web-u-max-width-380">
                                        {#if error}
                                            {error}
                                        {/if}
                                    </p>
                                    <!-- <p class="web-caption-400 web-u-max-width-380">
										This form is protected by reCAPTCHA, and the Google <a
											class="web-link"
											href="/privacy"
											target="_blank" rel="noopener noreferrer">Privacy Policy</a
										>
										and <a class="web-link" href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
									</p> -->
                                    <button
                                        type="submit"
                                        class="web-button u-cross-child-center web-u-inline-width-100-percent-mobile-break1"
                                    >
                                        <span>Submit</span>
                                    </button>
                                </div>
                            </form>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="web-container">
        <FooterNav />
        <MainFooter />
    </div>
</Main>
