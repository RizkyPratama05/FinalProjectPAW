// library-RizkyPP-005
// Kumpulan fungsi unik untuk project PAW

// 1. Generate UUID v4
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 2. Array unique
function arrayUnique(arr) {
  return [...new Set(arr)];
}

// 3. Deep clone object/array
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 4. Debounce function
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 5. Get file extension
function getFileExtension(filename) {
  return filename.split('.').pop();
}

module.exports = {
  generateUUID,
  arrayUnique,
  deepClone,
  debounce,
  getFileExtension,
};
