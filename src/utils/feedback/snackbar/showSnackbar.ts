import './styles.css'

export const showSnackbar = (message: string, reason: string, danger = false): void => {
  const snackbar = document.createElement('div')
  snackbar.setAttribute('id', 'snackbar')
  if (danger) snackbar.classList.add('danger')
  document.body.appendChild(snackbar)
  snackbar.className = 'show'
  snackbar.textContent = message
  setTimeout(() => {
    document.body.removeChild(snackbar)
    // snackbar.className = snackbar.className.replace('show', '')
  }, 3000)
}
