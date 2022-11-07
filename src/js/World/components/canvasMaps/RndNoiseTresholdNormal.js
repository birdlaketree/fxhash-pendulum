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

    const noiseACanvas = document.createElement('canvas');
		noiseACanvas.width = width;
		noiseACanvas.height = height;
    const noiseACanvasContext = noiseACanvas.getContext( '2d' );
    noiseACanvasContext.fillStyle = 'rgb(255,255,255)';
		noiseACanvasContext.fillRect( 0, 0, width, height );

    const noiseBCanvas = document.createElement('canvas');
		noiseBCanvas.width = width;
		noiseBCanvas.height = height;
    const noiseBCanvasContext = noiseBCanvas.getContext( '2d' );
    noiseBCanvasContext.fillStyle = 'rgb(255,255,255)';
		noiseBCanvasContext.fillRect( 0, 0, width, height );

    const normalCanvas = document.createElement('canvas');
		normalCanvas.width = width;
		normalCanvas.height = height;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, width, height );

    const darkTreshold   = 0.002;
    const lightTreshold  = 0.002;
    const normalTreshold = 0.002;

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
        if (treshold < darkTreshold){
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
        if (treshold < lightTreshold){
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
        if (treshold < normalTreshold){
          lv = Math.random() * 64 + 191;
        }
        pixels[i++] = pixels[i++] = pixels[i++] = lv | 0;
        pixels[i++] = alpha;
      }

      g.putImageData(imageData, x, y);
      return canvas;
    }

    bgNoise(noiseACanvas);
    colorCanvasContext.globalCompositeOperation = 'multiply';
    colorCanvasContext.drawImage(noiseACanvas, 0, 0, width, height);

    lightNoise(noiseBCanvas);
    colorCanvasContext.globalCompositeOperation = 'difference';
    colorCanvasContext.drawImage(noiseBCanvas, 0, 0, width, height);

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