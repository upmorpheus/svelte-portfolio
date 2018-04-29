/* generated by Svelte vX.Y.Z */
import { assign, createElement, detachNode, init, insertNode, proto } from "svelte/shared.js";

function foo( node, callback ) {
	// code goes here
};

var methods = {
	foo ( bar ) {
		console.log( bar );
	}
};

function create_main_fragment(component, ctx) {
	var button, foo_handler;

	return {
		c: function create() {
			button = createElement("button");
			button.textContent = "foo";
			this.h();
		},

		h: function hydrate() {
			foo_handler = foo.call(component, button, function(event) {
				component.foo( ctx.bar );
			});
		},

		m: function mount(target, anchor) {
			insertNode(button, target, anchor);
		},

		p: function update(changed, _ctx) {
			ctx = _ctx;

		},

		u: function unmount() {
			detachNode(button);
		},

		d: function destroy() {
			foo_handler.destroy();
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, proto);
assign(SvelteComponent.prototype, methods);
export default SvelteComponent;