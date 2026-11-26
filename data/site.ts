// ADR-S02 — Conteúdo local tipado: fonte única de todo texto comercial do site.
// Zero backend, zero fetch. Preços só entram após G-S2 (artefato aprovado).

/** R4/G-S5 — URL canônica provisória. Única fonte de canonical/OG/sitemap.
 *  Atualizar aqui (e em public/sitemap.xml) somente após o domínio definitivo. */
export const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://agenva-site.vercel.app').replace(/\/+$/, '')

export const site = {
  brand: {
    name: 'AGENVA',
    tagline: 'Agenda e clientes na palma da mão',
  },

  seo: {
    title: 'AGENVA — Agenda e clientes para barbearias, salões e autônomos',
    description:
      'Gerencie sua agenda de atendimentos, cadastre clientes, sincronize com o Google Calendar, fale com clientes pelo WhatsApp e receba pagamentos. Feito para barbearias, salões e profissionais autônomos.',
  },

  nav: [
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#funcionalidades', label: 'Funcionalidades' },
    { href: '#precos', label: 'Preços' },
    { href: '#faq', label: 'FAQ' },
  ],

  // Copy do hero CONGELADA (PLAN §Copy do hero congelada)
  hero: {
    eyebrow: 'Agenda simples para o seu negócio',
    title: 'Sua agenda, seu negócio. Sem horários perdidos.',
    subtitle:
      'AGENVA é multi-segmento: organize os atendimentos do seu negócio em um só lugar — agenda, clientes, WhatsApp, Google Calendar e cobrança mensal simples. Da barbearia à veterinária, da clínica ao pet shop.',
    primaryCta: 'Baixar o app',
    secondaryCta: 'Falar no WhatsApp',
    // Prova curta congelada (preço confirmado no código feat/billing-asaas — G-S2 só bloqueia variações)
    proof: 'Teste grátis por 15 dias. Depois, R$ 29,90/mês.',
  },

  steps: [
    {
      title: 'Crie sua conta',
      description:
        'Baixe o app e crie sua conta em poucos minutos. Login simples com sua conta Google.',
    },
    {
      title: 'Configure sua agenda e serviços',
      description:
        'Defina seus horários de trabalho, serviços e duração dos atendimentos. O app se adapta à sua rotina.',
    },
    {
      title: 'Compartilhe e gerencie agendamentos',
      description:
        'Divulgue seu link público de agendamento e receba, confirme ou recuse marcações direto no app.',
    },
  ],

  // Segmentos reais do app (lib/core/segment/segment_preset.dart) — copy multi-serviço
  segments: [
    {
      title: 'Estética & Beleza',
      description:
        'Corte, escova, manicure — serviços com duração e preço já sugeridos, você só ajusta.',
      image: '/segments/estetica-beleza.webp',
    },
    {
      title: 'Barbearia',
      description: 'Corte máquina, barba, combo — agenda cheia sem conflito de horário.',
      image: '/segments/barbearia.webp',
    },
    {
      title: 'Odontologia',
      description: 'Consulta, limpeza, avaliação: horários clínicos organizados por profissional.',
      image: '/segments/odontologia.webp',
    },
    {
      title: 'Medicina',
      description: 'Consulta e retorno com duração definida — sem sobreposição na sua rotina.',
      image: '/segments/medicina.webp',
    },
    {
      title: 'Estética Automotiva',
      description: 'Lavagem, polimento, higienização interna — serviços longos bloqueiam a agenda certa.',
      image: '/segments/estetica-automotiva.webp',
    },
    {
      title: 'Banho e Tosa',
      description: 'Banho e tosa por porte do pet, com histórico de cada cliente de quatro patas.',
      image: '/segments/banho-tosa.webp',
    },
    {
      title: 'Veterinária',
      description: 'Consulta e vacinação com lembrete pelo WhatsApp para o tutor não esquecer.',
      image: '/segments/veterinaria.webp',
    },
    {
      title: 'Mecânica',
      description: 'Revisão e troca de óleo com tempo de serviço real — o cliente vê o horário livre de verdade.',
      image: '/segments/mecanica.webp',
    },
    {
      title: 'E qualquer outro serviço',
      description:
        'O app é multi-segmento: escolha o seu, receba serviços sugeridos e customize tudo por cima.',
      image: '/segments/autonoma-hero.webp',
    },
  ],

  features: [
    {
      icon: 'calendar',
      title: 'Agenda de atendimentos',
      description:
        'Visualize e organize seus atendimentos por dia, crie bloqueios e controle tudo pelo celular.',
    },
    {
      icon: 'users',
      title: 'Cadastro de clientes',
      description:
        'Guarde nome, WhatsApp e histórico de cada cliente para um atendimento mais próximo.',
    },
    {
      icon: 'whatsapp',
      title: 'WhatsApp integrado',
      description:
        'Converse com o cliente direto pelo WhatsApp a partir do agendamento — sem perder tempo procurando número.',
    },
    {
      icon: 'google',
      title: 'Google Calendar',
      description:
        'Sincronize seus atendimentos com o Google Calendar para manter sua rotina sempre em dia.',
    },
    {
      icon: 'card',
      title: 'Pagamentos',
      description:
        'Receba pelos seus serviços com cobrança recorrente integrada (Asaas) — assinatura mensal do app e pagamentos dos clientes.',
    },
  ],

  pricing: {
    // Plano único confirmado: ASAAS_PLAN_VALUE=2990, ciclo MONTHLY (feat/billing-asaas).
    // G-S2 bloqueia apenas VARIAÇÕES comerciais — não bloqueia publicar o preço confirmado (PLAN passo 5).
    heading: 'Preço simples',
    price: 'R$ 29,90',
    period: '/mês',
    planName: 'Plano mensal',
    note: 'Um único plano mensal, sem surpresa. Teste grátis por 15 dias. Cancele quando quiser.',
  },

  faq: [
    {
      question: 'Para quem é o AGENVA?',
      answer:
        'Para profissionais autônomos e pequenos negócios de atendimento — barbearias, salões de beleza e profissionais da área da beleza que querem organizar a agenda e receber agendamentos de clientes por um link público.',
    },
    {
      question: 'Como meus clientes agendam comigo?',
      answer:
        'Você compartilha seu link público de agendamento. O cliente escolhe o serviço e o horário, e o agendamento entra no seu app como pendente — você confirma ou recusa.',
    },
    {
      question: 'Preciso pagar para usar?',
      answer:
        'O app oferece período de teste gratuito. Depois, é necessária uma assinatura ativa para continuar criando e editando agendamentos. Os planos serão publicados nesta página em breve.',
    },
    {
      question: 'Posso cancelar quando quiser?',
      answer:
        'Sim. O cancelamento é livre e os seus dados permanecem acessíveis em modo somente leitura após o cancelamento.',
    },
    {
      question: 'O que acontece com meus dados e os dos meus clientes?',
      answer:
        'Seus dados não são vendidos nem compartilhados com terceiros, exceto com a infraestrutura necessária para operar o serviço e quando exigido por lei. Você é o controlador dos dados dos seus clientes — a política completa está na nossa Política de Privacidade.',
    },
    {
      question: 'Como falo com o suporte?',
      answer:
        'Pelo WhatsApp (55) 98 9209-3812. Buscamos 99% de disponibilidade, mas o serviço pode passar por manutenções periódicas.',
    },
  ],

  downloads: {
    // G-S1 (Ezequias): URL HTTPS do TestFlight. Vazio = CTA desabilitado.
    testflightUrl: '',
    // Play Store: SEMPRE sem URL falsa — rótulo "Em breve".
    playStoreLabel: 'Em breve no Google Play',
  },

  contact: {
    whatsappLabel: '(55) 98 9209-3812',
    whatsappUrl: 'https://wa.me/559892093812',
  },

  legal: {
    lastUpdated: '09/09/2026',
    privacyPath: '/privacidade',
    termsPath: '/termos',
  },
} as const

export type Site = typeof site
