import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowDown } from "lucide-react";

import StarfieldBackground from "./StarfieldBackground";

const Hero = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);



  // --- Typewriter Effect ---
  useEffect(() => {
    const role = t.hero.roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % t.hero.roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, t.hero.roles]);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setRoleIndex(0);
  }, [t]);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <StarfieldBackground />

      {/* Main Content (Kept identical) */}
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">Portfolio</p>
        </div>

        <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 ${isVisible ? "animate-fade-up stagger-1" : "opacity-0"}`}>
          {t.hero.name}
        </h1>

        <div className={`h-10 mb-8 ${isVisible ? "animate-fade-up stagger-2" : "opacity-0"}`}>
          <span className="font-mono text-xl md:text-2xl text-primary">
            {displayText}
            <span className="animate-cursor text-primary">|</span>
          </span>
        </div>

        <p className={`font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed ${isVisible ? "animate-fade-up stagger-3" : "opacity-0"}`}>
          {t.hero.bio}
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? "animate-fade-up stagger-4" : "opacity-0"}`}>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.hero.cta1}
            <ArrowDown size={16} />
          </a>

        </div>
      </div>
    </section>
  );
};

export default Hero;