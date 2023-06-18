let apresentaDiv = document.getElementById("apresentaDiv")
let jogandoDiv = document.getElementById("jogandoDiv")
let digitaINPT = document.getElementById("digitaINPT")
let palavraDiv = document.getElementById("palavraDiv")
var canvas = document.getElementById("bonequinho")
var context = canvas.getContext("2d")
let acertosPermitidos = 0
let palavraAdivinhar = ""
let formandoPalavra = []
let iniciou = false
let letrasDigitadas = ""
let listaDePalavras = [
  "amigo",
  "banana",
  "barco",
  "bonito",
  "cachorro",
  "carro",
  "casaco",
  "elefante",
  "escada",
  "escola",
  "espada",
  "estrela",
  "futebol",
  "guitarra",
  "gato",
  "hora",
  "ilhas",
  "janela",
  "jardim",
  "leite",
  "lua",
  "mala",
  "martelo",
  "navio",
  "nuvem",
  "oceano",
  "parque",
  "passarinho",
  "pipoca",
  "piscina",
  "porta",
  "queijo",
  "raio",
  "sapato",
  "sol",
  "sorvete",
  "teclado",
  "telefone",
  "tigre",
  "uva",
  "viagem",
  "xadrez",
  "zebra",
  "zero",
  "zoo",
  "trem",
  "torta",
  "risada",
  "rio"
]

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    if (!iniciou) {
      return
    }
    if (digitaINPT.value == "") {
      apresentaDiv.innerHTML = "Digite uma letra!"
    } else {
      apresentaDiv.innerHTML = ""
      let letraDigitada = digitaINPT.value
      digitaINPT.value = ""
      if (letrasDigitadas.indexOf(letraDigitada) > -1) {
        apresentaDiv.innerHTML = "Letra repetida!"
      } else {
        letrasDigitadas += " " + letraDigitada
        if (palavraAdivinhar.indexOf(letraDigitada) > -1) {
          for (let i = 0; i < palavraAdivinhar.length; i++) {
            if (palavraAdivinhar[i] == letraDigitada) {
              formandoPalavra[i] = letraDigitada
            }
          }
        } else {
          acertosPermitidos--
          desenhaBonequinho(acertosPermitidos)
          if (acertosPermitidos < 1) {
            palavraDiv.innerHTML = `Foi enforcado! A palavra era ${palavraAdivinhar}`
            apresentaDiv.innerHTML = "Você perdeu!"
            return setTimeout(() => {
              reset()
            }, 3000)
          }
        }
        palavraDiv.innerHTML = formandoPalavra.join("")
        if (formandoPalavra.indexOf("*") < 0) {
          apresentaDiv.innerHTML = `Parabéns! Você acertou.<br>A palavra é ${palavraAdivinhar}`
          limparCanvas()
          return setTimeout(() => {
            reset()
          }, 3000)
        }
      }
    }
    return

  }
})

function joga() {
  iniciou = true
  listaDePalavras = shuffleArray(listaDePalavras)
  palavraAdivinhar = listaDePalavras[0]
  formandoPalavra = Array(palavraAdivinhar.length).fill("*")
  acertosPermitidos = 7 // Iniciando, nenhuma parte desenhada
  jogandoDiv.style.display = "flex"
  apresentaDiv.innerHTML = ""
  palavraDiv.innerHTML = formandoPalavra.join("")
  document.getElementById("botaoJogaDiv").style.display = "none"
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function desenhaBonequinho(attempts) {
  // Limpar o canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Definir as dimensões do bonequinho
  const centerX = canvas.width / 2 + 250
  const centerY = canvas.height / 2 - 220
  const radius = 30

  // Desenhar a forca
  context.beginPath()
  context.moveTo(20, canvas.height - 20)
  context.lineTo(20, 20)
  context.lineTo(canvas.width - 50, 20)
  context.lineTo(canvas.width - 50, 50)
  context.stroke()

  if (attempts <= 6) {
    // Desenhar a cabeça
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, Math.PI * 2)
    context.stroke()
    apresentaDiv.innerHTML = "Desenhei a cabeça!"
  }

  if (attempts <= 5) {
    // Desenhar o corpo
    context.beginPath()
    context.moveTo(centerX, centerY + radius)
    context.lineTo(centerX, centerY + radius + 100)
    context.stroke()
    apresentaDiv.innerHTML = "Desenhei o corpinho!"
  }

  if (attempts <= 4) {
    // Desenhar o braço esquerdo
    context.beginPath()
    context.moveTo(centerX, centerY + radius + 20)
    context.lineTo(centerX - 40, centerY + radius + 80)
    context.stroke()
    apresentaDiv.innerHTML = "Desenhei o bracinho esquerdo!"
  }

  if (attempts <= 3) {
    // Desenhar o braço direito
    context.beginPath()
    context.moveTo(centerX, centerY + radius + 20)
    context.lineTo(centerX + 40, centerY + radius + 80)
    context.stroke()
    apresentaDiv.innerHTML = "Desenhei o braço direito, hein..."
  }

  if (attempts <= 2) {
    // Desenhar a perna esquerda
    context.beginPath()
    context.moveTo(centerX, centerY + radius + 100)
    context.lineTo(centerX - 40, centerY + radius + 160)
    context.stroke()
    apresentaDiv.innerHTML = "Desenhei a perna esquerda..."
  }

  if (attempts <= 1) {
    // Desenhar a perna direita
    context.beginPath()
    context.moveTo(centerX, centerY + radius + 100)
    context.lineTo(centerX + 40, centerY + radius + 160)
    context.stroke()
    apresentaDiv.innerHTML = "Desenhei a perna direita..."
  }

  if (attempts < 1) {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}

// Limpar o Canvas do personagem
function limparCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height)
}
function reset() {
  iniciou = false
  letrasDigitadas = ""
  jogandoDiv.style.display = "none"
  document.getElementById("botaoJogaDiv").style.display = "flex"
}