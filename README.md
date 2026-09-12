# Lista de compras

App de lista de compras com contas de usuário, categorias, quantidade e preço em reais.
Feito com React + Vite. Os dados ficam no navegador (localStorage).

## Funcionalidades

- Login e cadastro por usuário, com sessão salva
- Várias listas por conta (Mercado, Farmácia, Casa…), com ordem que você define
- Categorias: listas de mercado já vêm com as categorias de supermercado; nas demais, você cria as suas
- Itens com quantidade (inteiros) e preço opcional, com total do carrinho
- Organizar itens: arrastar, setas e ordenações (A→Z, preço, quantidade, data)
- Modo claro e escuro

## Rodar na sua máquina

Requer Node.js 18 ou mais novo.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Gerar a versão de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # testa a versão de produção localmente
```

## Onde ficam os dados

Tudo é salvo no `localStorage` do navegador, com o prefixo `lista:`. Isso significa que as
listas não sincronizam entre aparelhos e que limpar os dados do navegador apaga as contas.

O login é simulado: a senha é guardada com hash SHA-256 e salt, mas no próprio navegador.
Serve para demonstração, não para uso real. Para virar produto, troque as funções
`sGet`, `sSet` e `sDel` em `src/App.jsx` por chamadas a um backend (Supabase, Firebase ou API própria).
