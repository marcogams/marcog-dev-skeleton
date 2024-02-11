<script>
	import { onMount, tick } from 'svelte';
	import { Stage, Layer, Rect } from 'svelte-konva';
	import { Floorsort } from './floorsort.js';
	import Konva from 'konva';

	import { popup } from '@skeletonlabs/skeleton';

	let minL = 20;
	let maxL = 100;
	let n;
	let Lfactor;

	let stage;
	let scaleBy = 1.01;
	let layer;
	let floorsort;

	$: if (floorsort) {
		drawRects(floorsort);
	}

	function Calculate() {
		if (!n) {
			n = 50;
		}
		if (!Lfactor) {
			Lfactor = 1;
		}
		if (Lfactor < 0.5) {
			Lfactor = 0.5;
		}
		if (n < 10) {
			n = 10;
		}

		floorsort = new Floorsort(n, minL, maxL, Lfactor);
		floorsort.generate();
	}

	const drawRects = (floorsort) => {
		layer.removeChildren();
		let color;
		for (let i = 0; i < n; i++) {
			if (i % 2 == 0) {
				color = 'rgb(212,22,60)';
			} else {
				color = 'rgb(212,22,60)';
			}
			layer.add(
				new Konva.Rect({
					x: floorsort.rectlist[i].x + 20,
					y: floorsort.rectlist[i].y + 20,
					height: floorsort.rectlist[i].h,
					width: floorsort.rectlist[i].l,
					stroke: color
				})
			);
		}
	};

	onMount(async () => {
		await tick();

		if (stage) {
			stage.on('wheel', (e) => {
				e.evt.preventDefault();
				var oldScale = stage.scaleX();
				var pointer = stage.getPointerPosition();

				var mousePointTo = {
					x: (pointer.x - stage.x()) / oldScale,
					y: (pointer.y - stage.y()) / oldScale
				};

				let direction = e.evt.deltaY > 0 ? 1 : -1;

				if (e.evt.ctrlKey) {
					direction = -direction;
				}

				var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

				stage.scale({ x: newScale, y: newScale });

				var newPos = {
					x: pointer.x - mousePointTo.x * newScale,
					y: pointer.y - mousePointTo.y * newScale
				};
				stage.position(newPos);
			});
		}
	});

	const popupN = {
		event: 'click',
		target: 'popupN',
		placement: 'top'
	};

	const popupL = {
		event: 'click',
		target: 'popupL',
		placement: 'top'
	};
</script>

<div class="grid grid-cols-3 pb-3 gap-2">
	<label class="label" use:popup={popupN}>
		<input
			bind:value={n}
			class="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			type="number"
			placeholder="number of rects"
		/>
	</label>
	<label class="label" use:popup={popupL}>
		<input
			bind:value={Lfactor}
			class="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			type="number"
			placeholder="L-factor"
		/>
	</label>
	<button type="button" class="btn variant-ghost-primary" on:click={Calculate}>Calculate</button>
</div>
<div class="rounded variant-outline-primary">
	<Stage config={{ width: 640, height: 640, draggable: true }} bind:handle={stage}>
		<Layer bind:handle={layer}></Layer>
	</Stage>
</div>

<div class="card p-4 variant-filled-primary" data-popup="popupN">
	<p>n should be &#62;= 10</p>
	<div class="arrow variant-filled-primary" />
</div>

<div class="card p-4 variant-filled-primary" data-popup="popupL">
	<p>L-factor should be &#62;= 0.5</p>
	<div class="arrow variant-filled-primary" />
</div>
