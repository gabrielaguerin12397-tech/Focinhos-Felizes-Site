export type Animal = {
  id: string;
  nome: string;
  especie: "Cão" | "Gato";
  idade: string;
  sexo: "Macho" | "Fêmea";
  porte: "Pequeno" | "Médio" | "Grande";
  cor: string;
  status: "Disponível" | "Em processo" | "Adotado" | "Apadrinhado";
  castrado: boolean;
  vacinado: boolean;
  vermifugado: boolean;
  personalidade: string;
  historia: string;
  energia: "Calma" | "Moderada" | "Ativa";
  moradia: string[];
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
    status: "Disponível",
    castrado: true,
    vacinado: true,
    vermifugado: true,
    personalidade: "Carinhoso, sociável e ótimo para famílias.",
    historia: "Resgatado após abandono em via pública, hoje está pronto para uma casa segura.",
    energia: "Moderada",
    moradia: ["Casa com quintal", "Casa sem quintal"],
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
    status: "Disponível",
    castrado: true,
    vacinado: true,
    vermifugado: true,
    personalidade: "Calma, curiosa e ideal para apartamento telado.",
    historia: "Chegou com filhotes, cuidou de todos e agora espera sua própria família.",
    energia: "Calma",
    moradia: ["Apartamento", "Casa sem quintal"],
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
    status: "Em processo",
    castrado: false,
    vacinado: true,
    vermifugado: true,
    personalidade: "Brincalhão, esperto e cheio de energia.",
    historia: "Foi acolhido em lar temporário e precisa de uma família paciente para crescer.",
    energia: "Ativa",
    moradia: ["Casa com quintal", "Casa sem quintal"],
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
    status: "Disponível",
    castrado: true,
    vacinado: true,
    vermifugado: true,
    personalidade: "Tranquilo, leal e apaixonado por companhia.",
    historia: "Um veterano gentil que merece viver seus próximos anos com dignidade.",
    energia: "Calma",
    moradia: ["Casa com quintal"],
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
    summary: "Antes de adotar, a família precisa preparar rotina, espaço, segurança e paciência.",
    image: "/assets/blog-adocao-responsavel-2026-06-30.png",
    content: "Adotar um animal é abrir espaço para uma nova história, mas também assumir um compromisso diário com cuidado, tempo e responsabilidade. Antes da chegada, vale conversar com todos da casa, organizar um ambiente seguro, separar potes, caminha, caixa de areia ou local de descanso, e entender que adaptação leva alguns dias ou semanas. Cães e gatos resgatados podem precisar de previsibilidade, carinho sem pressa e acompanhamento veterinário."
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
