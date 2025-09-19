import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProblemSolution from "@/components/ProblemSolution";
import MockupsShowcase from "@/components/MockupsShowcase";
import AuthButtons from "@/components/AuthButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ProblemSolution />
      <Features />
      <MockupsShowcase />
      <AuthButtons />
    </div>
  );
};

export default Index;