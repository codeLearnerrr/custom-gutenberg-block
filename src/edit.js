/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink
} from '@wordpress/components'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps()

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent })
	}

	const onChangeAlignment = (newAlign) => {
		setAttributes({
			alignment: newAlign === undefined ? 'none' : newAlign,
		})
	}

	const onChangeBackgroundColor = (newBackgroundColor) => {
		setAttributes({ backgroundColor: newBackgroundColor })
	}

	const onChangeTextColor = (newTextColor) => {
		setAttributes({ textColor: newTextColor })
	}

	const onChangeCBLink = (newCBLink) => {
		setAttributes({ cbLink: newCBLink === undefined ? '' : newCBLink })
	}

	const onChangeLinkLabel = (newLinkLabel) => {
		setAttributes({ linkLabel: newLinkLabel === undefined ? '' : newLinkLabel })
	}

	const toggleNofollow = () => {
		setAttributes({ hasLinkNofollow: !attributes.hasLinkNofollow })
	}
	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__('Color settings', 'custom-block')}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.textColor,
							onChange: onChangeTextColor,
							label: __('Text color', 'custom-block')
						}, {
							value: attributes.backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __('Background color', 'custom-block')
						}
					]}
				/>
				<PanelBody
					title={__('Link Settings')}
					initialOpen={true}
				>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__('CB Link', 'custom-block')}
								value={attributes.cbLink}
								onChange={onChangeCBLink}
								help={__('Add your Academy link', 'custom-block')}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__('Link label', 'custom-block')}
								value={attributes.linkLabel}
								onChange={onChangeLinkLabel}
								help={__('Add link label', 'custom-block')}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								help={attributes.hasLinkNofollow ? 'Has rel nofollow.' : 'No rel nofollow.'}
								checked={attributes.hasLinkNofollow}
								onChange={toggleNofollow}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar value={attributes.alignment} onChange={onChangeAlignment} />
			</BlockControls>
			<div {...blockProps}
				style={{ backgroundColor: attributes.backgroundColor, }}>
				<RichText
					tagName='p'
					onChange={onChangeContent}
					allowedFormats={['core/bold', 'core/italic']}
					value={attributes.content}
					placeholder={__('Write your text...')}
					style={{
						textAlign: attributes.alignment,
						color: attributes.textColor
					}}
				/>
				<ExternalLink
					href={attributes.cbLink}
					className='cb-button'
					rel={attributes.hasLinkNofollow ? 'nofollow' : ""}
				>
					{attributes.linkLabel}
				</ExternalLink>
			</div>
		</>
	);
}
