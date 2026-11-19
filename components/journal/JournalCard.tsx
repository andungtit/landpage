import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IJournal } from "../../lib/types/content";
import { externalHref } from "../../utilities/externalHref";
import Icon from "../UI/Icon";

interface Props {
  journal: IJournal;
}

const JournalCard: React.FC<Props> = ({ journal }) => {
  const { t, locale } = useLanguage();
  return (
    <a
      className="journal-card reveal"
      href={externalHref(journal.href, locale)}
    >
      <div className="image-wrap">
        <img src={journal.img} alt={t[journal.alt]} loading="lazy" />
      </div>
      <span className="card-number">{t[journal.number]}</span>
      <h3>{t[journal.title]}</h3>
      <span className="journal-link">
        {t[journal.link]} <Icon name="arrow" />
      </span>
    </a>
  );
};

export default JournalCard;
