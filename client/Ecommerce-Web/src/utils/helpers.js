export function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export function formatMoney(amount) {
  // Chuyển đổi số tiền thành chuỗi
  const formattedAmount = amount.toString();

  // Tách phần nguyên và phần thập phân
  const parts = formattedAmount.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Định dạng phần nguyên bằng cách thêm dấu phẩy mỗi 3 chữ số
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Kết hợp phần nguyên và phần thập phân
  const formattedMoney = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

  // Trả về số tiền đã định dạng
  return formattedMoney;
}

export function secondsToHms(d) {
  d = Number(d) / 1000
  const h = Math.floor(d / 3600)
  const m = Math.floor(d % 3600 / 60)
  const s = Math.floor(d % 3600 % 60)
  return ({ h, m, s })
}

export function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}

export const isValidNumberInput = (input) => {
  const numberRegex = /^[0-9]+$/; // Biểu thức chính quy để kiểm tra số

  return numberRegex.test(input);
};

export function capitalizedStr (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}