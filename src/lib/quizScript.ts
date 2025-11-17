// src/lib/quizScript.ts
export interface QuizQuestion {
    id: string;
    texto: string;
    opcoes: {
        texto: string;
        valor: string;
    }[];
}

export const quizScript: QuizQuestion[] = [
    {
        id: "q_motivacao",
        texto: "E o que te trouxe aqui na TrilhIA? O que você mais quer?",
        opcoes: [
            { texto: "Aplicar no trabalho", valor: "trabalho" },
            { texto: "Criar projetos pessoais", valor: "projetos" },
            { texto: "Apenas por curiosidade!", valor: "curiosidade" },
        ],
    },
    {
        id: "q_conforto_tech",
        texto: "Legal! Em uma escala de 1 a 5, quão confortável você se sente com tecnologia no geral?",
        opcoes: [
            { texto: "1 (Socorro!)", valor: "1" },
            { texto: "2 (Me viro)", valor: "2" },
            { texto: "3 (Ajudo os amigos)", valor: "3" },
            { texto: "4 (Entendo de código)", valor: "4" },
            { texto: "5 (Trabalho com isso)", valor: "5" },
        ],
    },
    {
        id: "q_cenario",
        texto: "Cenário: Seu celular novo trava. O que você faz primeiro?",
        opcoes: [
            { texto: "Procuro um vídeo (YouTube)", valor: "visual" },
            { texto: "Leio o manual ou um fórum", valor: "texto" },
            { texto: "Saio apertando os botões", valor: "pratico" },
        ],
    },
    // ... Adicione o resto das suas 15 perguntas aqui
];
