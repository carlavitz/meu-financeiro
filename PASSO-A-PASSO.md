# Meu Financeiro 2.3: como publicar

## Arquivos desta pasta

| Arquivo | O que faz |
|---|---|
| `index.html` | Aplicativo completo: painel, lançamentos, planejamento, reserva e simulador. **Substitui o atual.** |
| `manifest.json` | Configuração de instalação (PWA): nome, ícones, start_url e escopo |
| `sw.js` | Service worker com cache versionado (busca sempre a versão nova do HTML) |
| `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-maskable-512.png` | Ícones exigidos pelo Android/Chrome |
| `vercel.json` | Impede que a Vercel guarde em cache antigo o `sw.js`, o `manifest.json` e o `index.html` |

## Antes de publicar (segurança dos dados)

1. Abra o app atual **no celular** e toque em **Exportar backup**. Guarde o arquivo `.json`.
2. Faça o mesmo em qualquer outro aparelho onde você use o app, porque cada aparelho tem seus próprios dados.

> A nova versão usa a **mesma chave de armazenamento** (`meuFinanceiroV1`). Os dados são migrados automaticamente, e uma cópia da versão 1 fica guardada no navegador (`meuFinanceiroV1_backup_v1`). Mesmo assim, faça o backup.

## Publicar pelo GitHub (navegador)

1. Acesse o repositório do app no GitHub.
2. Clique em **Add file → Upload files**.
3. Arraste **`index.html`, `manifest.json`, `sw.js`, `vercel.json` e a pasta `icons`**, mantendo os mesmos nomes e a mesma estrutura de pastas.
   - Se o repositório já tiver um `vercel.json` com outras configurações, não substitua o arquivo: junte o bloco `headers` ao arquivo existente.
   - Se quiser manter os ícones atuais, envie apenas `icon-512.png` e `icon-maskable-512.png`.
4. Em **Commit changes**, escreva, por exemplo, "Versão 2.0 – painel e planejamento" e confirme.
5. A Vercel publica sozinha em 1 a 2 minutos. Acompanhe em vercel.com → projeto → **Deployments** (status *Ready*).

## Conferir no celular

1. Abra https://meu-financeiro-ten-chi.vercel.app/ no Chrome.
2. Se aparecer a barra **"Nova versão disponível"**, toque em **Atualizar agora**.
3. Confira se os seus lançamentos continuam aparecendo (aba **Lançamentos**).
4. Se a versão antiga continuar aparecendo, feche o app totalmente e abra de novo. Em último caso, vá em Chrome → ⋮ → Configurações → Configurações do site → o site → **Limpar dados**. ⚠️ Isso apaga os dados; faça o backup antes e importe depois.

## Próximas atualizações

Sempre que alterar o app, mude `const VERSION = '2.3.0'` no `sw.js` (por exemplo, para `'2.3.1'`). Também vale ajustar `APP_VERSION` no `index.html`. Isso faz o celular baixar a versão nova e apagar o cache antigo.

## Importante

- Os dados ficam **só no aparelho/navegador**. Não há sincronização automática entre celular e computador; use Exportar/Importar backup.
- Projeções, reserva e simulador são **simulações**: nada é depositado e nenhum lançamento é alterado.

## Novidades da 2.1

- **Painel geral**: consolida todos os meses com registros (receitas, avulsas, faturas ou pagamentos marcados) até o mês atual. Não depende do Mês/Ano do topo e tem filtro por período (todos, últimos 3, 6 ou 12 meses com registros, ou por ano).
- **Categorias**: há uma lista padrão (Alimentação, Moradia, Energia, Farmácia, Vestuário, Beleza etc.), e você pode criar, renomear e excluir categorias. A sugestão automática pelo nome aparece com borda tracejada; você confirma ou troca na aba Categorias.
- **Pendências acumuladas**: itens sem "Pago" nos meses anteriores passam a somar no mês seguinte, até serem pagos. Na aba Mês, defina a partir de qual mês controlar as pendências.
- **Leiaute de celular**: barra de navegação inferior e tabelas exibidas como cartões.

**Primeiro uso da 2.1:** o controle de pendências começa no primeiro mês com registros. Se algo daquele mês já foi pago, mas não foi marcado, use "Pagar todos" ou ajuste "Controlar pendências a partir de".

## Novidades da 2.2

- **Editar em todos os lançamentos** (receitas, avulsas, fixas, parcelas e faturas): descrição, valor, dia, mês e categoria.
  - Fixas e parcelas: escolha **"Só este mês"** (ajusta valor/dia apenas na competência) ou **"Cadastro"** (vale para todos os meses).
  - Avulsas podem ser movidas de mês; a marcação de "Pago" acompanha a despesa.
- **5º dia útil**: a receita pode ser marcada como "Recebo no 5º dia útil" e o dia é calculado a cada mês. A contagem exclui domingos e feriados nacionais; o sábado conta por padrão (configurável). Feriados municipais/estaduais não são considerados.
- **Referente a**: informe que a receita se refere ao mês anterior (ex.: salário de outubro pago em novembro).
- **Critério das receitas** (no Painel): *pelo mês do recebimento (caixa)* — recomendado — ou *pelo mês de referência (competência)*.

## Novidades da 2.3

- **Início do controle financeiro: Novembro/2026.** Meses anteriores ficam zerados em todos os cálculos (Painel, pendências, plano e gráficos). Os dados de outubro **não são apagados**: continuam no backup e voltam a contar se você escolher "Sem limite".
- Ajuste em **Mês → Início do controle financeiro**.
