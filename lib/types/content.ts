export interface IHeroCard {
  href: string;
  offset: number;
  tone: string;
  label: string;
  small: string;
  img: string;
  alt: string;
  foot: string;
  center?: boolean;
  payment?: boolean;
}

export interface IMoment {
  img: string;
  alt: string;
  number: string;
  title: string;
  text: string;
}

export interface IStep {
  img: string;
  number: string;
  title: string;
  text: string;
}

export interface IJournal {
  href: string;
  img: string;
  alt: string;
  number: string;
  title: string;
  link: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IFooterLink {
  href: string;
  title: string;
}
