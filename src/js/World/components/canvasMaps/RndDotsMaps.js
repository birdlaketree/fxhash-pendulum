import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndDotsMaps {
	constructor(color, level = 128) {
		const width = 2048;
		const height = 2048;
		
		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		const normalCanvas = document.createElement('canvas');
		normalCanvas.width = 1024;
		normalCanvas.height = 1024;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, width, height );

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

		function randomNoise(canvas, x, y, width, height, alpha) {
      x = x || 0;
      y = y || 0;
      width = width || canvas.width;
      height = height || canvas.height;
      alpha = alpha || 255;
      var g = canvas.getContext("2d"),
          imageData = g.getImageData(x, y, width, height),
          random = Math.random,
          pixels = imageData.data,
          n = pixels.length,
          i = 0;
      while (i < n) {
          pixels[i++] = pixels[i++] = pixels[i++] = (random() * level) | 0;
          pixels[i++] = alpha;
      }
      g.putImageData(imageData, x, y);
      return canvas;
    }

    randomNoise(normalCanvas);

    const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
      colorMap: colorCanvas,
			normalMap: nMap
    };
	}
}

export { RndDotsMaps };