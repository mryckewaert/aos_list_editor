<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	const { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if data.userName}
	<h1>{data.userName}</h1>
	<form method="post" use:enhance>
		<button>Sign out</button>
	</form>
{/if}
