// library-wildanzp-045
// Kumpulan utilitas bermanfaat untuk project PAW

const validator = {
  isEmail: (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
  isPasswordStrong: (pw) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw),
};

const dateHelper = {
  formatDate: (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  },
  now: () => new Date().toISOString(),
};

const logger = {
  info: (msg) => console.log(`[INFO] ${dateHelper.now()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${dateHelper.now()} - ${msg}`),
};

const apiResponse = {
  success: (res, data, message = 'Success') => res.json({ status: 'success', message, data }),
  error: (res, message = 'Error', code = 400) => res.status(code).json({ status: 'error', message }),
};

// Fungsi tambahan
const stringHelper = {
  randomString: (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  slugify: (str) => str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, ''),
};

const isPhoneNumber = (phone) => /^08[1-9][0-9]{7,10}$/.test(phone);

const toRupiah = (num) => {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
};

module.exports = {
  validator,
  dateHelper,
  logger,
  apiResponse,
  stringHelper,
  isPhoneNumber,
  toRupiah,
};
