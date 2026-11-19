import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IJournal } from "../../lib/types/content";
import { journals } from "../../mock/journals";
import { externalHref } from "../../utilities/externalHref";
import Icon from "../UI/Icon";
import WordReveal from "../UI/WordReveal";
import JournalCard from "./JournalCard";

const Journal = () => {
  const { t, locale } = useLanguage();
  return (
    <section
      className="journal section-pad"
      id="journal"
      aria-labelledby="journal-title"
    >
      <div className="section-heading reveal">
        <div>
          <span className="eyebrow">{t.journalEyebrow}</span>
          <WordReveal id="journal-title" text={t.journalTitle} />
        </div>
        <a className="text-link" href={externalHref("/journal/", locale)}>
          {t.journalAll} <Icon name="arrow" />
        </a>
      </div>
      <div className="journal-grid">
        {(journals as IJournal[]).map((journal) => (
          <JournalCard key={journal.href} journal={journal} />
        ))}
      </div>
    </section>
  );
};

export default Journal;
