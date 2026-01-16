<script lang="ts">
	import SocialButton from '$lib/shared/components/auth/SocialButton.svelte';
	
	// Mock function for now
	const handleLogin = (provider: 'google' | 'github') => {
		console.log(`Login with ${provider}`);
		// In future: window.location.href = `/api/auth/${provider}`;
	};
</script>

<div class="flex items-center justify-center min-h-[80vh] px-4 py-12 relative w-full">
	
	<!-- Background Blobs (Fixed Full Screen) -->
	<div class="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
		<div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
		<div class="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-primary/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
		<div class="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-accent/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
	</div>

	<!-- Login Card -->
	<div class="card w-full max-w-md bg-base-100/60 backdrop-blur-xl shadow-2xl border border-base-content/5 relative z-10 transition-all duration-300 hover:shadow-primary/5">
		<div class="card-body gap-8 p-8">
			
			<!-- Header -->
			<div class="text-center space-y-2">
				<h1 class="text-3xl font-bold font-variation-settings-opsz-32 tracking-tight text-base-content">
					Welcome back
				</h1>
				<p class="text-base-content/60">
					Sign in to access your collection
				</p>
			</div>

			<!-- Social Actions -->
			<div class="flex flex-col gap-4">
				<SocialButton provider="google" onclick={() => handleLogin('google')} />
				<SocialButton provider="github" onclick={() => handleLogin('github')} />
			</div>

			<!-- Divider -->
			<div class="relative py-2">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t border-base-content/10"></span>
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-transparent px-2 text-base-content/40 font-medium">
						Secure Access
					</span>
				</div>
			</div>

			<!-- Footer -->
			<div class="text-center text-sm">
				<span class="text-base-content/60">Don't have an account? </span>
				<a href="/register" class="link link-primary font-semibold no-underline hover:underline">
					Join for free
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Animation for blobs */
	@keyframes blob {
		0% { transform: translate(0px, 0px) scale(1); }
		33% { transform: translate(30px, -50px) scale(1.1); }
		66% { transform: translate(-20px, 20px) scale(0.9); }
		100% { transform: translate(0px, 0px) scale(1); }
	}
	.animate-blob {
		animation: blob 7s infinite;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
