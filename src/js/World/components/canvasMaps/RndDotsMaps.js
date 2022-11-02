class RndDotsMaps {
	constructor(color) {
		const width = 2048;
		const height = 2048;
		
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		const n = Math.random() * 160 + 40;
		for ( let i = 0; i < n; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const r = 2;
      const cRGB = Math.round(Math.random()) ? 235 : 20;
      colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
			colorCanvasContext.beginPath();
			colorCanvasContext.strokeStyle = "rgba(1, 1, 1, 0)";
			colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			colorCanvasContext.fill();
		}

		return {
      colorMap: colorCanvas
    };
	}
}

export { RndDotsMaps };