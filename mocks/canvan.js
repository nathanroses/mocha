// Enhanced mock implementation of the canvas module
module.exports = {
  // Create a mock canvas with configurable dimensions
  createCanvas: (width = 300, height = 150) => {
    const mockContext = {
      // Drawing state
      fillStyle: '#000000',
      strokeStyle: '#000000',
      font: '10px sans-serif',
      lineWidth: 1,
      globalAlpha: 1.0,
      
      // Path methods
      beginPath: () => {},
      closePath: () => {},
      moveTo: (x, y) => {},
      lineTo: (x, y) => {},
      arc: (x, y, radius, startAngle, endAngle, anticlockwise) => {},
      rect: (x, y, width, height) => {},
      
      // Drawing methods
      fill: () => {},
      stroke: () => {},
      fillRect: (x, y, width, height) => {},
      strokeRect: (x, y, width, height) => {},
      clearRect: (x, y, width, height) => {},
      
      // Text methods
      fillText: (text, x, y, maxWidth) => {},
      strokeText: (text, x, y, maxWidth) => {},
      measureText: (text) => ({ width: text.length * 5 }),
      
      // Image methods
      drawImage: () => {},
      
      // Pixel manipulation
      createImageData: (width, height) => ({
        width: width,
        height: height,
        data: new Uint8ClampedArray(width * height * 4)
      }),
      getImageData: (sx, sy, sw, sh) => ({
        width: sw,
        height: sh,
        data: new Uint8ClampedArray(sw * sh * 4)
      }),
      putImageData: (imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) => {},
      
      // Transformations
      scale: (x, y) => {},
      rotate: (angle) => {},
      translate: (x, y) => {},
      transform: (a, b, c, d, e, f) => {},
      setTransform: (a, b, c, d, e, f) => {},
      resetTransform: () => {},
      
      // Compositing
      globalCompositeOperation: 'source-over',
      
      // Curves
      quadraticCurveTo: (cpx, cpy, x, y) => {},
      bezierCurveTo: (cp1x, cp1y, cp2x, cp2y, x, y) => {},
      
      // Shadows
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 0, 0)',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      
      // State
      save: () => {},
      restore: () => {},
      
      // Gradients and patterns
      createLinearGradient: (x0, y0, x1, y1) => ({
        addColorStop: (offset, color) => {}
      }),
      createRadialGradient: (x0, y0, r0, x1, y1, r1) => ({
        addColorStop: (offset, color) => {}
      }),
      createPattern: (image, repetition) => ({})
    };
    
    return {
      width,
      height,
      getContext: (type) => mockContext,
      toBuffer: (mime, quality) => Buffer.from([]),
      toDataURL: (mime, quality) => `data:${mime || 'image/png'};base64,`,
      createPNGStream: () => ({ on: () => {} }),
      createJPEGStream: () => ({ on: () => {} })
    };
  },
  
  // Image loading
  loadImage: (src) => {
    return Promise.resolve({
      width: 100,
      height: 100,
      src: src
    });
  },
  
  // Font registration
  registerFont: (path, options) => {},
  
  // Constants
  backends: [],
  
  // Additional constructor pattern support
  Canvas: function(width, height) {
    return module.exports.createCanvas(width, height);
  },
  
  Image: function() {
    this.src = '';
    this.width = 0;
    this.height = 0;
    this.complete = false;
    this.onload = null;
  }
};
