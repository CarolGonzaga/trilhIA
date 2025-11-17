// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { TiliMascot } from './TiliMascot';
import type { Session } from '@supabase/supabase-js';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Verifica a sessão imediatamente
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setSession(session);
                setLoading(false);
            } else {
                // Se não houver sessão, ouvinte cuidará
            }
        });

        // 2. Ouve por mudanças (Login/Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session);
                setLoading(false);
            } else {
                setSession(null);
                setLoading(false);
                navigate('/login'); // Se não houver sessão, redireciona
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    // 3. Tela de Loading (Enquanto verifica o login)
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center particle-bg">
                <TiliMascot mood="thinking" size="lg" />
                <p className="text-lg text-primary animate-pulse mt-4">
                    Verificando sua sessão...
                </p>
            </div>
        );
    }

    // 4. Se não estiver carregando E tiver sessão, mostra a página
    return session ? children : null;
};