// API do football-data.org
class FootballDataAPI {
    constructor() {
        this.baseURL = 'https://api.football-data.org/v4';
        this.apiKey = '1eb715e66ed44c8da8727c62c071f570';
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
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: {
                    'X-Auth-Token': this.apiKey
                }
            });
            
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
            console.warn(`Erro na API football-data.org: ${error.message}`);
            return null;
        }
    }

    // Buscar competições brasileiras
    async getBrazilianCompetitions() {
        try {
            const data = await this.makeRequest('/competitions?areas=2037');
            return data?.competitions || [];
        } catch (error) {
            console.warn('Erro ao buscar competições brasileiras:', error);
            return [];
        }
    }

    // Buscar times da Série A brasileira
    async getBrazilianSerieATeams() {
        try {
            // ID da Série A brasileira no football-data.org
            const data = await this.makeRequest('/competitions/2013/teams');
            return data?.teams || [];
        } catch (error) {
            console.warn('Erro ao buscar times da Série A:', error);
            return [];
        }
    }

    // Buscar jogadores de um time específico
    async getTeamPlayers(teamId) {
        try {
            const data = await this.makeRequest(`/teams/${teamId}`);
            return data?.squad || [];
        } catch (error) {
            console.warn(`Erro ao buscar jogadores do time ${teamId}:`, error);
            return [];
        }
    }

    // Buscar partidas da Série A
    async getBrazilianSerieAMatches() {
        try {
            const data = await this.makeRequest('/competitions/2013/matches');
            return data?.matches || [];
        } catch (error) {
            console.warn('Erro ao buscar partidas da Série A:', error);
            return [];
        }
    }

    // Buscar tabela da Série A
    async getBrazilianSerieAStandings() {
        try {
            const data = await this.makeRequest('/competitions/2013/standings');
            return data?.standings || [];
        } catch (error) {
            console.warn('Erro ao buscar tabela da Série A:', error);
            return [];
        }
    }

    // Converter dados da API para formato do nosso jogo
    convertTeamData(apiTeam) {
        return {
            id: apiTeam.id,
            nome: apiTeam.name,
            apelido: this.generateNickname(apiTeam.name),
            cidade: apiTeam.area?.name || 'Brasil',
            estado: 'BR',
            tipo: 'Associação',
            riqueza: this.determineClubWealth(apiTeam.name),
            orcamento: this.calculateBudget(apiTeam.name),
            folha_salarial: this.calculateSalary(apiTeam.name),
            estadio: apiTeam.venue || 'Estádio Municipal',
            capacidade: 50000,
            ano_fundacao: apiTeam.founded || 1900,
            elenco: [],
            cores: this.getTeamColors(apiTeam.name),
            cores_hex: this.getTeamColorsHex(apiTeam.name),
            cor_primaria: this.getPrimaryColor(apiTeam.name),
            cor_secundaria: this.getSecondaryColor(apiTeam.name),
            cor_accent: '#FFD700',
            rival: this.getTeamRival(apiTeam.name),
            torcida: 'Grande',
            jovens_promessas: [],
            tecnico: this.generateCoach(apiTeam.name),
            dono: this.generateOwner(apiTeam.name),
            colaboradores: [],
            parceiros: this.generatePartners(apiTeam.name)
        };
    }

    convertPlayerData(apiPlayer) {
        return {
            id: apiPlayer.id,
            nome: apiPlayer.name,
            apelido: this.generatePlayerNickname(apiPlayer.name),
            idade: this.calculateAge(apiPlayer.dateOfBirth),
            posicao: this.convertPosition(apiPlayer.position),
            valor_mercado: this.calculateMarketValue(apiPlayer.position),
            salario: this.calculatePlayerSalary(apiPlayer.position),
            contrato_ate: this.generateContractEnd(),
            origem: this.generateOrigin(),
            atributos: this.generateAttributes(apiPlayer.position),
            perfil_social: this.generateSocialProfile(),
            moral: Math.floor(Math.random() * 40) + 60,
            motivacao: Math.floor(Math.random() * 30) + 70,
            clube_atual: apiPlayer.currentTeam?.id || 'Sem clube'
        };
    }

    // Métodos auxiliares
    generateNickname(name) {
        const nicknames = {
            'Flamengo': 'Mengão',
            'Palmeiras': 'Verdao',
            'São Paulo': 'Tricolor',
            'Atlético Mineiro': 'Galo',
            'Cruzeiro': 'Raposa',
            'Corinthians': 'Timão',
            'Fluminense': 'Tricolor',
            'Grêmio': 'Tricolor',
            'Internacional': 'Colorado',
            'Vasco da Gama': 'Gigante da Colina'
        };
        return nicknames[name] || name;
    }

    determineClubWealth(name) {
        const wealthyClubs = ['Flamengo', 'Palmeiras', 'São Paulo', 'Atlético Mineiro', 'Corinthians'];
        return wealthyClubs.includes(name) ? 'alta' : 'média';
    }

    calculateBudget(name) {
        const baseBudget = this.determineClubWealth(name) === 'alta' ? 150000000 : 80000000;
        return baseBudget + Math.floor(Math.random() * 50000000);
    }

    calculateSalary(name) {
        return this.calculateBudget(name) * 0.1;
    }

    getTeamColors(name) {
        const colors = {
            'Flamengo': ['Vermelho', 'Preto'],
            'Palmeiras': ['Verde', 'Branco'],
            'São Paulo': ['Branco', 'Vermelho', 'Preto'],
            'Atlético Mineiro': ['Preto', 'Branco'],
            'Cruzeiro': ['Azul', 'Branco'],
            'Corinthians': ['Preto', 'Branco'],
            'Fluminense': ['Verde', 'Branco', 'Grená'],
            'Grêmio': ['Azul', 'Preto', 'Branco'],
            'Internacional': ['Vermelho', 'Branco'],
            'Vasco da Gama': ['Preto', 'Branco']
        };
        return colors[name] || ['Branco', 'Preto'];
    }

    getTeamColorsHex(name) {
        const colors = {
            'Flamengo': ['#FF0000', '#000000'],
            'Palmeiras': ['#006400', '#FFFFFF'],
            'São Paulo': ['#FFFFFF', '#FF0000', '#000000'],
            'Atlético Mineiro': ['#000000', '#FFFFFF'],
            'Cruzeiro': ['#0066CC', '#FFFFFF'],
            'Corinthians': ['#000000', '#FFFFFF'],
            'Fluminense': ['#006400', '#FFFFFF', '#8B0000'],
            'Grêmio': ['#0066CC', '#000000', '#FFFFFF'],
            'Internacional': ['#FF0000', '#FFFFFF'],
            'Vasco da Gama': ['#000000', '#FFFFFF']
        };
        return colors[name] || ['#FFFFFF', '#000000'];
    }

    getPrimaryColor(name) {
        const colors = {
            'Flamengo': '#FF0000',
            'Palmeiras': '#006400',
            'São Paulo': '#FFFFFF',
            'Atlético Mineiro': '#000000',
            'Cruzeiro': '#0066CC',
            'Corinthians': '#000000',
            'Fluminense': '#006400',
            'Grêmio': '#0066CC',
            'Internacional': '#FF0000',
            'Vasco da Gama': '#000000'
        };
        return colors[name] || '#FFFFFF';
    }

    getSecondaryColor(name) {
        const colors = {
            'Flamengo': '#000000',
            'Palmeiras': '#FFFFFF',
            'São Paulo': '#FF0000',
            'Atlético Mineiro': '#FFFFFF',
            'Cruzeiro': '#FFFFFF',
            'Corinthians': '#FFFFFF',
            'Fluminense': '#FFFFFF',
            'Grêmio': '#000000',
            'Internacional': '#FFFFFF',
            'Vasco da Gama': '#FFFFFF'
        };
        return colors[name] || '#000000';
    }

    getTeamRival(name) {
        const rivals = {
            'Flamengo': 'Fluminense',
            'Palmeiras': 'Corinthians',
            'São Paulo': 'Corinthians',
            'Atlético Mineiro': 'Cruzeiro',
            'Cruzeiro': 'Atlético Mineiro',
            'Corinthians': 'Palmeiras',
            'Fluminense': 'Flamengo',
            'Grêmio': 'Internacional',
            'Internacional': 'Grêmio',
            'Vasco da Gama': 'Flamengo'
        };
        return rivals[name] || 'Sem rival';
    }

    generateCoach(name) {
        const coaches = {
            'Flamengo': { nome: 'Tite', idade: 63, nacionalidade: 'Brasil', contrato_ate: 2026, salario: 200000, especialidade: 'Futebol ofensivo' },
            'Palmeiras': { nome: 'Abel Ferreira', idade: 45, nacionalidade: 'Portugal', contrato_ate: 2025, salario: 180000, especialidade: 'Futebol tático' },
            'São Paulo': { nome: 'Thiago Carpini', idade: 40, nacionalidade: 'Brasil', contrato_ate: 2025, salario: 120000, especialidade: 'Futebol ofensivo' },
            'Atlético Mineiro': { nome: 'Gabriel Milito', idade: 43, nacionalidade: 'Argentina', contrato_ate: 2025, salario: 150000, especialidade: 'Futebol ofensivo' },
            'Cruzeiro': { nome: 'Fernando Seabra', idade: 47, nacionalidade: 'Brasil', contrato_ate: 2024, salario: 120000, especialidade: 'Futebol defensivo' },
            'Corinthians': { nome: 'António Oliveira', idade: 44, nacionalidade: 'Portugal', contrato_ate: 2025, salario: 140000, especialidade: 'Futebol tático' },
            'Fluminense': { nome: 'Fernando Diniz', idade: 50, nacionalidade: 'Brasil', contrato_ate: 2025, salario: 160000, especialidade: 'Posse de bola' },
            'Grêmio': { nome: 'Renato Gaúcho', idade: 62, nacionalidade: 'Brasil', contrato_ate: 2025, salario: 180000, especialidade: 'Futebol ofensivo' },
            'Internacional': { nome: 'Eduardo Coudet', idade: 50, nacionalidade: 'Argentina', contrato_ate: 2025, salario: 140000, especialidade: 'Futebol ofensivo' },
            'Vasco da Gama': { nome: 'Álvaro Pacheco', idade: 52, nacionalidade: 'Portugal', contrato_ate: 2025, salario: 120000, especialidade: 'Futebol tático' }
        };
        return coaches[name] || { nome: 'Técnico', idade: 45, nacionalidade: 'Brasil', contrato_ate: 2025, salario: 100000, especialidade: 'Futebol' };
    }

    generateOwner(name) {
        const owners = {
            'Flamengo': { nome: 'Rodolfo Landim', idade: 65, nacionalidade: 'Brasil', empresa: 'Associação', patrimonio: 'R$ 100 milhões' },
            'Palmeiras': { nome: 'Leila Pereira', idade: 58, nacionalidade: 'Brasil', empresa: 'Crefisa', patrimonio: 'R$ 2 bilhões' },
            'São Paulo': { nome: 'Julio Casares', idade: 55, nacionalidade: 'Brasil', empresa: 'Associação', patrimonio: 'R$ 50 milhões' },
            'Atlético Mineiro': { nome: 'Rubens Menin', idade: 65, nacionalidade: 'Brasil', empresa: 'MRV Engenharia', patrimonio: 'R$ 2,5 bilhões' },
            'Cruzeiro': { nome: 'Pedro Lourenço', idade: 58, nacionalidade: 'Brasil', empresa: 'Ronaldo Fenômeno', patrimonio: 'R$ 1,8 bilhões' },
            'Corinthians': { nome: 'Duílio Monteiro Alves', idade: 52, nacionalidade: 'Brasil', empresa: 'Associação', patrimonio: 'R$ 30 milhões' },
            'Fluminense': { nome: 'Mário Bittencourt', idade: 55, nacionalidade: 'Brasil', empresa: 'Associação', patrimonio: 'R$ 40 milhões' },
            'Grêmio': { nome: 'Alberto Guerra', idade: 60, nacionalidade: 'Brasil', empresa: 'Associação', patrimonio: 'R$ 20 milhões' },
            'Internacional': { nome: 'Alessandro Barcellos', idade: 58, nacionalidade: 'Brasil', empresa: 'Associação', patrimonio: 'R$ 15 milhões' },
            'Vasco da Gama': { nome: 'Pedro Ernesto', idade: 45, nacionalidade: 'Brasil', empresa: '777 Partners', patrimonio: 'R$ 500 milhões' }
        };
        return owners[name] || { nome: 'Dono', idade: 50, nacionalidade: 'Brasil', empresa: 'Empresa', patrimonio: 'R$ 10 milhões' };
    }

    generatePartners(name) {
        const partners = {
            'Flamengo': [
                { nome: 'Adidas', tipo: 'Fornecedor', valor: 'R$ 80 milhões/ano' },
                { nome: 'Banco BRB', tipo: 'Patrocinador Master', valor: 'R$ 60 milhões/ano' },
                { nome: 'Betano', tipo: 'Patrocinador Oficial', valor: 'R$ 40 milhões/ano' }
            ],
            'Palmeiras': [
                { nome: 'Puma', tipo: 'Fornecedor', valor: 'R$ 70 milhões/ano' },
                { nome: 'Crefisa', tipo: 'Patrocinador Master', valor: 'R$ 50 milhões/ano' },
                { nome: 'Banco C6', tipo: 'Patrocinador Oficial', valor: 'R$ 30 milhões/ano' }
            ]
        };
        return partners[name] || [
            { nome: 'Fornecedor', tipo: 'Fornecedor', valor: 'R$ 20 milhões/ano' },
            { nome: 'Patrocinador', tipo: 'Patrocinador Master', valor: 'R$ 15 milhões/ano' }
        ];
    }

    generatePlayerNickname(name) {
        const parts = name.split(' ');
        return parts[parts.length - 1] || name;
    }

    calculateAge(birthDate) {
        if (!birthDate) return 25;
        const birth = new Date(birthDate);
        const today = new Date();
        return today.getFullYear() - birth.getFullYear();
    }

    convertPosition(position) {
        const positions = {
            'Goalkeeper': 'Goleiro',
            'Defender': 'Zagueiro',
            'Midfielder': 'Meia',
            'Forward': 'Atacante'
        };
        return positions[position] || 'Meia';
    }

    calculateMarketValue(position) {
        const baseValues = {
            'Goleiro': 5000000,
            'Zagueiro': 8000000,
            'Meia': 10000000,
            'Atacante': 15000000
        };
        return baseValues[position] || 8000000;
    }

    calculatePlayerSalary(position) {
        return this.calculateMarketValue(position) * 0.01;
    }

    generateContractEnd() {
        const year = new Date().getFullYear() + Math.floor(Math.random() * 3) + 1;
        return year;
    }

    generateOrigin() {
        const origins = [
            'Favela da Pampulha, BH', 'Morro do Alemão, RJ', 'Heliópolis, SP',
            'Rocinha, RJ', 'Paraisópolis, SP', 'Complexo do Alemão, RJ'
        ];
        return origins[Math.floor(Math.random() * origins.length)];
    }

    generateAttributes(position) {
        const baseAttributes = {
            'Goleiro': { tecnica: 80, fisico: 75, mental: 85, velocidade: 60, finalizacao: 30, passe: 70, defesa: 90 },
            'Zagueiro': { tecnica: 70, fisico: 85, mental: 75, velocidade: 65, finalizacao: 50, passe: 75, defesa: 85 },
            'Meia': { tecnica: 85, fisico: 70, mental: 80, velocidade: 75, finalizacao: 70, passe: 90, defesa: 60 },
            'Atacante': { tecnica: 80, fisico: 75, mental: 70, velocidade: 85, finalizacao: 90, passe: 75, defesa: 40 }
        };
        
        const base = baseAttributes[position] || baseAttributes['Meia'];
        return {
            tecnica: base.tecnica + Math.floor(Math.random() * 20) - 10,
            fisico: base.fisico + Math.floor(Math.random() * 20) - 10,
            mental: base.mental + Math.floor(Math.random() * 20) - 10,
            velocidade: base.velocidade + Math.floor(Math.random() * 20) - 10,
            finalizacao: base.finalizacao + Math.floor(Math.random() * 20) - 10,
            passe: base.passe + Math.floor(Math.random() * 20) - 10,
            defesa: base.defesa + Math.floor(Math.random() * 20) - 10
        };
    }

    generateSocialProfile() {
        return {
            origem_social: this.generateOrigin(),
            familia: this.getFamiliaAleatoria(),
            educacao: this.getEducacaoAleatoria(),
            sonho: this.getSonhoAleatorio(),
            comportamento: ['Estável', 'Instável', 'Profissional', 'Problemático'][Math.floor(Math.random() * 4)],
            ambicao: Math.floor(Math.random() * 40) + 60,
            disciplina: Math.floor(Math.random() * 40) + 60,
            influencia_social: Math.floor(Math.random() * 30) + 40,
            problemas_extra_campo: []
        };
    }

    getFamiliaAleatoria() {
        const familias = [
            'Família humilde, pai pedreiro, mãe doméstica',
            'Família de classe média, pais comerciantes',
            'Família pobre, pai desempregado, mãe faxineira',
            'Família simples, pai motorista, mãe costureira'
        ];
        return familias[Math.floor(Math.random() * familias.length)];
    }

    getEducacaoAleatoria() {
        const educacoes = [
            'Ensino médio incompleto',
            'Ensino médio completo',
            'Ensino fundamental completo',
            'Cursando faculdade'
        ];
        return educacoes[Math.floor(Math.random() * educacoes.length)];
    }

    getSonhoAleatorio() {
        const sonhos = [
            'Comprar casa para a família',
            'Jogar na Europa',
            'Ser campeão brasileiro',
            'Ajudar a comunidade'
        ];
        return sonhos[Math.floor(Math.random() * sonhos.length)];
    }
}

window.FootballDataAPI = FootballDataAPI; 