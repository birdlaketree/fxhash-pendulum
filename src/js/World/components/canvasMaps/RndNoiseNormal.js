import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndNoiseNormal {
	constructor(width = 1024, height = 1024 ) {
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
          pixels[i++] = pixels[i++] = pixels[i++] = (random() * 127) | 0;
          pixels[i++] = alpha;
      }
      g.putImageData(imageData, x, y);
      return canvas;
    }

    function perlinNoise(canvas, noise) {
      noise = noise || randomNoise(canvas);
      var g = canvas.getContext("2d");
      g.save();
      
      /* Scale random iterations onto the canvas to generate Perlin noise. */
      for (var size = 4; size <= noise.width; size *= 2) {
          var x = (Math.random() * (noise.width - size)) | 0,
              y = (Math.random() * (noise.height - size)) | 0;
          g.globalAlpha = 4 / size;
          g.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
      }
  
      g.restore();
      return canvas;
    }

    // perlinNoise(colorCanvas);
    randomNoise(normalCanvas);

    const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
      // colorMap: colorCanvas,
      // roughnessMap: roughnessCanvas,
      // metalnessMap: metalnessCanvas,
			normalMap: nMap
    };
	}
}

export { RndNoiseNormal };