import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  BarChart3, 
  Shield, 
  Ban, 
  CheckCircle, 
  Search,
  Activity,
  BookMarked,
  FileText,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { 
  getAllUsers, 
  banUser, 
  unbanUser, 
  changeUserRole, 
  getAdminStats, 
  getActivityLogs,
  type UserWithProfile,
  type AdminStats,
  type ActivityLog
} from "@/services/adminService";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'stats' | 'logs'>('users');
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Ban modal state
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin, activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'users') {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } else if (activeTab === 'stats') {
        const statsData = await getAdminStats();
        setStats(statsData);
      } else if (activeTab === 'logs') {
        const logsData = await getActivityLogs();
        setLogs(logsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser || !banReason.trim()) return;

    try {
      await banUser(selectedUser.id, banReason);
      toast({
        title: "User Banned",
        description: `User has been banned successfully.`
      });
      setBanModalOpen(false);
      setBanReason("");
      setSelectedUser(null);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to ban user",
        variant: "destructive"
      });
    }
  };

  const handleUnbanUser = async (userId: string) => {
    try {
      await unbanUser(userId);
      toast({
        title: "User Unbanned",
        description: "User has been unbanned successfully."
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unban user",
        variant: "destructive"
      });
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      await changeUserRole(userId, newRole);
      toast({
        title: "Role Updated",
        description: `User role changed to ${newRole}.`
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change role",
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(u => 
    u.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.profile?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="animate-celestial-fade pb-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center glow-gold">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl text-primary text-glow">Admin Dashboard</h1>
            <p className="text-secondary-foreground text-sm">Manage users and monitor platform activity</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'users', label: 'Users', icon: Users },
          { id: 'stats', label: 'Statistics', icon: BarChart3 },
          { id: 'logs', label: 'Activity Logs', icon: Activity }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-ui transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'gradient-gold text-primary-foreground glow-gold'
                : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
        
        <button
          onClick={loadData}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl font-ui bg-secondary/50 text-secondary-foreground hover:bg-secondary/80 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-xl bg-secondary/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Users List */}
          <div className="cosmic-card">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 text-secondary-foreground font-ui text-sm">User</th>
                      <th className="text-left py-3 px-4 text-secondary-foreground font-ui text-sm">Role</th>
                      <th className="text-left py-3 px-4 text-secondary-foreground font-ui text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-secondary-foreground font-ui text-sm">Joined</th>
                      <th className="text-right py-3 px-4 text-secondary-foreground font-ui text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-b border-primary/10 hover:bg-secondary/30 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-foreground">{u.profile?.full_name || 'Unknown'}</p>
                            <p className="text-sm text-muted-foreground">@{u.profile?.username || 'no-username'}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={u.roles[0] || 'user'}
                            onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                            className="px-3 py-1 rounded-lg bg-secondary/50 border border-primary/30 text-foreground text-sm focus:outline-none focus:border-primary"
                          >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          {u.profile?.is_banned ? (
                            <span className="flex items-center gap-1 text-destructive text-sm">
                              <Ban className="w-4 h-4" />
                              Banned
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-green-500 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Active
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-sm">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {u.profile?.is_banned ? (
                            <button
                              onClick={() => handleUnbanUser(u.id)}
                              className="text-green-500 hover:text-green-400 text-sm font-medium transition-colors"
                            >
                              Unban
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setBanModalOpen(true);
                              }}
                              className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors"
                            >
                              Ban
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-purple-500' },
            { label: 'Active Users', value: stats.activeUsers, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Banned Users', value: stats.bannedUsers, icon: Ban, color: 'from-red-500 to-orange-500' },
            { label: 'Total Bookmarks', value: stats.totalBookmarks, icon: BookMarked, color: 'from-primary to-primary-glow' },
            { label: 'Total Notes', value: stats.totalNotes, icon: FileText, color: 'from-purple-500 to-pink-500' },
            { label: 'Admins', value: stats.adminCount, icon: Shield, color: 'from-yellow-500 to-amber-500' }
          ].map((stat, i) => (
            <div key={i} className="cosmic-card">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-display text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Logs Tab */}
      {activeTab === 'logs' && (
        <div className="cosmic-card">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No activity logs yet
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium">{log.action.replace(/_/g, ' ').toUpperCase()}</p>
                    {log.details && (
                      <p className="text-sm text-muted-foreground truncate">
                        {JSON.stringify(log.details)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ban Modal */}
      <Dialog open={banModalOpen} onOpenChange={setBanModalOpen}>
        <DialogContent className="bg-background border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Ban User
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to ban {selectedUser?.profile?.full_name || 'this user'}?
              This will prevent them from accessing the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm text-secondary-foreground mb-2">
              Reason for ban (required)
            </label>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Enter the reason for banning this user..."
              className="w-full p-3 rounded-xl bg-secondary/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setBanModalOpen(false);
                setBanReason("");
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBanUser}
              disabled={!banReason.trim()}
            >
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
