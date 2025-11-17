import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background-alt/50 backdrop-blur-sm py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm text-center">
            TrilhIA — Aprenda com propósito, explore com curiosidade.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
