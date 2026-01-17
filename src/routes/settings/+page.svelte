<script lang="ts">
	import { mockUser } from '$lib/mocks/user';
	import { User, Lock, Bell, Palette, Trash2, Camera, Mail, Check } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	// Active section
	let activeSection = $state<'profile' | 'account' | 'appearance' | 'notifications'>('profile');

	// Form state (mirrors mockUser)
	let displayName = $state(mockUser.displayName);
	let bio = $state(mockUser.bio);
	let email = $state(mockUser.email);

	// Theme
	let theme = $state<'light' | 'dark' | 'system'>('light');

	// Notifications
	let emailNotifs = $state(true);
	let pushNotifs = $state(false);

	const sections = [
		{ id: 'profile' as const, label: 'Edit Profile', icon: User },
		{ id: 'account' as const, label: 'Account', icon: Lock },
		{ id: 'appearance' as const, label: 'Appearance', icon: Palette },
		{ id: 'notifications' as const, label: 'Notifications', icon: Bell },
	];

	function handleSave() {
		// TODO: Connect to API
		alert('Settings saved! (mock)');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pt-20 pb-12">
	<div class="max-w-5xl mx-auto px-4">
		
		<h1 class="text-2xl font-semibold text-[var(--md-on-surface)] mb-8">Settings</h1>

		<div class="flex flex-col md:flex-row gap-8">
			
			<!-- Sidebar Navigation -->
			<aside class="shrink-0 md:w-56">
				<nav class="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
					{#each sections as section}
						<button
							onclick={() => activeSection = section.id}
							class="flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-colors
								{activeSection === section.id 
									? 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]' 
									: 'text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container)]'}"
						>
							<section.icon class="w-5 h-5" />
							<span class="font-medium">{section.label}</span>
						</button>
					{/each}
				</nav>
			</aside>

			<!-- Content Area -->
			<main class="flex-1 bg-white rounded-3xl border border-[var(--md-outline-variant)]/30 p-6 md:p-8">
				
				{#if activeSection === 'profile'}
					<div in:fade={{ duration: 150 }}>
						<h2 class="text-xl font-semibold text-[var(--md-on-surface)] mb-6">Edit Profile</h2>
						
						<!-- Avatar -->
						<div class="flex items-center gap-6 mb-8">
							<div class="relative">
								<img 
									src={mockUser.avatarUrl} 
									alt={mockUser.displayName}
									class="w-24 h-24 rounded-full bg-[var(--md-surface-container)] border-2 border-white shadow-md"
								/>
								<button class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--md-primary)] text-white flex items-center justify-center shadow-md hover:brightness-110">
									<Camera class="w-4 h-4" />
								</button>
							</div>
							<div>
								<p class="font-medium text-[var(--md-on-surface)]">@{mockUser.username}</p>
								<p class="text-sm text-[var(--md-on-surface-variant)]">Change your profile photo</p>
							</div>
						</div>

						<!-- Form -->
						<div class="space-y-5 max-w-md">
							<div>
								<label class="block text-sm font-medium text-[var(--md-on-surface)] mb-1.5">Display Name</label>
								<input 
									type="text" 
									bind:value={displayName}
									class="settings-input"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-[var(--md-on-surface)] mb-1.5">Bio</label>
								<textarea 
									bind:value={bio}
									rows="3"
									class="settings-input resize-none"
								></textarea>
								<p class="text-xs text-[var(--md-on-surface-variant)] mt-1">{bio.length}/160</p>
							</div>
							<button 
								onclick={handleSave}
								class="px-6 py-2.5 rounded-full bg-[var(--md-primary)] text-white font-medium hover:brightness-110"
							>
								Save Changes
							</button>
						</div>
					</div>

				{:else if activeSection === 'account'}
					<div in:fade={{ duration: 150 }}>
						<h2 class="text-xl font-semibold text-[var(--md-on-surface)] mb-6">Account Settings</h2>
						
						<!-- Email -->
						<div class="mb-8 max-w-md">
							<div class="flex items-center justify-between mb-2">
								<label class="text-sm font-medium text-[var(--md-on-surface)]">Email Address</label>
								<span class="flex items-center gap-1 text-xs text-green-600">
									<Check class="w-3 h-3" />
									Verified
								</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--md-surface-container)] text-[var(--md-on-surface)]">
									<Mail class="w-5 h-5 text-[var(--md-on-surface-variant)]" />
									<span>{email}</span>
								</div>
								<button class="px-4 py-3 rounded-xl border border-[var(--md-outline-variant)] text-[var(--md-on-surface)] font-medium hover:bg-[var(--md-surface-container)]">
									Change
								</button>
							</div>
						</div>

						<!-- Password -->
						<div class="mb-8 max-w-md">
							<label class="block text-sm font-medium text-[var(--md-on-surface)] mb-2">Password</label>
							<button class="px-4 py-3 rounded-xl border border-[var(--md-outline-variant)] text-[var(--md-on-surface)] font-medium hover:bg-[var(--md-surface-container)]">
								Change Password
							</button>
						</div>

						<!-- Danger Zone -->
						<div class="pt-8 border-t border-[var(--md-outline-variant)]/50">
							<h3 class="text-lg font-semibold text-error mb-2">Danger Zone</h3>
							<p class="text-sm text-[var(--md-on-surface-variant)] mb-4">Once you delete your account, there is no going back.</p>
							<button class="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-error text-error font-medium hover:bg-error/10">
								<Trash2 class="w-4 h-4" />
								Delete Account
							</button>
						</div>
					</div>

				{:else if activeSection === 'appearance'}
					<div in:fade={{ duration: 150 }}>
						<h2 class="text-xl font-semibold text-[var(--md-on-surface)] mb-6">Appearance</h2>
						
						<div class="max-w-md">
							<label class="block text-sm font-medium text-[var(--md-on-surface)] mb-3">Theme</label>
							<div class="m3-segmented-button w-full">
								<button 
									class="m3-segment flex-1 {theme === 'light' ? 'selected' : ''}"
									onclick={() => theme = 'light'}
								>
									Light
								</button>
								<button 
									class="m3-segment flex-1 {theme === 'dark' ? 'selected' : ''}"
									onclick={() => theme = 'dark'}
								>
									Dark
								</button>
								<button 
									class="m3-segment flex-1 {theme === 'system' ? 'selected' : ''}"
									onclick={() => theme = 'system'}
								>
									System
								</button>
							</div>
							<p class="text-sm text-[var(--md-on-surface-variant)] mt-3">
								{theme === 'system' ? 'Follows your device settings' : `Always use ${theme} mode`}
							</p>
						</div>
					</div>

				{:else if activeSection === 'notifications'}
					<div in:fade={{ duration: 150 }}>
						<h2 class="text-xl font-semibold text-[var(--md-on-surface)] mb-6">Notifications</h2>
						
						<div class="space-y-4 max-w-md">
							<label class="flex items-center justify-between p-4 rounded-xl bg-[var(--md-surface-container)] cursor-pointer">
								<div>
									<p class="font-medium text-[var(--md-on-surface)]">Email Notifications</p>
									<p class="text-sm text-[var(--md-on-surface-variant)]">Receive updates via email</p>
								</div>
								<input type="checkbox" bind:checked={emailNotifs} class="toggle-switch" />
							</label>
							
							<label class="flex items-center justify-between p-4 rounded-xl bg-[var(--md-surface-container)] cursor-pointer">
								<div>
									<p class="font-medium text-[var(--md-on-surface)]">Push Notifications</p>
									<p class="text-sm text-[var(--md-on-surface-variant)]">Receive browser notifications</p>
								</div>
								<input type="checkbox" bind:checked={pushNotifs} class="toggle-switch" />
							</label>
						</div>
					</div>
				{/if}
			</main>
		</div>
	</div>
</div>

<style>
	.settings-input {
		width: 100%;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		border: 1px solid var(--md-outline-variant);
		background: var(--md-surface);
		color: var(--md-on-surface);
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	.settings-input:focus {
		outline: none;
		border-color: var(--md-primary);
		box-shadow: 0 0 0 3px color-mix(in oklch, var(--md-primary), transparent 85%);
	}

	.toggle-switch {
		appearance: none;
		width: 48px;
		height: 28px;
		background: var(--md-outline-variant);
		border-radius: 999px;
		position: relative;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.toggle-switch::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 24px;
		height: 24px;
		background: white;
		border-radius: 50%;
		transition: transform 0.2s ease;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
	}

	.toggle-switch:checked {
		background: var(--md-primary);
	}

	.toggle-switch:checked::before {
		transform: translateX(20px);
	}
</style>
