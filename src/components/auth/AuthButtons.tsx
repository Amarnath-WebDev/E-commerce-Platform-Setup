import React from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import { LogIn, LogOut, UserCircle } from 'lucide-react';
import { signOut } from '../../lib/auth';

export function AuthButtons() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserCircle className="w-6 h-6" />
            <span className="text-sm">{user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAuthModal(true)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      )}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}