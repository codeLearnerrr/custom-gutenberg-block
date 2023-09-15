/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: `has-text-align-${attributes.alignment}`
	})

	return (
		<div
			{...blockProps}
			style={{ backgroundColor: attributes.backgroundColor }}
		>
			<RichText.Content
				tagName='p'
				value={attributes.content}
				style={{
					color: attributes.textColor
				}}
			/>
			<p>
				<a
					href={attributes.cbLink}
					className="cb-button"
					rel={attributes.hasLinkNofollow ? "nofollow" : "noopener noreferrer"}>
					{attributes.linkLabel}
				</a>
			</p>
		</div>
	);
}
