# Onze Vidas FC v1.0 - Brasileirão 2025 Simulator

> **ℹ️ DISCLAIMER**: Este projeto foi desenvolvido em colaboração com Inteligência Artificial. O usuário forneceu as diretrizes, conceitos e funcionalidades desejadas, enquanto a IA implementou o código, design e estrutura técnica. O resultado é um simulador do Brasileirão 2025 único que combina visão humana com capacidades de desenvolvimento de IA.

## 🏆 **Brasileirão 2025 - Dados Reais**

Baseado nas informações oficiais do [Campeonato Brasileiro 2025](https://pt.wikipedia.org/wiki/Campeonato_Brasileiro_de_Futebol_de_2025_-_Série_A) e [Transfermarkt](https://www.transfermarkt.com.br/serie-a/startseite/wettbewerb/BRA1), o jogo inclui:

- **20 clubes da Série A** com dados atualizados
- **Técnicos reais** (Tite, Abel Ferreira, Fernando Diniz, etc.)
- **Jogadores atuais** (Gabigol, Endrick, Luis Suárez, etc.)
- **Patrocinadores oficiais** (Adidas, Nike, Puma, etc.)
- **Estádios reais** (Maracanã, Allianz Parque, Arena MRV, etc.)
- **Orçamentos e folhas salariais** baseados em dados reais

Um simulador de futebol brasileiro que vai além do campo, abordando aspectos sociais, financeiros e psicológicos dos jogadores. O jogo foca no realismo social e na crítica humana, respeitando o jogador como ser humano e expondo as complexidades reais por trás do futebol.

## 🤝 Desenvolvimento Colaborativo

Este projeto representa uma nova forma de desenvolvimento de software, onde **visão humana** e **capacidades de IA** se complementam:

### 👤 **Contribuição Humana**
- **Conceito e Diretrizes**: Ideias originais e visão do projeto
- **Funcionalidades**: Especificação de features e mecânicas de jogo
- **Feedback e Iteração**: Refinamento contínuo baseado em testes
- **Contexto Social**: Compreensão das realidades do futebol brasileiro

### 🤖 **Contribuição da IA**
- **Implementação Técnica**: Código, arquitetura e estrutura
- **Design Visual**: Interface, animações e experiência do usuário
- **Otimização**: Performance, responsividade e acessibilidade
- **Documentação**: README, comentários e organização do código

### 🎯 **Resultado**
Um simulador único que combina a **criatividade humana** com a **eficiência técnica da IA**, demonstrando o potencial da colaboração humano-máquina no desenvolvimento de software.

## 🎯 Conceito

**Onze Vidas FC** é um jogo que simula a gestão de clubes de futebol brasileiro com foco em:

- **Realismo Social**: Jogadores com perfis sociais realistas, incluindo origem, família, educação e sonhos
- **Gestão Humana**: Problemas como faltas a treinos, festas excessivas, drogas, brigas em campo
- **Intervenção Social**: Sistema de ações para resgatar jogadores (conversas, presentes, ajuda familiar)
- **Diversidade Econômica**: Clubes com diferentes níveis de riqueza (SAF vs Associação)
- **Moral e Motivação**: Sistema que afeta performance baseado em decisões do técnico

## 🏗️ Arquitetura MVC

O projeto segue o padrão **Model-View-Controller** com arquivos separados:

```
onze-vidas-fc/
├── index.html          ← View (Interface)
├── css/
│   └── style.css       ← Estilos
├── js/
│   ├── model.js        ← Dados e lógica de negócio
│   ├── view.js         ← Manipulação do DOM
│   └── controller.js   ← Lógica que conecta tudo
└── dados/
    ├── clubes.json     ← Dados dos clubes
    └── jogadores.json  ← Dados dos jogadores
```

## 🎮 Funcionalidades

### Seleção de Clube
- Escolha entre clubes reais brasileiros
- Informações sobre riqueza, tipo (SAF/Associação), elenco
- Diferentes orçamentos e capacidades

### Gestão de Elenco
- Visualização completa dos jogadores
- Filtros por posição
- Ordenação por moral
- Detalhes completos de cada jogador

### Mercado de Transferências
- Contratação e venda de jogadores
- Sistema de valores baseado em atributos
- Atualização automática de orçamento e folha salarial

### Sistema de Escalação
- Formações táticas (4-4-2, 4-3-3, 3-5-2, 4-2-3-1)
- Simulação de jogos baseada em atributos e moral
- Resultados que afetam a moral do elenco

### Gestão Financeira
- Controle de orçamento
- Folha salarial
- Próximos vencimentos
- Diferentes capacidades financeiras por clube

### Perfil Social dos Jogadores
- **Origem Social**: Favela, classe média, classe alta, interior
- **Família**: Situação familiar realista
- **Educação**: Nível educacional variado
- **Sonhos**: Objetivos pessoais de cada jogador
- **Problemas**: Faltas, drogas, brigas, dívidas de jogo

### Sistema de Intervenção Social
- **Conversa**: R$ 1.000 - Melhora disciplina e moral
- **Presente**: R$ 5.000 (ricos) / R$ 500 (pobres) - Presentes adequados à riqueza do clube
- **Ajuda Familiar**: R$ 10.000 - Intervenção mais profunda

## 🎨 Interface v1.0

- **Design Moderno**: Interface completamente renovada com design contemporâneo
- **Cores Vibrantes**: Paleta de cores inspirada no futebol brasileiro
- **Animações Suaves**: Transições e efeitos visuais fluidos
- **Cards Interativos**: Cards de jogadores e clubes com hover effects
- **Sistema de Abas**: Organização clara das funcionalidades
- **Barras de Progresso**: Visualização intuitiva de atributos e moral
- **Modal Detalhado**: Informações completas dos jogadores
- **Sistema de Mensagens**: Feedback visual para ações do usuário
- **Responsividade**: Adaptação perfeita para diferentes dispositivos
- **Cores dos Times**: Cada clube tem suas cores características
- **Elementos Brasileiros**: Temática focada no futebol brasileiro

## 🏆 Clubes Disponíveis

### Clubes Ricos (SAF)
- **Atlético Mineiro**: R$ 50 milhões de orçamento
- **Cruzeiro**: R$ 45 milhões de orçamento

### Clubes Médios (Associação)
- **América Mineiro**: R$ 15 milhões de orçamento

### Clubes Pobres (Associação)
- **Tupi FC**: R$ 2 milhões de orçamento
- **Villa Nova**: R$ 1 milhão de orçamento

## 👥 Perfis de Jogadores

### Exemplos de Perfis Sociais

**Carlos Silva (Meia)**
- Origem: Favela da Pampulha
- Família: Mãe solteira, 3 irmãos
- Educação: Ensino médio incompleto
- Problemas: Faltas a treinos, festas excessivas
- Sonho: Comprar casa para a mãe

**João Bento (Atacante)**
- Origem: Favela de Juiz de Fora
- Família: Mãe vendedora ambulante, pai preso
- Educação: Ensino fundamental incompleto
- Problemas: Faltas constantes, drogas, gangues
- Sonho: Sair da favela

**Pedro Santos (Atacante)**
- Origem: Família rica de BH
- Família: Pai empresário, mãe advogada
- Educação: Ensino superior em Administração
- Problemas: Nenhum
- Sonho: Ser referência no futebol

## 🎯 Como Jogar

1. **Selecione um Clube**: Escolha entre os clubes disponíveis
2. **Gerencie o Elenco**: Visualize e organize seus jogadores
3. **Faça Transferências**: Contrate e venda jogadores no mercado
4. **Monte a Escalação**: Escolha formação e escalação
5. **Simule Jogos**: Veja resultados baseados em atributos e moral
6. **Intervenha Socialmente**: Ajude jogadores com problemas
7. **Gerencie Finanças**: Controle orçamento e folha salarial

## 🚀 Como Executar

### 🌐 **Online (Recomendado)**

* **Domínio Principal:** https://onzevidasfc.com.br
* **Vercel:** https://onze-vidas-fc.vercel.app
* **GitHub Pages:** https://jamesismos.github.io/OnzeVidas-FC

### 💻 **Local**
1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador
3. Ou use um servidor local:
   ```bash
   python -m http.server 8000
   # ou
   npx serve .
   ```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da interface
- **CSS3**: Estilização moderna e responsiva com variáveis CSS
- **JavaScript ES6+**: Lógica do jogo e interações
- **JSON**: Armazenamento de dados
- **Fetch API**: Carregamento de dados
- **Transfermarkt API**: Dados reais de jogadores e clubes brasileiros
- **Google Fonts**: Tipografia Poppins para melhor legibilidade
- **CSS Grid & Flexbox**: Layout responsivo e moderno
- **CSS Animations**: Efeitos visuais e transições suaves

## 📡 Integração com API Real

O jogo utiliza a [Transfermarkt API](https://github.com/felipeall/transfermarkt-api) para obter dados reais de futebol brasileiro:

- **Clubes Reais**: Dados atualizados de clubes brasileiros
- **Jogadores Reais**: Nomes, idades, posições e valores de mercado reais
- **Notícias Atuais**: Informações sobre transferências e eventos do futebol
- **Sistema de Cache**: Otimização de performance com cache de 5 minutos
- **Fallback Inteligente**: Dados locais em caso de falha da API

Para mais detalhes sobre a integração, consulte o arquivo `API_INTEGRATION.md`.

## 🎨 Características Visuais v1.0

- **Design Contemporâneo**: Interface moderna com foco na experiência do usuário
- **Paleta Brasileira**: Cores inspiradas no futebol brasileiro (verde, amarelo, azul)
- **Estados Visuais**: Cores que representam estados (vermelho para baixa moral, verde para alta)
- **Animações Fluidas**: Transições suaves e efeitos visuais responsivos
- **Cards Interativos**: Hover effects e feedback visual imediato
- **Tipografia Moderna**: Fonte Poppins para melhor legibilidade
- **Layout Responsivo**: Adaptação perfeita para desktop, tablet e mobile
- **Cores dos Times**: Cada clube tem sua identidade visual única
- **Elementos Temáticos**: Ícones e elementos específicos do futebol brasileiro
- **Acessibilidade**: Suporte para preferências de movimento reduzido

## 🔮 Próximas Funcionalidades

### Funcionalidades de Jogo
- Sistema de campeonato
- Eventos aleatórios (lesões, problemas familiares)
- Sistema de treinos e desenvolvimento
- Relatórios de performance
- Sistema de torcida e pressão
- Mais clubes e jogadores
- Sistema de temporadas

### Melhorias Visuais
- Modo escuro automático
- Mais animações e efeitos visuais
- Avatares personalizados para jogadores
- Gráficos de performance interativos
- Temas visuais por região do Brasil
- Efeitos sonoros e feedback tátil

## 📝 Licença

Este projeto é desenvolvido para fins educacionais e de entretenimento, respeitando a realidade social do futebol brasileiro.

## 🔬 Metodologia de Desenvolvimento

### Processo Colaborativo
1. **Definição de Conceito**: Usuário define a visão e objetivos do projeto
2. **Especificação de Features**: Detalhamento das funcionalidades desejadas
3. **Implementação IA**: Desenvolvimento técnico e visual pela IA
4. **Feedback e Iteração**: Refinamento baseado em testes e sugestões
5. **Otimização**: Melhorias contínuas de performance e UX

### Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Design**: Figma (conceitos), CSS Grid/Flexbox
- **APIs**: Transfermarkt API para dados reais
- **Deploy**: Vercel, GitHub Pages
- **Colaboração**: GitHub, desenvolvimento iterativo

### Benefícios da Colaboração Humano-IA
- **Rapidez**: Desenvolvimento acelerado com qualidade
- **Criatividade**: Combinação de visão humana e capacidades técnicas
- **Flexibilidade**: Adaptação rápida a mudanças e feedback
- **Inovação**: Exploração de novas possibilidades de desenvolvimento

---

**Onze Vidas FC** - Porque cada jogador tem uma história, e cada história importa.

*Desenvolvido em colaboração com Inteligência Artificial - Demonstrando o futuro do desenvolvimento de software.*


