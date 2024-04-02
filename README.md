<div align="center">
  
# Jornada da Kobra Mística - JKM Snake Game

Clique na imagem abaixo para visualizar!

<a href="https://jkm-snake.netlify.app/"><img src="./assets/images/mockup-jkm-snake.pg" height="auto" width="auto"></a>

</div>


<div align="justify">

## Jornada de criação:

### Introdução:
JKM é basicamente o clássico jogo da cobrinha feito por estudantes de Desenvolvimento de Sistemas no SENAI. Demos inicio ao projeto no dia 01/03/2024 e foi apresentado para os professores dia 04/04/2024.


### Organização do projeto:
O método "Scrum" foi utilizado para gerenciar o desenvolvimento do jogo, proporcionando organização, comunicação e entrega eficiente do projeto. Projetamos o funcionamento do jogo utilizando o draw.io para criar uma classe de diagrama, tal qual foi utilizada posteriormente para produzir o jogo. Também foi utilizado a ferramenta Figma para projetar o design do jogo, aqui você pode ver o nosso projeto: http://gg.gg/figma-jkm


## Funcionamento do jogo:
- **Desenhar a cobra na tela**: É utilizado a API Canvas para desenhar os gráficos na tela. Para desenhar a cobrinha, é criado um objeto "snake" da classe "Head", onde é definido tamanho, cordenada e cor, e depois, a função fillRect().
- **Geração da maçã**: Assim como a cobrinha, é criado um objeto "apple" da classe "Apple" com suas predefinições, porém, é necessário gerar um valor aleatório para as cordendas dela, então, o método math random é chamado, junto com um "do while" que verifica se a cordenada gerada se encaixa corretamente nos quadradinhos do fundo.
- **Colisão com a maçã**: A cada instante, é verificado a colisão da cabeça da cobrinha com a maçã, analisando cordenada e tamanho de ambos. Se caso a função colisão retornar um valor true, o jogador ganha um ponto, e a maçã é gerada novamente em um lugar aleatório.
- **Criação do corpo**: Ao colidir com a maçã, é feito um push no array do corpo da cobrinha. Um novo objeto da classe Body é criada, onde a cada atualização o primeiro objeto sempre segue a cabeça, e as demais partes do corpo sempre seguem a parte do corpo anterior.
- **Colisão com o própio corpo**: Assim como a colisão com a maçã, a cada instante é verificado a colisão da cabeça da cobrinha com cada parte do corpo, verificado individualmente.


## Equipe:
- (Developer) José Gabriel ([@naasdd](https://github.com/naasdd))
- (Developer) Kauã Biasebetti ([@kauuaa](https://github.com/kauuaa))
- (Scrum Master & Developer) Matheus Pompeo ([@mapompeo](https://github.com/mapompeo))

## Considerações finais:
Nossa equipe gostaria de agradecer ao ao Professor Carlos Roberto ([@Prof-Carlos-Senai](https://github.com/Prof-Carlos-Senai)) por nos ajudar a desenvolver um projeto tão divertido e de muito aprendizado, a projeção desse jogo foi importante para entendermos o funcionamento real de trabalho colaborativo no mercado de trabalho.


## Licença:
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

> **Este projeto foi realizado no primeiro semestre de 2024 no _[SENAI](https://maps.app.goo.gl/Jw1hZ8uvuVqV3V9E9)_ de _[Tijucas SC](https://maps.app.goo.gl/UFumcc5hjGymGFSY7)_.**

</div>
