export type DreamAnalysis = {
  mood: string;
  symbols: string[];
  themes: string[];
  lucidity: string;
  reflection: string;
};

export type Dream = {
  id: string;
  title: string;
  dream: string;
  date: string;
  favorite: boolean;
  tags: string[];
  analysis?: DreamAnalysis | null;
};