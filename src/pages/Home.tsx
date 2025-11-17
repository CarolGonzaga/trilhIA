import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlowButton } from "@/components/ui/glow-button";
import { GlowCard } from "@/components/ui/glow-card";
import heroImage from "@/assets/hero-illustration.png";
import { Sparkles, ChartNoAxesCombined, Gamepad2, Bot, Lightbulb, Flame, Settings } from "lucide-react";

const Home = () => {
  const profiles = [
    {
      title: "A Curiosa",
      description: "Fundamentos, leveza e descoberta. Perfeito para quem está começando.",
      icon: Lightbulb,
    },
    {
      title: "A Entusiasta",
      description: "Já tem base e quer aprofundar seus conhecimentos.",
      icon: Flame,
    },
    {
      title: "A Técnica",
      description: "Desenvolvedoras que querem avançar ao próximo nível.",
      icon: Settings,
    },
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: "Aprendizagem Interativa",
      description: "Conteúdo dinâmico que se adapta ao seu ritmo",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Caminhos Personalizados",
      description: "Trilhas feitas sob medida para seu perfil",
    },
    {
      icon: Gamepad2,
      title: "Gamificação Divertida",
      description: "Aprenda jogando e conquiste recompensas",
    },
    {
      icon: Bot,
      title: "IA Adaptativa",
      description: "Tili te guia com inteligência artificial",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative particle-bg pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 glow-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">Aprenda IA do seu jeito</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Aprenda Inteligência Artificial{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  no seu ritmo
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Uma jornada gamificada guiada pela Tili, sua companheira luminosa de aprendizado.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/cadastro">
                  <GlowButton size="lg" variant="primary">
                    Começar Agora
                  </GlowButton>
                </Link>
                <Link to="/login">
                  <GlowButton size="lg" variant="outline">
                    Já tenho conta
                  </GlowButton>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Estudante aprendendo com a Tili"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Qual é o seu{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                perfil de aprendizagem?
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Descubra o caminho perfeito para sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {profiles.map((profile, index) => (
              <GlowCard key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                  <profile.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{profile.title}</h3>
                <p className="text-muted-foreground">{profile.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-background-alt/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Por que escolher a{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TrilhIA?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
