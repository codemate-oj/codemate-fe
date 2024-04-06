export function objectToFormData(obj: Record<string, any>) {
  const formData = new FormData();
  for (const key in obj) {
    let value = "";
    if (typeof obj[key] === "string") {
      value = obj[key];
    } else {
      try {
        value = obj[key].toString();
      } catch (e) {
        console.error(e);
        value = JSON.stringify(obj[key]);
      }
    }
    formData.append(key, value);
  }
  return formData;
}
