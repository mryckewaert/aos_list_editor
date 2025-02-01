<script lang="ts">
	let { data } = $props();
</script>

<div class="factionPage">
	<h1>{data.faction?.name}</h1>
	<ul class="listUnit">
		<li class="unit">
			<ul class="titleForm">
				<li>Nom de l'unité</li>
				<li>Mots Clés</li>
				<li>Rejoint par</li>
				<li>Points</li>
				<li>Action</li>
			</ul>
		</li>
		<li class="unit">
			<form method="post" action="?/createUnit" style="width: 100%;">
				<ul class="form">
					<li><input name="unitName" autocomplete="off" class="addInput" /></li>
					<li><input name="unitKeywords" autocomplete="off" class="addInput" /></li>
					<li>
						<div class="joinPart">
							l:<input name="joinLimitations" autocomplete="off" class="addInput" />
							k:<input name="joinKeywords" autocomplete="off" class="addInput" />
						</div>
					</li>
					<li><input name="unitCost" autocomplete="off" class="addInput" /></li>
					<input type="hidden" name="factionId" value={data.faction?.id} />
					<li><button>Créer</button></li>
				</ul>
			</form>
		</li>
		{#each data.units as unit (unit.id)}
			<li class="unit">
				<form method="post" action="?/updateUnit" style="width: 100%">
					<ul class="form">
						<li><input name="unitName" autocomplete="off" value={unit.name} class="addInput" /></li>
						<li>
							<input
								name="unitKeywords"
								autocomplete="off"
								value={unit.keywords.join(';')}
								class="addInput"
							/>
						</li>
						<li>
							<div class="joinPart">
								l:<input
									name="joinLimitations"
									autocomplete="off"
									value={unit.joinLimitation.join(';')}
									class="addInput"
								/>
								k:<input
									name="joinKeywords"
									autocomplete="off"
									value={unit.joinBy.join(';')}
									class="addInput"
								/>
							</div>
						</li>
						<li><input name="unitCost" autocomplete="off" value={unit.cost} class="addInput" /></li>
						<input type="hidden" name="unitId" value={unit.id} />
						<input type="hidden" name="factionId" value={data.faction?.id} />
						<li><button>Update</button></li>
					</ul>
				</form>
			</li>
		{/each}
	</ul>
	<a class="linkButton" href="/faction">Les Factions</a>
</div>

<style>
	.factionPage {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	.linkButton {
		border-radius: 60px / 60px;
		border: none;
		background-color: #740b0b;
		padding: 0.5rem 2rem;
		text-decoration: none;
		color: goldenrod;
	}

	.linkButton:hover {
		opacity: 0.8;
	}

	.listUnit {
		list-style-type: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	.unit {
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

	.titleForm {
		list-style-type: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0;
	}

	.form {
		list-style-type: none;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		padding: 0;
	}
	.joinPart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
