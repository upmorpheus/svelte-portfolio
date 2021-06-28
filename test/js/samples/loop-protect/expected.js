/* generated by Svelte vX.Y.Z */
import {
	SvelteComponentDev,
	add_location,
	binding_callbacks,
	detach_dev,
	dispatch_dev,
	element,
	globals,
	init,
	insert_dev,
	loop_guard,
	noop,
	safe_not_equal,
	validate_slots
} from "svelte/internal";

const { console: console_1 } = globals;
const file = undefined;

function create_fragment(ctx) {
	let div;

	const block = {
		c: function create() {
			div = element("div");
			add_location(div, file, 22, 0, 288);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding*/ ctx[1](div);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*div_binding*/ ctx[1](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function foo() {
	const guard = "foo";

	{
		const guard_1 = loop_guard(100);

		while (true) {
			console.log(guard);
			guard_1();
		}
	}
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Component", slots, []);
	let node;

	{
		const guard = loop_guard(100);

		while (true) {
			foo();
			guard();
		}
	}

	{
		const guard_2 = loop_guard(100);

		for (; ; ) {
			foo();
			guard_2();
		}
	}

	{
		const guard_3 = loop_guard(100);

		while (true) {
			foo();
			guard_3();
		}
	}

	{
		const guard_5 = loop_guard(100);

		do {
			foo();
			guard_5();
		} while (true);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot") console_1.warn(`<Component> was created with unknown prop '${key}'`);
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			node = $$value;
			$$invalidate(0, node);
		});
	}

	$$self.$capture_state = () => ({ node, foo });

	$$self.$inject_state = $$props => {
		if ("node" in $$props) $$invalidate(0, node = $$props.node);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$: {
		const guard_4 = loop_guard(100);

		while (true) {
			foo();
			guard_4();
		}
	}

	$: {
		const guard_6 = loop_guard(100);

		do {
			foo();
			guard_6();
		} while (true);
	}

	return [node, div_binding];
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});
	}
}

export default Component;