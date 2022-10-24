
class GridDotsMaps {
	constructor(color, width = 1024, height = 1024 ) {
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

    const gridSize = 50;

		for ( let i = 0; i < gridSize; i ++ ) {
			for (let j = 0; j < gridSize; j++) {
        
        const x = i * 1024/gridSize + 1024/gridSize/2;
        const y = j * 1024/gridSize + 1024/gridSize/2;
        const r = 6;
        
        const cRGB = Math.round(Math.random()) ? 255 : 0;
        // const cRGB = 255;
        colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
        colorCanvasContext.beginPath();
        colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
        colorCanvasContext.fill();
        
      }
		}

		return {
      colorMap: colorCanvas
    };
	}
}

export { GridDotsMaps };