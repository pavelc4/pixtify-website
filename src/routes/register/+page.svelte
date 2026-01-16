<script lang="ts">
	import SocialButton from '$lib/shared/components/auth/SocialButton.svelte';
	
	const handleRegister = (provider: 'google' | 'github') => {
		console.log(`Register with ${provider}`);
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

	<!-- Register Card -->
	<div class="card w-full max-w-md bg-base-100/60 backdrop-blur-xl shadow-2xl border border-base-content/5 relative z-10 transition-all duration-300 hover:shadow-secondary/5">
		<div class="card-body gap-8 p-8">
			
			<!-- Header -->
			<div class="text-center space-y-2">
				<h1 class="text-3xl font-bold font-variation-settings-opsz-32 tracking-tight text-base-content">
					Join Pixtify
				</h1>
				<p class="text-base-content/60">
					Unlock unlimited wallpapers & collections
				</p>
			</div>

			<!-- Social Actions -->
			<div class="flex flex-col gap-4">
				<SocialButton provider="google" onclick={() => handleRegister('google')} />
				<SocialButton provider="github" onclick={() => handleRegister('github')} />
			</div>

			<!-- Divider -->
			<div class="relative py-2">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t border-base-content/10"></span>
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-transparent px-2 text-base-content/40 font-medium">
						Or sign up with email
					</span>
				</div>
			</div>

			<!-- Pending Email Form Placeholder -->
			<div class="text-center p-4 rounded-xl bg-base-200/50 border border-base-content/5 border-dashed">
				<p class="text-sm text-base-content/40 italic">
					Email registration coming soon...
				</p>
			</div>

			<!-- Footer -->
			<div class="text-center text-sm">
				<span class="text-base-content/60">Already have an account? </span>
				<a href="/login" class="link link-primary font-semibold no-underline hover:underline">
					Sign in
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Animation for blobs reused */
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
</style>
