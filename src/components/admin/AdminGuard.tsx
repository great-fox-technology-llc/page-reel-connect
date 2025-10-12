import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useAuth } from '@/contexts/AuthContext';

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading: authLoading } = useAuth();
  const { hasAdminAccess, isLoading: rolesLoading } = useAdminRole();

  if (authLoading || rolesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !hasAdminAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
