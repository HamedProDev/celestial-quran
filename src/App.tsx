import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import MainLayout from "@/components/MainLayout";
import QuranReader from "@/pages/QuranReader";
import Explore from "@/pages/Explore";
import SearchPage from "@/pages/Search";
import BookmarksPage from "@/pages/Bookmarks";
import AudioPage from "@/pages/Audio";
import TafsirPage from "@/pages/Tafsir";
import SettingsPage from "@/pages/Settings";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<QuranReader />} />
        <Route path="/reader" element={<QuranReader />} />
        <Route path="/reader/:surahId" element={<QuranReader />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/audio" element={<AudioPage />} />
        <Route path="/tafsir" element={<TafsirPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
