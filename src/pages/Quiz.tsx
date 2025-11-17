'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

// --- NOSSOS NOVOS IMPORTS ---
import { quizScript, type QuizQuestion } from '@/lib/quizScript';
import ChatBubble from '@/components/ChatBubble';
// ---

import { Header } from '@/components/Header';
import { GlowButton } from '@/components/ui/glow-button';
import { TiliMascot, type TiliMood } from "@/components/TiliMascot"; // 1. TiliMood IMPORTADO
import { GlowCard } from "@/components/ui/glow-card"; // 2. GlowCard IMPORTADO
import { Sparkles, Target, Brain } from "lucide-react"; // Ícones

// --- Nossas interfaces e helpers ---
interface Message {
  sender: 'tili' | 'user';
  text: string;
}
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
// ---

// 3. TIPO 'TiliReaction' CORRIGIDO
type TiliReaction = {
  mood: TiliMood;
  message?: string;
  showParticles?: boolean;
};

const Quiz = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const hasInitiated = useRef(false);

  // --- Estados do Chat (do nosso chat antigo) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [profile, setProfile] = useState<string>(""); // 4. Estado 'profile' ADICIONADO

  // --- Estado do NOVO Mascote ---
  const [tiliReaction, setTiliReaction] = useState<TiliReaction>({
    mood: "neutral",
    showParticles: false
  });

  // --- Funções de Lógica do Chat (do nosso chat antigo) ---

  const addTiliMessage = useCallback(async (text: string) => {
    setTiliReaction({ mood: "thinking", showParticles: true });
    setMessages((prev) => [...prev, { sender: 'tili', text }]);

    const typingDuration = text.length * 40;
    await sleep(typingDuration);

    setTiliReaction({ mood: "neutral", showParticles: false });
    await sleep(500);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    setIsSaving(true);
    setTiliReaction({ mood: "thinking", message: "Calculando..." });

    let perfil = 'A Curiosa';
    if (answers.q_conforto_tech === '5') perfil = 'A Técnica';
    else if (answers.q_conforto_tech === '3') perfil = 'A Entusiasta';

    setProfile(perfil); // 5. Salva o perfil no estado local

    const { error } = await supabase
      .from('profiles')
      .update({
        respostas_quiz: answers,
        perfil_gerado: perfil,
      })
      .eq('id', user.id);

    setIsSaving(false);

    if (error) {
      await addTiliMessage('Opa, tive um probleminha para salvar seu perfil. 😥 Tente recarregar a página.');
    } else {
      await addTiliMessage(`Perfeito! Descobri que você é ${perfil}! Vou preparar uma trilha especial para você. ✨`);
      setTiliReaction({ mood: "celebrating", message: "Sua jornada começa agora! 🚀", showParticles: true });

      setTimeout(() => {
        navigate("/"); // TODO: Mudar para a página da AULA
      }, 3000);
    }
    // 6. DEPENDÊNCIA CORRIGIDA: 'router' -> 'navigate'
  }, [user, answers, navigate, addTiliMessage]);

  const askQuestion = useCallback(async (index: number) => {
    if (index < quizScript.length) {
      const text = quizScript[index].texto;
      await addTiliMessage(text);

      setCurrentQuestionIndex(index);
      setShowOptions(true);
    } else {
      setShowOptions(false);
      await handleSubmit();
    }
  }, [addTiliMessage, handleSubmit]);

  const handleUserAnswer = useCallback((question: QuizQuestion, option: { texto: string; valor: string }) => {
    setShowOptions(false);
    setMessages((prev) => [...prev, { sender: 'user', text: option.texto }]);
    setAnswers((prev) => ({
      ...prev,
      [question.id]: option.valor,
    }));

    setTiliReaction({ mood: "happy", showParticles: true });

    setTimeout(() => {
      askQuestion(currentQuestionIndex + 1);
    }, 1000);
  }, [askQuestion, currentQuestionIndex]);

  // --- useEffect de Inicialização (do nosso chat antigo) ---
  useEffect(() => {
    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        await sleep(500);
        await addTiliMessage('Oi! Eu sou a Tili, sua guia-vaga-lume!');
        await addTiliMessage('Minha missão é te guiar pela TrilhIA, uma plataforma de aprendizado 100% adaptada pra você.');
        await addTiliMessage('Pra começar, preciso te conhecer um pouquinho...');
        await askQuestion(0);

      } else {
        navigate('/login');
      }
    };

    if (hasInitiated.current === false) {
      hasInitiated.current = true;
      initChat();
    }
    // 7. DEPENDÊNCIA CORRIGIDA: 'router' -> 'navigate'
  }, [navigate, addTiliMessage, askQuestion]);

  // --- O JSX (Renderização) ---
  const currentQuestion = quizScript[currentQuestionIndex];

  // --- getProfileIcon (do novo modelo) ---
  const getProfileIcon = () => {
    switch (profile) {
      case "A Curiosa":
        return Sparkles;
      case "A Entusiasta":
        return Target;
      case "A Técnica":
        return Brain;
      default:
        return Sparkles;
    }
  };
  const ProfileIcon = getProfileIcon();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-12 particle-bg">
        <div className="container mx-auto max-w-3xl flex-1 flex flex-col">

          {/* Tili (topo) */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-6">
              <TiliMascot
                mood={tiliReaction.mood}
                message={tiliReaction.message}
                showParticles={tiliReaction.showParticles}
                size="lg"
              />
            </div>
          </div>

          {/* Chat Container (meio, com scroll) */}
          <div className="flex-1 space-y-4 mb-6">
            {messages.map((message, index) => (
              <ChatBubble key={index} sender={message.sender} message={message.text} />
            ))}

            {/* Mensagem de Salvando... */}
            {isSaving && (
              <div className="text-center">
                <TiliMascot mood="thinking" message="Salvando seu perfil..." size="sm" />
                <p className="text-lg text-primary animate-pulse">Calculando sua trilha...</p>
              </div>
            )}
          </div>

          {/* Opções (baixo, fixo) */}
          <div className="w-full space-y-3 p-4">
            {showOptions && currentQuestion && (
              <div className="flex flex-col gap-2">
                {currentQuestion.opcoes.map((option, optIndex) => (
                  <GlowButton
                    key={optIndex}
                    variant="outline"
                    onClick={() => handleUserAnswer(currentQuestion, option)}
                    className="justify-start"
                  >
                    {option.texto}
                  </GlowButton>
                ))}
              </div>
            )}
          </div>

          {/* 8. CORREÇÃO: 'currentStep' -> 'currentQuestionIndex' e 'quizFlow.length' -> 'quizScript.length' */}
          {currentQuestionIndex >= quizScript.length && profile && !isSaving && (
            <GlowCard className="text-center">
              <div className="flex justify-center mb-6">
                <TiliMascot
                  mood="celebrating"
                  message="Você é incrível! 💫"
                  showParticles={true}
                  size="lg"
                />
              </div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-primary animate-pulse">
                <ProfileIcon className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Você é {profile}!</h2>
              <p className="text-muted-foreground mb-6">
                Sua trilha personalizada está pronta para começar
              </p>
              <GlowButton size="lg" onClick={() => navigate("/")}>
                Iniciar Trilha
              </GlowButton>
            </GlowCard>
          )}

        </div>
      </main>
    </div>
  );
};

export default Quiz;