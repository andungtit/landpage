import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { IMobileMenuRootState } from "../../lib/types/mobileMenu";
import { INavLink } from "../../lib/types/navigation";
import { navLinks } from "../../mock/navLinks";
import { mobileMenuActions } from "../../store/mobileMenu-slice";
import { setInert } from "../../utilities/inert";
import Language from "./language/Language";

const MobileMenu = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: IMobileMenuRootState) => state.mobileMenu.isOpen
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInert(menuRef.current, !isOpen);
  }, [isOpen]);

  const closeMenu = () => dispatch(mobileMenuActions.closeMenu());

  return (
    <div
      ref={menuRef}
      className={`mobile-menu${isOpen ? " open" : ""}`}
      id="mobile-menu"
    >
      {(navLinks as INavLink[]).map((link) => (
        <a key={link.href} href={link.href} onClick={closeMenu}>
          {t[link.title]}
          {link.sub && (
            <>
              {" "}
              <small>{t[link.sub]}</small>
            </>
          )}
        </a>
      ))}
      <Language variant="mobile" onClick={closeMenu} />
    </div>
  );
};

export default MobileMenu;
