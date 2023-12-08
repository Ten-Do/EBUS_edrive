import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './rootLayout/RootLayout.js'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
])
