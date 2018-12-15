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
    if(map[r][c] == ''){  //de acest if este nevoie ca sa nu se rescrie celula ce deja are valoarea X sau O
    map[r][c] = curentPlayer; //din primul click atribuim ca valoarea celulei devine X(variabila globala sus declarata)
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
    checkWinner(); //dupa fiecare click facem verificarea in caz daca e cistig, apelam la functia ce-l verifica
}
var changePlayer = function(){
  curentPlayer == 'X' 
  ? ((curentPlayer = 'O') && (message.innerHTML = "It's " + curentPlayer + " 's turn."))
  : ((curentPlayer = 'X') && (message.innerHTML = "It's " + curentPlayer + " 's turn."));
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
   curentPlayer = 'X';  //totul reducem la starea initiala caci reset incepe jocul de la inceput
   stepCount = 0;
   endGame.style.display = "none";  //e nevoie si de acest detaliu in cazul resetului la rezultatul draw
   message.innerHTML = "X get's to start";
});
var checkWinner = function(r,c){
//pentru usurarea vietii si economisirea spatiului pentru cod declaram un masiv cu toate variantele posibile spre cistig
   var winningCombinations = [
    [0, 1, 2],
    /* [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], */
    [3, 4, 5],
    //[6, 7, 8]
   ];
   map[r][c] = curentPlayer;
//parcurgem masivul prin variantele posibile, ce la fel sunt masive   
   for(i = 0; i < winningCombinations.length; i++){ 
        var wc = winningCombinations[i];  //de aceasta variabila e nevoie pentru a putea cotrobai in submasive
        if(curentPlayer[wc[0]] == curentPlayer[wc[1]] && curentPlayer[wc[1]] == curentPlayer[wc[2]] && curentPlayer[wc[0]] != ''){
          alert()
        }
      }
}
/* if(map[r][c][wc[0]] == map[r][c][wc[1]] && map[r][c][wc[1]] == map[r][c][wc[2]] && map[r][c][wc[0]] != ''){
  alert()
} */