import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type AdminRole = 'superadmin' | 'moderator' | 'support' | 'finance' | 'engineer' | 'user';

export const useAdminRole = () => {
  const { user } = useAuth();

  const { data: roles, isLoading } = useQuery({
    queryKey: ['admin-roles', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(r => r.role as AdminRole);
    },
    enabled: !!user,
  });

  const hasAdminAccess = roles && roles.some(role => 
    ['superadmin', 'moderator', 'support', 'finance', 'engineer'].includes(role)
  );

  const hasRole = (role: AdminRole) => roles?.includes(role) ?? false;

  const isSuperAdmin = hasRole('superadmin');

  return {
    roles: roles || [],
    hasAdminAccess,
    hasRole,
    isSuperAdmin,
    isLoading
  };
};
