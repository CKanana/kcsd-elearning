export interface EbookPage {
  id: number;
  pageNumber: number;
  icon: string;
  title: string;
  childText?: string[];
  activityPrompt?: string[];
  interactiveElement?: string[];
  signNotes?: string[];
}

export interface EbookChapter {
  id: number;
  title: string;
  theme: string;
  goal: string;
  badge: string;
  summary: string[];
  pages: EbookPage[];
}

