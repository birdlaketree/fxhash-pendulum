import { floatBufferFromCanvas, normalMap } from "@thi.ng/pixel";

class RndDotsNormal {
	constructor(radius = 1, width = 1024, height = 1024 ) {
		const normalCanvas = document.createElement('canvas');
		normalCanvas.width = width;
		normalCanvas.height = height;
    const normalCanvasContext = normalCanvas.getContext( '2d' );
    normalCanvasContext.fillStyle = 'rgb(255,255,255)';
		normalCanvasContext.fillRect( 0, 0, width, height );

		for ( let i = 0; i < 3000; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const r = radius;

			const nRGB = Math.random() * 40 + 190;
      normalCanvasContext.fillStyle = `rgb(${nRGB}, ${nRGB}, ${nRGB})`;
			normalCanvasContext.beginPath();
			normalCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			normalCanvasContext.fill();
		}

		const normalMapSrc = floatBufferFromCanvas(normalCanvas);
		const nMap = normalMap(normalMapSrc, {step: 0, scale: 1}).toImageData();

		return {
			normalMap: nMap
    };
	}
}

export { RndDotsNormal };