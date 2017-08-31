import React from 'react'
import {
	ScrollView,
	TouchableOpacity,
	Text,
	View
} from 'react-native'
import HTMLStyles from './HTMLStyles'
import HTMLImage from './HTMLImage'

export default {
  /**
  * Renders an anchor tag
  * @param htmlAttribs: dict of html attributes
  * @param children: the children to place within the element
  * @param passProps: other props that are to be passed into the element
  * @return a RN element that represents an anchor tag
  */
	a: (htmlAttribs, children, passProps) => {
		const style = []
		.concat(
			HTMLStyles.defaultStyles.a,
			passProps.htmlStyles ? passProps.htmlStyles.a : undefined,
			htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.TEXT) : undefined
			).filter((s) => s !== undefined)

		if (passProps.parentIsText) {
			return (
				<Text
					{...passProps}
					style={style}
					onPress={(evt) => { passProps.onLinkPress && passProps.onLinkPress(evt, htmlAttribs.href) }}>
					{children}
				</Text>
			)
		} else {
			return (
				<TouchableOpacity onPress={(evt) => { passProps.onLinkPress && passProps.onLinkPress(evt, htmlAttribs.href) }}>
					<Text {...passProps} style={style}>
						{children}
					</Text>
				</TouchableOpacity>
			)
		}
	},
	/**
	* Renders an image tag
	* @param htmlAttribs: dict of html attributes
	* @param children: the children to place within the element
	* @param passProps: other props that are to be passed into the element
	* @return a RN element that represents an image tag
	*/

	img: (htmlAttribs, children, passProps) => {
		if (!htmlAttribs.src) { return null }

		// Build our styles
		const style = []
		.concat(
			HTMLStyles.defaultStyles.img,
			passProps.htmlStyles ? passProps.htmlStyles.img : undefined,
			htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.IMAGE) : undefined
		).filter((s) => s !== undefined)

		return (<HTMLImage source={{uri: htmlAttribs.src}} style={style} {...passProps} />)
	},

	/**
	* Renders an anchor tag
	* @param htmlAttribs: dict of html attributes
	* @param children: the children to place within the element
	* @param passProps: other props that are to be passed into the element
	* @return a RN element that represents an anchor tag
	*/
	blockquote: (htmlAttribs, children, passProps) => {
		const style = []
		.concat(
			passProps.htmlStyles ? passProps.htmlStyles.blockquote : undefined
		).filter((s) => s !== undefined)

		return (
			<View>
				{
					children.map((child, index) => {
						return (
							<View key={index}>
								<Text {...passProps} style={style}>
									{child}
								</Text>
							</View>
						)
					})
				}
			</View>
		)
	},
	pre: (htmlAttribs, children, passProps) => {
		const style = []
		.concat(
			passProps.htmlStyles ? passProps.htmlStyles.pre : undefined
		).filter((s) => s !== undefined)

		return (
			<View>
				<ScrollView>
					{
						children.map((child, index) => {
							return (
								<View key={index}>
									<Text {...passProps} style={style}>
										{child}
									</Text>
								</View>
							)
						})
					}
				</ScrollView>
			</View>
		)
	}
}
