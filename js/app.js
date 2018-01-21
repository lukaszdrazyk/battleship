'use strict';
const gameboardArray = [
  {
    name: 'Gameboard 1',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }, {
    name: 'Gameboard 2',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }, {
    name: 'Gameboard 3',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
];

class BaseElement{
    createElement(){
        console.log('Not implemented here!');
    }
    setElement(){
        this.elementState = {
            element: this.createElement()
        }
        this.initialize();
        return this.getElement();
    }
    getElement(){
        return this.elementState.element;
        
    }
    initialize(){
        
    };
}
class Cell extends BaseElement{
    constructor ({isShip, gameboard}){
      super ();
      this.isShip = isShip;
      this.gameboard = gameboard;
      this.state = 'unknown';
      this.onClick = this.fireTorpido;
    }
    createElement(){
      const element = document.createElement('div');
      element.addEventListener('click', this.onClick.bind(this));

      return element;
    }
    setState(state){
        this.state = state;
        this.refresh();
    }

    fireTorpido(){
        this.gameboard.totalClicks += 1;
        if (this.gameboard.totalClicks > 30){
            alert('Przegrales');
        }
        if (this.isShip){
            
            if(this.state !== 'unknown'){
               return false;
            }
           
            this.gameboard.score += 1;
          //  gameResult.innerHTML = '';
            while (gameResult.firstChild){
                gameResult.removeChild(gameResult.firstChild);
            }
            gameResult.append(`${this.gameboard.score}/${this.gameboard.totalScore}/${this.gameboard.totalClicks}`)
            this.setState('hit');
            if(this.state !== 'unknown'){
               return false;
            }
        } else {
            this.setState('miss');
        }
    }

    refresh(){
    //    this.getElement().className = 'cell-' + this.state;
        this.getElement().className = `cell-${this.state}`;
    }
    initialize(){
        this.refresh();
    }
}
class Gameboard extends BaseElement{
    constructor(size){
        super();
        this.totalClicks = 0;
        this.cells = [];
        this.rowNumber = size;
        this.columnNumber = size;
        this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)];
        this.score = 0;
        this.totalScore = this.getTotalScore(this.fleet);
        for (let rowIndex= 0; rowIndex < this.rowNumber; rowIndex++){
            for (let columnIndex = 0; columnIndex < this.columnNumber; columnIndex++) {
            this.cells.push(new Cell({
                isShip: this.fleet.array[rowIndex][columnIndex] === 1 ? true : false,  //zapis liniowy if else
                gameboard: this 
            }));
                }
        }
        gameResult.append(`${this.score}/${this.totalScore}/${this.totalClicks}`);
    }
    createElement(){
        const gameboard = document.createElement('div');
        gameboard.className = 'gameboard';
        for (let rowIndex = 0; rowIndex <this.rowNumber; rowIndex++){
            const row = document.createElement('div');
            row.className = 'board-row';
            for (let columnIndex = 0; columnIndex < this.columnNumber; columnIndex++) {
                const cell = this.cells[rowIndex * this.columnNumber + columnIndex];
                row.appendChild((cell.setElement()));
            }
            gameboard.appendChild(row);
        }
        return gameboard;
    }
    getTotalScore(fleet){
        let total = 0;

        //fleet.array.forEach(function(row)){

        //};
       fleet.array.forEach((row) => {
          total += row.filter((x) => {return x === 1}).length
       });
        return total;

        

}
}
const gameboardContainer = document.getElementById('gameboardContainer');
const gameResult = document.getElementById('gameResult');
const gamebord = new Gameboard(10);
gameboardContainer.appendChild(gamebord.setElement());


