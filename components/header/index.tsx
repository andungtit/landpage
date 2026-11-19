import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { IMobileMenuRootState } from "../../lib/types/mobileMenu";
import { mobileMenuActions } from "../../store/mobileMenu-slice";
import Icon from "../UI/Icon";
import Language from "./language/Language";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

const Header = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: IMobileMenuRootState) => state.mobileMenu.isOpen
  );
  const shellRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)");
    const close = () => dispatch(mobileMenuActions.closeMenu());
    const onDocClick = (event: MouseEvent) => {
      if (
        shellRef.current &&
        !shellRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        toggleRef.current?.getAttribute("aria-expanded") === "true"
      ) {
        close();
        toggleRef.current.focus();
      }
    };

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    mobile.addEventListener("change", close);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
      mobile.removeEventListener("change", close);
    };
  }, [dispatch]);

  return (
    <header className="nav-shell" ref={shellRef}>
      <nav className="nav" aria-label={t.mainNavigation}>
        <Logo />
        <NavLinks />
        <Language />
        <a className="nav-cta" href="#download">
          {t.getOnePlan}{" "}
          <span className="arrow-dot">
            <Icon name="arrow" />
          </span>
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-label={isOpen ? t.closeMenu : t.openMenu}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="mobile-menu"
          onClick={() => dispatch(mobileMenuActions.toggleMenu())}
        >
          <span></span>
          <span></span>
        </button>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;
