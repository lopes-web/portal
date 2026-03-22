export const defaultClients = [
  {
    id: "studio-aurora",
    name: "Studio Aurora",
    summary: "Portal individual para aprender a operar o site institucional com autonomia.",
    projectType: "Site institucional",
    supportChannel: "WhatsApp + Email",
    accessMode: "Area privada por cliente",
    updatedAt: "22 mar 2026",
    heroTitle: "Seu cliente entra e sabe exatamente o que fazer primeiro.",
    heroCopy: "Experiencia pensada para reduzir atrito: progresso visivel, proximos passos claros e videos curtos gravados especificamente para o projeto.",
    timeline: [
      {
        title: "Primeiros passos no painel",
        copy: "Explica onde editar textos, imagens e como evitar mudancas fora do escopo.",
        state: "Iniciar"
      },
      {
        title: "Publicacao segura",
        copy: "Mostra o fluxo ideal para revisar alteracoes e publicar sem medo.",
        state: "Em andamento"
      },
      {
        title: "Rotina mensal",
        copy: "Checklist simples para manter o site sempre atualizado.",
        state: "Pendente"
      }
    ],
    tutorials: [
      {
        id: "aurora-home",
        title: "Como atualizar o texto principal da home",
        description: "Aula curta para o cliente editar titulos, chamadas e blocos institucionais sem quebrar o layout.",
        duration: "5 min",
        category: "Conteudo",
        status: "Em andamento",
        progress: 72,
        videoUrl: "",
        storage: "none"
      },
      {
        id: "aurora-images",
        title: "Substituindo imagens corretamente",
        description: "Padrao de proporcao, peso e recorte para manter o site consistente no desktop e mobile.",
        duration: "6 min",
        category: "Midia",
        status: "Pronto para assistir",
        progress: 45,
        videoUrl: "",
        storage: "none"
      },
      {
        id: "aurora-publish",
        title: "Publicando e revisando alteracoes",
        description: "Passo a passo com checklist final antes de subir qualquer mudanca para producao.",
        duration: "7 min",
        category: "Operacao",
        status: "Pendente",
        progress: 0,
        videoUrl: "",
        storage: "none"
      }
    ],
    accesses: [
      {
        id: "aurora-wordpress",
        label: "WordPress principal",
        type: "WordPress",
        url: "https://studioaurora.com/wp-admin",
        username: "admin@studioaurora.com",
        password: "Aurora-2026!",
        notes: "Login principal do CMS. Verificar 2FA no e-mail institucional."
      },
      {
        id: "aurora-hosting",
        label: "Painel da hospedagem",
        type: "Hosting",
        url: "https://painel.hosting.com",
        username: "financeiro@studioaurora.com",
        password: "Hospedagem#2026",
        notes: "Conta com acesso a DNS, banco e backups."
      }
    ],
    resources: [
      {
        label: "Figma do projeto",
        body: "Acesso ao layout aprovado para consultar estrutura, fluxo e referencias visuais.",
        link: "#"
      },
      {
        label: "Guia rapido de imagens",
        body: "Resumo com tamanhos, formatos e nomes recomendados para novos uploads.",
        link: "#"
      },
      {
        label: "Canal de suporte",
        body: "Contato dedicado para ajustes, duvidas e evolucoes futuras do site institucional.",
        link: "#"
      }
    ],
    faq: [
      {
        category: "Conteudo",
        question: "Posso editar qualquer texto do site sem risco?",
        answer: "Pode editar os campos previstos no CMS. O portal indica claramente quais areas sao seguras e quais precisam de suporte."
      },
      {
        category: "Midia",
        question: "Qual o tamanho ideal das imagens?",
        answer: "O tutorial orienta proporcao, peso e formato. Isso ajuda o cliente a manter qualidade sem prejudicar a performance."
      },
      {
        category: "Suporte",
        question: "Se eu travar em algum passo, o que acontece?",
        answer: "O hub centraliza ajuda: FAQ, materiais extras e um CTA de suporte para acelerar qualquer bloqueio."
      }
    ]
  },
  {
    id: "atelier-norte",
    name: "Atelier Norte",
    summary: "Area privada com tutoriais para atualizar portfolio, formularios e informacoes institucionais.",
    projectType: "Portfolio comercial",
    supportChannel: "Email + Loom",
    accessMode: "Area privada por cliente",
    updatedAt: "22 mar 2026",
    heroTitle: "Um portal sob medida para o cliente operar o projeto com seguranca.",
    heroCopy: "Tudo organizado em trilhas curtas, com progresso visivel e uma experiencia premium em preto e branco.",
    timeline: [
      {
        title: "Tour inicial do painel",
        copy: "Entendimento rapido da estrutura principal e dos blocos que podem ser alterados.",
        state: "Concluido"
      },
      {
        title: "Atualizacao do portfolio",
        copy: "Tutorial para incluir novos projetos sem mexer na base do layout.",
        state: "Em andamento"
      },
      {
        title: "Leads e formularios",
        copy: "Leitura simples das captacoes e dos pontos de resposta do site.",
        state: "Pendente"
      }
    ],
    tutorials: [
      {
        id: "norte-portfolio",
        title: "Como cadastrar um novo case no portfolio",
        description: "Fluxo completo para criar item, subir imagens e manter a identidade visual.",
        duration: "8 min",
        category: "Portfolio",
        status: "Pronto para assistir",
        progress: 25,
        videoUrl: "",
        storage: "none"
      }
    ],
    accesses: [
      {
        id: "norte-dominio",
        label: "Painel de dominio",
        type: "Dominio",
        url: "https://domains.com/login",
        username: "contato@ateliernorte.com",
        password: "Dominio-Norte",
        notes: "Usado para DNS, renovacao e redirecionamentos."
      }
    ],
    resources: [
      {
        label: "Biblioteca de assets",
        body: "Pasta central com logos, mockups e imagens finais do cliente.",
        link: "#"
      },
      {
        label: "Checklist de publicacao",
        body: "Resumo objetivo para revisar textos, imagens e links antes de publicar.",
        link: "#"
      },
      {
        label: "Canal de suporte",
        body: "Contato privado para eventuais ajustes de interface ou comportamento.",
        link: "#"
      }
    ],
    faq: [
      {
        category: "Portfolio",
        question: "Posso subir quantos cases quiser?",
        answer: "Sim, desde que siga o padrao de tamanho e ordem demonstrado no tutorial."
      },
      {
        category: "Suporte",
        question: "O que fazer se o layout quebrar apos uma alteracao?",
        answer: "Volte ao ultimo campo editado e compare com o tutorial. Se persistir, use o canal de suporte."
      }
    ]
  }
];
