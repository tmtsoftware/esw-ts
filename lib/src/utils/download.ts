export const download = (object: any, fileName: string) => {
  const anchorElement = document.createElement('a')
  anchorElement.href = window.URL.createObjectURL(object)
  anchorElement.download = fileName
  document.body.appendChild(anchorElement)
  anchorElement.click()
  anchorElement.remove()
}
