import deindent from '../../../utils/deindent.js';
import getBuilders from '../utils/getBuilders.js';
import visit from '../visit.js';

function getConditionsAndBlocks ( generator, fragment, node, _name, i = 0 ) {
	generator.addSourcemapLocations( node.expression );
	const name = generator.getUniqueName( `${_name}_${i}` );

	const conditionsAndBlocks = [{
		condition: generator.contextualise( node.expression ).snippet,
		block: name
	}];

	generateBlock( generator, fragment, node, name, 'block' );

	if ( node.else && node.else.children.length === 1 &&
		node.else.children[0].type === 'IfBlock' ) {
		conditionsAndBlocks.push(
			...getConditionsAndBlocks( generator, fragment, node.else.children[0], _name, i + 1 )
		);
	} else {
		const name = generator.getUniqueName( `${_name}_${i + 1}` );
		conditionsAndBlocks.push({
			condition: null,
			block: node.else ? name : null,
		});

		if ( node.else ) {
			generateBlock( generator, fragment, node.else, name, 'block' );
		}
	}
	return conditionsAndBlocks;
}

function generateBlock ( generator, fragment, node, name, type ) {
	const childFragment = fragment.child({
		type,
		isIfBlock: true, 
		name,
		target: 'target',
		builders: getBuilders(),
		localElementDepth: 0
	});

	// walk the children here
	node.children.forEach( node => {
		visit( generator, childFragment, node );
	});

	generator.addRenderer( childFragment );
}

export default function visitIfBlock ( generator, fragment, node ) {
	const params = fragment.params.join( ', ' );
	const name = generator.getUniqueName( `if_block` );
	const getBlock = fragment.getUniqueName( `get_block` );
	const currentBlock = fragment.getUniqueName( `current_block` );
	const _currentBlock = fragment.getUniqueName( `_current_block` );

	const isToplevel = fragment.localElementDepth === 0;
	const conditionsAndBlocks = getConditionsAndBlocks( generator, fragment, node, generator.getUniqueName( `render_if_block` ) );

	const anchor = `${name}_anchor`;
	fragment.createAnchor( anchor );

	fragment.builders.create.addBlock( deindent`
		function ${getBlock} ( ${params} ) {
			${conditionsAndBlocks.map( ({ condition, block }) => {
				return `${condition ? `if ( ${condition} ) ` : ''}return ${block};`;
			} ).join( '\n' )}
		}

		var ${currentBlock} = ${getBlock}( ${params} );
		var ${name} = ${currentBlock} && ${currentBlock}( ${params}, ${fragment.component} );
	` );

	const mountStatement = `if ( ${name} ) ${name}.mount( ${anchor}.parentNode, ${anchor} );`;
	if ( isToplevel ) {
		fragment.builders.mount.addLine( mountStatement );
	} else {
		fragment.builders.create.addLine( mountStatement );
	}

	fragment.builders.update.addBlock( deindent`
		var ${_currentBlock} = ${currentBlock};
		${currentBlock} = ${getBlock}( ${params} );
		if ( ${_currentBlock} === ${currentBlock} && ${name}) {
			${name}.update( changed, ${params} );
		} else {
			if ( ${name} ) ${name}.destroy( true );
			${name} = ${currentBlock} && ${currentBlock}( ${params}, ${fragment.component} );
			if ( ${name} ) ${name}.mount( ${anchor}.parentNode, ${anchor} );
		}
	` );

	fragment.builders.destroy.addLine(
		`if ( ${name} ) ${name}.destroy( ${isToplevel ? 'detach' : 'false'} );`
	);
}