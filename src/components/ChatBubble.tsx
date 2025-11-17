// components/ChatBubble.tsx
'use client';

import { useTypewriter } from '@/lib/useTypewriter';
import { memo } from 'react'; // 1. IMPORTE O 'memo' DO REACT
import { TiliMascot } from './TiliMascot'; // Importe a Tili

interface ChatBubbleProps {
    sender: 'tili' | 'user';
    message: string;
}

// 2. Criamos o componente de conteúdo
// (Esta é a mesma lógica que você já tinha)
const ChatBubbleContent = ({ sender, message }: ChatBubbleProps) => {
    const isTili = sender === "tili";

    // Evita chamar o hook com undefined
    const safeMessage = typeof message === "string" ? message : "";

    // Chamamos sempre o hook, mas damos a ele mensagem vazia quando ainda não existe
    const typedMessage = useTypewriter(safeMessage);

    // Agora decidimos o que exibir
    let displayText = message ?? "";
    if (isTili && safeMessage.length > 0) {
        displayText = typedMessage;
    }

    return (
        <div className={`flex w-full gap-3 ${isTili ? 'justify-start' : 'justify-end'}`}>
            {isTili && (
                <div className="flex-shrink-0">
                    <TiliMascot mood="neutral" size="sm" />
                </div>
            )}
            <div className={`flex flex-col gap-3 max-w-[80%]`}>
                <div
                    className={`rounded-2xl px-6 py-4 text-sm leading-relaxed ${isTili
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                        : 'bg-primary/20 border border-primary/30 ml-auto text-primary font-medium'
                        }`}
                >
                    {displayText}

                    {isTili && displayText.length < message.length && (
                        <span className="animate-pulse">|</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// 3. EXPORTAMOS A VERSÃO "MEMORIZADA"
// O React.memo diz ao React: "Não re-renderize este componente
// se as 'props' (sender, message) forem exatamente as mesmas da
// última renderização."
export default memo(ChatBubbleContent);