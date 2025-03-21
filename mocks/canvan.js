// This is a mock implementation of the canvas module
module.exports = {
  // Add mock implementations of commonly used canvas functions
  createCanvas: () => ({
    getContext: () => ({
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({
        data: new Uint8ClampedArray(0)
      }),
      putImageData: () => {},
      createImageData: () => ({
        data: new Uint8ClampedArray(0)
      }),
      scale: () => {},
      drawImage: () => {},
      fillText: () => {},
      measureText: () => ({
        width: 0
      }),
      transform: () => {},
      rect: () => {},
      fill: () => {},
      beginPath: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      arc: () => {},
      quadraticCurveTo: () => {},
      bezierCurveTo: () => {},
      moveTo: () => {},
      lineTo: () => {}
    }),
    toBuffer: () => Buffer.from([]),
    toDataURL: () => '',
    width: 0,
    height: 0
  }),
  loadImage: () => Promise.resolve({
    width: 0,
    height: 0
  })
};
