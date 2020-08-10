
/* Cargar desde el DOM las clases .grid, .grid y asginarlas a variables */
document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const width = 28 // 28x28 = 784 squares
let score = 0

/* definimos el layout que sera el stage del juego */
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

/*
   0 - pac-dots
   1 - wall
   2 - ghost-lair
   3 - power-pellet
   4 - empty
  */

  const squares = []

  /* dibujar la grid y renderizarla */
  function createBoard() {
      for (let i = 0; i < layout.length; i++) {
          const square = document.createElement('div')
          grid.appendChild(square)
          squares.push(square)

           /* agregar el layout al tablero */
           if (layout[i] === 0) {
               squares[i].classList.add('pac-dot')
           }
           else if (layout[i] === 1) {
            squares[i].classList.add('wall')
           }
           else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
           }
           else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
           }
      }
  }

  createBoard()
  
 /* iniciamos la posicion de pacman Pacman is Alive*/
 let pacmanCurrentIndex = 490

 squares[pacmanCurrentIndex].classList.add('pac-man')

 /* agregamos movimiento a pacman */
 function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    // configuramos teclas
    switch(e.keyCode) {
        case 37: //left
            if(pacmanCurrentIndex % width != 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair'))
            {
                pacmanCurrentIndex -=1
                //salir a la derecha - atajo
                if((pacmanCurrentIndex -1) === 363)
                {
                    pacmanCurrentIndex= 391
                }
                break
            }
        case 38: //up
            if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall') && !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair'))
            {
                pacmanCurrentIndex -=width
                break
            }
        case 39: //right
            if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair'))
            {
                pacmanCurrentIndex +=1
                 //salir a la izquierda - atajo
                 if((pacmanCurrentIndex +1) === 392)
                 {
                     pacmanCurrentIndex= 364
                 }
                break
            }
        case 40: //down
            if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall') && !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair'))
            {
                pacmanCurrentIndex +=width
                break
            }
    }

    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    //  powerPelletEaten()
    //  checkForGameOver()
    //  checkForWin()
 }
 /* habilita las teclas*/
 document.addEventListener('keyup', movePacman)

// pacman se come los pac-dot
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
  }

})