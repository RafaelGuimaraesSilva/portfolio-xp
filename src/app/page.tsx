import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <About />
      <Contact />
    </main>
  );
}
