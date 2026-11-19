import React from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { INavigationRootState, INavLink } from "../../lib/types/navigation";
import { navLinks } from "../../mock/navLinks";

const NavLinks = () => {
  const { t } = useLanguage();
  const activeHref = useSelector(
    (state: INavigationRootState) => state.navigation.activeHref
  );

  return (
    <div className="nav-links">
      {(navLinks as INavLink[]).map((link) => {
        const active = activeHref === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            className={active ? "active" : undefined}
            aria-current={active ? "location" : undefined}
          >
            {t[link.title]}
          </a>
        );
      })}
    </div>
  );
};

export default NavLinks;
