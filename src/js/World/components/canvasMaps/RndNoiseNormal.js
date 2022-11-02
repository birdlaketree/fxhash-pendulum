import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndNoiseNormal {
	constructor(level = 128) {
    const width  = 1024;
    const height = 1024;

		const normalCanvas = document.createElement('canvas');
		normalCanvas.width = width;
		normalCanvas.height = height;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, width, height );

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
			normalMap: nMap
    };
	}
}

export { RndNoiseNormal };