import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroAnimation } from "@/components/hero-animation";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      <HeroAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            tech fest sample
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground font-body">
            Experience the power of a single page. Captivate your audience with stunning animations and a clear, compelling call to action. It's simplicity, elevated.
          </p>
        </div>
        <Button size="lg" className="group shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow duration-300">
          Learn More
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
       <footer className="absolute bottom-4 text-center w-full z-10">
        <p className="text-sm text-muted-foreground">
          built by a engineering student
        </p>
      </footer>
    </main>
  );
}
