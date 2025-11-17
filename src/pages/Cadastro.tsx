// src/pages/Cadastro.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; // Nosso cliente Supabase
import { Header } from "@/components/Header";
import { GlowButton } from "@/components/ui/glow-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator"; // Para a linha "OU"
import { FcGoogle } from "react-icons/fc"; // Ícone do Google

const Cadastro = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para Login com Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) {
      alert("Erro ao logar com Google: " + error.message);
      setLoading(false);
    }
  };

  // Função para Login com Email/Senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      alert("Erro no cadastro: " + error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 particle-bg">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img
              src="/tili-ociosa.gif" // Use sua imagem da pasta /public
              alt="Tili mascot"
              className="w-24 h-24 float-animation"
            />
          </div>
          <div className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl p-8 glow-primary shadow-2xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2">Vamos começar!</h1>
              <p className="text-muted-foreground">Vamos começar essa jornada brilhante!</p>
            </div>

            {/* O "OU" e o Google vêm primeiro */}
            <div className="space-y-4">
              <GlowButton variant="outline" size="lg" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                <FcGoogle className="mr-2 h-5 w-5" />
                Continuar com o Google
              </GlowButton>
              <div className="relative my-4">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 top-[-12px] bg-card px-2 text-sm text-muted-foreground">
                  OU
                </span>
              </div>
            </div>

            {/* O formulário de email/senha */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name" type="text" placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email" type="email" placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password" type="password" placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword" type="password" placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl h-12"
                  required
                />
              </div>

              <GlowButton type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? "Criando..." : "Criar Conta com Email"}
              </GlowButton>

              <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Fazer login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cadastro;