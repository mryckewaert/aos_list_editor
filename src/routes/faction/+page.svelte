<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<ul class="factionList">
	<li class="faction">
		<form method="post" action="?/createFaction" style="width: 100%;" use:enhance>
			<label class="factionContent">
				Créer une faction :
				<input name="factionName" autocomplete="off" class="addInput" />
				<button class="formButton">Créer</button>
			</label>
		</form>
	</li>

	{#each data.factions as faction, i}
		<li class="faction">
			<div class="factionContent">
				<a class="linkButton" href="/faction/{faction.id}">Ouvrir</a>
				<div class="factionName">
					{faction.name}
				</div>
				<form method="post" action="?/deleteFaction" use:enhance>
					<input type="hidden" name="factionId" value={faction.id} />
					<button class="formButton">Supprimer</button>
				</form>
			</div>
		</li>
	{/each}
</ul>

<style>
	.factionList {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	.faction {
		list-style-type: none;
		width: 80%;
		border-radius: 60px / 60px;
		background-color: #740b0b;
		color: goldenrod;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 2rem;
		margin-bottom: 1rem;
	}

	.factionContent {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.addInput {
		padding: 0.25rem 2rem;
		margin-right: 6rem;
		background-color: #0c6f8d;
		color: goldenrod;
	}

	.formButton {
		border-radius: 60px / 60px;
		border: none;
		color: goldenrod;
		background-color: #0c6f8d;
		padding: 0.25rem 1rem;
	}

	.formButton:hover {
		opacity: 0.8;
		cursor: pointer;
	}

	.linkButton {
		border-radius: 60px / 60px;
		border: none;
		background-color: #0c6f8d;
		padding: 0.25rem 1rem;
		text-decoration: none;
		color: goldenrod;
	}

	.linkButton:hover {
		opacity: 0.8;
	}
</style>
