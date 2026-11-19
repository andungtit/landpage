export type FeatureKey = "save" | "market" | "plan" | "pay" | "split";

export interface IFeature {
  key: FeatureKey;
  id: string;
  icon: string; // emoji hoặc "scan" (svg)
  title: string;
  small?: string;
  text: string;
  tag?: string;
  eligibility?: string;
  link?: { href: string; label: string };
}

export interface IFeatureState {
  activeFeature: FeatureKey | null;
}

export interface IFeatureRootState {
  feature: IFeatureState;
}
