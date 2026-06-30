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
    category: "Bem-estar animal",
    summary: "Antes de adotar, a família precisa preparar rotina, espaço, segurança e paciência para receber um cão ou gato com respeito.",
    image: "/assets/blog-adocao-responsavel-2026-06-30.png",
    body: "Adotar um animal é abrir espaço para uma nova história, mas também assumir um compromisso diário com cuidado, tempo e responsabilidade. Antes da chegada, vale conversar com todos da casa, organizar um ambiente seguro, separar potes, caminha, caixa de areia ou local de descanso, e entender que adaptação leva alguns dias ou semanas. Cães e gatos resgatados podem precisar de previsibilidade, carinho sem pressa e acompanhamento veterinário. A adoção responsável protege o animal, apoia quem adota e ajuda ONGs a seguirem resgatando outros focinhos que ainda esperam por uma chance."
  },
  { title: "Mutirão de castração abre inscrições", category: "Campanhas", summary: "Orientações e critérios para famílias atendidas." },
  { title: "12 adoções confirmadas na feira de sábado", category: "Adoções", summary: "Novas famílias, termos assinados e acompanhamento iniciado." },
  { title: "Como preparar a casa para um gato recém-adotado", category: "Dicas", summary: "Dicas de adaptação, telas, caixa de areia e enriquecimento." }
];
