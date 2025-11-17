// src/components/Header.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; // 1. IMPORTE O SUPABASE
import type { User } from "@supabase/supabase-js"; // 2. IMPORTE O TIPO User
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null); // 3. ESTADO DO USUÁRIO
  const navigate = useNavigate();

  // 4. VERIFICA O USUÁRIO QUANDO O HEADER CARREGA
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Pega a sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 5. FUNÇÃO DE LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/"); // Manda para a Home após o logout
  };

  // 6. Pega a primeira letra do email para o Avatar
  const getAvatarFallback = () => {
    return user?.email ? user.email[0].toUpperCase() : "U";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TrilhIA
          </span>
        </Link>

        {/* ========================================================== */}
        {/* 7. LÓGICA CONDICIONAL: LOGADO VS. DESLOGADO */}
        {/* ========================================================== */}

        {/* --- MENU MOBILE --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card/95 backdrop-blur-xl border-border/50">
              <nav className="flex flex-col gap-4 mt-8">
                {user ? (
                  // LOGADO (Mobile)
                  <>
                    <span className="text-lg text-muted-foreground px-4">
                      {user.email}
                    </span>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-lg">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sair
                    </Button>
                  </>
                ) : (
                  // DESLOGADO (Mobile)
                  <>
                    <Link to="/" className="text-lg hover:text-primary transition-colors">Início</Link>
                    <Link to="/login" className="text-lg hover:text-primary transition-colors">Login</Link>
                    <Link to="/cadastro" className="text-lg hover:text-primary transition-colors">Cadastro</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* --- MENU DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            // LOGADO (Desktop)
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getAvatarFallback()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Logado como</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // DESLOGADO (Desktop)
            <>
              <Link to="/" className="text-sm hover:text-primary transition-colors">Início</Link>
              <Link to="/login" className="text-sm hover:text-primary transition-colors">Login</Link>
              <Link to="/cadastro" className="text-sm hover:text-primary transition-colors">Cadastro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};