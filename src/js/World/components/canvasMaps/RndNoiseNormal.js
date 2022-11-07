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

    const randomNoise = (canvas, x = 0, y = 0, alpha = 255) => {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");
      const imageData = g.getImageData(x, y, w, h);
      const pixels = imageData.data;
      const n = pixels.length;
      let i = 0;
      while (i < n) {
          pixels[i++] = pixels[i++] = pixels[i++] = (Math.random() * level) | 0;
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