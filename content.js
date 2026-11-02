/**
 * CONTENT.JS — Portfólio de Rafael Sacchetto
 * 
 * Este é o arquivo central de conteúdo do site.
 * Todos os textos, projetos, dados de contato e informações técnicas ficam aqui.
 * Para editar qualquer informação no futuro, basta alterar este arquivo.
 */

export const content = {
  // Metadados gerais do site e da transmissão "Canal 01"
  meta: {
    name: "Rafael Sacchetto",
    channel: "CANAL 01",
    role: "Estudante de TI & Entusiasta de Engenharia de Sistemas",
    location: "Campinas, SP",
    timezone: "America/Sao_Paulo",
    availableForWork: true,
    statusText: "DISPONÍVEL PARA OPORTUNIDADES"
  },

  // Cabeçalho fixo e navegação
  header: {
    brand: "RAFAEL SACCHETTO",
    signalBadge: "CANAL 01 // AO VIVO",
    nav: [
      { id: "sobre", label: "[01 SOBRE]" },
      { id: "projetos", label: "[02 PROJETOS]" },
      { id: "competencias", label: "[03 COMPETÊNCIAS]" },
      { id: "player", label: "[04 ÁUDIO]" },
      { id: "palestras", label: "[05 PALESTRAS]" },
      { id: "contato", label: "[06 CONTATO]" }
    ],
    clockPrefix: "CAMPINAS",
    themeToggleLabel: "P&B",
    soundToggleLabel: "SOM",
    langToggleLabel: "PT / EN"
  },

  // Hero / Transmissão Inicial
  hero: {
    signalCode: "FREQ: 101.9 MHz // TRANSMISSÃO 1950-DEV",
    tagline: "Estudante de TI com foco em Engenharia de Sistemas",
    subline: "Construindo bases sólidas em sistemas, lógica de programação, Linux e arquitetura.",
    asciiBadge: "[OBJETO 3D // FITA CASSETE EM TERMINAL ASCII]",
    // Faixa infinita de texto que corre no rodapé do hero
    ticker: [
      "ESTUDANTE DE TI",
      "CAMPINAS, SP",
      "BACKEND PYTHON",
      "LINUX (I USE CACHYOS BTW)",
      "ENGENHARIA DE SISTEMAS",
      "REDES & SUB-REDES",
      "CANAL 01 TRANSMISSÃO ATIVA",
      "ABERTO A OPORTUNIDADES"
    ]
  },

  // Seção 01: Sobre Mim
  about: {
    number: "01",
    tag: "[TRANSMISSÃO BIOGRÁFICA]",
    title: "SOBRE MIM",
    bio: [
      "Estudante de TI com um ano e meio de curso. Objetivo: me introduzir no mercado e aprimorar meus conhecimentos, especificamente em Engenharia de Sistemas.",
      "Busco oportunidades para aplicar na prática o que desenvolvi, acompanhando as tendências do setor e construindo soluções estruturadas com atenção aos detalhes técnicos."
    ],
    
    // 1.1 Formação acadêmica
    education: {
      number: "1.1",
      tag: "[FORMAÇÃO ACADÊMICA]",
      course: "Curso Técnico em Informática",
      institution: "Instituto Educacional Raphael Di Santo",
      period: "Início 2025 — Previsão de conclusão 2027",
      status: "Cursando (1 ano e meio de estudos)"
    },

    // 1.2 Idiomas
    languages: {
      number: "1.2",
      tag: "[COMUNICAÇÃO & IDIOMAS]",
      items: [
        { language: "Português", level: "Nativo" },
        { language: "Inglês", level: "Fluente" }
      ]
    }
  },

  // Seção 02: Projetos (Fitas Cassete)
  projects: {
    number: "02",
    tag: "[ARQUIVO ANALÓGICO EM FITA]",
    title: "PROJETOS SELECIONADOS",
    subtitle: "Cada fita armazena a gravação de um sistema construído na prática.",
    items: [
      {
        id: "tape-01",
        tapeNumber: "FITA #01",
        tapeSide: "LADO A",
        title: "Jogo de Console em Python com Tabelas JSON",
        category: "Backend & Lógica Estruturada",
        description: "Desenvolvimento de um jogo em terminal explorando lógica de programação pura, decomposição em funções modulares e integração de arquivos JSON para persistência de dados de jogador, inimigos e inventário de itens.",
        highlights: [
          "Lógica de programação e controle de fluxo avançado",
          "Arquitetura baseada em funções modulares",
          "Integração Python + persistência em JSON",
          "Modelagem de dados: atributos de jogador, catálogo de inimigos e itens"
        ],
        techs: ["Python", "JSON", "CLI / Terminal", "Data Persistence"],
        linkRepo: "#placeholder-github-jogo-python",
        linkText: "[REPOSITÓRIO NO GITHUB — PLACEHOLDER]"
      },
      {
        id: "tape-02",
        tapeNumber: "FITA #02",
        tapeSide: "LADO B",
        title: "Ambiente Linux: Instalação & Otimização CachyOS",
        category: "Sistemas Operacionais & Infraestrutura",
        description: "Construção de ambiente de trabalho de alta performance para uso diário. Criação de mídia bootável multi-ISO com Ventoy, particionamento avançado de unidades com GParted e instalação/otimização completa da distribuição CachyOS.",
        highlights: [
          "Mídia de instalação multi-boot com Ventoy",
          "Particionamento de disco customizado com GParted",
          "Setup completo da distribuição CachyOS (base Arch Linux)",
          "Instalação e afinação de drivers de hardware e pacotes essenciais"
        ],
        techs: ["Linux", "CachyOS", "Ventoy", "GParted", "Terminal Shell", "Drivers"],
        linkRepo: "#placeholder-github-ambiente-linux",
        linkText: "[DOCUMENTAÇÃO TÉCNICA — PLACEHOLDER]"
      }
    ]
  },

  // Seção 03: Competências (Estilo Obys - Ficha Técnica Numerada)
  skills: {
    number: "03",
    tag: "[ESPECIFICAÇÕES TÉCNICAS]",
    title: "MATRIZ DE COMPETÊNCIAS",
    subtitle: "Estruturadas por disciplina com foco em engenharia e execução prática.",
    categories: [
      {
        number: "1.1",
        name: "PROGRAMAÇÃO & DADOS",
        icon: "code",
        items: [
          { name: "Python", detail: "Backend, automações, scripts e manipulação de arquivos/JSON" },
          { name: "Java", detail: "Fundamentos de sintaxe e Programação Orientada a Objetos" },
          { name: "HTML5 / CSS3 / JavaScript", detail: "Frontend essencial, estruturação semântica e DOM" },
          { name: "MySQL", detail: "Modelagem relacional, consultas SQL e criação de tabelas" }
        ]
      },
      {
        number: "1.2",
        name: "FERRAMENTAS & AMBIENTE",
        icon: "tools",
        items: [
          { name: "VSCode", detail: "Ambiente de desenvolvimento e extensões de produtividade" },
          { name: "GitHub", detail: "Controle de versão, commits, branches e documentação" },
          { name: "MySQL Workbench", detail: "Administração visual de bancos de dados relacionais" },
          { name: "Cisco Packet Tracer", detail: "Simulação de topologias de rede e testes de roteamento" },
          { name: "Oracle VM VirtualBox", detail: "Virtualização de sistemas operacionais e testes isolados" }
        ]
      },
      {
        number: "1.3",
        name: "SISTEMAS & REDES",
        icon: "network",
        items: [
          { name: "Modelagem de Redes", detail: "Topologias, arquitetura lógica e física de conexão" },
          { name: "Cálculo de Sub-redes", detail: "Divisão de redes IPv4, máscaras de sub-rede e ranges" },
          { name: "Gerenciamento de Disco", detail: "Particionamento, formatação, sistemas de arquivos e GParted" },
          { name: "Atualização de Firmware", detail: "Manutenção de BIOS/UEFI e atualização de dispositivos" }
        ]
      },
      {
        number: "1.4",
        name: "GESTÃO DE PROJETOS",
        icon: "agile",
        items: [
          { name: "Histórias de Usuário", detail: "Mapeamento de necessidades, critérios de aceitação e valor" },
          { name: "Metodologias Ágeis", detail: "Práticas de Scrum e Kanban para fluxo contínuo de entregas" }
        ]
      }
    ]
  },

  // Seção 04: Player Analógico
  player: {
    number: "04",
    tag: "[TRANSMISSÃO DE ÁUDIO]",
    title: "ESTAÇÃO DE VOZ",
    subtitle: "Gravação analógica com uma breve introdução de quem sou.",
    trackTitle: "FAIXA 01: Mensagem de Apresentação — Rafael Sacchetto",
    duration: "01:24",
    audioSrc: "assets/audio/minha-faixa.mp3",
    audioPlaceholderNotice: "[ARQUIVO DE ÁUDIO PLACEHOLDER: /assets/audio/minha-faixa.mp3]",
    statusText: "PRONTO PARA TOCAR (CLIQUE PARA INICIAR)"
  },

  // Seção 05: Palestras e Visitas Técnicas (Apenas texto, sem vídeo)
  lectures: {
    number: "05",
    tag: "[REGISTROS DE CAMPO]",
    title: "PALESTRAS & VISITAS TÉCNICAS",
    subtitle: "Imersões no Instituto Raphael Di Santo e visita técnica na Unicamp. Registros puramente textuais.",
    items: [
      {
        number: "01",
        title: "Product Owner",
        host: "Colégio Raphael Di Santo",
        description: "Palestra sobre liderança de produto, alinhamento entre objetivos de negócio e desenvolvimento técnico, além de priorização estratégica de backlog."
      },
      {
        number: "02",
        title: "Visita Técnica e Palestra na Unicamp",
        host: "Universidade Estadual de Campinas (Unicamp)",
        description: "Visita aos laboratórios e palestra sobre pesquisas avançadas em computação e infraestrutura de tecnologia de nível acadêmico de excelência."
      },
      {
        number: "03",
        title: "Representante da Faculdade Inatel",
        host: "Instituto Nacional de Telecomunicações (Inatel)",
        description: "Apresentação focada no panorama de Engenharia de Telecomunicações, Internet das Coisas (IoT) e mercado tecnológico."
      },
      {
        number: "04",
        title: "Arquiteto de Sistemas",
        host: "Colégio Raphael Di Santo",
        description: "Palestra dedicada à estruturação de sistemas computacionais de grande escala, padrões de arquitetura de software e boas práticas de engenharia."
      }
    ]
  },

  // Seção 06: Contato e Despedida com Torradeira
  contact: {
    number: "06",
    tag: "[FIM DE TRANSMISSÃO]",
    title: "VAMOS CONVERSAR?",
    subtitle: "Canais abertos para oportunidades profissionais, estágio e projetos.",
    email: "rafaelsacchetto10@gmail.com",
    phone: "(19) 99437-2296",
    location: "Campinas, SP — Brasil",
    toasterMessage: "Até mais! // See you",
    socialLinks: [
      {
        name: "GitHub",
        url: "#placeholder-github",
        label: "[GITHUB // PLACEHOLDER]"
      },
      {
        name: "LinkedIn",
        url: "#placeholder-linkedin",
        label: "[LINKEDIN // PLACEHOLDER]"
      },
      {
        name: "E-mail",
        url: "mailto:rafaelsacchetto10@gmail.com",
        label: "rafaelsacchetto10@gmail.com"
      },
      {
        name: "Telefone / WhatsApp",
        url: "tel:+5519994372296",
        label: "(19) 99437-2296"
      }
    ],
    footerNotice: "© 2026 Rafael Sacchetto · Canal 01 · Todos os direitos reservados. Feito à mão com HTML, CSS e JavaScript puro."
  }
};

