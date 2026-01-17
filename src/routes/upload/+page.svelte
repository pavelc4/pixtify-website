<script lang="ts">
	import { Upload, X, Image, ChevronDown, Plus } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';

	// Form state
	let title = $state('');
	let description = $state('');
	let tags = $state<string[]>([]);
	let newTag = $state('');
	let selectedBoard = $state('');
	let deviceType = $state<'mobile' | 'desktop'>('desktop');

	// File state
	let dragOver = $state(false);
	let selectedFile = $state<File | null>(null);
	let previewUrl = $state<string | null>(null);

	// Mock boards
	const boards = [
		{ id: '1', name: 'Nature Vibes' },
		{ id: '2', name: 'Minimal Dark' },
		{ id: '3', name: 'Abstract Art' },
		{ id: '4', name: 'City Lights' },
	];

	// Handle file selection
	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			processFile(input.files[0]);
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
			processFile(e.dataTransfer.files[0]);
		}
	}

	function processFile(file: File) {
		if (!file.type.startsWith('image/')) return;
		selectedFile = file;
		previewUrl = URL.createObjectURL(file);
	}

	function removeFile() {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		selectedFile = null;
		previewUrl = null;
	}

	function addTag() {
		const tag = newTag.trim().toLowerCase();
		if (tag && !tags.includes(tag) && tags.length < 10) {
			tags = [...tags, tag];
			newTag = '';
		}
	}

	function removeTag(tag: string) {
		tags = tags.filter(t => t !== tag);
	}

	function handleTagKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			addTag();
		}
	}

	// Form validation
	let isValid = $derived(selectedFile && title.trim().length >= 3);

	function handleSubmit() {
		if (!isValid) return;
		// TODO: Implement actual upload
		console.log('Uploading:', { title, description, tags, selectedBoard, deviceType, file: selectedFile });
		alert('Upload functionality will be connected to API!');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/5 pt-20 pb-12">
	<div class="max-w-4xl mx-auto px-4">
		
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-2xl font-semibold text-[var(--md-on-surface)] mb-2">Create Pin</h1>
			<p class="text-[var(--md-on-surface-variant)] text-sm">Share your wallpaper with the community</p>
		</div>

		<!-- Main Content - Pinterest Split Layout -->
		<div class="flex flex-col md:flex-row gap-8 bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[var(--md-outline-variant)]/30">
			
			<!-- Left: Drop Zone / Preview -->
			<div class="w-full md:w-1/2">
				{#if previewUrl}
					<!-- Preview -->
					<div class="relative rounded-2xl overflow-hidden bg-[var(--md-surface-container)]" in:scale={{ duration: 200 }}>
						<img src={previewUrl} alt="Preview" class="w-full h-auto max-h-[500px] object-contain" />
						<button 
							onclick={removeFile}
							class="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
						>
							<X class="w-5 h-5" />
						</button>
					</div>
				{:else}
					<!-- Drop Zone -->
					<label 
						class="drop-zone {dragOver ? 'drag-over' : ''}"
						ondragover={(e) => { e.preventDefault(); dragOver = true; }}
						ondragleave={() => dragOver = false}
						ondrop={handleDrop}
					>
						<input type="file" accept="image/*" class="hidden" onchange={handleFileSelect} />
						<div class="flex flex-col items-center gap-4 py-16">
							<div class="w-16 h-16 rounded-full bg-[var(--md-surface-container-high)] flex items-center justify-center">
								<Upload class="w-7 h-7 text-[var(--md-on-surface-variant)]" />
							</div>
							<div class="text-center">
								<p class="font-medium text-[var(--md-on-surface)] mb-1">Drag and drop or click to upload</p>
								<p class="text-sm text-[var(--md-on-surface-variant)]">Recommendation: High quality images (.jpg, .png)</p>
							</div>
						</div>
					</label>
				{/if}
			</div>

			<!-- Right: Form -->
			<div class="w-full md:w-1/2 flex flex-col gap-5">
				
				<!-- Title -->
				<div class="form-group">
					<label for="title" class="form-label">Title <span class="text-error">*</span></label>
					<input 
						type="text" 
						id="title"
						bind:value={title}
						placeholder="Add a title"
						class="form-input"
						maxlength="100"
					/>
				</div>

				<!-- Description -->
				<div class="form-group">
					<label for="description" class="form-label">Description</label>
					<textarea 
						id="description"
						bind:value={description}
						placeholder="Tell everyone what your wallpaper is about"
						class="form-input resize-none"
						rows="3"
					></textarea>
				</div>

				<!-- Tags -->
				<div class="form-group">
					<label class="form-label">Tags ({tags.length}/10)</label>
					<div class="flex flex-wrap gap-2 mb-2">
						{#each tags as tag}
							<span class="tag-chip" in:scale={{ duration: 150 }}>
								{tag}
								<button onclick={() => removeTag(tag)} class="ml-1 hover:text-error">
									<X class="w-3 h-3" />
								</button>
							</span>
						{/each}
					</div>
					<div class="flex gap-2">
						<input 
							type="text"
							bind:value={newTag}
							placeholder="Add a tag"
							class="form-input flex-1"
							onkeydown={handleTagKeydown}
							maxlength="20"
						/>
						<button 
							onclick={addTag}
							disabled={!newTag.trim()}
							class="px-4 rounded-xl bg-[var(--md-surface-container-high)] text-[var(--md-on-surface)] hover:bg-[var(--md-surface-container-highest)] disabled:opacity-50 transition-colors"
						>
							<Plus class="w-5 h-5" />
						</button>
					</div>
				</div>

				<!-- Device Type -->
				<div class="form-group">
					<label class="form-label">Device Type</label>
					<div class="m3-segmented-button w-full">
						<button 
							class="m3-segment flex-1 {deviceType === 'desktop' ? 'selected' : ''}"
							onclick={() => deviceType = 'desktop'}
						>
							Desktop
						</button>
						<button 
							class="m3-segment flex-1 {deviceType === 'mobile' ? 'selected' : ''}"
							onclick={() => deviceType = 'mobile'}
						>
							Mobile
						</button>
					</div>
				</div>

				<!-- Board Selection -->
				<div class="form-group">
					<label for="board" class="form-label">Save to Board</label>
					<div class="relative">
						<select 
							id="board"
							bind:value={selectedBoard}
							class="form-input appearance-none pr-10"
						>
							<option value="">Select a board (optional)</option>
							{#each boards as board}
								<option value={board.id}>{board.name}</option>
							{/each}
						</select>
						<ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--md-on-surface-variant)] pointer-events-none" />
					</div>
				</div>

				<!-- Submit Button -->
				<button 
					onclick={handleSubmit}
					disabled={!isValid}
					class="mt-auto w-full py-3 rounded-full font-semibold text-white transition-all
						{isValid 
							? 'bg-[var(--md-primary)] hover:brightness-110 cursor-pointer' 
							: 'bg-[var(--md-outline)] cursor-not-allowed'}"
				>
					Publish
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.drop-zone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 400px;
		border: 2px dashed var(--md-outline-variant);
		border-radius: 1.5rem;
		background: var(--md-surface-container);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.drop-zone:hover,
	.drop-zone.drag-over {
		border-color: var(--md-primary);
		background: color-mix(in oklch, var(--md-primary), transparent 95%);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--md-on-surface);
	}

	.form-input {
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		border: 1px solid var(--md-outline-variant);
		background: var(--md-surface);
		color: var(--md-on-surface);
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--md-primary);
		box-shadow: 0 0 0 3px color-mix(in oklch, var(--md-primary), transparent 85%);
	}

	.form-input::placeholder {
		color: var(--md-on-surface-variant);
	}

	.tag-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.375rem 0.75rem;
		background: var(--md-secondary-container);
		color: var(--md-on-secondary-container);
		border-radius: 1rem;
		font-size: 0.875rem;
		font-weight: 500;
	}
</style>
