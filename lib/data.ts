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
    criancas: string;
    outrosAnimais: string;
    tempoSozinho: string;
    experiencia: string;
    experiencias?: string[];
  };
  foto: string;
  fotos?: string[];
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
    title: "Adoção de cães e gatos idosos: como oferecer conforto, rotina e uma nova chance",
    subtitle: "Animais mais velhos também esperam por família e podem se adaptar muito bem quando recebem cuidado adequado.",
    category: "Adoção responsável",
    summary: "Entenda os principais cuidados ao adotar cães e gatos idosos, da avaliação veterinária à adaptação da casa e da rotina.",
    image: "/assets/blog-adocao-idosos-2026-08-11.png",
    content: "Adotar um cão ou gato idoso é escolher uma forma muito concreta de cuidado. Animais mais velhos costumam ser tranquilos, gratos pela rotina e capazes de criar vínculos fortes, mas precisam de atenção especial com saúde, conforto e adaptação.",
    body: [
      "Muitos animais idosos passam mais tempo esperando por adoção porque as pessoas imaginam que apenas filhotes se adaptam bem. Na prática, cães e gatos mais velhos podem ser excelentes companheiros, especialmente para famílias que buscam uma rotina mais calma, previsível e afetiva.",
      "A adoção de um animal idoso exige compromisso, mas não deve ser vista como um problema. Com avaliação veterinária, pequenas adaptações na casa e respeito ao ritmo do animal, essa chegada pode ser segura e muito significativa para todos."
    ],
    steps: [
      {
        title: "Converse com a ONG sobre o histórico do animal",
        text: "Pergunte sobre comportamento, saúde, alimentação, rotina, medicações, exames já feitos, relação com outros animais e nível de energia. Quanto mais informações a família tiver antes da adoção, mais fácil será preparar um ambiente compatível."
      },
      {
        title: "Faça uma avaliação veterinária inicial",
        text: "A consulta ajuda a verificar peso, dentes, pele, visão, audição, articulações, vacinas, vermifugação e possíveis exames de rotina. Animais idosos podem precisar de acompanhamento mais próximo, mas prevenção bem organizada evita sofrimento e decisões tardias."
      },
      {
        title: "Adapte a casa para conforto e mobilidade",
        text: "Use caminhas baixas, mantas laváveis, potes em local acessível e tapetes antiderrapantes em pisos lisos. Se o animal tem dificuldade para subir em sofá, cama ou carro, rampas e degraus baixos reduzem esforço e risco de queda."
      },
      {
        title: "Mantenha uma rotina previsível",
        text: "Horários parecidos para alimentação, passeio, descanso e higiene dão segurança. Animais idosos se beneficiam de estabilidade, principalmente quando passaram por abandono, mudança de lar ou períodos de abrigo."
      },
      {
        title: "Ajuste exercícios ao ritmo do animal",
        text: "Passeios curtos, cheiros no caminho, brincadeiras leves e interação tranquila costumam ser melhores do que atividades intensas. O objetivo é manter movimento e estímulo sem causar dor, exaustão ou ansiedade."
      },
      {
        title: "Observe sinais sutis de dor ou desconforto",
        text: "Mudanças no apetite, dificuldade para levantar, isolamento, irritação, lambedura excessiva, mancar, evitar escadas ou dormir mais do que o normal merecem atenção. Animais nem sempre demonstram dor de forma evidente."
      },
      {
        title: "Cuide da alimentação com orientação profissional",
        text: "A dieta pode precisar de ajustes conforme idade, peso, dentes, rins, alergias ou doenças crônicas. Evite trocar ração ou oferecer suplementos sem orientação, porque animais idosos podem ser mais sensíveis a mudanças bruscas."
      },
      {
        title: "Respeite o tempo de vínculo",
        text: "Alguns idosos se aproximam rápido; outros precisam observar a casa antes de confiar. Dê espaço, fale com calma e evite excesso de visitas no início. Segurança emocional também faz parte da adoção responsável."
      },
      {
        title: "Planeje custos e acompanhamento contínuo",
        text: "Adoção de idoso pode envolver consultas mais frequentes, exames e medicamentos. Isso não diminui o valor da adoção; apenas torna o planejamento mais honesto. Com organização, a família oferece cuidado digno e evita abandono secundário."
      }
    ],
    closing: "Animais idosos não precisam de pena: precisam de oportunidade, rotina e cuidado. Ao abrir espaço para um cão ou gato mais velho, a família oferece dignidade a quem ainda tem muito afeto para viver e compartilhar."
  },
  {
    title: "Vacinação e vermifugação: cuidados essenciais antes e depois da adoção",
    subtitle: "Prevenção organizada protege o animal, a família e outros cães e gatos da casa.",
    category: "Saúde preventiva",
    summary: "Entenda como organizar carteira de vacinação, vermifugação, antipulgas e acompanhamento veterinário para cães e gatos adotados.",
    image: "/assets/blog-vacinacao-vermifugacao-2026-07-23.png",
    content: "Vacinação, vermifugação e controle de parasitas fazem parte da base de uma adoção responsável. Esses cuidados ajudam a proteger cães e gatos contra doenças, reduzem riscos para outros animais da casa e dão mais segurança para a adaptação.",
    body: [
      "Quando um animal é resgatado, nem sempre existe histórico completo de saúde. Ele pode ter passado por rua, abrigo, lar temporário, contato com outros animais ou períodos sem acompanhamento veterinário. Por isso, a prevenção precisa ser organizada desde o início, sem depender apenas de aparência saudável.",
      "A carteira de vacinação, a vermifugação, o controle de pulgas e carrapatos e as consultas de rotina ajudam a construir um plano real de cuidado. Para adotantes, isso evita dúvidas e atrasos. Para ONGs, facilita acompanhamento e reduz devoluções motivadas por problemas que poderiam ser orientados previamente."
    ],
    steps: [
      {
        title: "Comece com uma avaliação veterinária",
        text: "Antes de aplicar vacinas ou medicamentos por conta própria, leve o animal para avaliação. O veterinário verifica idade aproximada, peso, temperatura, hidratação, mucosas, pele, fezes, histórico disponível e sinais de doença. Esse primeiro check-up define o que pode ser feito com segurança."
      },
      {
        title: "Organize a carteira de vacinação",
        text: "Cães e gatos precisam de protocolos diferentes, definidos por idade, região, risco de exposição e histórico. Guarde a carteira física ou digital e anote datas de reforço. Vacina atrasada não deve ser ignorada: peça orientação para regularizar sem pular etapas importantes."
      },
      {
        title: "Respeite o intervalo entre doses",
        text: "Filhotes geralmente precisam de uma sequência de doses para desenvolver proteção adequada. Adultos sem histórico também podem precisar reiniciar ou atualizar protocolo. O intervalo correto é parte do tratamento preventivo; antecipar ou atrasar demais pode comprometer a proteção."
      },
      {
        title: "Faça vermifugação com dose correta",
        text: "Vermífugo deve considerar peso, idade, espécie e condição clínica. Dose errada pode não funcionar ou causar efeitos indesejados. Em animais recém-resgatados, o veterinário pode pedir exame de fezes ou indicar repetição em datas específicas."
      },
      {
        title: "Controle pulgas, carrapatos e ácaros",
        text: "Parasitas causam coceira, feridas, anemia e podem transmitir doenças. O controle precisa incluir o animal e o ambiente: caminhas, mantas, frestas, quintal e locais de descanso. Use apenas produtos indicados para a espécie; alguns produtos seguros para cães são perigosos para gatos."
      },
      {
        title: "Mantenha quarentena quando houver outros animais",
        text: "Se já existem cães ou gatos na casa, faça uma adaptação gradual. Até avaliação veterinária e orientação sobre vacinas e parasitas, mantenha o recém-chegado separado, com potes, caixa de areia ou caminha próprios. Isso protege todos e reduz estresse."
      },
      {
        title: "Observe reações e sinais de alerta",
        text: "Após vacinas ou medicamentos, algum cansaço leve pode acontecer, mas sinais como inchaço intenso, vômitos repetidos, dificuldade para respirar, prostração forte, diarreia persistente ou piora rápida exigem contato imediato com o veterinário."
      },
      {
        title: "Planeje os reforços como parte da adoção",
        text: "Adoção responsável continua depois da chegada. Coloque lembretes para reforços, consultas, antiparasitários e exames. Quando a família assume esse calendário, o animal fica protegido e a ONG consegue acompanhar melhor o sucesso da adoção."
      }
    ],
    closing: "Prevenção é uma forma concreta de cuidado. Com orientação veterinária, registros organizados e rotina de acompanhamento, cães e gatos adotados têm mais chance de viver com saúde, segurança e estabilidade na nova família."
  },
  {
    title: "Enriquecimento ambiental: como reduzir estresse e melhorar a vida de cães e gatos",
    subtitle: "Brincadeiras simples, rotina previsível e desafios seguros ajudam animais resgatados a ganhar confiança.",
    category: "Bem-estar animal",
    summary: "Veja como preparar atividades de baixo custo para cães e gatos, especialmente em adoção, lar temporário ou adaptação depois do resgate.",
    image: "/assets/blog-enriquecimento-ambiental-2026-07-21.png",
    content: "Enriquecimento ambiental é o conjunto de cuidados que torna a rotina do animal mais interessante, segura e parecida com suas necessidades naturais. Para cães e gatos resgatados, isso pode reduzir ansiedade, melhorar a adaptação e evitar comportamentos ligados ao tédio ou ao medo.",
    body: [
      "Muitos animais chegam ao lar temporário ou à nova família depois de experiências difíceis: rua, abandono, barulho, fome, disputa por espaço ou longos períodos sem previsibilidade. Nesses casos, carinho é importante, mas não basta. O animal também precisa de ambiente organizado, estímulos adequados e tempo para entender que está seguro.",
      "O enriquecimento ambiental não precisa ser caro. Caixas de papelão, brinquedos simples, passeios bem conduzidos, cheiros diferentes, arranhadores, comedouros interativos e pequenas rotinas já fazem diferença. O ponto principal é oferecer escolhas e atividades sem forçar contato, exposição ou agitação excessiva."
    ],
    steps: [
      {
        title: "Comece pela segurança do ambiente",
        text: "Antes de oferecer brinquedos ou desafios, retire fios soltos, produtos de limpeza, objetos pequenos, plantas tóxicas e qualquer item que possa ser engolido. Para gatos, janelas teladas são prioridade. Para cães, portões, guias e áreas de descanso precisam estar bem definidos."
      },
      {
        title: "Crie uma rotina previsível",
        text: "Horários parecidos para alimentação, descanso, passeio, limpeza e brincadeiras ajudam o animal a relaxar. Animais resgatados costumam se beneficiar de repetição, porque a previsibilidade mostra que comida, atenção e descanso não são eventos incertos."
      },
      {
        title: "Ofereça alimentação com desafio leve",
        text: "Tapetes de farejar, brinquedos recheáveis e ração escondida em pequenas porções estimulam o olfato e a concentração. Comece fácil para não gerar frustração. O objetivo é ocupar a mente do animal, não criar competição ou estresse."
      },
      {
        title: "Use cheiros e exploração controlada",
        text: "Cães podem explorar cheiros durante passeios tranquilos, sem pressa. Gatos podem investigar caixas, túneis, mantas e objetos novos em ambiente seguro. O olfato é uma forma poderosa de enriquecimento, especialmente para animais medrosos ou com energia acumulada."
      },
      {
        title: "Monte pontos de descanso protegidos",
        text: "Todo animal precisa de um local onde possa ficar sem ser incomodado. Caminhas em cantos calmos, caixas para gatos, mantas laváveis e espaços longe de barulho ajudam na recuperação emocional. Crianças e visitas devem ser orientadas a respeitar esse refúgio."
      },
      {
        title: "Adapte atividades para a espécie e personalidade",
        text: "Gatos costumam gostar de altura, arranhadores, esconderijos e brincadeiras de caça com varinhas. Cães podem preferir farejar, roer itens seguros, treinar comandos simples ou passear. O que funciona para um animal pode não funcionar para outro."
      },
      {
        title: "Evite excesso de estímulo",
        text: "Brincadeira demais, visitas frequentes, barulho e tentativa constante de interação podem aumentar ansiedade. Observe sinais como bocejos repetidos, tentativa de se esconder, rosnado, pupilas dilatadas, ofegância ou agitação. Pausas fazem parte do cuidado."
      },
      {
        title: "Registre o que ajuda na adaptação",
        text: "Anote quais brinquedos, horários, alimentos e atividades deixam o animal mais tranquilo. Essas informações ajudam a ONG, o lar temporário e a futura família a manter uma rotina compatível com a personalidade do cão ou gato."
      }
    ],
    closing: "Enriquecimento ambiental é bem-estar colocado em prática. Com segurança, observação e criatividade, é possível transformar a rotina de cães e gatos resgatados em uma experiência mais calma, saudável e preparada para a adoção responsável."
  },
  {
    title: "Lar temporário para cães e gatos: como ajudar mesmo sem adotar agora",
    subtitle: "Abrir a casa por um período combinado pode salvar vidas e liberar espaço para novos resgates.",
    category: "Voluntariado",
    summary: "Entenda o que é lar temporário, como preparar a casa e quais cuidados tornam essa ajuda mais segura para animais resgatados.",
    image: "/assets/blog-lar-temporario-2026-07-17.png",
    content: "O lar temporário é uma das formas mais importantes de ajudar uma ONG de proteção animal. Ele oferece abrigo, rotina e cuidado enquanto o cão ou gato se recupera, aguarda adoção ou precisa sair de uma situação de risco.",
    body: [
      "Nem toda pessoa pode adotar de forma definitiva, mas muitas conseguem ajudar por alguns dias, semanas ou meses. Esse período pode ser decisivo para um animal resgatado que precisa ganhar peso, se recuperar de estresse, terminar tratamento, aprender a confiar ou simplesmente esperar uma família responsável.",
      "Para a ONG, cada lar temporário amplia a capacidade de resgate sem depender apenas de abrigos cheios. Para o animal, significa sair de um ambiente inseguro e viver uma rotina mais próxima da vida em família, com observação diária e cuidados individualizados."
    ],
    steps: [
      {
        title: "Entenda o compromisso antes de aceitar",
        text: "Lar temporário não é adoção definitiva, mas exige responsabilidade. Combine com a ONG o prazo previsto, quem fornece ração, medicamentos, transporte, atendimento veterinário e como será feita a divulgação para adoção. Tudo precisa estar claro antes da chegada do animal."
      },
      {
        title: "Prepare um espaço separado e seguro",
        text: "Reserve um cômodo ou área tranquila para os primeiros dias. O animal pode chegar assustado, cansado ou sem histórico completo de saúde. Separar de outros pets evita brigas, fugas, estresse e possíveis transmissões até que a adaptação seja feita com segurança."
      },
      {
        title: "Monte um kit básico de acolhimento",
        text: "Tenha potes de água e comida, caminha ou manta lavável, tapete higiênico ou caixa de areia, guia ou caixa de transporte, brinquedos simples e produtos de limpeza adequados. O objetivo é oferecer conforto sem depender de improviso."
      },
      {
        title: "Faça a adaptação sem pressa",
        text: "Nos primeiros dias, evite visitas, excesso de colo, barulho e contato direto com muitos animais. Deixe o resgatado explorar no próprio ritmo. Medo, silêncio, vontade de se esconder ou pouca interação inicial podem ser respostas normais ao estresse."
      },
      {
        title: "Observe comportamento, alimentação e saúde",
        text: "Anote se o animal come bem, bebe água, faz xixi e cocô, dorme, brinca, manca, coça, tosse ou demonstra dor. Essas informações ajudam a ONG e o veterinário a entenderem o estado real do animal fora da rua ou do abrigo."
      },
      {
        title: "Registre fotos e pequenas evoluções",
        text: "Fotos nítidas, vídeos curtos e relatos sobre personalidade ajudam muito na adoção. Conte se o animal é calmo, brincalhão, sociável, independente, medroso, acostumado com crianças ou melhor para uma rotina tranquila. Informação honesta evita devoluções."
      },
      {
        title: "Respeite os critérios de adoção da ONG",
        text: "Mesmo que alguém conhecido se interesse, o encaminhamento deve seguir o processo combinado: entrevista, orientação, termo de adoção e checagem de segurança. O lar temporário ajuda a cuidar, mas a adoção precisa ser responsável e documentada."
      },
      {
        title: "Prepare-se emocionalmente para a despedida",
        text: "Apego acontece, e isso é normal. A despedida pode ser difícil, mas também é o sinal de que o lar temporário cumpriu sua missão. Quando um animal é adotado com segurança, outro pode ocupar aquele espaço e receber a mesma chance."
      }
    ],
    closing: "Ser lar temporário é transformar espaço disponível em proteção concreta. Com organização, comunicação com a ONG e cuidado diário, essa ajuda cria pontes entre o resgate e a adoção definitiva, uma vida por vez."
  },
  {
    title: "Castração responsável: por que ela protege animais, famílias e a comunidade",
    subtitle: "Entenda quando conversar com o veterinário, quais cuidados preparar e como a castração ajuda a reduzir abandono.",
    category: "Saúde preventiva",
    summary: "A castração é uma medida de saúde pública e bem-estar animal que ajuda a prevenir ninhadas não planejadas, abandono e alguns problemas de saúde.",
    image: "/assets/blog-castracao-responsavel-2026-07-14.png",
    content: "A castração responsável é uma das ações mais efetivas para proteger cães e gatos, reduzir ninhadas não planejadas e diminuir o ciclo de abandono. Ela deve ser planejada com orientação veterinária, cuidados antes e depois do procedimento e compromisso da família com a recuperação do animal.",
    body: [
      "Quando uma ONG fala sobre castração, o objetivo não é apenas evitar filhotes. A conversa envolve saúde, segurança, planejamento familiar e responsabilidade coletiva. Cada ninhada não planejada aumenta a pressão sobre lares temporários, protetores, abrigos e famílias que muitas vezes não conseguem cuidar de todos os animais.",
      "A castração também precisa ser tratada com seriedade. Ela é um procedimento veterinário e deve respeitar idade, condição clínica, exames recomendados e recuperação adequada. Com informação correta, tutores e adotantes tomam decisões melhores e os animais passam pelo processo com mais segurança."
    ],
    steps: [
      {
        title: "Entenda a castração como prevenção, não como punição",
        text: "Cães e gatos não precisam cruzar para serem saudáveis ou felizes. A castração é uma ferramenta de prevenção que reduz ninhadas indesejadas e ajuda a evitar que mais animais nasçam sem garantia de lar, cuidado veterinário e alimentação adequada."
      },
      {
        title: "Converse com um veterinário antes de marcar",
        text: "A avaliação profissional define o melhor momento para o procedimento, considerando idade, peso, histórico de saúde, vacinas, vermifugação e possíveis exames. Filhotes, idosos, fêmeas no cio, animais doentes ou recém-resgatados podem precisar de uma preparação específica."
      },
      {
        title: "Organize o pré-operatório com antecedência",
        text: "Siga corretamente as orientações sobre jejum, transporte, documentação e medicamentos. Prepare uma caixa de transporte segura para gatos e uma guia adequada para cães. Evite improvisos no dia, porque estresse e atrasos prejudicam o bem-estar do animal."
      },
      {
        title: "Prepare um espaço calmo para a volta para casa",
        text: "Depois da cirurgia, o animal precisa descansar em local limpo, seco, ventilado e sem acesso a escadas, pulos ou brincadeiras intensas. Separe caminha, água, alimento orientado pelo veterinário e um ambiente onde ele possa se recuperar sem ser incomodado."
      },
      {
        title: "Use roupa cirúrgica ou colar quando indicado",
        text: "Lamber ou morder os pontos pode causar inflamação, abertura da cirurgia e dor. Se o veterinário recomendar roupa cirúrgica ou colar elizabetano, mantenha o uso pelo período indicado, mesmo que o animal pareça incomodado no início."
      },
      {
        title: "Observe sinais de alerta no pós-operatório",
        text: "Procure orientação veterinária se houver sangramento, inchaço intenso, mau cheiro, apatia prolongada, vômitos repetidos, falta de apetite persistente, dor forte ou tentativa constante de mexer nos pontos. A recuperação deve ser acompanhada, não apenas esperada."
      },
      {
        title: "Mantenha o acompanhamento e a retirada de pontos",
        text: "Se houver retorno agendado, compareça. A retirada de pontos, quando necessária, deve ser feita no prazo correto. Esse acompanhamento confirma se a cicatrização está adequada e evita complicações que poderiam ser resolvidas cedo."
      },
      {
        title: "Apoie campanhas de castração e educação",
        text: "Além de castrar o próprio animal, divulgar informação responsável ajuda a comunidade. Campanhas, mutirões e doações para castrações sociais reduzem abandono de forma concreta, especialmente em regiões com muitos animais vulneráveis."
      }
    ],
    closing: "Castração responsável é cuidado individual e impacto coletivo. Quando tutores, adotantes, ONGs e veterinários trabalham juntos, menos animais nascem em situação de risco e mais cães e gatos têm chance de viver com saúde, segurança e dignidade."
  },
  {
    title: "Encontrei um animal abandonado: passo a passo para ajudar com segurança",
    subtitle: "Agir com calma, proteger o animal e acionar apoio correto aumenta as chances de um resgate responsável.",
    category: "Resgate responsável",
    summary: "Saiba o que fazer ao encontrar cão ou gato abandonado, desde a aproximação segura até lar temporário, atendimento veterinário e divulgação.",
    image: "/assets/blog-animal-abandonado-2026-07-07.png",
    content: "Encontrar um cão ou gato abandonado costuma gerar urgência e emoção. A ajuda é importante, mas precisa ser feita com segurança para o animal, para quem está ajudando e para as pessoas ao redor. Um resgate responsável começa com calma, observação e decisões práticas.",
    body: [
      "Animais em situação de rua podem estar assustados, com fome, feridos, perdidos ou simplesmente tentando se proteger. Por isso, a primeira atitude não deve ser correr, gritar ou tentar pegar no colo imediatamente. A aproximação precisa respeitar o estado emocional do animal.",
      "Também é importante entender que resgatar não é apenas tirar o animal da rua. O processo envolve acolhimento, avaliação de saúde, busca por tutor, lar temporário, divulgação responsável e, quando for o caso, adoção com critérios. Quanto melhor esse caminho for organizado, maior a chance de o animal realmente ficar seguro."
    ],
    steps: [
      {
        title: "Observe antes de se aproximar",
        text: "Veja se o animal está em local de risco, como avenida movimentada, estacionamento ou área com outros animais. Observe sinais de medo, agressividade, dor, cansaço ou desorientação. Essa leitura inicial ajuda a decidir se é seguro agir sozinho ou se é melhor chamar apoio."
      },
      {
        title: "Aproxime-se devagar e sem pressionar",
        text: "Fale baixo, evite movimentos bruscos e não tente encurralar o animal. Se tiver alimento ou água, coloque no chão a uma distância segura e espere. Muitos cães e gatos precisam de alguns minutos para entender que a aproximação não é uma ameaça."
      },
      {
        title: "Evite colocar a mão diretamente no animal assustado",
        text: "Mesmo animais dóceis podem morder ou arranhar quando estão com dor ou medo. Se precisar conduzir o animal, use guia, toalha, caixa de transporte ou peça ajuda a alguém experiente. Segurança reduz acidentes e evita que o animal fuja para uma área mais perigosa."
      },
      {
        title: "Verifique se ele pode estar perdido",
        text: "Procure coleira, plaquinha, identificação, sinais de tosa recente ou comportamento de animal domiciliado. Tire fotos nítidas e divulgue em grupos locais informando bairro, rua aproximada e características. Evite divulgar todos os detalhes se houver suspeita de tutor: isso ajuda a confirmar quem realmente conhece o animal."
      },
      {
        title: "Ofereça água, sombra e contenção segura",
        text: "Antes de qualquer decisão, tire o animal do sol, ofereça água aos poucos e mantenha-o em ambiente calmo. Se for levá-lo em carro, use caixa de transporte, guia ou contenção adequada. Não transporte animal solto, pois ele pode se assustar e causar acidente."
      },
      {
        title: "Procure avaliação veterinária",
        text: "A consulta ajuda a identificar ferimentos, desidratação, parasitas, doenças transmissíveis, necessidade de exames, vacinas ou medicação. Se houver sangramento, dificuldade para respirar, atropelamento, apatia intensa ou convulsão, trate como emergência."
      },
      {
        title: "Organize lar temporário antes da divulgação para adoção",
        text: "O animal precisa de um local seguro para se recuperar e ser observado. Em casa, mantenha-o separado de outros animais até avaliação veterinária. Separe potes, panos, caixa de areia ou caminha e mantenha uma rotina tranquila."
      },
      {
        title: "Divulgue com responsabilidade",
        text: "Use fotos boas, conte a situação com objetividade e informe necessidades reais: ração, consulta, castração, lar temporário ou adoção. Evite doar o animal para a primeira pessoa interessada. Faça perguntas sobre rotina, segurança da casa, experiência e compromisso com castração e cuidados."
      },
      {
        title: "Peça ajuda, mas não transfira o problema sem combinar",
        text: "ONGs e protetores costumam estar lotados e dependem de recursos. Ao pedir apoio, informe claramente onde o animal está, condição de saúde, fotos, se você pode oferecer transporte, lar temporário ou ajuda com custos. Isso torna o pedido mais viável."
      }
    ],
    closing: "Ajudar um animal abandonado é um gesto de responsabilidade. Quando a ação é organizada, o resgate deixa de ser apenas impulso e vira uma chance real de proteção, recuperação e encaminhamento seguro para uma nova família."
  },
  {
    title: "Calor e pets: passo a passo para proteger cães e gatos nos dias quentes",
    subtitle: "Hidratação, sombra, horários seguros e atenção aos sinais de alerta ajudam a evitar sofrimento.",
    category: "Cuidados",
    summary: "Veja cuidados práticos para manter cães e gatos seguros em dias de calor, especialmente animais resgatados, idosos, filhotes ou em adaptação.",
    image: "/assets/blog-calor-pets-2026-07-02.png",
    content: "Dias quentes exigem atenção redobrada com cães e gatos. Água fresca, sombra, ventilação e rotina ajustada reduzem riscos e tornam o cuidado mais seguro, principalmente para animais resgatados, idosos, filhotes ou pets que ainda estão se adaptando a uma nova casa.",
    body: [
      "O calor pode afetar cães e gatos com rapidez. Diferente das pessoas, eles não conseguem regular a temperatura do corpo da mesma forma, e muitos sinais de desconforto aparecem quando o animal já está cansado, ofegante ou buscando um local mais fresco.",
      "Para ONGs, lares temporários e famílias adotantes, a prevenção é o ponto central. Pequenas decisões de rotina, como trocar a água mais vezes, evitar passeios em horários inadequados e observar o comportamento do animal, ajudam a proteger a saúde e o bem-estar."
    ],
    steps: [
      {
        title: "Mantenha água fresca sempre disponível",
        text: "Use mais de um pote pela casa ou abrigo, lave os recipientes diariamente e troque a água sempre que ela esquentar. Em dias muito quentes, pedras de gelo podem ajudar, desde que o animal aceite bem e não fique assustado."
      },
      {
        title: "Garanta sombra e ventilação",
        text: "O animal precisa ter acesso a locais cobertos, frescos e bem ventilados durante todo o dia. Varandas, quintais e áreas externas só são seguras quando existe sombra real, circulação de ar e possibilidade de entrar em um ambiente mais fresco."
      },
      {
        title: "Evite passeios no sol forte",
        text: "Prefira sair cedo pela manhã ou no fim da tarde. Antes do passeio, encoste a mão no chão por alguns segundos: se estiver desconfortável para você, também pode machucar as patas do cão. Leve água e faça trajetos mais curtos."
      },
      {
        title: "Nunca deixe o animal preso em carro ou local abafado",
        text: "Mesmo por poucos minutos, ambientes fechados podem aquecer rapidamente e colocar o animal em risco. Isso vale para carros, caixas de transporte expostas ao sol, cômodos sem ventilação e áreas pequenas sem sombra."
      },
      {
        title: "Observe sinais de alerta",
        text: "Ofegância intensa, fraqueza, salivação excessiva, vômito, língua muito vermelha, desorientação ou dificuldade para andar exigem atenção imediata. Leve o animal para um local fresco, ofereça água aos poucos e procure atendimento veterinário."
      },
      {
        title: "Ajuste a rotina de alimentação e descanso",
        text: "Alguns pets comem menos nos horários mais quentes. Mantenha a alimentação orientada pelo veterinário, evite exercícios após as refeições e ofereça um local tranquilo para descanso. Animais idosos, braquicefálicos, filhotes e doentes precisam de cuidado extra."
      },
      {
        title: "Use enriquecimento ambiental sem esforço excessivo",
        text: "Brinquedos recheáveis, tapetes úmidos em local ventilado e brincadeiras leves dentro de casa ajudam a gastar energia com menos risco. O objetivo é manter o animal estimulado sem forçar corrida, agitação ou exposição ao calor."
      }
    ],
    closing: "Proteger cães e gatos do calor é uma forma simples e direta de bem-estar animal. Quando a família ou o lar temporário prepara o ambiente, observa sinais e ajusta a rotina, o animal fica mais seguro para descansar, brincar e se adaptar com tranquilidade."
  },
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
