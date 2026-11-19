import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import Download from "../components/download";
import Faq from "../components/faq";
import Features from "../components/features";
import Hero from "../components/hero";
import Intro from "../components/intro";
import Journal from "../components/journal";
import Moments from "../components/moments";
import Payments from "../components/payments";
import Process from "../components/process";
import TravelStory from "../components/story";
import { useLanguage } from "../hooks/useLanguage";
import { useReveal } from "../hooks/useReveal";
import { useScrollScenes } from "../hooks/useScrollScenes";
import { navigationActions } from "../store/navigation-slice";

const Home: NextPage = () => {
  const { locale } = useLanguage();
  const dispatch = useDispatch();

  useReveal([locale]);
  useScrollScenes({
    onNavChange: (href) => dispatch(navigationActions.setActiveHref(href)),
    deps: [locale, dispatch],
  });

  return (
    <>
      <Hero />
      <Intro />
      <Moments />
      <Features />
      <Process />
      <Payments />
      <TravelStory />
      <Journal />
      <Faq />
      <Download />
    </>
  );
};

export default Home;
