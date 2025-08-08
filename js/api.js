// API para dados de futebol brasileiro
class FootballAPI {
    constructor() {
        this.baseURL = 'https://transfermarkt-api.fly.dev';
        this.rateLimitDelay = 1000; // 1 segundo entre requisições
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
    }

    async makeRequest(endpoint) {
        const cacheKey = endpoint;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
            
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.warn(`Erro na API: ${error.message}, usando dados locais`);
            return null;
        }
    }

    async getBrazilianClubs() {
        try {
            const data = await this.makeRequest('/clubs?country=BR&limit=20');
            
            if (data && data.clubs) {
                return data.clubs.map(club => ({
                    id: club.id,
                    nome: club.name,
                    apelido: this.generateNickname(club.name),
                    tipo: this.determineClubType(club.name),
                    riqueza: this.determineClubWealth(club.name),
                    orcamento: this.calculateBudget(club.name),
                    folha_salarial: this.calculateSalary(club.name),
                    elenco: []
                }));
            }
        } catch (error) {
            console.warn('Erro ao buscar clubes da API:', error);
        }
        
        return this.getFallbackClubs();
    }

    async getBrazilianPlayers() {
        try {
            const data = await this.makeRequest('/players?country=BR&limit=50');
            
            if (data && data.players) {
                return data.players.map(player => ({
                    id: player.id,
                    nome: player.name,
                    apelido: this.generatePlayerNickname(player.name),
                    idade: this.calculateAge(player.birthDate),
                    posicao: player.position || this.determinePosition(player.name),
                    valor_mercado: this.parseMarketValue(player.marketValue),
                    salario: this.calculatePlayerSalary(player.marketValue),
                    contrato_ate: this.generateContractEnd(),
                    origem: this.generateOrigin(),
                    atributos: this.generateAttributes(),
                    perfil_social: this.generateSocialProfile(),
                    moral: Math.floor(Math.random() * 40) + 60, // 60-100
                    motivacao: Math.floor(Math.random() * 30) + 70, // 70-100
                    clube_atual: player.club || 'Sem clube'
                }));
            }
        } catch (error) {
            console.warn('Erro ao buscar jogadores da API:', error);
        }
        
        return this.getFallbackPlayers();
    }

    async getFootballNews() {
        try {
            const data = await this.makeRequest('/news?country=BR&limit=10');
            
            if (data && data.news) {
                return data.news.map(news => ({
                    id: news.id,
                    titulo: news.title,
                    resumo: news.summary,
                    data: news.date,
                    impacto: this.determineNewsImpact(news.title),
                    fonte: news.source || 'Transfermarkt'
                }));
            }
        } catch (error) {
            console.warn('Erro ao buscar notícias da API:', error);
        }
        
        return this.getFallbackNews();
    }

    // Métodos auxiliares melhorados
    generateNickname(clubName) {
        const nicknames = {
            'Flamengo': 'Mengão',
            'Palmeiras': 'Verdao',
            'Corinthians': 'Timão',
            'São Paulo': 'Tricolor',
            'Santos': 'Peixe',
            'Grêmio': 'Imortal',
            'Internacional': 'Colorado',
            'Atlético Mineiro': 'Galo',
            'Cruzeiro': 'Raposa',
            'Vasco da Gama': 'Gigante',
            'Botafogo': 'Fogão',
            'Fluminense': 'Tricolor',
            'Athletico Paranaense': 'Furacão',
            'Fortaleza': 'Leão',
            'Ceará': 'Vovô',
            'Bahia': 'Tricolor',
            'Vitória': 'Leão',
            'Sport': 'Leão',
            'Náutico': 'Timbu',
            'Santa Cruz': 'Cobra Coral'
        };
        
        return nicknames[clubName] || clubName.substring(0, 3).toUpperCase();
    }

    determineClubType(clubName) {
        const safClubs = ['Palmeiras', 'Botafogo', 'Cruzeiro', 'Vasco da Gama', 'Bahia', 'Vitória'];
        return safClubs.includes(clubName) ? 'SAF' : 'Associação';
    }

    determineClubWealth(clubName) {
        const ricos = ['Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo'];
        const medios = ['Santos', 'Grêmio', 'Internacional', 'Atlético Mineiro', 'Botafogo'];
        
        if (ricos.includes(clubName)) return 'alta';
        if (medios.includes(clubName)) return 'média';
        return 'baixa';
    }

    calculateBudget(clubName) {
        const budgets = {
            'Flamengo': 150000000,
            'Palmeiras': 120000000,
            'Corinthians': 100000000,
            'São Paulo': 80000000,
            'Santos': 60000000,
            'Grêmio': 70000000,
            'Internacional': 75000000,
            'Atlético Mineiro': 50000000,
            'Cruzeiro': 85000000,
            'Vasco da Gama': 40000000,
            'Botafogo': 90000000,
            'Fluminense': 55000000,
            'Athletico Paranaense': 45000000,
            'Fortaleza': 30000000,
            'Ceará': 25000000,
            'Bahia': 35000000,
            'Vitória': 20000000,
            'Sport': 15000000,
            'Náutico': 10000000,
            'Santa Cruz': 8000000
        };
        
        return budgets[clubName] || 20000000;
    }

    calculateSalary(clubName) {
        return this.calculateBudget(clubName) * 0.15; // 15% do orçamento
    }

    generatePlayerNickname(name) {
        const nicknames = {
            'Vinicius': 'Vini Jr',
            'Rodrygo': 'Rodrygo',
            'Endrick': 'Endrick',
            'Pedro': 'Pedro',
            'Gabriel': 'Gabigol',
            'Bruno': 'Bruno Henrique',
            'Arrascaeta': 'Arrascaeta',
            'Everton': 'Cebolinha',
            'Richarlison': 'Richarlison',
            'Neymar': 'Neymar',
            'Casemiro': 'Casemiro',
            'Thiago': 'Thiago Silva',
            'Alisson': 'Alisson',
            'Ederson': 'Ederson',
            'Fabinho': 'Fabinho',
            'Roberto': 'Roberto Firmino',
            'Philippe': 'Philippe Coutinho',
            'Arthur': 'Arthur',
            'Paulinho': 'Paulinho',
            'Willian': 'Willian'
        };
        
        return nicknames[name] || name.split(' ')[0];
    }

    calculateAge(birthDate) {
        if (!birthDate) return Math.floor(Math.random() * 15) + 18; // 18-32 anos
        
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    determinePosition(name) {
        const positions = ['Atacante', 'Meio-campo', 'Defensor', 'Goleiro'];
        return positions[Math.floor(Math.random() * positions.length)];
    }

    parseMarketValue(value) {
        if (!value) return Math.floor(Math.random() * 50000000) + 1000000;
        
        // Converter valores como "€50.00m" para números
        const match = value.match(/€([\d.]+)([km])?/);
        if (match) {
            let num = parseFloat(match[1]);
            if (match[2] === 'k') num *= 1000;
            if (match[2] === 'm') num *= 1000000;
            return num;
        }
        
        return Math.floor(Math.random() * 50000000) + 1000000;
    }

    calculatePlayerSalary(marketValue) {
        return Math.floor(marketValue * 0.1); // 10% do valor de mercado
    }

    generateContractEnd() {
        const years = [2024, 2025, 2026, 2027, 2028];
        return years[Math.floor(Math.random() * years.length)];
    }

    generateOrigin() {
        const origins = [
            'Favela do Rio', 'Periferia de São Paulo', 'Interior de Minas',
            'Nordeste Brasileiro', 'Sul do Brasil', 'Centro-Oeste',
            'Comunidade carente', 'Classe média', 'Família rica',
            'Projeto social', 'Escola de futebol', 'Várzea'
        ];
        return origins[Math.floor(Math.random() * origins.length)];
    }

    generateAttributes() {
        return {
            tecnica: Math.floor(Math.random() * 30) + 70,
            fisica: Math.floor(Math.random() * 30) + 70,
            mental: Math.floor(Math.random() * 30) + 70,
            velocidade: Math.floor(Math.random() * 30) + 70,
            resistencia: Math.floor(Math.random() * 30) + 70,
            lideranca: Math.floor(Math.random() * 30) + 70
        };
    }

    generateSocialProfile() {
        const comportamentos = ['exemplar', 'tranquilo', 'problemático', 'controversa'];
        const ambicoes = ['alta', 'média', 'baixa'];
        const disciplinas = ['excelente', 'boa', 'regular', 'ruim'];
        
        return {
            comportamento: comportamentos[Math.floor(Math.random() * comportamentos.length)],
            ambicao: ambicoes[Math.floor(Math.random() * ambicoes.length)],
            disciplina: disciplinas[Math.floor(Math.random() * disciplinas.length)],
            influencia_social: Math.floor(Math.random() * 100),
            problemas_extra_campo: Math.random() > 0.7 // 30% chance de ter problemas
        };
    }

    determineNewsImpact(title) {
        const impactWords = ['transferência', 'contratação', 'venda', 'lesão', 'suspensão', 'polêmica'];
        const hasImpact = impactWords.some(word => title.toLowerCase().includes(word));
        return hasImpact ? 'alto' : 'baixo';
    }

    // Dados de fallback
    getFallbackClubs() {
        return [
            {
                id: 1,
                nome: 'Flamengo',
                apelido: 'Mengão',
                tipo: 'Associação',
                riqueza: 'alta',
                orcamento: 150000000,
                folha_salarial: 22500000,
                elenco: []
            },
            {
                id: 2,
                nome: 'Palmeiras',
                apelido: 'Verdao',
                tipo: 'SAF',
                riqueza: 'alta',
                orcamento: 120000000,
                folha_salarial: 18000000,
                elenco: []
            },
            {
                id: 3,
                nome: 'Corinthians',
                apelido: 'Timão',
                tipo: 'Associação',
                riqueza: 'alta',
                orcamento: 100000000,
                folha_salarial: 15000000,
                elenco: []
            },
            {
                id: 4,
                nome: 'São Paulo',
                apelido: 'Tricolor',
                tipo: 'Associação',
                riqueza: 'alta',
                orcamento: 80000000,
                folha_salarial: 12000000,
                elenco: []
            },
            {
                id: 5,
                nome: 'Santos',
                apelido: 'Peixe',
                tipo: 'Associação',
                riqueza: 'média',
                orcamento: 60000000,
                folha_salarial: 9000000,
                elenco: []
            }
        ];
    }

    getFallbackPlayers() {
        return [
            {
                id: 1,
                nome: 'Vinicius Jr',
                apelido: 'Vini Jr',
                idade: 23,
                posicao: 'Atacante',
                valor_mercado: 150000000,
                salario: 15000000,
                contrato_ate: 2027,
                origem: 'Favela do Rio',
                atributos: { tecnica: 85, fisica: 80, mental: 75, velocidade: 90, resistencia: 85, lideranca: 70 },
                perfil_social: { comportamento: 'exemplar', ambicao: 'alta', disciplina: 'excelente', influencia_social: 85, problemas_extra_campo: false },
                moral: 90,
                motivacao: 95,
                clube_atual: 'Real Madrid'
            },
            {
                id: 2,
                nome: 'Endrick',
                apelido: 'Endrick',
                idade: 17,
                posicao: 'Atacante',
                valor_mercado: 80000000,
                salario: 8000000,
                contrato_ate: 2029,
                origem: 'Periferia de São Paulo',
                atributos: { tecnica: 80, fisica: 75, mental: 70, velocidade: 85, resistencia: 80, lideranca: 65 },
                perfil_social: { comportamento: 'exemplar', ambicao: 'alta', disciplina: 'excelente', influencia_social: 75, problemas_extra_campo: false },
                moral: 95,
                motivacao: 100,
                clube_atual: 'Palmeiras'
            },
            {
                id: 3,
                nome: 'Rodrygo',
                apelido: 'Rodrygo',
                idade: 22,
                posicao: 'Atacante',
                valor_mercado: 100000000,
                salario: 10000000,
                contrato_ate: 2028,
                origem: 'Interior de Minas',
                atributos: { tecnica: 82, fisica: 78, mental: 80, velocidade: 88, resistencia: 82, lideranca: 75 },
                perfil_social: { comportamento: 'tranquilo', ambicao: 'alta', disciplina: 'boa', influencia_social: 70, problemas_extra_campo: false },
                moral: 88,
                motivacao: 92,
                clube_atual: 'Real Madrid'
            },
            {
                id: 4,
                nome: 'Pedro',
                apelido: 'Pedro',
                idade: 26,
                posicao: 'Atacante',
                valor_mercado: 45000000,
                salario: 4500000,
                contrato_ate: 2026,
                origem: 'Nordeste Brasileiro',
                atributos: { tecnica: 78, fisica: 82, mental: 75, velocidade: 75, resistencia: 85, lideranca: 70 },
                perfil_social: { comportamento: 'exemplar', ambicao: 'média', disciplina: 'excelente', influencia_social: 60, problemas_extra_campo: false },
                moral: 85,
                motivacao: 88,
                clube_atual: 'Flamengo'
            },
            {
                id: 5,
                nome: 'Gabriel Barbosa',
                apelido: 'Gabigol',
                idade: 27,
                posicao: 'Atacante',
                valor_mercado: 35000000,
                salario: 3500000,
                contrato_ate: 2025,
                origem: 'Favela do Rio',
                atributos: { tecnica: 80, fisica: 78, mental: 70, velocidade: 75, resistencia: 80, lideranca: 65 },
                perfil_social: { comportamento: 'problemático', ambicao: 'alta', disciplina: 'regular', influencia_social: 80, problemas_extra_campo: true },
                moral: 65,
                motivacao: 70,
                clube_atual: 'Flamengo'
            }
        ];
    }

    getFallbackNews() {
        return [
            {
                id: 1,
                titulo: 'Flamengo anuncia nova contratação para o ataque',
                resumo: 'Clube carioca reforça elenco com atacante promessa',
                data: '2024-01-15',
                impacto: 'alto',
                fonte: 'Transfermarkt'
            },
            {
                id: 2,
                titulo: 'Palmeiras vence clássico e mantém liderança',
                resumo: 'Verde vence rival por 2x1 e segue na ponta',
                data: '2024-01-14',
                impacto: 'médio',
                fonte: 'Transfermarkt'
            },
            {
                id: 3,
                titulo: 'Jogador brasileiro é cotado por clube europeu',
                resumo: 'Atacante despertou interesse de gigante europeu',
                data: '2024-01-13',
                impacto: 'alto',
                fonte: 'Transfermarkt'
            }
        ];
    }
}

// Exportar para uso global
window.FootballAPI = FootballAPI; 