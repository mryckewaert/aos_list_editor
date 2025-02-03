<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';

	let { data, children } = $props();
</script>

<Navbar userName={data.userName} />
<div class="children">
	{@render children()}
</div>

<style>
	.children {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: 2rem;
	}
</style>
