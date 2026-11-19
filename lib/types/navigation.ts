export interface INavLink {
  href: string;
  title: string;
  sub?: string;
}

export interface INavigationState {
  activeHref: string;
}

export interface INavigationRootState {
  navigation: INavigationState;
}
