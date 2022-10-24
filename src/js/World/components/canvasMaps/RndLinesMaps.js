// import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndLinesMaps {
	constructor(color, width = 2048, height = 2048 ) {
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

    // const normalCanvas = document.createElement('canvas');
		// normalCanvas.width = width;
		// normalCanvas.height = height;
    // const normalCanvasContext = normalCanvas.getContext( '2d' );
    // normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		// normalCanvasContext.fillRect( 0, 0, width, height );

    const findNewPoint = (point, angle, distance) => {
      return {
        x: Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x),
        y: Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y)
      }
    }

    const rRGB = Math.random() * 127;
    const mRGB = Math.random() * 127 + 128;
    // const nRGB = 0;

		for ( let i = 0; i < 56; i ++ ) {      
      
      const point1     = {x: Math.random() * width, y: Math.random() * height};
      const distance   = 60;
      const point2     = findNewPoint(point1, Math.random() * 360, distance);
      const lineWidth  = 8;

      // const cRGB = Math.round(Math.random()) ? 255 : 0;
      // colorCanvasContext.beginPath(); // Start a new path
      // colorCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      // colorCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      // colorCanvasContext.stroke(); // Render the path
      // colorCanvasContext.strokeStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
      // colorCanvasContext.lineWidth = lineWidth;
      // colorCanvasContext.lineCap = 'round';

      roughnessCanvasContext.beginPath(); // Start a new path
      roughnessCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      roughnessCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      roughnessCanvasContext.stroke(); // Render the path
      roughnessCanvasContext.strokeStyle = `rgb(${rRGB}, ${rRGB}, ${rRGB})`;
      roughnessCanvasContext.lineWidth = lineWidth;
      roughnessCanvasContext.lineCap = 'round';

      metalnessCanvasContext.beginPath(); // Start a new path
      metalnessCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      metalnessCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      metalnessCanvasContext.stroke(); // Render the path
      metalnessCanvasContext.strokeStyle = `rgb(${mRGB}, ${mRGB}, ${mRGB})`;
      metalnessCanvasContext.lineWidth = lineWidth;
      metalnessCanvasContext.lineCap = 'round';

      // normalCanvasContext.beginPath(); // Start a new path
      // normalCanvasContext.moveTo(point1.x, point1.y); // Move the pen to (30, 50)
      // normalCanvasContext.lineTo(point2.x, point2.y); // Draw a line to (150, 100)
      // normalCanvasContext.stroke(); // Render the path
      // normalCanvasContext.strokeStyle = `rgb(${nRGB}, ${nRGB}, ${nRGB})`;
      // normalCanvasContext.lineWidth = lineWidth;
      // normalCanvasContext.lineCap = 'round';
		}

    // const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		// const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
      colorMap: colorCanvas,
      roughnessMap: roughnessCanvas,
      metalnessMap: metalnessCanvas,
      // normalMap: nMap
    };
	}
}

export { RndLinesMaps };