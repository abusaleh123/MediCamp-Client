import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AuthProvider from './Provider/AuthProvider.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
    </QueryClientProvider>
  
  </StrictMode>,
)
