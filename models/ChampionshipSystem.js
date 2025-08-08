// Sistema de Campeonatos e Títulos
class ChampionshipSystem {
    constructor() {
        this.campeonatos = [
            {
                id: 'brasileirao',
                nome: 'Brasileirão Série A',
                tipo: 'nacional',
                temporada: 2025,
                participantes: 20,
                formato: 'pontos corridos',
                premio_campeao: 50000000, // R$ 50 milhões
                premio_vice: 25000000,    // R$ 25 milhões
                premio_terceiro: 15000000, // R$ 15 milhões
                premio_libertadores: [1, 2, 3, 4], // Posições que vão para Libertadores
                premio_sulamericana: [5, 6, 7, 8], // Posições que vão para Sul-Americana
                rebaixamento: [17, 18, 19, 20], // Posições rebaixadas
                pontos_vitoria: 3,
                pontos_empate: 1,
                pontos_derrota: 0
            },
            {
                id: 'libertadores',
                nome: 'Copa Libertadores',
                tipo: 'continental',
                temporada: 2025,
                participantes: 32,
                formato: 'eliminatória',
                premio_campeao: 15000000, // US$ 15 milhões
                premio_vice: 7000000,     // US$ 7 milhões
                premio_semifinal: 3000000, // US$ 3 milhões
                premio_quartas: 1500000,   // US$ 1.5 milhões
                premio_oitavas: 800000     // US$ 800 mil
            },
            {
                id: 'sulamericana',
                nome: 'Copa Sul-Americana',
                tipo: 'continental',
                temporada: 2025,
                participantes: 44,
                formato: 'eliminatória',
                premio_campeao: 5000000,  // US$ 5 milhões
                premio_vice: 2000000,     // US$ 2 milhões
                premio_semifinal: 1000000, // US$ 1 milhão
                premio_quartas: 500000     // US$ 500 mil
            },
            {
                id: 'copa_brasil',
                nome: 'Copa do Brasil',
                tipo: 'nacional',
                temporada: 2025,
                participantes: 92,
                formato: 'eliminatória',
                premio_campeao: 60000000, // R$ 60 milhões
                premio_vice: 25000000,    // R$ 25 milhões
                premio_semifinal: 8000000, // R$ 8 milhões
                premio_quartas: 3000000    // R$ 3 milhões
            },
            {
                id: 'estadual',
                nome: 'Campeonato Estadual',
                tipo: 'regional',
                temporada: 2025,
                participantes: 16,
                formato: 'pontos corridos + playoffs',
                premio_campeao: 5000000,  // R$ 5 milhões
                premio_vice: 2500000,     // R$ 2.5 milhões
                premio_semifinal: 1000000  // R$ 1 milhão
            }
        ];

        this.titulos = [
            {
                id: 'brasileirao_2024',
                nome: 'Brasileirão 2024',
                campeao: 'Palmeiras',
                vice: 'Botafogo',
                terceiro: 'Atlético Mineiro',
                quarto: 'Flamengo'
            },
            {
                id: 'libertadores_2024',
                nome: 'Libertadores 2024',
                campeao: 'Flamengo',
                vice: 'Boca Juniors',
                terceiro: 'Palmeiras',
                quarto: 'São Paulo'
            },
            {
                id: 'copa_brasil_2024',
                nome: 'Copa do Brasil 2024',
                campeao: 'Palmeiras',
                vice: 'São Paulo',
                terceiro: 'Flamengo',
                quarto: 'Corinthians'
            },
            {
                id: 'brasileirao_2023',
                nome: 'Brasileirão 2023',
                campeao: 'Palmeiras',
                vice: 'Botafogo',
                terceiro: 'Atlético Mineiro',
                quarto: 'Flamengo'
            },
            {
                id: 'libertadores_2023',
                nome: 'Libertadores 2023',
                campeao: 'Flamengo',
                vice: 'Boca Juniors',
                terceiro: 'Palmeiras',
                quarto: 'São Paulo'
            }
        ];

        this.premiacoes = [
            {
                id: 'bola_ouro',
                nome: 'Bola de Ouro',
                descricao: 'Melhor jogador do Brasileirão',
                premio: 1000000, // R$ 1 milhão
                criterios: ['Gols', 'Assistências', 'Avaliação', 'Títulos']
            },
            {
                id: 'artilheiro',
                nome: 'Artilheiro',
                descricao: 'Maior goleador do Brasileirão',
                premio: 500000, // R$ 500 mil
                criterios: ['Gols marcados']
            },
            {
                id: 'craque_brasileiro',
                nome: 'Craque do Brasileirão',
                descricao: 'Melhor jogador da competição',
                premio: 2000000, // R$ 2 milhões
                criterios: ['Performance', 'Títulos', 'Votos da torcida']
            },
            {
                id: 'gol_mais_bonito',
                nome: 'Gol Mais Bonito',
                descricao: 'Melhor gol da temporada',
                premio: 100000, // R$ 100 mil
                criterios: ['Beleza', 'Dificuldade', 'Importância']
            },
            {
                id: 'revelacao',
                nome: 'Revelação',
                descricao: 'Melhor jogador revelação',
                premio: 300000, // R$ 300 mil
                criterios: ['Idade', 'Performance', 'Potencial']
            }
        ];

        this.historico_clubes = {
            'flamengo': {
                titulos: [
                    { ano: 2024, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2023, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2022, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2021, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2020, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2019, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2019, competicao: 'Brasileirão', posicao: 1 }
                ],
                total_titulos: 7,
                libertadores: 3,
                brasileiroes: 4
            },
            'palmeiras': {
                titulos: [
                    { ano: 2024, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2024, competicao: 'Copa do Brasil', posicao: 1 },
                    { ano: 2023, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2022, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2021, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2020, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2018, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2016, competicao: 'Brasileirão', posicao: 1 }
                ],
                total_titulos: 8,
                libertadores: 3,
                brasileiroes: 5
            },
            'sao_paulo': {
                titulos: [
                    { ano: 2023, competicao: 'Copa do Brasil', posicao: 1 },
                    { ano: 2008, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2007, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2006, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2005, competicao: 'Libertadores', posicao: 1 },
                    { ano: 1993, competicao: 'Libertadores', posicao: 1 },
                    { ano: 1992, competicao: 'Libertadores', posicao: 1 },
                    { ano: 1991, competicao: 'Libertadores', posicao: 1 }
                ],
                total_titulos: 8,
                libertadores: 3,
                brasileiroes: 3
            },
            'corinthians': {
                titulos: [
                    { ano: 2017, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2015, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2012, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2011, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2005, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 1999, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 1998, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 1990, competicao: 'Brasileirão', posicao: 1 }
                ],
                total_titulos: 8,
                libertadores: 1,
                brasileiroes: 7
            },
            'santos': {
                titulos: [
                    { ano: 2011, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2010, competicao: 'Libertadores', posicao: 1 },
                    { ano: 2004, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 2002, competicao: 'Brasileirão', posicao: 1 },
                    { ano: 1963, competicao: 'Libertadores', posicao: 1 },
                    { ano: 1962, competicao: 'Libertadores', posicao: 1 }
                ],
                total_titulos: 6,
                libertadores: 3,
                brasileiroes: 2
            }
        };
    }

    // Obter todos os campeonatos
    getCampeonatos() {
        return this.campeonatos;
    }

    // Obter campeonato por ID
    getCampeonato(id) {
        return this.campeonatos.find(c => c.id === id);
    }

    // Obter todos os títulos
    getTitulos() {
        return this.titulos;
    }

    // Obter títulos de um clube
    getTitulosClube(nomeClube) {
        const historico = this.historico_clubes[nomeClube.toLowerCase().replace(/\s+/g, '_')];
        return historico ? historico.titulos : [];
    }

    // Obter estatísticas de um clube
    getEstatisticasClube(nomeClube) {
        const historico = this.historico_clubes[nomeClube.toLowerCase().replace(/\s+/g, '_')];
        return historico || {
            titulos: [],
            total_titulos: 0,
            libertadores: 0,
            brasileiroes: 0
        };
    }

    // Obter premiações
    getPremiacoes() {
        return this.premiacoes;
    }

    // Calcular premiação para posição
    calcularPremiacao(campeonatoId, posicao) {
        const campeonato = this.getCampeonato(campeonatoId);
        if (!campeonato) return 0;

        switch (posicao) {
            case 1:
                return campeonato.premio_campeao || 0;
            case 2:
                return campeonato.premio_vice || 0;
            case 3:
                return campeonato.premio_terceiro || 0;
            case 4:
                return campeonato.premio_quartas || 0;
            case 5:
            case 6:
            case 7:
            case 8:
                return campeonato.premio_oitavas || 0;
            default:
                return 0;
        }
    }

    // Simular resultado de partida
    simularPartida(timeCasa, timeVisitante) {
        const forcaCasa = this.calcularForcaTime(timeCasa);
        const forcaVisitante = this.calcularForcaTime(timeVisitante);
        
        // Vantagem de casa
        const vantagemCasa = 0.1;
        const forcaFinalCasa = forcaCasa * (1 + vantagemCasa);
        
        // Calcular probabilidades
        const totalForca = forcaFinalCasa + forcaVisitante;
        const probCasa = forcaFinalCasa / totalForca;
        const probVisitante = forcaVisitante / totalForca;
        const probEmpate = 0.25; // 25% de chance de empate
        
        // Normalizar probabilidades
        const probCasaFinal = probCasa * (1 - probEmpate);
        const probVisitanteFinal = probVisitante * (1 - probEmpate);
        
        // Gerar resultado
        const random = Math.random();
        
        if (random < probCasaFinal) {
            return { resultado: 'casa', golsCasa: this.gerarGols(forcaFinalCasa), golsVisitante: this.gerarGols(forcaVisitante * 0.7) };
        } else if (random < probCasaFinal + probVisitanteFinal) {
            return { resultado: 'visitante', golsCasa: this.gerarGols(forcaFinalCasa * 0.7), golsVisitante: this.gerarGols(forcaVisitante) };
        } else {
            return { resultado: 'empate', golsCasa: this.gerarGols(forcaFinalCasa * 0.8), golsVisitante: this.gerarGols(forcaVisitante * 0.8) };
        }
    }

    // Calcular força de um time
    calcularForcaTime(time) {
        if (!time || !time.jogadores) return 50;
        
        const jogadores = time.jogadores.slice(0, 11); // 11 titulares
        if (jogadores.length === 0) return 50;
        
        const forcaTotal = jogadores.reduce((total, jogador) => {
            const atributos = jogador.atributos || {};
            const forcaJogador = (
                (atributos.tecnica || 50) +
                (atributos.fisico || 50) +
                (atributos.mental || 50) +
                (atributos.velocidade || 50) +
                (atributos.finalizacao || 50) +
                (atributos.passe || 50) +
                (atributos.defesa || 50)
            ) / 7;
            
            return total + forcaJogador;
        }, 0);
        
        return forcaTotal / jogadores.length;
    }

    // Gerar número de gols baseado na força
    gerarGols(forca) {
        const mediaGols = forca / 20; // Normalizar para média de gols
        const gols = Math.round(mediaGols + (Math.random() - 0.5) * 2);
        return Math.max(0, Math.min(5, gols)); // Limitar entre 0 e 5 gols
    }

    // Gerar tabela de classificação
    gerarTabela(campeonatoId, times) {
        const campeonato = this.getCampeonato(campeonatoId);
        if (!campeonato) return [];

        const tabela = times.map(time => ({
            nome: time.nome,
            pontos: 0,
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            gols_pro: 0,
            gols_contra: 0,
            saldo_gols: 0,
            aproveitamento: 0
        }));

        // Simular jogos entre todos os times
        for (let i = 0; i < times.length; i++) {
            for (let j = i + 1; j < times.length; j++) {
                const resultado = this.simularPartida(times[i], times[j]);
                
                // Atualizar estatísticas do time da casa
                tabela[i].jogos++;
                tabela[i].gols_pro += resultado.golsCasa;
                tabela[i].gols_contra += resultado.golsVisitante;
                
                // Atualizar estatísticas do time visitante
                tabela[j].jogos++;
                tabela[j].gols_pro += resultado.golsVisitante;
                tabela[j].gols_contra += resultado.golsCasa;
                
                // Atualizar pontos
                if (resultado.resultado === 'casa') {
                    tabela[i].vitorias++;
                    tabela[i].pontos += campeonato.pontos_vitoria;
                    tabela[j].derrotas++;
                    tabela[j].pontos += campeonato.pontos_derrota;
                } else if (resultado.resultado === 'visitante') {
                    tabela[j].vitorias++;
                    tabela[j].pontos += campeonato.pontos_vitoria;
                    tabela[i].derrotas++;
                    tabela[i].pontos += campeonato.pontos_derrota;
                } else {
                    tabela[i].empates++;
                    tabela[i].pontos += campeonato.pontos_empate;
                    tabela[j].empates++;
                    tabela[j].pontos += campeonato.pontos_empate;
                }
            }
        }

        // Calcular saldo de gols e aproveitamento
        tabela.forEach(time => {
            time.saldo_gols = time.gols_pro - time.gols_contra;
            time.aproveitamento = (time.pontos / (time.jogos * 3)) * 100;
        });

        // Ordenar tabela
        return tabela.sort((a, b) => {
            if (a.pontos !== b.pontos) return b.pontos - a.pontos;
            if (a.vitorias !== b.vitorias) return b.vitorias - a.vitorias;
            if (a.saldo_gols !== b.saldo_gols) return b.saldo_gols - a.saldo_gols;
            return b.gols_pro - a.gols_pro;
        });
    }

    // Gerar premiações individuais
    gerarPremiacoesIndividuais(jogadores) {
        const premiacoes = [];
        
        // Artilheiro
        const artilheiros = jogadores
            .filter(j => j.posicao === 'Atacante')
            .sort((a, b) => (b.gols || 0) - (a.gols || 0));
        
        if (artilheiros.length > 0) {
            premiacoes.push({
                tipo: 'artilheiro',
                jogador: artilheiros[0],
                gols: artilheiros[0].gols || 0,
                premio: 500000
            });
        }
        
        // Melhor jogador
        const melhores = jogadores
            .sort((a, b) => {
                const forcaA = this.calcularForcaJogador(a);
                const forcaB = this.calcularForcaJogador(b);
                return forcaB - forcaA;
            });
        
        if (melhores.length > 0) {
            premiacoes.push({
                tipo: 'melhor_jogador',
                jogador: melhores[0],
                forca: this.calcularForcaJogador(melhores[0]),
                premio: 1000000
            });
        }
        
        return premiacoes;
    }

    // Calcular força de um jogador
    calcularForcaJogador(jogador) {
        const atributos = jogador.atributos || {};
        return (
            (atributos.tecnica || 50) +
            (atributos.fisico || 50) +
            (atributos.mental || 50) +
            (atributos.velocidade || 50) +
            (atributos.finalizacao || 50) +
            (atributos.passe || 50) +
            (atributos.defesa || 50)
        ) / 7;
    }
}

window.ChampionshipSystem = ChampionshipSystem; 