var map = [        //row
    ['', '', ''],  //0
    ['', '', ''],  //1
    ['', '', '']   //2
  ];

var stepCount = 0; 
var curentPlayer = 'X'; 
var message = document.getElementById('game-title'); 
var endGame = document.getElementById('endgame'); 
var reset = document.getElementById('reset_game'); 

 var showMap = function(){ 
    var div_map = document.getElementById('map');
    div_map.innerHTML = '';
    for(r=0; r <3; r++){
      for(c=0; c < 3; c++){
        div_map.innerHTML += '<div class = "cell" onclick = "setValue('+r+','+c+')">'+map[r][c]+'</div>'
      }
     }
   }
   showMap();  
  var setValue = function(r, c){
    if(map[r][c] == ''){ 
    map[r][c] = curentPlayer; 
    changePlayer(); 
    stepCount++;  
    showMap();
    (stepCount === 9) ? ((endGame.innerHTML = 'DRAW!') && (endGame.style.display = "block")):
                        (message.innerHTML = "It's " + curentPlayer + " 's turn.");
    } else{  
      if(stepCount < 9){ 
        endGame.innerHTML = 'Pick another cell!';
        endGame.style.display = "block";
      }
    }  
    checkWinner()
}
var changePlayer = function(){
  curentPlayer == 'X' 
  ? ((curentPlayer = 'O') && (message.innerHTML = "It's " + curentPlayer + " 's turn."))
  : ((curentPlayer = 'X') && (message.innerHTML = "It's " + curentPlayer + " 's turn.")); 
    endGame.innerHTML = '';    
    endGame.style.display = "none";
    message.innerHTML = "It's " + curentPlayer + " 's turn.";
}
reset.addEventListener('click', function(){
  for(r=0; r <3; r++){   
    for(c=0; c < 3; c++){
      map[r][c] = ''; 
    } 
   }
   showMap();
   curentPlayer = 'X';  
   stepCount = 0;
   endGame.style.display = "none";  
   message.innerHTML = "X get's to start";
});
var checkWinner = function(){
for(r = 0; r < 3; r++){   
  if(map[r][0] == map[r][1] &&
     map[r][1] == map[r][2] &&
     map[r][0] !== ''
  ){
      return(map[r][0]);  
   }
}
for(c = 0; c < 3; c++){   
  if(map[0][c] == map[1][c] &&
     map[1][c] == map[2][c] &&
     map[0][c] !== ''
    ){
      return(map[0][c]);
   }
}
  if(map[0][0] == map[1][1] &&
     map[0][0] == map[2][2] &&
     map[0][0] !== ''
    ){
      return(map[0][0]);;
   }

   if(map[0][2] == map[1][1] &&
    map[0][2] == map[2][0] &&
    map[0][2] !== ''
   ){
    return(map[0][2]);
  }
  return false;
}
