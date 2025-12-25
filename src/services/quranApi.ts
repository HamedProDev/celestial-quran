// Quran.com API for text and translations
// AlQuran.cloud API for audio recitations

const QURAN_API_BASE = 'https://api.quran.com/api/v4';
const AUDIO_API_BASE = 'https://api.alquran.cloud/v1';

export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  text_imlaei?: string;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
  sajdah_type: string | null;
  page_number: number;
  translations?: {
    id: number;
    resource_id: number;
    text: string;
  }[];
}

export interface Reciter {
  id: number;
  reciter_name: string;
  style: string | null;
  translated_name: {
    name: string;
    language_name: string;
  };
}

// Fetch all surahs
export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/chapters`);
    const data = await response.json();
    return data.chapters || [];
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
};

// Fetch a specific surah with verses
export const fetchSurah = async (surahId: number, translationId: number = 131): Promise<{ surah: Surah; verses: Verse[] }> => {
  try {
    const [surahRes, versesRes] = await Promise.all([
      fetch(`${QURAN_API_BASE}/chapters/${surahId}`),
      fetch(`${QURAN_API_BASE}/verses/by_chapter/${surahId}?translations=${translationId}&fields=text_uthmani&per_page=286`)
    ]);
    
    const surahData = await surahRes.json();
    const versesData = await versesRes.json();
    
    return {
      surah: surahData.chapter,
      verses: versesData.verses || []
    };
  } catch (error) {
    console.error('Error fetching surah:', error);
    throw error;
  }
};

// Fetch a specific verse
export const fetchVerse = async (surahId: number, verseNumber: number, translationId: number = 131): Promise<Verse> => {
  try {
    const response = await fetch(
      `${QURAN_API_BASE}/verses/by_key/${surahId}:${verseNumber}?translations=${translationId}&fields=text_uthmani`
    );
    const data = await response.json();
    return data.verse;
  } catch (error) {
    console.error('Error fetching verse:', error);
    throw error;
  }
};

// Search Quran
export const searchQuran = async (query: string, translationId: number = 131): Promise<any[]> => {
  try {
    const response = await fetch(
      `${QURAN_API_BASE}/search?q=${encodeURIComponent(query)}&size=20&translations=${translationId}`
    );
    const data = await response.json();
    return data.search?.results || [];
  } catch (error) {
    console.error('Error searching Quran:', error);
    throw error;
  }
};

// Fetch tafsir for a verse
export const fetchTafsir = async (surahId: number, verseNumber: number, tafsirId: number = 169): Promise<any> => {
  try {
    const response = await fetch(
      `${QURAN_API_BASE}/tafsirs/${tafsirId}/by_ayah/${surahId}:${verseNumber}`
    );
    const data = await response.json();
    return data.tafsir;
  } catch (error) {
    console.error('Error fetching tafsir:', error);
    throw error;
  }
};

// Fetch available reciters
export const fetchReciters = async (): Promise<Reciter[]> => {
  try {
    const response = await fetch(`${QURAN_API_BASE}/resources/recitations`);
    const data = await response.json();
    return data.recitations || [];
  } catch (error) {
    console.error('Error fetching reciters:', error);
    throw error;
  }
};

// Get audio URL for a verse (using AlQuran.cloud API)
export const getAudioUrl = (surahNumber: number, verseNumber: number, reciter: string = 'ar.alafasy'): string => {
  return `${AUDIO_API_BASE}/ayah/${surahNumber}:${verseNumber}/${reciter}`;
};

// Fetch audio for a verse
export const fetchVerseAudio = async (surahNumber: number, verseNumber: number, reciter: string = 'ar.alafasy'): Promise<string> => {
  try {
    const response = await fetch(getAudioUrl(surahNumber, verseNumber, reciter));
    const data = await response.json();
    return data.data?.audio || '';
  } catch (error) {
    console.error('Error fetching audio:', error);
    throw error;
  }
};

// Fetch audio for entire surah
export const fetchSurahAudio = async (surahNumber: number, reciter: string = 'ar.alafasy'): Promise<string[]> => {
  try {
    const response = await fetch(`${AUDIO_API_BASE}/surah/${surahNumber}/${reciter}`);
    const data = await response.json();
    return data.data?.ayahs?.map((ayah: any) => ayah.audio) || [];
  } catch (error) {
    console.error('Error fetching surah audio:', error);
    throw error;
  }
};

// Get list of available audio reciters from AlQuran.cloud
export const fetchAudioReciters = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${AUDIO_API_BASE}/edition/format/audio`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching audio reciters:', error);
    throw error;
  }
};
