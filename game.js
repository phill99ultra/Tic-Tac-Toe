var map = [        //row
    ['', '', ''],  //0
    ['', '', ''],  //1
    ['', '', '']   //2
  ];
//col 0   1   2
var stepCount = 0; //variabila ce ne arata numarul de pasi, nu uitam ca maximum putem face 9 pasi in joaca
var curentPlayer = 'X'; //variabila globala care da de inteles ca primul jucator va incepe mereu cu X
var message = document.getElementById('game-title'); //acces la text pentru a putea vizualiza cine merge: X sau O
var endGame = document.getElementById('endgame'); //acces la blocul de afisare a rezultatului jocului
var reset = document.getElementById('reset_game'); //obtinem acces la butonul de resetare
var data_X = [];   //masive necesare pentru a colecta datele de la fiecare jucator
var data_O = [];
  //functia cu ajutorul caruia afisam tabla jocului in html
  var showMap = function(){
    var div_map = document.getElementById('map');
    div_map.innerHTML = '';
    for(r=0; r <3; r++){
      for(c=0; c < 3; c++){
        div_map.innerHTML += '<div class = "cell" onclick = "setValue('+r+','+c+')">'+map[r][c]+'</div>'
      }
     }
   }
   showMap();  //niciodata nu uitam ca schimbarile initial se fac in masivul map din JS
//mereu e nevoie de apelat la functia showMap pentru ca schimbarile sa fie implimentate in HTML   
  var setValue = function(r, c){
    //alert(r + " - " +c);
    //console.log(r + " - " +c);
    if(map[r][c] == ''){  //de acest if este nevoie ca sa nu se rescrie celula ce deja are valoarea X sau O
    map[r][c] = curentPlayer; //din primul click atribuim ca valoarea celulei devine X(variabila globala sus declarata)
    //(map[r][c] === 'X') ? data_X.push(map[r][c]) : data_O.push(map[r][c]);
    changePlayer(); //functie cu care schimbam jucatorul care face pasul
    stepCount++;  //dupa fiecare click creste numarul de pasi
    showMap();
    //mereu verificam daca numarul de pasi nu este egal cu 9
    //daca da, oprim jocul si afisam Draw
    (stepCount === 9) ? ((endGame.innerHTML = 'DRAW!') && (endGame.style.display = "block")):
                        (message.innerHTML = "It's " + curentPlayer + " 's turn.");
    } else{  //in cazul click-ului pe-o celula ocupata apare asa un mesaj-spam
//if-el de jos e nevoie de folosit ca user-ul dupa afisarea draw
//sa nu apese pe una din celule si mesajul-spam sa se schimbe pe cel cu "alege alta celula"      
      if(stepCount < 9){ 
        endGame.innerHTML = 'Pick another cell!';
        endGame.style.display = "block";
      }
    }  
    checkWinner()
}
var changePlayer = function(){
  curentPlayer == 'X' 
  ? ((curentPlayer = 'O') && (message.innerHTML = "It's " + curentPlayer + " 's turn.") /*&&  (data_O.push(curentPlayer)) */)
  : ((curentPlayer = 'X') && (message.innerHTML = "It's " + curentPlayer + " 's turn.") /* && (data_X.push(curentPlayer)) */);
//urmatoarele trei rinduri se pun pentru a lua mesajul spam de pe ecran si a se reintoarce la joaca  
    endGame.innerHTML = '';    
    endGame.style.display = "none";
    message.innerHTML = "It's " + curentPlayer + " 's turn.";
}
//functia de resetare a jocului
reset.addEventListener('click', function(){
  var div_map = document.getElementById('map');  //e nevoie din nou sa obtinem acces in HTML la map
  div_map.innerHTML = '';
  for(r=0; r <3; r++){   //si din nou sa parcurgem masivul
    for(c=0; c < 3; c++){
      map[r][c] = ''; //cea mai importanta modificare in comparatie cu vizualizarea simpla a mapei
      div_map.innerHTML += '<div class = "cell" onclick = "setValue('+r+','+c+')">'+map[r][c]+'</div>';
    }
   }
   data_X = []; 
   data_O = [];
   curentPlayer = 'X';  //totul reducem la starea initiala caci reset incepe jocul de la inceput
   stepCount = 0;
   endGame.style.display = "none";  //e nevoie si de acest detaliu in cazul resetului la rezultatul draw
   message.innerHTML = "X get's to start";
});
//functia pentru verificarea variantei de cistig
var checkWinner = function(){
for(r = 0; r < 3; r++){   //verificam variantele din rinduri
  if(map[r][0] == map[r][1] &&
     map[r][1] == map[r][2] &&
     map[r][0] !== ''
  ){
        if(map[r][0] == 'X'){
        endGame.style.display = "block";
        endGame.innerHTML = "The winner is X";
        removeClick(r,c) 
      } else if(map[r][0] == 'O'){
        endGame.style.display = "block";
        endGame.innerHTML = "The winner is O";
      } else{
        return false;
      }
   }
}
for(c = 0; c < 3; c++){   //verificam variantele din coloane
  if(map[0][c] == map[1][c] &&
     map[1][c] == map[2][c] &&
     map[0][c] !== ''
    ){
      alert(map[0][c]);;
   }
}
//diagonala stinga-dreapta
  if(map[0][0] == map[1][1] &&
     map[0][0] == map[2][2] &&
     map[0][0] !== ''
    ){
      alert(map[0][0]);;
   }
//diagonala dreapta-stinga   
   if(map[0][2] == map[1][1] &&
    map[0][2] == map[2][0] &&
    map[0][2] !== ''
   ){
    alert(map[0][2]);;
  }
  return false;
}
var removeClick = function(){
  var block = document.getElementsByClassName('cell');
  block.removeEventListener('click', setValue);
}