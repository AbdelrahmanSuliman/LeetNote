// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ThemeProvider} from './components/ThemeContext'
import Homepage from './Homepage'
import Problem from './components/Problem'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/problems/:id" element={<Problem />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
