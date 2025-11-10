import './App.css'
import AppRoutes from './routes/appRoutes'
import { AuthProvider } from './pages/Auth' 
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className="">
      {/* The AuthProvider wraps the AppRoutes component. 
        This ensures that every page and component within your routing 
        structure (including Navbar, Login, and Signup) can access 
        the authentication state via the useAuth hook.
      */}
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              marginTop: '70px', // 🧍 adds space from the top
            },
          }}
        />
      </AuthProvider>
    </div>
  )
}

export default App