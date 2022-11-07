import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";
import { mapNumber } from '../../utils/numUtils';
import { randomNoiseWithLevel } from '../../utils/noiseGenerators';

class RndDotsFloor {
	constructor(bgHSL, color, level) {
		const width  = 2048;
		const height = 2048;

		const normalWidth  = 1024;
		const normalHeight = 1024;

		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
		colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		const normalCanvas = document.createElement('canvas');
		normalCanvas.width = normalWidth;
		normalCanvas.height = normalHeight;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, normalWidth, normalHeight );

    const roughnessCanvas = document.createElement('canvas');
		roughnessCanvas.width = width;
		roughnessCanvas.height = height;
		const roughnessCanvasContext = roughnessCanvas.getContext('2d');
    roughnessCanvasContext.fillStyle = 'rgb(255,255,255)';
		roughnessCanvasContext.fillRect( 0, 0, width, height );

    const metalnessCanvas = document.createElement('canvas');
		metalnessCanvas.width = width;
		metalnessCanvas.height = height;
		const metalnessCanvasContext = metalnessCanvas.getContext('2d');
    metalnessCanvasContext.fillStyle = 'rgb(0,0,0)';
		metalnessCanvasContext.fillRect( 0, 0, width, height );

		// const colorNoiselevel = 64;
		// const darkTreshold   = 0.001;

		// function bgNoise(canvas, x = 0, y = 0, alpha = 255) {
    //   const w = canvas.width;
    //   const h = canvas.height;
    //   const g = canvas.getContext("2d");
    //   const imageData = g.getImageData(x, y, w, h);
    //   const pixels = imageData.data;
    //   const n = pixels.length;
    //   let i = 0;
    //   while (i < n) {
    //     let lv = 255 - (Math.random() * colorNoiselevel);
    //     const treshold = Math.random();
    //     if (treshold < darkTreshold){
    //       lv = Math.random() * 255;
    //     }
    //     pixels[i++] = pixels[i++] = pixels[i++] = lv | 0;
    //     pixels[i++] = alpha;
    //   }
    //   g.putImageData(imageData, x, y);
    //   return canvas;
    // }

		// bgNoise(noiseACanvas);
    // colorCanvasContext.globalCompositeOperation = 'multiply';
    // colorCanvasContext.drawImage(noiseACanvas, 0, 0, width, height);


		const spread = mapNumber(bgHSL.l, 0, 1, 12, 400);
		const start  = mapNumber(bgHSL.l, 0, 1, 12, 100);
		const n = Math.random() * spread + start;

		for ( let i = 0; i < n; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const r = Math.random() * 6;
  
			const cRGB = Math.random() * mapNumber(bgHSL.l, 0, 1, 255, 0);

      colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
			colorCanvasContext.beginPath();
			colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			colorCanvasContext.fill();
			
			const rRGB = Math.random() * 224 + 32;
      roughnessCanvasContext.fillStyle = `rgb(${rRGB}, ${rRGB}, ${rRGB})`;
			roughnessCanvasContext.beginPath();
			roughnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			roughnessCanvasContext.fill();

			const mRGB = 0;
      metalnessCanvasContext.fillStyle = `rgb(${mRGB}, ${mRGB}, ${mRGB})`;
			metalnessCanvasContext.beginPath();
			metalnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			metalnessCanvasContext.fill();
		}

		randomNoiseWithLevel(normalCanvas, level);
		const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
      colorMap: colorCanvas,
      roughnessMap: roughnessCanvas,
      metalnessMap: metalnessCanvas,
			normalMap: nMap
    };
	}
}

export { RndDotsFloor };