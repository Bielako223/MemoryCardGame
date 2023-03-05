class cart{
    constructor(value, path){
        this.value = value;
        this.path = path;
    }
        flipped = false;
        right = false;
}


const startBTN = document.getElementById('btnStart');
var secondCard = false;
var pickedCard1;
var pickedCarddiv;
var cards = [];
startBTN.addEventListener("click",()=>{
    document.getElementById('main').innerHTML = "";
    cards = []
    const gameLVL = document.getElementById('gamelevel').value;
    
    for(var i =1;i<=gameLVL;i++){
        cards.push(new cart(i, i+".png"));
        cards.push(new cart(i, i+".png"));
    }
    console.log(cards);
    cards = shuffle(cards);
    console.log(cards);
    printCards(cards);   

});

function shuffle(array) {
    var copy = [], n = array.length, i;
  
    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
  
    return copy;
  }
const printCards = (cards)=>{
    var maindiv = document.getElementById('main');
    var carddiv = document.createElement('div');
    var cardlabel = document.createElement('img');
    for(var i =0;i<cards.length;i++){
        carddiv.id = "card-"+i;
        carddiv.setAttribute("onclick","pickCard(\""+i+"\")");
        carddiv.className = "karty";
        cardlabel.src = "back.jpg";
        cardlabel.id ="label-"+i;
        cardlabel.alt = cards[i].value;
        carddiv.appendChild(cardlabel);
        maindiv.appendChild(carddiv);
        carddiv = document.createElement('div');
        cardlabel = document.createElement('img');
    }
}

const pickCard = (cardId) =>{
    var pickedCard = document.getElementById("label-"+cardId);
    var pickedDiv = document.getElementById("card-"+cardId);
    pickedDiv.setAttribute("onclick","fun()");
    if(secondCard == false){
        pickedCard.src = cards[cardId].path;
        pickedCard1 = pickedCard;
        pickedCarddiv = pickedDiv;
        secondCard = true;
    }else{
        pickedCard.src = cards[cardId].path;
        if(pickedCard.src == pickedCard1.src){
            console.log("trafiles!");
            secondCard = false;
        }else{
            var maindiv = document.getElementById('main');
            var btn = document.createElement('button');
            btn.setAttribute("onclick","badchoice()");
            maindiv.appendChild(btn);
        }
    }
    function badchoice(){
        pickedCard1.src="back.jpg";
                    pickedCard.src="back.jpg"
                    pickedDiv.setAttribute("onclick","pickCard(\""+cardId+"\")");
                    pickedCarddiv.setAttribute("onclick","pickCard(\""+ parseInt(pickedCarddiv.id)+"\")");
                    secondCard = false;
    }
}

