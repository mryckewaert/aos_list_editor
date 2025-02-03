<script lang="ts">
	import { enhance } from '$app/forms';

	const { data } = $props();
</script>

<div class="homePage">
	<ul class="menu">
		<!-- Need to remove comment -->
		<!-- {#if data.isAdmin} -->
		<li><a class="menuLink" href="/faction">Factions</a></li>
		<!-- {/if} -->
		<li><a class="menuLink" href="/list">Mes Listes</a></li>
	</ul>

	{#if data.userName}
		<form method="post" use:enhance>
			<button>Déconnexion</button>
		</form>
	{/if}
</div>

<style>
	.homePage {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.menu {
		list-style-type: none;
		width: 80%;
		border-radius: 60px / 60px;
		background-color: #740b0b;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 0.5rem 2rem;
		margin-bottom: 1rem;
	}

	.menuLink {
		color: goldenrod;
		text-decoration: none;
	}

	.menuLink:hover {
		opacity: 0.8;
	}

	button {
		border-radius: 60px / 60px;
		border: none;
		color: goldenrod;
		background-color: #740b0b;
		padding: 0.5rem 2rem;
	}

	button:hover {
		cursor: pointer;
		opacity: 0.8;
	}
</style>
