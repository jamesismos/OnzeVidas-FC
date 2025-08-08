// ImprensaAPIService.js
// Serviço para integrar APIs de futebol com o sistema de imprensa

export default class ImprensaAPIService {
    constructor() {
        this.footballAPI = new FootballAPI();
        this.footballDataAPI = new FootballDataAPI();
        this.eventosGerados = [];
        this.ultimaAtualizacao = null;
    }

    // Gerar eventos baseados em dados reais da API
    async gerarEventosReais() {
        try {
            const eventos = [];
            
            // Buscar notícias reais
            const noticias = await this.footballAPI.getFootballNews();
            if (noticias && noticias.length > 0) {
                noticias.forEach(noticia => {
                    const evento = this.converterNoticiaParaEvento(noticia);
                    if (evento) {
                        eventos.push(evento);
                    }
                });
            }

            // Gerar eventos baseados em transferências
            const jogadores = await this.footballAPI.getBrazilianPlayers();
            if (jogadores && jogadores.length > 0) {
                const transferencias = this.simularTransferencias(jogadores);
                eventos.push(...transferencias);
            }

            // Gerar eventos de indisciplina baseados no perfil social
            const indisciplinas = this.simularIndisciplinas(jogadores);
            eventos.push(...indisciplinas);

            // Gerar eventos de vitórias baseados em dados de partidas
            const vitorias = await this.simularVitorias();
            eventos.push(...vitorias);

            this.eventosGerados = eventos;
            this.ultimaAtualizacao = new Date();
            
            return eventos;
        } catch (error) {
            console.warn('Erro ao gerar eventos reais:', error);
            return this.gerarEventosFallback();
        }
    }

    // Converter notícias da API para eventos do sistema de imprensa
    converterNoticiaParaEvento(noticia) {
        const titulo = noticia.titulo.toLowerCase();
        
        // Detectar tipo de evento baseado no título
        if (titulo.includes('transferência') || titulo.includes('contratação') || titulo.includes('assina')) {
            return {
                tipo: 'transferencia',
                jogador: this.extrairNomeJogador(noticia.titulo),
                clubeDestino: this.extrairNomeClube(noticia.titulo),
                fonte: noticia.fonte,
                impacto: noticia.impacto,
                data: noticia.data
            };
        } else if (titulo.includes('lesão') || titulo.includes('suspensão') || titulo.includes('problema')) {
            return {
                tipo: 'indisciplina',
                jogador: this.extrairNomeJogador(noticia.titulo),
                fonte: noticia.fonte,
                impacto: noticia.impacto,
                data: noticia.data
            };
        } else if (titulo.includes('vitória') || titulo.includes('vence') || titulo.includes('título')) {
            return {
                tipo: 'vitoria',
                clube: this.extrairNomeClube(noticia.titulo),
                fonte: noticia.fonte,
                impacto: noticia.impacto,
                data: noticia.data
            };
        } else if (titulo.includes('empresário') || titulo.includes('proposta') || titulo.includes('oferta')) {
            return {
                tipo: 'ofertaEmpresario',
                clube: this.extrairNomeClube(noticia.titulo),
                fonte: noticia.fonte,
                impacto: noticia.impacto,
                data: noticia.data
            };
        }
        
        return null;
    }

    // Simular transferências baseadas em dados reais
    simularTransferencias(jogadores) {
        const transferencias = [];
        const clubes = ['Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo', 'Santos', 'Grêmio', 'Internacional'];
        
        // Selecionar jogadores com alta probabilidade de transferência
        const jogadoresTransferiveis = jogadores.filter(j => 
            j.valor_mercado > 30000000 && 
            j.idade < 30 && 
            Math.random() < 0.3
        );

        jogadoresTransferiveis.slice(0, 3).forEach(jogador => {
            const clubeDestino = clubes[Math.floor(Math.random() * clubes.length)];
            transferencias.push({
                tipo: 'transferencia',
                jogador: jogador.nome,
                clubeDestino: clubeDestino,
                valor: jogador.valor_mercado,
                fonte: 'Mercado de Transferências',
                impacto: 'alto',
                data: new Date().toISOString().split('T')[0]
            });
        });

        return transferencias;
    }

    // Simular indisciplinas baseadas no perfil social
    simularIndisciplinas(jogadores) {
        const indisciplinas = [];
        
        const jogadoresProblematicos = jogadores.filter(j => 
            j.perfil_social?.problemas_extra_campo === true ||
            j.perfil_social?.disciplina === 'regular' ||
            Math.random() < 0.2
        );

        jogadoresProblematicos.slice(0, 2).forEach(jogador => {
            const tiposIndisciplina = [
                'faltou ao treino novamente',
                'chegou atrasado ao treino',
                'foi flagrado em festa na véspera do jogo',
                'discutiu com o técnico',
                'não respeitou o protocolo do clube'
            ];

            indisciplinas.push({
                tipo: 'indisciplina',
                jogador: jogador.nome,
                descricao: tiposIndisciplina[Math.floor(Math.random() * tiposIndisciplina.length)],
                fonte: 'Departamento de Comunicação',
                impacto: 'médio',
                data: new Date().toISOString().split('T')[0]
            });
        });

        return indisciplinas;
    }

    // Simular vitórias baseadas em dados de partidas
    async simularVitorias() {
        const vitorias = [];
        const clubes = ['Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo', 'Santos'];
        
        // Simular 2-3 vitórias por semana
        for (let i = 0; i < 3; i++) {
            const clube = clubes[Math.floor(Math.random() * clubes.length)];
            const placares = ['2x1', '3x0', '1x0', '2x0', '4x1'];
            const placar = placares[Math.floor(Math.random() * placares.length)];
            
            vitorias.push({
                tipo: 'vitoria',
                clube: clube,
                placar: placar,
                fonte: 'Central de Jogos',
                impacto: 'médio',
                data: new Date().toISOString().split('T')[0]
            });
        }

        return vitorias;
    }

    // Gerar eventos de fallback quando API falha
    gerarEventosFallback() {
        return [
            {
                tipo: 'transferencia',
                jogador: 'João Silva',
                clubeDestino: 'Flamengo',
                fonte: 'Mercado de Transferências',
                impacto: 'alto',
                data: new Date().toISOString().split('T')[0]
            },
            {
                tipo: 'indisciplina',
                jogador: 'Pedro Santos',
                descricao: 'faltou ao treino novamente',
                fonte: 'Departamento de Comunicação',
                impacto: 'médio',
                data: new Date().toISOString().split('T')[0]
            },
            {
                tipo: 'vitoria',
                clube: 'Palmeiras',
                placar: '2x1',
                fonte: 'Central de Jogos',
                impacto: 'médio',
                data: new Date().toISOString().split('T')[0]
            }
        ];
    }

    // Métodos auxiliares para extrair informações
    extrairNomeJogador(titulo) {
        const nomesJogadores = [
            'Vinicius Jr', 'Endrick', 'Rodrygo', 'Pedro', 'Gabigol',
            'João Silva', 'Pedro Santos', 'Carlos Oliveira', 'Lucas Mendes'
        ];
        
        for (const nome of nomesJogadores) {
            if (titulo.toLowerCase().includes(nome.toLowerCase())) {
                return nome;
            }
        }
        
        return nomesJogadores[Math.floor(Math.random() * nomesJogadores.length)];
    }

    extrairNomeClube(titulo) {
        const clubes = [
            'Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo', 'Santos',
            'Grêmio', 'Internacional', 'Atlético Mineiro', 'Cruzeiro'
        ];
        
        for (const clube of clubes) {
            if (titulo.toLowerCase().includes(clube.toLowerCase())) {
                return clube;
            }
        }
        
        return clubes[Math.floor(Math.random() * clubes.length)];
    }

    // Obter estatísticas dos eventos gerados
    getEstatisticasEventos() {
        const stats = {
            total: this.eventosGerados.length,
            porTipo: {},
            porImpacto: {},
            ultimaAtualizacao: this.ultimaAtualizacao
        };

        this.eventosGerados.forEach(evento => {
            // Contar por tipo
            stats.porTipo[evento.tipo] = (stats.porTipo[evento.tipo] || 0) + 1;
            
            // Contar por impacto
            stats.porImpacto[evento.impacto] = (stats.porImpacto[evento.impacto] || 0) + 1;
        });

        return stats;
    }

    // Filtrar eventos por tipo
    filtrarEventosPorTipo(tipo) {
        return this.eventosGerados.filter(evento => evento.tipo === tipo);
    }

    // Filtrar eventos por impacto
    filtrarEventosPorImpacto(impacto) {
        return this.eventosGerados.filter(evento => evento.impacto === impacto);
    }

    // Limpar eventos antigos (mais de 7 dias)
    limparEventosAntigos() {
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
        
        this.eventosGerados = this.eventosGerados.filter(evento => {
            const dataEvento = new Date(evento.data);
            return dataEvento >= seteDiasAtras;
        });
    }
}
