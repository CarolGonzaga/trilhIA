// src/pages/Dashboard.tsx
import { Link } from "react-router-dom"; // Importe o Link
import { Header } from "@/components/Header";
import { TiliMascot } from "@/components/TiliMascot";
import { GlowButton } from "@/components/ui/glow-button";

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center 
                       px-4 pt-24 pb-12 particle-bg text-center">

                <TiliMascot mood="excited" size="lg" showParticles={true} />

                <h1 className="text-4xl font-bold text-white mt-8 mb-4">
                    Boas-vindas à TrilhIA!
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg mb-10">
                    Sua jornada personalizada está quase pronta. O próximo passo
                    é conversar com a Tili para que ela possa entender seu perfil.
                </p>

                {/* Este <Link> é o componente correto do react-router-dom */}
                <Link to="/quiz">
                    <GlowButton size="lg" variant="primary">
                        Iniciar Quiz com a Tili
                    </GlowButton>
                </Link>

            </main>
        </div>
    );
};
export default Dashboard;
