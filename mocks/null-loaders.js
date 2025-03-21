// Returns an empty module
module.exports = function() {
  this.callback(null, 'module.exports = {};');
  return;
};
