import { floatBufferFromCanvas, normalMap as normalMapCreator } from "@thi.ng/pixel";
import { CanvasTexture, RepeatWrapping } from 'three';
import { mapNumber } from '../../utils/numUtils';
import { randomNoiseWithLevel } from '../../utils/noiseGenerators';

class RndDotsFloor {
	constructor(bgHSL, color, level) {
		const width  = 2048;
		const height = 2048;

		const normalWidth  = 1024;
		const normalHeight = 1024;

		let colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    let colorCanvasContext = colorCanvas.getContext( '2d' );
		colorCanvasContext.fillStyle = `rgb(${255*color.r}, ${255*color.g}, ${255*color.b})`;
		colorCanvasContext.fillRect( 0, 0, width, height );

		let normalCanvas = document.createElement('canvas');
		normalCanvas.width = normalWidth;
		normalCanvas.height = normalHeight;
    let normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, normalWidth, normalHeight );

    let roughnessCanvas = document.createElement('canvas');
		roughnessCanvas.width = width;
		roughnessCanvas.height = height;
		let roughnessCanvasContext = roughnessCanvas.getContext('2d');
    roughnessCanvasContext.fillStyle = 'rgb(255,255,255)';
		roughnessCanvasContext.fillRect( 0, 0, width, height );

    let metalnessCanvas = document.createElement('canvas');
		metalnessCanvas.width = width;
		metalnessCanvas.height = height;
		let metalnessCanvasContext = metalnessCanvas.getContext('2d');
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
		normalCanvas = null;
		let normalImage = normalMapCreator(normalMapSrc, {step: 0, scale: 1}).toImageData();

		// create maps from canvases

		const repeatX = 8 * 15;
    const repeatY = 8 * 15;

		const normalMap =  new CanvasTexture(normalImage);
		normalMap.repeat.x = repeatX;
    normalMap.repeat.y = repeatY;
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
		normalImage = null;

		const colorMap  =  new CanvasTexture(colorCanvas);
		colorMap.repeat.x = repeatX;
    colorMap.repeat.y = repeatY;
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
		colorCanvas = null;

		const roughnessMap  =  new CanvasTexture(roughnessCanvas);
		roughnessMap.repeat.x = repeatX;
    roughnessMap.repeat.y = repeatY;
    roughnessMap.wrapS = RepeatWrapping;
    roughnessMap.wrapT = RepeatWrapping;
		roughnessCanvas = null;

		const metalnessMap  =  new CanvasTexture(metalnessCanvas);
		metalnessMap.repeat.x = repeatX;
    metalnessMap.repeat.y = repeatY;
    metalnessMap.wrapS = RepeatWrapping;
    metalnessMap.wrapT = RepeatWrapping;
		metalnessCanvas = null;

		return {
      colorMap,
      roughnessMap,
      metalnessMap,
			normalMap
    };
	}
}

export { RndDotsFloor };