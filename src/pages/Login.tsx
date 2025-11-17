// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/Header";
import { GlowButton } from "@/components/ui/glow-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      alert("Erro no login: " + error.message);
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Que bom te ver de volta!</h1>
              <p className="text-muted-foreground">Entre para continuar sua jornada</p>
            </div>

            {/* Botão do Google e "OU" */}
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

            {/* Formulário de Email/Senha */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email" type="email" placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password" type="password" placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl h-12"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link to="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Esqueci minha senha
                </Link>
              </div>
              <GlowButton type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar com Email"}
              </GlowButton>
              <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link to="/cadastro" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Criar conta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;