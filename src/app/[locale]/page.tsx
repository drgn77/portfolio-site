import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { TechStack } from "@/components/sections/TechStack";
import { Websites } from "@/components/sections/Websites";
import { Contact } from "@/components/sections/Contact";
import { FadeIn } from "@/components/ui/FadeIn";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Required for static rendering with next-intl
  setRequestLocale(locale);

  return (
    // padding-top offsets the fixed navbar height (~60px)
    <main className="flex flex-col flex-1" style={{ paddingTop: "60px" }}>
      <Hero />

      <div id="about">
        <FadeIn>
          <About />
        </FadeIn>
      </div>

      <div id="projects">
        <FadeIn>
          <Projects />
        </FadeIn>
      </div>

      <FadeIn>
        <Certificates />
      </FadeIn>

      <div id="stack">
        <FadeIn>
          <TechStack />
        </FadeIn>
      </div>

      <div id="sites">
        <FadeIn>
          <Websites />
        </FadeIn>
      </div>

      <div id="contact">
        <FadeIn>
          <Contact />
        </FadeIn>
      </div>
    </main>
  );
}
