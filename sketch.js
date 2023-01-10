// Variáveis da bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 35
let raio = diametro / 2

//velocidade da bolinha
let velocidade = 10
let velocidadeXdaBolinha = velocidade
let velocidadeYdaBolinha = velocidade

// Variáveis da raquete
let xRaquete = 3
let yRaquete = 150
let alturaRaquete = 90
let comprimentoRaquete = 10

// Variáveis do oponente
let xRaqueteOponente = 580
let yRaqueteOponente = 150
let velocidadeYdoOponente
let chanceDeErrar = 0

//placar do jogo
let meusPontos = 0
let pontosDoOponente = 0
let pontosGameOver = 3

//sons do jogo
let raquetada
let ponto
let trilha

let newGame = false

let colidiu = false

function preload() {
  trilha = loadSound('./Sons/trilha.mp3')
  ponto = loadSound('./Sons/ponto.mp3')
  raquetada = loadSound('./Sons/raquetada.mp3')
}

function setup() {
  createCanvas(600, 400)
  // trilha.loop()
}

function draw() {
  if (newGame == false) {
    background(40)
    monstraBolinha()
    movimentaBolinha()
    verificaColisaoBorda()
    mostraRaquete(xRaquete, yRaquete)
    mostraRaquete(xRaqueteOponente, yRaqueteOponente)
    mostraLinha()
    movimentaMinhaRaquete()
    movimentaRaqueteOponente()
    VerificaColisaoRaquete(xRaquete, yRaquete)
    VerificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
    incluiPlacar()
    marcaPonto()
    bolinhaNaoFicaPresa()
    gameOver()
  }
}

function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete)
}

function monstraBolinha() {
  circle(xBolinha, yBolinha, diametro)
}
function mostraLinha() {
  for (let i = -5; i < 400; i += 30) {
    rect(300, i, 2, 20)
  }
}

function movimentaBolinha() {
  xBolinha += velocidadeXdaBolinha
  yBolinha += velocidadeYdaBolinha
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXdaBolinha *= -1
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYdaBolinha *= -1
  }
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10
  }

  // colisão da borda (player1)
  if (yRaquete < 0) {
    yRaquete = 0
  }
  if (yRaquete + comprimentoRaquete > height - 90) {
    yRaquete = height - alturaRaquete
  }
}

function verificaColisaoComRaquete() {
  if (
    xBolinha - raio < xRaquete + comprimentoRaquete &&
    yBolinha - raio < yRaquete + alturaRaquete &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXdaBolinha = (Math.floor(Math.random() * 10) + 8) * -1
    console.log(velocidadeXdaBolinha)
  }
}

function VerificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    comprimentoRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    raio
  )

  if (colidiu) {
    velocidadeXdaBolinha *= -1
    console.log(velocidadeXdaBolinha)

    raquetada.play()
  }
}

function movimentaRaqueteOponente() {
  velocidadeYdoOponente =
    yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30
  yRaqueteOponente += velocidadeYdoOponente + chanceDeErrar
  calculaChanceDeErrar()

  if (yRaqueteOponente < 0) {
    yRaqueteOponente = 0
  }
  if (yRaqueteOponente + comprimentoRaquete > height - 90) {
    yRaqueteOponente = height - alturaRaquete
  }
}

// function movimentaRaqueteOponente() {
//   if (keyIsDown(87)) {
//     yRaqueteOponente -= 10
//   }
//   if (keyIsDown(83)) {
//     yRaqueteOponente += 10
//   }
// }

function incluiPlacar() {
  stroke(255)
  textAlign(CENTER)
  textSize(20)

  fill(color(255, 140, 0))
  rect(150, 10, 40, 30) //meus pontos
  rect(450, 10, 40, 30) // pontos do oponente

  fill(255)
  text(meusPontos, 170, 32) //texto meus pontos
  text(pontosDoOponente, 470, 32) // texto ponto do oponente
}

function marcaPonto() {
  if (xBolinha > 585) {
    meusPontos += 1
    ponto.play()
  }
  if (xBolinha < 15) {
    pontosDoOponente += 1
    ponto.play()
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 2) {
      chanceDeErrar = 3
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 2) {
      chanceDeErrar = 3
    }
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio <= 0) {
    xBolinha = 40
  } else {
    if (xBolinha - raio >= 594) {
      xBolinha = width - 40
    }
  }
}

function gameOver() {
  if (pontosDoOponente >= pontosGameOver) {
    fimDeJogo('Oponente')
  } else if (meusPontos >= pontosGameOver) {
    fimDeJogo('Você')
  }
}

function fimDeJogo(win) {
  newGame = true

  stroke(255)
  fill(255)
  textAlign(CENTER)
  textSize(40)

  background(0)
  text('PLACAR', 300, 150) //texto meus pontos
  text('Player 1 = ' + meusPontos + ' pontos', 300, 200) //texto meus pontos
  text('Player 2 = ' + pontosDoOponente + ' pontos', 300, 250) //texto meus pontos
  text(win + ' Ganhou', 300, 300) //texto meus pontos

  meusPontos = 0
  pontosDoOponente = 0
  velocidadeXdaBolinha = 0

  setTimeout(myGreeting, 5000)

  function myGreeting() {
    xBolinha = 300
    yBolinha = 200
    newGame = false
  }
}
