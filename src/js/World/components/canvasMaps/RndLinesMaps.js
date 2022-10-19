class RndLinesMaps {
	constructor(color, width = 1024, height = 1024 ) {
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

    const roughnessCanvas = document.createElement('canvas');
		roughnessCanvas.width = width;
		roughnessCanvas.height = height;
		const roughnessCanvasContext = roughnessCanvas.getContext( '2d' );
    roughnessCanvasContext.fillStyle = 'rgb(255,255,255)';
		roughnessCanvasContext.fillRect( 0, 0, width, height );

    const metalnessCanvas = document.createElement('canvas');
		metalnessCanvas.width = width;
		metalnessCanvas.height = height;
		const metalnessCanvasContext = metalnessCanvas.getContext( '2d' );
    metalnessCanvasContext.fillStyle = 'rgb(0,0,0)';
		metalnessCanvasContext.fillRect( 0, 0, width, height );

    const findNewPoint = (point, angle, distance) => {
      return {
        x: Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x),
        y: Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y)
      }
    }

		for ( let i = 0; i < 12; i ++ ) {      
      
      const point1     = {x: Math.random() * width, y: Math.random() * height};
      const distance = Math.random() * 120 + 10;
      const point2     = findNewPoint(point1, Math.random() * 360, distance);
      const lineWidth  = Math.random() * 8 + 4;

      const cRGB = Math.round(Math.random()) ? 255 : 0;
      colorCanvasContext.beginPath(); // Start a new path
      colorCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      colorCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      colorCanvasContext.stroke(); // Render the path
      colorCanvasContext.strokeStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
      colorCanvasContext.lineWidth = lineWidth;
      colorCanvasContext.lineCap = 'round';

      const rRGB = Math.random() * 20 + 235;
      roughnessCanvasContext.beginPath(); // Start a new path
      roughnessCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      roughnessCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      roughnessCanvasContext.stroke(); // Render the path
      roughnessCanvasContext.strokeStyle = `rgb(${rRGB}, ${rRGB}, ${rRGB})`;
      roughnessCanvasContext.lineWidth = lineWidth;
      roughnessCanvasContext.lineCap = 'round';

      const mRGB = Math.random() * 255;
      metalnessCanvasContext.beginPath(); // Start a new path
      metalnessCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      metalnessCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      metalnessCanvasContext.stroke(); // Render the path
      metalnessCanvasContext.strokeStyle = `rgb(${mRGB}, ${mRGB}, ${mRGB})`;
      metalnessCanvasContext.lineWidth = lineWidth;
      metalnessCanvasContext.lineCap = 'round';
		}

		return {
      colorMap: colorCanvas,
      roughnessMap: roughnessCanvas,
      metalnessMap: metalnessCanvas
    };
	}
}

export { RndLinesMaps };