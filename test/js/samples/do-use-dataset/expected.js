/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, createElement, createText, detachNode, flush, init, insert, noop, safe_not_equal } from "svelte/internal";

function create_fragment(ctx) {
	var div0, text, div1;

	return {
		c() {
			div0 = createElement("div");
			text = createText("\n");
			div1 = createElement("div");
			div0.dataset.foo = "bar";
			div1.dataset.foo = ctx.bar;
		},

		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, text, anchor);
			insert(target, div1, anchor);
		},

		p(changed, ctx) {
			if (changed.bar) {
				div1.dataset.foo = ctx.bar;
			}
		},

		i: noop,
		o: noop,

		d(detach) {
			if (detach) {
				detachNode(div0);
				detachNode(text);
				detachNode(div1);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { bar } = $$props;

	$$self.$set = $$props => {
		if ('bar' in $$props) $$invalidate('bar', bar = $$props.bar);
	};

	return { bar };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal);
	}

	get bar() {
		return this.$$.ctx.bar;
	}

	set bar(bar) {
		this.$set({ bar });
		flush();
	}
}

export default SvelteComponent;