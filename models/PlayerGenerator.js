// Sistema de Geração de Jogadores com Histórias
class PlayerGenerator {
    constructor() {
        this.nomesMasculinos = [
            'João', 'Pedro', 'Carlos', 'Lucas', 'André', 'Rafael', 'Thiago', 'Marcos', 'Bruno', 'Diego',
            'Felipe', 'Gabriel', 'Matheus', 'Leonardo', 'Vinícius', 'Guilherme', 'Rodrigo', 'Daniel', 'Ricardo', 'Paulo',
            'Fernando', 'Roberto', 'Eduardo', 'Alexandre', 'Cristiano', 'Adriano', 'Wagner', 'Douglas', 'Anderson', 'Juliano',
            'Marcelo', 'Fabiano', 'Renato', 'Sérgio', 'Márcio', 'Claudio', 'Maurício', 'César', 'Hugo', 'Victor',
            'Endrick', 'Vinicius', 'Rodrygo', 'Pedro', 'Gabigol', 'Arrascaeta', 'Everton', 'Richarlison', 'Neymar', 'Casemiro'
        ];

        this.sobrenomes = [
            'Silva', 'Santos', 'Oliveira', 'Costa', 'Lima', 'Pereira', 'Alves', 'Ferreira', 'Rodrigues', 'Souza',
            'Carvalho', 'Martins', 'Ribeiro', 'Gomes', 'Lopes', 'Mendes', 'Barbosa', 'Nascimento', 'Araújo', 'Fernandes',
            'Correia', 'Cavalcanti', 'Dias', 'Cunha', 'Ramos', 'Teixeira', 'Moreira', 'Cardoso', 'Monteiro', 'Almeida',
            'Nunes', 'Melo', 'Pinto', 'Cruz', 'Reis', 'Moraes', 'Freitas', 'Azevedo', 'Castro', 'Machado',
            'Junior', 'Neto', 'Filho', 'Sobrinho', 'Primo', 'Tio', 'Avô', 'Bisneto'
        ];

        this.comunidades = [
            'Comunidade do Jardim Ângela, SP',
            'Comunidade da Rocinha, RJ',
            'Comunidade de Paraisópolis, SP',
            'Comunidade do Capão Redondo, SP',
            'Comunidade da Cidade de Deus, RJ',
            'Comunidade do Complexo do Alemão, RJ',
            'Comunidade da Maré, RJ',
            'Comunidade do Heliópolis, SP',
            'Comunidade da Vila Nova Cachoeirinha, SP',
            'Comunidade do Bairro da Liberdade, SP',
            'Comunidade da Pampulha, BH',
            'Comunidade do Aglomerado da Serra, BH',
            'Comunidade do Morro do Alemão, RJ',
            'Comunidade do Morro da Providência, RJ',
            'Comunidade do Morro do Borel, RJ',
            'Comunidade do Morro do Cantagalo, RJ',
            'Comunidade do Morro do Pavão, RJ',
            'Comunidade do Morro do Pavãozinho, RJ',
            'Comunidade do Morro dos Cabritos, RJ',
            'Comunidade do Morro do Chapéu Mangueira, RJ'
        ];

        this.cidades = [
            'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Salvador, BA', 'Fortaleza, CE',
            'Brasília, DF', 'Curitiba, PR', 'Recife, PE', 'Porto Alegre, RS', 'Manaus, AM',
            'Belém, PA', 'Goiânia, GO', 'Guarulhos, SP', 'Campinas, SP', 'São Luís, MA',
            'São Gonçalo, RJ', 'Maceió, AL', 'Duque de Caxias, RJ', 'Natal, RN', 'Teresina, PI'
        ];

        this.familias = [
            'Família humilde, pai pedreiro, mãe doméstica',
            'Família de classe média, pais comerciantes',
            'Família simples, pai motorista, mãe costureira',
            'Família numerosa, pai operário, mãe dona de casa',
            'Família unida, pai mecânico, mãe professora',
            'Família trabalhadora, pai eletricista, mãe enfermeira',
            'Família esforçada, pai pintor, mãe cozinheira',
            'Família determinada, pai jardineiro, mãe faxineira',
            'Família batalhadora, pai marceneiro, mãe cabeleireira',
            'Família dedicada, pai encanador, mãe vendedora'
        ];

        this.educacoes = [
            'Ensino médio incompleto',
            'Ensino médio completo',
            'Ensino fundamental completo',
            'Cursando faculdade',
            'Ensino técnico completo',
            'Ensino fundamental incompleto',
            'Cursando ensino médio',
            'Formado em educação física',
            'Cursando administração',
            'Cursando direito'
        ];

        this.sonhos = [
            'Comprar casa para a família',
            'Jogar na Europa',
            'Ser campeão brasileiro',
            'Ajudar a comunidade',
            'Formar em educação física',
            'Abrir uma escolinha de futebol',
            'Ser convocado para a seleção',
            'Ganhar a Copa Libertadores',
            'Ser o melhor jogador do mundo',
            'Investir em negócios'
        ];

        this.problemas = [
            'Faltas a treinos',
            'Problemas de disciplina',
            'Conflitos com colegas',
            'Dificuldade de concentração',
            'Problemas familiares',
            'Lesões frequentes',
            'Problemas de adaptação',
            'Dificuldade com a mídia',
            'Problemas de relacionamento',
            'Dificuldade com a pressão'
        ];

        this.melhorias = [
            'Desenvolveu liderança',
            'Melhorou a técnica',
            'Aumentou a velocidade',
            'Aprimorou a finalização',
            'Desenvolveu visão de jogo',
            'Melhorou o passe',
            'Aumentou a resistência',
            'Aprimorou a defesa',
            'Desenvolveu criatividade',
            'Melhorou a comunicação'
        ];

        this.declinios = [
            'Perdeu confiança',
            'Ficou mais lento',
            'Diminuiu o foco',
            'Perdeu motivação',
            'Ficou mais inseguro',
            'Diminuiu a técnica',
            'Perdeu resistência',
            'Ficou mais agressivo',
            'Diminuiu a criatividade',
            'Perdeu liderança'
        ];
    }

    // Gerar jogador com história completa
    gerarJogadorComHistoria(idade = null, posicao = null, clubeId = null) {
        const jogador = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            nome: this.gerarNome(),
            apelido: this.gerarApelido(),
            idade: idade || this.gerarIdade(),
            posicao: posicao || this.gerarPosicao(),
            valor_mercado: 0, // Será calculado baseado na posição e idade
            salario: 0, // Será calculado baseado no valor de mercado
            contrato_ate: this.gerarContrato(),
            origem: this.gerarOrigem(),
            atributos: {},
            perfil_social: this.gerarPerfilSocial(),
            moral: this.gerarMoral(),
            motivacao: this.gerarMotivacao(),
            clube_atual: clubeId,
            historico_selecao: [],
            lesoes: [],
            conquistas: [],
            desenvolvimento: []
        };

        // Calcular atributos baseados na posição
        jogador.atributos = this.gerarAtributosPorPosicao(jogador.posicao, jogador.idade);
        
        // Calcular valor de mercado e salário
        jogador.valor_mercado = this.calcularValorMercado(jogador);
        jogador.salario = this.calcularSalario(jogador.valor_mercado);

        return jogador;
    }

    // Gerar nome completo
    gerarNome() {
        const nome = this.nomesMasculinos[Math.floor(Math.random() * this.nomesMasculinos.length)];
        const sobrenome = this.sobrenomes[Math.floor(Math.random() * this.sobrenomes.length)];
        return `${nome} ${sobrenome}`;
    }

    // Gerar apelido
    gerarApelido() {
        const apelidos = [
            'Pelezinho', 'Ronaldinho', 'Neymarzinho', 'Gabigolzinho', 'Endrickzinho',
            'Pedrinho', 'Carlinhos', 'Marcelinho', 'Rafaelzinho', 'Thiaguinho',
            'Bruninho', 'Dieguinho', 'Felipezinho', 'Gabrielzinho', 'Matheuzinho',
            'Leonardinho', 'Vinizinho', 'Guilherminho', 'Rodriguinho', 'Danielzinho'
        ];
        return apelidos[Math.floor(Math.random() * apelidos.length)];
    }

    // Gerar idade realista
    gerarIdade() {
        const probabilidades = [
            { idade: 16, chance: 5 },
            { idade: 17, chance: 10 },
            { idade: 18, chance: 15 },
            { idade: 19, chance: 15 },
            { idade: 20, chance: 12 },
            { idade: 21, chance: 10 },
            { idade: 22, chance: 8 },
            { idade: 23, chance: 7 },
            { idade: 24, chance: 6 },
            { idade: 25, chance: 5 },
            { idade: 26, chance: 4 },
            { idade: 27, chance: 3 }
        ];

        const random = Math.random() * 100;
        let acumulado = 0;
        
        for (const prob of probabilidades) {
            acumulado += prob.chance;
            if (random <= acumulado) {
                return prob.idade;
            }
        }
        
        return 20; // Fallback
    }

    // Gerar posição
    gerarPosicao() {
        const posicoes = [
            { posicao: 'Goleiro', chance: 10 },
            { posicao: 'Zagueiro', chance: 20 },
            { posicao: 'Lateral', chance: 15 },
            { posicao: 'Volante', chance: 15 },
            { posicao: 'Meia', chance: 25 },
            { posicao: 'Atacante', chance: 15 }
        ];

        const random = Math.random() * 100;
        let acumulado = 0;
        
        for (const prob of posicoes) {
            acumulado += prob.chance;
            if (random <= acumulado) {
                return prob.posicao;
            }
        }
        
        return 'Meia'; // Fallback
    }

    // Gerar perfil social completo
    gerarPerfilSocial() {
        return {
            origem_social: this.comunidades[Math.floor(Math.random() * this.comunidades.length)],
            familia: this.familias[Math.floor(Math.random() * this.familias.length)],
            educacao: this.educacoes[Math.floor(Math.random() * this.educacoes.length)],
            sonho: this.sonhos[Math.floor(Math.random() * this.sonhos.length)],
            comportamento: this.gerarComportamento(),
            ambicao: Math.floor(Math.random() * 40) + 60, // 60-100
            disciplina: Math.floor(Math.random() * 40) + 60, // 60-100
            influencia_social: Math.floor(Math.random() * 30) + 40, // 40-70
            problemas_extra_campo: this.gerarProblemas(),
            historico_lesoes: [],
            historico_desenvolvimento: []
        };
    }

    // Gerar comportamento
    gerarComportamento() {
        const comportamentos = [
            { tipo: 'Profissional', chance: 30 },
            { tipo: 'Estável', chance: 25 },
            { tipo: 'Instável', chance: 20 },
            { tipo: 'Problemático', chance: 15 },
            { tipo: 'Líder', chance: 10 }
        ];

        const random = Math.random() * 100;
        let acumulado = 0;
        
        for (const prob of comportamentos) {
            acumulado += prob.chance;
            if (random <= acumulado) {
                return prob.tipo;
            }
        }
        
        return 'Estável';
    }

    // Gerar problemas
    gerarProblemas() {
        const problemas = [];
        const numProblemas = Math.floor(Math.random() * 3); // 0-2 problemas
        
        for (let i = 0; i < numProblemas; i++) {
            const problema = this.problemas[Math.floor(Math.random() * this.problemas.length)];
            if (!problemas.includes(problema)) {
                problemas.push(problema);
            }
        }
        
        return problemas;
    }

    // Gerar atributos por posição
    gerarAtributosPorPosicao(posicao, idade) {
        const atributosBase = {
            'Goleiro': { tecnica: 80, fisico: 75, mental: 85, velocidade: 60, finalizacao: 30, passe: 70, defesa: 90 },
            'Zagueiro': { tecnica: 70, fisico: 85, mental: 75, velocidade: 65, finalizacao: 50, passe: 75, defesa: 85 },
            'Lateral': { tecnica: 75, fisico: 80, mental: 70, velocidade: 80, finalizacao: 60, passe: 80, defesa: 75 },
            'Volante': { tecnica: 75, fisico: 80, mental: 80, velocidade: 70, finalizacao: 55, passe: 85, defesa: 80 },
            'Meia': { tecnica: 85, fisico: 70, mental: 80, velocidade: 75, finalizacao: 70, passe: 90, defesa: 60 },
            'Atacante': { tecnica: 80, fisico: 75, mental: 70, velocidade: 85, finalizacao: 90, passe: 75, defesa: 40 }
        };
        
        const base = atributosBase[posicao] || atributosBase['Meia'];
        const multiplicadorIdade = this.calcularMultiplicadorIdade(idade);
        
        return {
            tecnica: Math.max(30, Math.min(100, Math.floor(base.tecnica * multiplicadorIdade + Math.random() * 20 - 10))),
            fisico: Math.max(30, Math.min(100, Math.floor(base.fisico * multiplicadorIdade + Math.random() * 20 - 10))),
            mental: Math.max(30, Math.min(100, Math.floor(base.mental * multiplicadorIdade + Math.random() * 20 - 10))),
            velocidade: Math.max(30, Math.min(100, Math.floor(base.velocidade * multiplicadorIdade + Math.random() * 20 - 10))),
            finalizacao: Math.max(30, Math.min(100, Math.floor(base.finalizacao * multiplicadorIdade + Math.random() * 20 - 10))),
            passe: Math.max(30, Math.min(100, Math.floor(base.passe * multiplicadorIdade + Math.random() * 20 - 10))),
            defesa: Math.max(30, Math.min(100, Math.floor(base.defesa * multiplicadorIdade + Math.random() * 20 - 10)))
        };
    }

    // Calcular multiplicador baseado na idade
    calcularMultiplicadorIdade(idade) {
        if (idade <= 18) return 0.7; // Jovem, ainda desenvolvendo
        if (idade <= 20) return 0.8;
        if (idade <= 22) return 0.9;
        if (idade <= 24) return 1.0; // Pico
        if (idade <= 26) return 0.95;
        if (idade <= 28) return 0.9;
        return 0.85; // Acima de 28
    }

    // Calcular valor de mercado
    calcularValorMercado(jogador) {
        const valoresBase = {
            'Goleiro': 8000000,
            'Zagueiro': 12000000,
            'Lateral': 10000000,
            'Volante': 11000000,
            'Meia': 15000000,
            'Atacante': 20000000
        };
        
        const valorBase = valoresBase[jogador.posicao] || 12000000;
        const multiplicadorIdade = this.calcularMultiplicadorIdade(jogador.idade);
        const multiplicadorAtributos = this.calcularMultiplicadorAtributos(jogador.atributos);
        
        return Math.floor(valorBase * multiplicadorIdade * multiplicadorAtributos * (0.8 + Math.random() * 0.4));
    }

    // Calcular multiplicador baseado nos atributos
    calcularMultiplicadorAtributos(atributos) {
        const media = (atributos.tecnica + atributos.fisico + atributos.mental + 
                      atributos.velocidade + atributos.finalizacao + atributos.passe + atributos.defesa) / 7;
        return media / 80; // Normalizado para 80 como média
    }

    // Calcular salário
    calcularSalario(valorMercado) {
        return Math.floor(valorMercado * 0.01); // 1% do valor de mercado
    }

    // Gerar contrato
    gerarContrato() {
        const anoAtual = new Date().getFullYear();
        return anoAtual + Math.floor(Math.random() * 3) + 1; // 1-3 anos
    }

    // Gerar origem
    gerarOrigem() {
        return this.cidades[Math.floor(Math.random() * this.cidades.length)];
    }

    // Gerar moral
    gerarMoral() {
        return Math.floor(Math.random() * 40) + 60; // 60-100
    }

    // Gerar motivação
    gerarMotivacao() {
        return Math.floor(Math.random() * 30) + 70; // 70-100
    }

    // Simular convocação para seleção
    simularConvocacaoSelecao(jogador) {
        const convocacao = {
            data: new Date().toISOString(),
            tipo: 'Convocação Seleção Brasileira',
            duracao: Math.floor(Math.random() * 10) + 5, // 5-15 dias
            resultado: this.gerarResultadoSelecao()
        };

        jogador.historico_selecao.push(convocacao);
        this.aplicarResultadoSelecao(jogador, convocacao.resultado);

        return convocacao;
    }

    // Gerar resultado da seleção
    gerarResultadoSelecao() {
        const resultados = [
            { tipo: 'positivo', chance: 60, descricao: 'voltou mais experiente, desenvolveu liderança e agora domina o jogo aéreo' },
            { tipo: 'positivo', chance: 20, descricao: 'voltou mais confiante, melhorou a técnica e agora domina a finalização' },
            { tipo: 'positivo', chance: 10, descricao: 'voltou mais maduro, desenvolveu visão de jogo e agora domina o passe' },
            { tipo: 'negativo', chance: 5, descricao: 'voltou mais cabisbaixo, foco zero e perdeu confiança' },
            { tipo: 'negativo', chance: 3, descricao: 'voltou lesionado, precisará de tempo para se recuperar' },
            { tipo: 'negativo', chance: 2, descricao: 'voltou com problemas de disciplina, será punido pelo clube' }
        ];

        const random = Math.random() * 100;
        let acumulado = 0;
        
        for (const resultado of resultados) {
            acumulado += resultado.chance;
            if (random <= acumulado) {
                return resultado;
            }
        }
        
        return resultados[0]; // Fallback positivo
    }

    // Aplicar resultado da seleção
    aplicarResultadoSelecao(jogador, resultado) {
        const desenvolvimento = {
            data: new Date().toISOString(),
            tipo: 'Seleção Brasileira',
            descricao: resultado.descricao,
            impacto: resultado.tipo
        };

        jogador.desenvolvimento.push(desenvolvimento);

        if (resultado.tipo === 'positivo') {
            // Melhorar atributos
            const melhoria = this.melhorias[Math.floor(Math.random() * this.melhorias.length)];
            this.aplicarMelhoria(jogador, melhoria);
            jogador.moral = Math.min(100, jogador.moral + 10);
            jogador.motivacao = Math.min(100, jogador.motivacao + 5);
        } else {
            // Piorar atributos
            const declinio = this.declinios[Math.floor(Math.random() * this.declinios.length)];
            this.aplicarDeclinio(jogador, declinio);
            jogador.moral = Math.max(0, jogador.moral - 15);
            jogador.motivacao = Math.max(0, jogador.motivacao - 10);
        }
    }

    // Aplicar melhoria
    aplicarMelhoria(jogador, melhoria) {
        const melhorias = {
            'Desenvolveu liderança': () => { jogador.atributos.mental = Math.min(100, jogador.atributos.mental + 5); },
            'Melhorou a técnica': () => { jogador.atributos.tecnica = Math.min(100, jogador.atributos.tecnica + 5); },
            'Aumentou a velocidade': () => { jogador.atributos.velocidade = Math.min(100, jogador.atributos.velocidade + 5); },
            'Aprimorou a finalização': () => { jogador.atributos.finalizacao = Math.min(100, jogador.atributos.finalizacao + 5); },
            'Desenvolveu visão de jogo': () => { jogador.atributos.mental = Math.min(100, jogador.atributos.mental + 3); jogador.atributos.passe = Math.min(100, jogador.atributos.passe + 3); },
            'Melhorou o passe': () => { jogador.atributos.passe = Math.min(100, jogador.atributos.passe + 5); },
            'Aumentou a resistência': () => { jogador.atributos.fisico = Math.min(100, jogador.atributos.fisico + 5); },
            'Aprimorou a defesa': () => { jogador.atributos.defesa = Math.min(100, jogador.atributos.defesa + 5); },
            'Desenvolveu criatividade': () => { jogador.atributos.tecnica = Math.min(100, jogador.atributos.tecnica + 3); jogador.atributos.mental = Math.min(100, jogador.atributos.mental + 3); },
            'Melhorou a comunicação': () => { jogador.atributos.mental = Math.min(100, jogador.atributos.mental + 5); }
        };

        if (melhorias[melhoria]) {
            melhorias[melhoria]();
        }
    }

    // Aplicar declínio
    aplicarDeclinio(jogador, declinio) {
        const declinios = {
            'Perdeu confiança': () => { jogador.atributos.mental = Math.max(30, jogador.atributos.mental - 5); },
            'Ficou mais lento': () => { jogador.atributos.velocidade = Math.max(30, jogador.atributos.velocidade - 5); },
            'Diminuiu o foco': () => { jogador.atributos.mental = Math.max(30, jogador.atributos.mental - 3); },
            'Perdeu motivação': () => { jogador.atributos.mental = Math.max(30, jogador.atributos.mental - 5); },
            'Ficou mais inseguro': () => { jogador.atributos.mental = Math.max(30, jogador.atributos.mental - 3); },
            'Diminuiu a técnica': () => { jogador.atributos.tecnica = Math.max(30, jogador.atributos.tecnica - 5); },
            'Perdeu resistência': () => { jogador.atributos.fisico = Math.max(30, jogador.atributos.fisico - 5); },
            'Ficou mais agressivo': () => { jogador.atributos.mental = Math.max(30, jogador.atributos.mental - 3); },
            'Diminuiu a criatividade': () => { jogador.atributos.tecnica = Math.max(30, jogador.atributos.tecnica - 3); },
            'Perdeu liderança': () => { jogador.atributos.mental = Math.max(30, jogador.atributos.mental - 5); }
        };

        if (declinios[declinio]) {
            declinios[declinio]();
        }
    }

    // Gerar jogadores para um clube
    gerarJogadoresParaClube(clubeId, quantidade = 25) {
        const jogadores = [];
        const posicoes = ['Goleiro', 'Zagueiro', 'Zagueiro', 'Lateral', 'Lateral', 'Volante', 'Volante', 'Meia', 'Meia', 'Meia', 'Meia', 'Atacante', 'Atacante', 'Atacante'];
        
        for (let i = 0; i < quantidade; i++) {
            const posicao = posicoes[i % posicoes.length];
            const jogador = this.gerarJogadorComHistoria(null, posicao, clubeId);
            jogadores.push(jogador);
        }
        
        return jogadores;
    }
}

window.PlayerGenerator = PlayerGenerator; 