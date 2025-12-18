// types/substance.ts

/** YYYY-MM-DD を想定（厳密バリデーションは別途Zod等で） */
export type ISODateString = string;

export type LegalStatusJP =
  | "麻薬"
  | "指定薬物"
  | "向精神薬"
  | "覚醒剤"
  | "毒物"
  | "劇物"
  | "その他"
  | "不明";

/**
 * カテゴリは増えやすいので、既知のもの＋拡張可能にしておく
 * 例: "psychedelic", "dissociative", "opioid", "depressant" などを後で足せる
 */
export type SubstanceCategory =
  | "エンタクトジェン"
  | "中枢神経刺激薬"
  | "サイケデリック"
  | "鎮静剤"
  | "解離性麻酔薬"
  | "せん妄誘発性物質"
  | "カンナビノイド"
  | "オピオイド"
  | (string & {}); // ←未知カテゴリも許可（型を壊さない）

export interface LocalizedName {
  ja: string;
  en?: string;
}

export interface ExternalResourceItem {
  label: string;
  url: string;
  /** 例: 「※個人の主観的体験談が含まれます」 */
  note?: string;
}

/**
 * experiences / dosage_duration 以外も増やせる設計
 * 例: pubchem, wikipedia, psychonautwiki, papers など
 */
export interface ExternalResources {
  experiences?: ExternalResourceItem;
  dosage_duration?: ExternalResourceItem;
  [key: string]: ExternalResourceItem | undefined;
}

export interface SubstanceLegalJP {
  status: LegalStatusJP;
  lastReviewed: ISODateString;
  /** 補足（任意）: 例「告示〜」など */
  notes?: string;
}

export interface SubstanceLegal {
  jp?: SubstanceLegalJP;
}

export interface Substance {
  /** URLスラッグと一致推奨: /substances/mdma */
  id: string;

  name: LocalizedName;

  iupac_name?: string;

  aliases?: string[];

  pubchem_cid?: number;

  categories?: SubstanceCategory[];

  legal?: SubstanceLegal;

  summary?: string;

  warnings?: string[];

  effects?: string[];

  external_resources?: ExternalResources;
}
