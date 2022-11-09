import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndNoiseTresholdNormal {
	constructor(color, colorNoiselevel = 128, normalNoiselevel = 128) {
    const width = 1024;
		const height = 1024;

    console.log('noise maps', Math.round(colorNoiselevel), Math.round(normalNoiselevel));

		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

    let noiseCanvas = document.createElement('canvas');
		noiseCanvas.width = width;
		noiseCanvas.height = height;
    const noiseCanvasContext = noiseCanvas.getContext( '2d' );
    // noiseACanvasContext.fillStyle = 'rgb(255,255,255)';
		// noiseACanvasContext.fillRect( 0, 0, width, height );

    const normalCanvas = document.createElement('canvas');
		normalCanvas.width = width;
		normalCanvas.height = height;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, width, height );

    const darkSpotTreshold        = Math.random() * 0.1;
    const lightSpotTreshold       = Math.random() * 0.0016;
    const normalDeviationTreshold = 0.002;

    function bgNoise(canvas, x = 0, y = 0, alpha = 255) {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");
      const imageData = g.getImageData(x, y, w, h);
      const pixels = imageData.data;
      const n = pixels.length;
      let i = 0;
      while (i < n) {
        let lv = 255 - (Math.random() * colorNoiselevel);
        const treshold = Math.random();
        if (treshold < darkSpotTreshold){
          lv = Math.random() * 255;
        }
        pixels[i++] = pixels[i++] = pixels[i++] = lv | 0;
        pixels[i++] = alpha;
      }
      g.putImageData(imageData, x, y);
      return canvas;
    }

    function lightNoise(canvas, x = 0, y = 0, alpha = 255) {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");
      const imageData = g.getImageData(x, y, w, h);
      const pixels = imageData.data;
      const n = pixels.length;
      let i = 0;
      while (i < n) {
        let lv = 0;
        const treshold = Math.random();
        if (treshold < lightSpotTreshold){
          lv = Math.random() * 191;
        }
        pixels[i++] = pixels[i++] = pixels[i++] = lv | 0;
        pixels[i++] = alpha;
      }

      g.putImageData(imageData, x, y);
      return canvas;
    }

    function normalNoise(canvas, x = 0, y = 0, alpha = 255) {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");
      const imageData = g.getImageData(x, y, w, h);
      const pixels = imageData.data;
      const n = pixels.length;
      let i = 0;
      while (i < n) {
        let lv = 255 - (Math.random() * normalNoiselevel);
        const treshold = Math.random();
        if (treshold < normalDeviationTreshold){
          lv = Math.random() * 64 + 191;
        }
        pixels[i++] = pixels[i++] = pixels[i++] = lv | 0;
        pixels[i++] = alpha;
      }

      g.putImageData(imageData, x, y);
      return canvas;
    }

    bgNoise(noiseCanvas);
    colorCanvasContext.globalCompositeOperation = 'multiply';
    colorCanvasContext.drawImage(noiseCanvas, 0, 0, width, height);
    noiseCanvasContext.clearRect(0, 0, width, width);

    lightNoise(noiseCanvas);
    colorCanvasContext.globalCompositeOperation = 'difference';
    colorCanvasContext.drawImage(noiseCanvas, 0, 0, width, height);
    noiseCanvas = null;

    normalNoise(normalCanvas);

    const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
			normalMap: nMap,
      colorMap: colorCanvas
    };
	}
}

export { RndNoiseTresholdNormal };