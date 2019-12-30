/**
 * WordPress dependencies
 */
const { select } = wp.data;

/**
 * Internal dependencies
 */
import getBlockFromContent from './getBlockFromContent';
import saveBlock from './saveBlock';

/**
 * Parses the block from the post content into an object.
 *
 * @param {string} fieldSlug The slug of the field.
 * @param {string} key The key of the field value to change, like 'label'.
 * @param {string} value The new field value.
 * @return {boolean} Whether saving the field value succeeded.
 */
const saveFieldValue = ( fieldSlug, key, value ) => {
	if ( ! fieldSlug ) {
		return false;
	}

	const content = select( 'core/editor' ).getEditedPostContent();
	const block = getBlockFromContent( content ) || {};
	if ( ! block.hasOwnProperty( 'fields' ) ) {
		block.fields = {};
	}

	if ( ! block.fields.hasOwnProperty( fieldSlug ) || 'object' !== typeof block.fields[ fieldSlug ] ) {
		return false;
	}

	block.fields[ fieldSlug ][ key ] = value;
	saveBlock( block );

	return true;
};

export default saveFieldValue;
