<script>
	import { onMount } from 'svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let MyCanvas;
	onMount(async () => {
		MyCanvas = (await import('$lib/canvas.svelte')).default;
	});
</script>

<div class="flex justify-center">
	<div class="pt-3 max-w-96 sm:max-w-screen-sm">
		<div class="card">
			<p class="h3 p-4 text-center">Floorsort-Algorithm</p>
			<div class="card variant-soft-secondary p-2">
				<p>
					Arrange n number of different sized rectangles in such a way, so the resulting square
					encompassing all rectangles is as small as possible.
				</p>
				<p class="italic text-primary-400 text-center">Pseudocode below</p>
			</div>
		</div>
		<div class="pt-3 pb-3 overflow-hidden"><svelte:component this={MyCanvas} /></div>

		<div class="card variant-soft-secondary p-2">
			<Accordion>
				<AccordionItem open>
					<svelte:fragment slot="summary">
						<p class="text-primary-400 italic">Pseudocode</p>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="text-sm font-light">
							<p>generate n number of rectangles with random height and width</p>
							<p>L = sqrt(area of all rectangles) * L-factor</p>
							<p style="margin-bottom: 30px;">sort rectangles by height, then width</p>
							<p style="margin-bottom: 30px;">for n number of rectangles:</p>
							<p style="margin-left: 30px;">if height of next rectangle smaller than previous:</p>
							<p style="margin-left: 60px; margin-bottom: 30px;">
								append new transition point for next row
							</p>
							<p style="margin-left: 30px;">if next rectangle trespasses a transition point:</p>
							<p style="margin-left: 60px;">update current height</p>
							<p style="margin-left: 60px; margin-bottom: 30px;">
								append new transition point for next row
							</p>
							<p style="margin-left: 30px">if current position &#60;= L (or 0):</p>
							<p style="margin-left: 60px;">lay down current rectangle</p>
							<p style="margin-left: 30px">else:</p>
							<p style="margin-left: 60px;">switch direction of rectangle laying</p>
							<p style="margin-left: 60px;">jump to next row</p>
						</div>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
		<div class="h-4"></div>
		<hr class="!border-t-2 !border-dashed p-2" />
		<p class="text-center pb-3 text-xs text-primary-400">
			💀 Made with Skeleton — UI Toolkit for Svelte + Tailwind 💀
		</p>
	</div>
</div>
