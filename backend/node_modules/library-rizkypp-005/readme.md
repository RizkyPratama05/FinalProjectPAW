# library-RizkyPP-005

Library utilitas unik untuk project PAW oleh RizkyPP

## Fitur
- `generateUUID()`: Membuat UUID v4
- `arrayUnique(arr)`: Menghapus duplikat dari array
- `deepClone(obj)`: Clone objek/array secara mendalam
- `debounce(fn, delay)`: Membuat fungsi debounce
- `getFileExtension(filename)`: Mendapatkan ekstensi file

## Cara Pakai
```js
const lib = require('./library-RizkyPP-005');

const uuid = lib.generateUUID();
const arr = lib.arrayUnique([1,1,2,3,3]);
const clone = lib.deepClone({a:1});
const ext = lib.getFileExtension('file.pdf');
```
