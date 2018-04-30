/* generated by Svelte vX.Y.Z */
import { appendNode, assign, createSvgElement, createText, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";

function create_main_fragment(component, ctx) {
	var svg, title, text;

	return {
		c() {
			svg = createSvgElement("svg");
			title = createSvgElement("title");
			text = createText("a title");
		},

		m(target, anchor) {
			insertNode(svg, target, anchor);
			appendNode(title, svg);
			appendNode(text, title);
		},

		p: noop,

		u() {
			detachNode(svg);
		},

		d: noop
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
export default SvelteComponent;