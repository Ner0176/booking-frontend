export function checkPhone(phone: string) {
  return phone.length === 9 && /^\d+$/.test(phone);
}
