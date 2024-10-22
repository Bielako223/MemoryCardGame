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
var leftCouples;
var trials = 0;
startBTN.addEventListener("click",()=>{
    document.getElementById('main').innerHTML = "";
    cards = []
    const gameLVL = document.getElementById('gamelevel').value;
    document.getElementById('wyniktekst').innerHTML = "Pairs left: "+gameLVL+" Moves: "+trials;
    leftCouples = gameLVL;
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
  
    while (n) {
  
      i = Math.floor(Math.random() * array.length);
  
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
};

const pickCard = (cardId) =>{
    var pickedCard = document.getElementById("label-"+cardId);
    var pickedDiv = document.getElementById("card-"+cardId);
    pickedDiv.removeAttribute('onclick');
    if(secondCard == false){
        pickedCard.src = cards[cardId].path;
        pickedCard1 = pickedCard;
        pickedCarddiv = pickedDiv;
        secondCard = true;
    }else{
        pickedCard.src = cards[cardId].path;
        if(pickedCard.src == pickedCard1.src){
            console.log("trafiles!");
            cards[parseInt(pickedCard1.id.split("").reverse().join(""))].right = true;
            cards[parseInt(pickedCard.id.split("").reverse().join(""))].right = true;
            console.log(cards);
            winning(true);
            secondCard = false;
        }else{
            winning(false);
           for(let i=0;i<cards.length;i++){
            document.getElementById('card-'+i).removeAttribute('onclick');
           }
    setTimeout(()=>{
        console.log("Zła")
    pickedCard1.src="back.jpg";
        pickedCard.src="back.jpg"

            for(let i=0;i<cards.length;i++){
                if(cards[i].right == false){
                    document.getElementById('card-'+i).setAttribute("onclick","pickCard(\""+i+"\")");
                }
               }
        secondCard = false;
    },"2000")
    
        }
    }
};

const winning = (wygrana) =>{
    var wynik = document.getElementById('wyniktekst');
    if(wygrana){
        leftCouples--;
        trials++;
        if(leftCouples == 0){
            wynik.innerHTML = "Victory! Moves: "+trials;
            trials=0;
        }else{
            wynik.innerHTML="Pairs left: "+ leftCouples+" Moves: "+trials;
        }
    }else{
        trials++;
        wynik.innerHTML="Pairs left: "+ leftCouples+" Moves: "+trials;
    }
    
}
;
