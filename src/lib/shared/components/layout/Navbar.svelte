<script lang="ts">
	let { class: className = '' } = $props();
	let mobileMenuOpen = $state(false);
</script>

<div class="absolute top-0 z-50 flex justify-center w-full transition-all duration-300 pointer-events-none">
	<div class="navbar w-full max-w-7xl px-4 pointer-events-auto {className}">
		<div class="navbar-start pl-2">
			<!-- Logo -->
			<!-- Logo -->
			<a href="/" class="text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity flex items-center pl-4 outline-none">
				Pixtify
			</a>
		</div>



		<div class="navbar-end pr-2">
			<!-- Desktop Actions -->
			<div class="hidden md:flex items-center gap-2">

				<a href="/auth/register" class="btn btn-primary rounded-full px-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-primary-content">Get Started</a>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				class="btn btn-ghost btn-circle md:hidden"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					{#if mobileMenuOpen}
						<path d="M18 6L6 18M6 6l12 12"/>
					{:else}
						<path d="M3 12h18M3 6h18M3 18h18"/>
					{/if}
				</svg>
			</button>
		</div>
	</div>
</div>

<!-- Mobile Menu (Floating Sheet) -->
{#if mobileMenuOpen}
	<div class="md:hidden fixed top-24 left-4 right-4 z-40 bg-base-100/90 backdrop-blur-xl p-4 rounded-[2rem] shadow-xl flex flex-col gap-2 origin-top animate-[scale-in_0.2s_ease-out]">

		<a href="/browse" class="btn btn-ghost justify-start rounded-xl text-lg">Browse</a>
		<a href="/auth/login" class="btn btn-ghost justify-start rounded-xl text-lg">Login</a>
		<a href="/auth/register" class="btn btn-primary rounded-xl text-lg shadow-md">Get Started</a>
	</div>
{/if}
