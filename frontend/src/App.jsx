import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Button } from '@heroui/react';
import { ThemeProvider } from './context/ThemeContext';
import { WallpaperProvider } from './context/WallpaperContext';
import { Routes, Route, Navigate } from 'react-router';
import Chatpage from './pages/Chatpage';
import AuthPage from './pages/Authpage';
import {useAuth} from '@clerk/react'
function App() {
  const { isSignedIn , isLoaded } = useAuth();

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <Chatpage /> : <Navigate to="/auth" replace />} />
          <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />} />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  )
}

export default App
