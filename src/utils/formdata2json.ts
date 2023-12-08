export const formdata2json = (form: HTMLFormElement) => {
  // Create a FormData object to easily retrieve form data
  const formData = new FormData(form)
  console.log(Object.fromEntries(formData));
  // Convert FormData to JSON
  const jsonData = {}
  formData.forEach(function (value, key) {
    jsonData[key] = value
  })
  return formData
}
