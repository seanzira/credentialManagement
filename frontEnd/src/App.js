import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { AuthProvider, useAuth } from './components/AuthContext';
import { MessageProvider } from './components/SetMessage';
import Register from './components/Register';
import Login from './components/Login';
import AddCredential from './components/AddCredential';
import UpdateCredential from './components/UpdateCredential';
import AssignUser from './components/AssignUser';
import ChangeUserRole from './components/ChangeUserRole';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <div>Please log in to access this page.</div>;
};

const App = () => {
  return (
      <AuthProvider>
          <MessageProvider>
              <Router>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                      <h1>User Authentication</h1>
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                          <Route path="/add-credential" element={<ProtectedRoute element={<AddCredential />} />} />
                          <Route path="/update-credential" element={<ProtectedRoute element={<UpdateCredential />} />} />
                          <Route path="/assign-user" element={<ProtectedRoute element={<AssignUser />} />} />
                          <Route path="/change-role" element={<ProtectedRoute element={<ChangeUserRole />} />} />
                      </Routes>
                  </div>
              </Router>
          </MessageProvider>
      </AuthProvider>
  );
};

export default App;
