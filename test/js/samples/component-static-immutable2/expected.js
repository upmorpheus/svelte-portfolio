/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, init, mount_component, noop, not_equal } from "svelte/internal.js";

function create_fragment(component, ctx) {
	var current;

	var nested = new ctx.Nested({ props: { foo: "bar" } });

	return {
		c() {
			nested.$$.fragment.c();
		},

		m(target, anchor) {
			mount_component(nested, target, anchor);
			current = true;
		},

		p: noop,

		i(target, anchor) {
			if (current) return;
			this.m(target, anchor);
		},

		o(outrocallback) {
			if (!current) return;

			if (nested) nested.$$.fragment.o(outrocallback);
			current = false;
		},

		d(detach) {
			nested.$destroy(detach);
		}
	};
}

function define($$self) {
	const Nested = window.Nested;

	$$self.$$.get = () => ({ Nested });
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, define, create_fragment, not_equal);
	}
}

export default SvelteComponent;