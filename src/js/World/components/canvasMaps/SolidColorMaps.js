class SolidColorMaps {
	constructor(color, width = 1, height = 1 ) {
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		return {
      colorMap: colorCanvas
    };
	}
}

export { SolidColorMaps };