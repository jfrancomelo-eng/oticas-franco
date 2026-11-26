# Óticas Franco — site

**Site no ar:** https://jfrancomelo-eng.github.io/oticas-franco/

## Conceito

A Óticas Franco é uma ótica de rua em São Luís (MA). O site é uma **vitrine que leva o cliente até a loja**: ele vê as armações reais da loja, confere se a peça combina com a receita, monta uma lista para provar e agenda a visita. A venda acontece na loja; o site só encurta o caminho até ela.

Por isso a frase-guia é **"Escolha pelo site e prove na loja"**. Cada peça mostra se a foto é da loja ou ilustrativa, para não prometer o que não está na vitrine.

## Como o site é feito (base)

| Parte | Tecnologia |
|---|---|
| Página | Um único `index.html` com HTML, CSS e JavaScript puros, sem framework e sem build |
| 3D | Three.js 0.128 (CDN): abertura com o logo animado e análise da armação em 3D |
| Agendamento | Formulário que grava numa planilha do Google por meio de um Apps Script (`apps-script.gs`) |
| Imagens | `img/*.webp` (peças da vitrine) e `media/loja.mp4` (vídeo da loja) |
| Fontes | Saira (títulos) e Montserrat (texto), as mesmas dos posts da marca |
| Identidade | Marinho `#0e3c6a`, vermelho Franco `#d42a33` e fundo claro; regras em `DESIGN.md` |
| Hospedagem | GitHub Pages (site estático) |

## O que o site faz

1. **Abertura 3D**: a linha vermelha do logo se desenha, as letras dobram e o óculos pousa na linha.
2. **Vitrine** com as peças da loja (código, medidas, ponte e hastes) e o botão "Separar para provar".
3. **Análise da armação**: foto ou 3D, ficha técnica e lente sugerida, com índice e espessura estimada.
4. **Lentes**: tipos de lente e qual combina com cada receita.
5. **Marque sua visita**: agendamento com no máximo 2 clientes por horário, gravado na planilha do dono.
6. **Teste as lentes**, **Como limpar o óculos** e **Perguntas frequentes**.
7. **Status da loja**: mostra se está aberta ou fechada no horário de São Luís.

## Ligar o agendamento (uma vez só)

Siga `instrucoes.txt`. Nesta versão pública, o ID da planilha foi trocado por `COLE_AQUI_O_ID_DA_PLANILHA` e o link da planilha do administrador ficou vazio no `index.html`. Assim nenhum dado da loja fica exposto no repositório. A planilha continua privada: o site só consegue adicionar linhas e saber quais horários estão ocupados.

## Privacidade

O endereço da loja não é publicado, e as fotos foram recortadas sem o rodapé de endereço. O agendamento não mostra nome nem telefone de outros clientes.

## Estrutura

```
index.html        página completa
img/  media/      fotos da vitrine e vídeo da loja
apps-script.gs    código do Apps Script da planilha de agendamentos
instrucoes.txt    passo a passo para ligar o agendamento
DESIGN.md         cores, tipografia e movimento
```

## Rodar no computador

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.
