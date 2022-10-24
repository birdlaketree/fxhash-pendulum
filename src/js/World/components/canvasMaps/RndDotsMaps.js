// import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndDotsMaps {
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

		for ( let i = 0; i < 240; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const r = Math.random() * 6 + 1;
      
      const cRGB = Math.round(Math.random()) ? 235 : 0;
      colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
			colorCanvasContext.beginPath();
			colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			colorCanvasContext.fill();

      const rRGB = Math.random() * 20 + 235;
      roughnessCanvasContext.fillStyle = `rgb(${rRGB}, ${rRGB}, ${rRGB})`;
			roughnessCanvasContext.beginPath();
			roughnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			roughnessCanvasContext.fill();

      const mRGB = Math.random() * 255;
      metalnessCanvasContext.fillStyle = `rgb(${mRGB}, ${mRGB}, ${mRGB})`;
			metalnessCanvasContext.beginPath();
			metalnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			metalnessCanvasContext.fill();
		}

		// for ( let i = 0; i < 600; i ++ ) {
		// 	const x = Math.random() * width;
		// 	const y = Math.random() * height;
		// 	const r = Math.random() * 3 + 1;
      
    //   const nRGB = 0;
    //   normalCanvasContext.fillStyle = `rgb(${nRGB}, ${nRGB}, ${nRGB})`;
		// 	normalCanvasContext.beginPath();
		// 	normalCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
		// 	normalCanvasContext.fill();
		// }

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

export { RndDotsMaps };