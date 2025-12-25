import { supabase } from '@/integrations/supabase/client';

export interface UserWithProfile {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  profile: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    is_verified: boolean;
    is_banned: boolean;
    ban_reason: string | null;
  } | null;
  roles: string[];
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  totalBookmarks: number;
  totalNotes: number;
  adminCount: number;
  moderatorCount: number;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  details: any;
  created_at: string;
}

// Get all users with their profiles and roles (admin only)
export const getAllUsers = async (): Promise<UserWithProfile[]> => {
  // Get profiles with roles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (profilesError) throw profilesError;

  // Get all user roles
  const { data: userRoles, error: rolesError } = await supabase
    .from('user_roles')
    .select('*');

  if (rolesError) throw rolesError;

  // Build user list
  const users: UserWithProfile[] = (profiles || []).map(profile => {
    const roles = (userRoles || [])
      .filter(r => r.user_id === profile.user_id)
      .map(r => r.role);

    return {
      id: profile.user_id,
      email: '', // We'll need to get this from auth context or logs
      created_at: profile.created_at,
      last_sign_in_at: null,
      profile: {
        id: profile.id,
        username: profile.username,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        is_verified: profile.is_verified,
        is_banned: profile.is_banned,
        ban_reason: profile.ban_reason
      },
      roles
    };
  });

  return users;
};

// Ban a user
export const banUser = async (userId: string, reason: string): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_banned: true, ban_reason: reason })
    .eq('user_id', userId);

  if (error) throw error;

  // Log the action
  await logActivity('user_banned', { user_id: userId, reason });
};

// Unban a user
export const unbanUser = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_banned: false, ban_reason: null })
    .eq('user_id', userId);

  if (error) throw error;

  // Log the action
  await logActivity('user_unbanned', { user_id: userId });
};

// Change user role
export const changeUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user'): Promise<void> => {
  // First, delete existing roles for this user
  const { error: deleteError } = await supabase
    .from('user_roles')
    .delete()
    .eq('user_id', userId);

  if (deleteError) throw deleteError;

  // Insert the new role
  const { error: insertError } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role: newRole });

  if (insertError) throw insertError;

  // Log the action
  await logActivity('role_changed', { user_id: userId, new_role: newRole });
};

// Get admin statistics
export const getAdminStats = async (): Promise<AdminStats> => {
  const [
    { count: totalUsers },
    { count: bannedUsers },
    { count: totalBookmarks },
    { count: totalNotes },
    { count: adminCount },
    { count: moderatorCount }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_banned', true),
    supabase.from('bookmarks').select('*', { count: 'exact', head: true }),
    supabase.from('notes').select('*', { count: 'exact', head: true }),
    supabase.from('user_roles').select('*', { count: 'exact', head: true }).eq('role', 'admin'),
    supabase.from('user_roles').select('*', { count: 'exact', head: true }).eq('role', 'moderator')
  ]);

  return {
    totalUsers: totalUsers || 0,
    activeUsers: (totalUsers || 0) - (bannedUsers || 0),
    bannedUsers: bannedUsers || 0,
    totalBookmarks: totalBookmarks || 0,
    totalNotes: totalNotes || 0,
    adminCount: adminCount || 0,
    moderatorCount: moderatorCount || 0
  };
};

// Get activity logs
export const getActivityLogs = async (limit: number = 50): Promise<ActivityLog[]> => {
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// Log an activity
export const logActivity = async (action: string, details?: Record<string, any>): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  await supabase
    .from('activity_logs')
    .insert({
      user_id: user?.id || null,
      action,
      details: details || null
    });
};
