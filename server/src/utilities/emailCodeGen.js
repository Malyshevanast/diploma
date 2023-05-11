module.exports = function emailCodeGen() {
  let result = '';
  const chars = '1234567890';

  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};
