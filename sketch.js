// Variáveis da bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 35
let raio = diametro / 2

//velocidade da bolinha
let velocidade = 6
let velocidadeXdaBolinha = velocidade
let velocidadeYdaBolinha = velocidade

// Variáveis da raquete
let xRaquete = 15
let yRaquete = 150
let comprimentoRaquete = 10
let alturaRaquete = 100

// Variáveis do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYdoOponente

//placar do jogo
let meusPontos = 0
let pontosDoOponente = 0

let colidiu = false

function setup() {
  createCanvas(600, 400)
}

function draw() {
  background(0)
  monstraBolinha()
  movimentaBolinha()
  verificaColisaoBorda()
  mostraRaquete(xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaMinhaRaquete()
  // movimentaRaqueteOponente()
  VerificaColisaoRaquete(xRaquete, yRaquete)
  VerificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
  incluiPlacar()
}

function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete)
}

function monstraBolinha() {
  circle(xBolinha, yBolinha, diametro)
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
}

function verificaColisaoComRaquete() {
  if (
    xBolinha - raio < xRaquete + comprimentoRaquete &&
    yBolinha - raio < yRaquete + alturaRaquete &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXdaBolinha *= -1
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
  }
}

function movimentaRaqueteOponente() {
  velocidadeYdoOponente =
    yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30

  yRaqueteOponente += velocidadeYdoOponente
}

function incluiPlacar() {
  fill(255)
  text(meusPontos, 278, 26)
  text(pontosDoOponente, 321, 26)
}
