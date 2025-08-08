# INSTRUÇÕES PARA IMPLEMENTAR AS CORREÇÕES

## Passo 1: Incluir o arquivo de correções

Adicione o seguinte script ao seu arquivo `index.html`, logo após os outros scripts JavaScript:

```html
<!-- Adicionar antes do fechamento da tag </body> -->
<script src="js/correcoes.js"></script>
```

## Passo 2: Verificar se as correções foram aplicadas

Abra o console do navegador (F12) e verifique se aparece a mensagem:
```
Aplicando correções do sistema...
Correções aplicadas com sucesso!
```

## Passo 3: Testar cada funcionalidade

### Teste 1: Sistema de Escalação
1. Vá para a aba "Jogo" → "Escalação"
2. Tente escalar um jogador clicando em uma posição
3. Verifique se o jogador aparece no campinho
4. Teste escalar um jogador em posição incorreta (deve mostrar erro)

### Teste 2: Sistema de Jogadores
1. Vá para a aba "Mercado"
2. Verifique se aparecem jogadores na lista
3. Se não aparecerem, verifique o console para mensagens de erro
4. Os jogadores devem ter nomes, posições e valores

### Teste 3: Sistema Financeiro
1. Vá para a aba "Mercado"
2. Clique em "Contratar" em um jogador
3. Faça uma proposta
4. Verifique se o orçamento diminui após a contratação
5. Confirme que a interface é atualizada

### Teste 4: Sistema de Simulação
1. Vá para a aba "Jogo" → "Simulação"
2. Clique em "Simular Jogo"
3. Verifique se aparece a tela de simulação
4. Se não aparecer, deve aparecer o resultado direto

## Passo 4: Debug e Solução de Problemas

### Se as correções não forem aplicadas:

1. **Verifique se o arquivo `correcoes.js` foi carregado:**
   ```javascript
   // No console do navegador
   console.log(window.CorrecoesOnzeVidas);
   ```

2. **Aplique as correções manualmente:**
   ```javascript
   // No console do navegador
   if (window.gameController) {
     window.CorrecoesOnzeVidas.aplicarCorrecoes();
   }
   ```

### Se o sistema de escalação não funcionar:

1. **Verifique se o campinho existe:**
   ```javascript
   console.log(document.querySelector('.campinho'));
   ```

2. **Teste a função manualmente:**
   ```javascript
   // No console do navegador
   if (window.gameController && window.gameController.elenco) {
     window.gameController.escalarJogador(window.gameController.elenco[0].id, 'goleiro');
   }
   ```

### Se o sistema financeiro não funcionar:

1. **Verifique se o clube está selecionado:**
   ```javascript
   console.log(window.gameController?.clubeSelecionado);
   ```

2. **Teste a diminuição manualmente:**
   ```javascript
   // No console do navegador
   if (window.gameController && window.gameController.clubeSelecionado) {
     const orcamentoAntes = window.gameController.clubeSelecionado.orcamento;
     window.gameController.diminuirOrcamento(1000000);
     console.log('Orçamento antes:', orcamentoAntes);
     console.log('Orçamento depois:', window.gameController.clubeSelecionado.orcamento);
   }
   ```

### Se a simulação não funcionar:

1. **Teste a função de simulação manualmente:**
   ```javascript
   // No console do navegador
   if (window.gameController) {
     window.gameController.simularJogo();
   }
   ```

2. **Verifique se há erros no console:**
   ```javascript
   // No console do navegador
   try {
     window.gameController.simularJogo();
   } catch (error) {
     console.error('Erro na simulação:', error);
   }
   ```

## Passo 5: Implementação Manual (se necessário)

Se as correções automáticas não funcionarem, você pode implementar manualmente:

### 1. Corrigir Sistema Financeiro

Localize a função `fazerProposta` no arquivo `index.html` e substitua por:

```javascript
fazerProposta(jogadorId, valor) {
  const jogador = this.mercado.find(j => j.id === jogadorId);
  if (!jogador) return;
  
  // Verificar se tem dinheiro
  if (this.clubeSelecionado.orcamento < valor) {
    alert(`Orçamento insuficiente! Você tem ${formatarMoeda(this.clubeSelecionado.orcamento)} e a proposta é de ${formatarMoeda(valor)}`);
    return;
  }
  
  // Verificar se o jogador aceita a proposta
  const aceitaProposta = this.verificarAceitacaoProposta(jogador, this.clubeSelecionado, valor);
  
  if (aceitaProposta) {
    // Transferir jogador para o elenco
    this.elenco.push(jogador);
    this.mercado = this.mercado.filter(j => j.id !== jogadorId);
    
    // DIMINUIR ORÇAMENTO - CORREÇÃO PRINCIPAL
    this.diminuirOrcamento(valor);
    
    // Atualizar interface
    this.renderizarMercado(this.mercado);
    this.renderizarElenco(this.elenco);
    this.atualizarOrcamentoDisponivel();
    
    // Gerar notícia de contratação
    this.gerarNoticiaContratacao(jogador, this.clubeSelecionado, valor);
    
    // Fechar overlay
    document.querySelector('.negociacao-overlay')?.remove();
    
    alert(`Jogador ${jogador.nome} contratado com sucesso!`);
  } else {
    // Jogador recusou a proposta
    const motivo = this.obterMotivoRecusa(jogador, this.clubeSelecionado);
    alert(`Jogador ${jogador.nome} recusou a proposta: ${motivo}`);
    
    // Gerar notícia de recusa
    this.gerarNoticiaRecusa(jogador, this.clubeSelecionado, motivo);
  }
}
```

### 2. Corrigir Sistema de Simulação

Localize a função `simularJogo` e substitua por:

```javascript
simularJogo() {
  console.log('Simulando jogo...');
  
  // Verificar se há jogo agendado
  if (!this.proximoJogo) {
    this.proximoJogo = this.gerarProximoJogo();
  }
  
  // Gerar resultado
  const resultado = this.calcularResultadoJogo(this.proximoJogo.casa, this.proximoJogo.visitante);
  
  // Mostrar tela de simulação com fallback
  try {
    this.mostrarTelaSimulacao(resultado);
  } catch (error) {
    console.error('Erro ao mostrar tela de simulação:', error);
    // Fallback: mostrar resultado direto
    this.mostrarResultadoDireto(resultado);
  }
}
```

## Passo 6: Verificação Final

Após implementar todas as correções, teste:

1. **Escalação:** Jogadores devem poder ser escalados
2. **Contratação:** Orçamento deve diminuir após contratação
3. **Simulação:** Tela de simulação deve aparecer
4. **Jogadores:** Lista deve mostrar jogadores reais

## Logs de Debug

Para facilitar o debug, adicione estes logs:

```javascript
// No console do navegador
console.log('=== DEBUG ONZE VIDAS FC ===');
console.log('GameController:', window.gameController);
console.log('Clube selecionado:', window.gameController?.clubeSelecionado);
console.log('Elenco:', window.gameController?.elenco?.length);
console.log('Mercado:', window.gameController?.mercado?.length);
console.log('Orçamento:', window.gameController?.clubeSelecionado?.orcamento);
```

## Contato para Suporte

Se ainda houver problemas após seguir estas instruções:

1. Verifique o console do navegador para erros
2. Teste cada funcionalidade individualmente
3. Verifique se todos os arquivos estão sendo carregados corretamente
4. Confirme se o GameController está sendo inicializado

As correções devem resolver os principais problemas identificados no projeto Onze Vidas FC.
