<script lang="ts">
	import { enhance } from '$app/forms';

	const { data } = $props();
</script>

<div class="homePage">
	<ul>
		{#if data.isAdmin}
			<li><a href="/faction">Factions</a></li>
		{/if}
		<li><a href="/list">Mes Listes</a></li>
	</ul>

	{#if data.userName}
		<form method="post" use:enhance>
			<button>Sign out</button>
		</form>
	{/if}
</div>

<style>
	.homePage {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
	}
</style>
