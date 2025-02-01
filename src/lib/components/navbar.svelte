<script lang="ts">
	let title = 'Éditeur de Liste Aos';
	let { userName } = $props();
</script>

<nav class="navbar">
	<a href="/" class="navLink">Home</a>

	<h1 class="title">
		{title}
	</h1>

	<div class="login">
		{#if userName}
			<div>{userName}</div>
		{:else}
			<a href="/login" class="navLink">Login</a>
		{/if}
		<div></div>
	</div>
</nav>

<style>
	.navbar {
		width: 80%;
		border-radius: 60px / 60px;
		background-color: #740b0b;
		color: goldenrod;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 2rem;
	}

	.navLink {
		border: none;
		border-radius: 60px / 60px;
		background-color: #0c6f8d;
		padding: 0.75rem;
		color: goldenrod;
		text-decoration: none;
	}

	.navLink:hover {
		opacity: 0.8;
	}
</style>
