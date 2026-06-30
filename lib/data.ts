export type Animal = {
  id: string;
  nome: string;
  especie: "Cão" | "Gato";
  idade: string;
  sexo: "Macho" | "Fêmea";
  porte: "Pequeno" | "Médio" | "Grande";
  cor: string;
  cidade: string;
  status: "Disponível" | "Em processo" | "Adotado" | "Apadrinhado";
  castrado: boolean;
  vacinado: boolean;
  vermifugado: boolean;
  personalidade: string;
  historia: string;
  energia: "Calma" | "Moderada" | "Ativa";
  moradia: string[];
  perfilIdeal: string[];
  compatibilidade: {
    criancas: "Sim" | "Com supervisao" | "Nao recomendado";
    outrosAnimais: "Sim" | "Com adaptacao" | "Prefere ser unico";
    tempoSozinho: "Pouco" | "Moderado" | "Longo";
    experiencia: "Primeira adocao" | "Ja tive animais" | "Tenho animais hoje";
  };
  foto: string;
  tags: string[];
};

export type DonationProduct = {
  key: string;
  name: string;
  price: number;
  image: string;
  description: string;
  type: "item" | "recurring";
};

export const animals: Animal[] = [
  {
    id: "thor",
    nome: "Thor",
    especie: "Cão",
    idade: "3 anos",
    sexo: "Macho",
    porte: "Médio",
    cor: "Caramelo",
    cidade: "Manaus",
    status: "Disponível",
    castrado: true,
    vacinado: true,
    vermifugado: true,
    personalidade: "Carinhoso, sociável e ótimo para famílias.",
    historia: "Resgatado após abandono em via pública, hoje está pronto para uma casa segura.",
    energia: "Moderada",
    moradia: ["Casa com quintal", "Casa sem quintal"],
    perfilIdeal: ["Familia presente", "Passeios diarios", "Criancas"],
    compatibilidade: {
      criancas: "Sim",
      outrosAnimais: "Com adaptacao",
      tempoSozinho: "Moderado",
      experiencia: "Primeira adocao"
    },
    foto: "/assets/caramel-dog.png",
    tags: ["adulto", "macho", "medio"]
  },
  {
    id: "luna",
    nome: "Luna",
    especie: "Gato",
    idade: "2 anos",
    sexo: "Fêmea",
    porte: "Pequeno",
    cor: "Tigrado",
    cidade: "Manaus",
    status: "Disponível",
    castrado: true,
    vacinado: true,
    vermifugado: true,
    personalidade: "Calma, curiosa e ideal para apartamento telado.",
    historia: "Chegou com filhotes, cuidou de todos e agora espera sua própria família.",
    energia: "Calma",
    moradia: ["Apartamento", "Casa sem quintal"],
    perfilIdeal: ["Apartamento telado", "Rotina calma", "Adultos"],
    compatibilidade: {
      criancas: "Com supervisao",
      outrosAnimais: "Com adaptacao",
      tempoSozinho: "Longo",
      experiencia: "Primeira adocao"
    },
    foto: "/assets/tabby-cat.png",
    tags: ["adulto", "femea", "pequeno"]
  },
  {
    id: "bento",
    nome: "Bento",
    especie: "Cão",
    idade: "5 meses",
    sexo: "Macho",
    porte: "Pequeno",
    cor: "Preto e branco",
    cidade: "Manaus",
    status: "Em processo",
    castrado: false,
    vacinado: true,
    vermifugado: true,
    personalidade: "Brincalhão, esperto e cheio de energia.",
    historia: "Foi acolhido em lar temporário e precisa de uma família paciente para crescer.",
    energia: "Ativa",
    moradia: ["Casa com quintal", "Casa sem quintal"],
    perfilIdeal: ["Familia ativa", "Tempo para educar", "Brincadeiras"],
    compatibilidade: {
      criancas: "Sim",
      outrosAnimais: "Sim",
      tempoSozinho: "Pouco",
      experiencia: "Ja tive animais"
    },
    foto: "/assets/puppy.png",
    tags: ["filhote", "macho", "pequeno"]
  },
  {
    id: "nico",
    nome: "Nico",
    especie: "Cão",
    idade: "9 anos",
    sexo: "Macho",
    porte: "Grande",
    cor: "Dourado",
    cidade: "Manaus",
    status: "Disponível",
    castrado: true,
    vacinado: true,
    vermifugado: true,
    personalidade: "Tranquilo, leal e apaixonado por companhia.",
    historia: "Um veterano gentil que merece viver seus próximos anos com dignidade.",
    energia: "Calma",
    moradia: ["Casa com quintal"],
    perfilIdeal: ["Rotina tranquila", "Companhia", "Poucas escadas"],
    compatibilidade: {
      criancas: "Com supervisao",
      outrosAnimais: "Prefere ser unico",
      tempoSozinho: "Moderado",
      experiencia: "Primeira adocao"
    },
    foto: "/assets/senior-dog.png",
    tags: ["idoso", "macho", "grande"]
  }
];

export const donationItems: DonationProduct[] = [
  { key: "racao-10kg", name: "Saco de ração 10 kg", price: 95, image: "/assets/donation-food.png", description: "Ajuda a alimentar cães acolhidos durante a semana.", type: "item" },
  { key: "vacina-v10", name: "Vacina V10", price: 80, image: "/assets/donation-vaccine.png", description: "Proteção essencial para cães resgatados.", type: "item" },
  { key: "vacina-antirrabica", name: "Vacina antirrábica", price: 45, image: "/assets/donation-vaccine.png", description: "Imunização básica para adoção responsável.", type: "item" },
  { key: "cobertor", name: "Cobertor", price: 35, image: "/assets/donation-blanket.png", description: "Conforto para animais em recuperação ou lares temporários.", type: "item" },
  { key: "vermifugo", name: "Vermífugo", price: 28, image: "/assets/donation-dewormer.png", description: "Primeiro cuidado de saúde para novos resgatados.", type: "item" },
  { key: "kit-higiene", name: "Kit higiene", price: 50, image: "/assets/donation-hygiene.png", description: "Produtos de limpeza, tapetes higiênicos e materiais de rotina.", type: "item" },
  { key: "apoio-mensal", name: "Doação mensal recorrente", price: 30, image: "/assets/hero-rescue.png", description: "Um apoio fixo todo mês para ração, medicamentos e emergências.", type: "recurring" }
];

export const posts = [
  {
    title: "Adoção responsável: um compromisso que começa antes da chegada",
    subtitle: "Preparar rotina, espaço e segurança é parte essencial de receber um novo animal.",
    category: "Bem-estar animal",
    summary: "Preparar rotina, espaço e segurança é parte essencial de receber um novo animal.",
    image: "/assets/blog-adocao-responsavel-2026-06-30.png",
    content: "Adotar um cão ou gato é uma decisão bonita, mas também prática. Antes da chegada, a família precisa entender que o animal não está entrando apenas em uma casa: ele está entrando em uma rotina, em regras, em cheiros novos e em vínculos que ainda serão construídos. Quando a adoção é planejada, a adaptação costuma ser mais tranquila para todos.",
    body: [
      "Adotar um cão ou gato é uma decisão bonita, mas também prática. Antes da chegada, a família precisa entender que o animal não está entrando apenas em uma casa: ele está entrando em uma rotina, em regras, em cheiros novos e em vínculos que ainda serão construídos.",
      "Quando a adoção é planejada, a adaptação costuma ser mais tranquila para todos. O animal se sente mais seguro, a família evita frustrações e a ONG consegue acompanhar melhor esse novo começo."
    ],
    steps: [
      {
        title: "Converse com todos da casa",
        text: "Antes de adotar, alinhe responsabilidades: quem coloca comida, quem limpa o espaço, quem leva ao veterinário e como serão os passeios ou brincadeiras. A adoção precisa ser uma escolha coletiva, não uma surpresa que vira conflito depois."
      },
      {
        title: "Prepare um espaço seguro",
        text: "Separe um cantinho calmo com água, alimento, caminha e local de higiene. Para gatos, telas de proteção e caixa de areia são essenciais. Para cães, retire produtos de limpeza, fios soltos e objetos pequenos que possam ser engolidos."
      },
      {
        title: "Faça a chegada com calma",
        text: "Evite visitas, barulho e excesso de colo no primeiro dia. O animal precisa explorar o ambiente no próprio ritmo. Alguns se aproximam rápido; outros observam de longe antes de confiar. Os dois comportamentos são normais."
      },
      {
        title: "Mantenha uma rotina previsível",
        text: "Horários parecidos para alimentação, passeio, limpeza e descanso ajudam o animal a entender o novo lar. Previsibilidade reduz ansiedade, especialmente em animais que passaram por abandono, rua ou mudanças frequentes."
      },
      {
        title: "Marque uma avaliação veterinária",
        text: "Mesmo quando o animal já chega vacinado ou castrado, uma consulta inicial ajuda a revisar vermifugação, antipulgas, alimentação, peso, exames e próximos cuidados. Saúde preventiva evita sofrimento e gastos maiores no futuro."
      },
      {
        title: "Tenha paciência com a adaptação",
        text: "Xixi fora do lugar, medo, latidos, miados ou vontade de se esconder podem acontecer nos primeiros dias. Em vez de bronca, use orientação, reforço positivo e paciência. A confiança nasce quando o animal percebe que está seguro."
      },
      {
        title: "Mantenha contato com a ONG",
        text: "Enviar notícias, fotos e dúvidas ajuda a equipe a acompanhar a adaptação. A adoção responsável não termina na assinatura do termo: ela continua no cuidado diário e no compromisso de oferecer uma vida digna."
      }
    ],
    closing: "Receber um animal adotado é oferecer uma chance real de recomeço. Com preparo, respeito e acompanhamento, essa chegada pode se transformar em uma relação segura, afetuosa e duradoura."
  },
  {
    title: "Mutirão de castração abre inscrições",
    subtitle: "Famílias podem se cadastrar para atendimento social com vagas limitadas.",
    category: "Campanhas",
    summary: "Orientações, critérios e documentos necessários para participar do próximo mutirão.",
    image: "/assets/donation-vaccine.png",
    content: "A castração é uma das ações mais importantes para reduzir abandono e sofrimento animal. Nesta campanha, a Focinhos Felizes organiza inscrições para famílias que precisam de apoio, priorizando animais em situação de vulnerabilidade e tutores de baixa renda."
  },
  {
    title: "12 adoções confirmadas na feira de sábado",
    subtitle: "Novas famílias assinaram termo de adoção e iniciaram acompanhamento.",
    category: "Adoções",
    summary: "A feira reuniu voluntários, adotantes e animais que agora começam uma nova fase.",
    image: "/assets/caramel-dog.png",
    content: "Cada adoção responsável libera espaço para um novo resgate. Depois da feira, a equipe continua acompanhando as famílias para orientar adaptação, rotina, alimentação e segurança dos animais adotados."
  },
  {
    title: "Como preparar a casa para um gato recém-adotado",
    subtitle: "Pequenos cuidados deixam a adaptação mais tranquila e segura.",
    category: "Dicas",
    summary: "Veja dicas sobre telas, caixa de areia, enriquecimento ambiental e rotina.",
    image: "/assets/tabby-cat.png",
    content: "Gatos precisam de tempo, esconderijos seguros e uma rotina previsível para se adaptar. Antes da chegada, organize caixa de areia, água, alimento, arranhadores e proteja janelas com telas."
  }
];
