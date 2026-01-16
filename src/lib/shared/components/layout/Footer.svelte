<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer footer-center bg-base-200 text-base-content p-10 mt-auto">
	<aside>
		<div class="flex items-center gap-2 mb-4">
			<svg class="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"/>
				<circle cx="6.5" cy="11.5" r="1.5"/>
				<circle cx="9.5" cy="7.5" r="1.5"/>
				<circle cx="14.5" cy="7.5" r="1.5"/>
				<circle cx="17.5" cy="11.5" r="1.5"/>
			</svg>
			<span class="text-2xl font-bold text-primary">Pixtify</span>
		</div>
		<p class="text-base-content/70">Beautiful wallpapers for every device</p>
	</aside>
	
	<nav class="grid grid-flow-col gap-8">
		<a href="/browse" class="link link-hover">Browse</a>
		<a href="/browse/trending" class="link link-hover">Trending</a>
		<a href="/browse/featured" class="link link-hover">Featured</a>
		<a href="/auth/login" class="link link-hover">Login</a>
		<a href="/auth/register" class="link link-hover">Register</a>
	</nav>
	
	<nav class="grid grid-flow-col gap-4">
		<a href="/terms" class="link link-hover text-sm opacity-70">Terms</a>
		<a href="/privacy" class="link link-hover text-sm opacity-70">Privacy</a>
		<a href="/contact" class="link link-hover text-sm opacity-70">Contact</a>
	</nav>
	
	<aside class="text-sm opacity-60">
		<p>&copy; {currentYear} Pixtify. All rights reserved.</p>
	</aside>
</footer>
