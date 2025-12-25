import { supabase } from '@/integrations/supabase/client';

export interface Bookmark {
  id: string;
  surah_number: number;
  verse_number: number;
  surah_name?: string;
  verse_text?: string;
  created_at: string;
}

export interface Note {
  id: string;
  surah_number: number;
  verse_number: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ReadingProgress {
  id: string;
  current_surah: number;
  current_verse: number;
  completion_percentage: number;
  last_read_at: string;
}

// Bookmarks
export const addBookmark = async (surahNumber: number, verseNumber: number, surahName?: string, verseText?: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: user.id,
      surah_number: surahNumber,
      verse_number: verseNumber,
      surah_name: surahName,
      verse_text: verseText
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeBookmark = async (bookmarkId: string) => {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId);

  if (error) throw error;
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const isBookmarked = async (surahNumber: number, verseNumber: number): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('surah_number', surahNumber)
    .eq('verse_number', verseNumber)
    .maybeSingle();

  if (error) return false;
  return !!data;
};

// Notes
export const addNote = async (surahNumber: number, verseNumber: number, content: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('notes')
    .insert({
      user_id: user.id,
      surah_number: surahNumber,
      verse_number: verseNumber,
      content
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateNote = async (noteId: string, content: string) => {
  const { data, error } = await supabase
    .from('notes')
    .update({ content })
    .eq('id', noteId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteNote = async (noteId: string) => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  if (error) throw error;
};

export const getNotes = async (): Promise<Note[]> => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getVerseNotes = async (surahNumber: number, verseNumber: number): Promise<Note[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id)
    .eq('surah_number', surahNumber)
    .eq('verse_number', verseNumber)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
};

// Reading Progress
export const updateReadingProgress = async (currentSurah: number, currentVerse: number, completionPercentage: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('reading_progress')
    .upsert({
      user_id: user.id,
      current_surah: currentSurah,
      current_verse: currentVerse,
      completion_percentage: completionPercentage,
      last_read_at: new Date().toISOString()
    }, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getReadingProgress = async (): Promise<ReadingProgress | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('reading_progress')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return null;
  return data;
};

// Profile
export const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) return null;
  return data;
};

export const updateProfile = async (updates: { username?: string; full_name?: string; avatar_url?: string }) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
