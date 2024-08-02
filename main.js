const  startbox = document.querySelector(".startbox"),
selectbox = document.querySelector(".select-box"),
maingame = document.querySelector(".container"),
selectXbtn=document.querySelector(".playerx"),
selectObtn=document.querySelector(".playero"),
startplay = document.querySelector(".startbtn"),
turnsymbol=document.querySelector(".symbol"),
cells = document.querySelectorAll(".cell"),
reset=document.querySelector(".reset"),
replay=document.querySelector(".close"),
opponent_type = document.querySelectorAll(".opponent-btn"),
cur_turn = document.querySelector(".current-turn");
const playerxscore=document.querySelector(".score1"),
playeroscore=document.querySelector(".score2"),
tiescore=document.querySelector(".draw");


let opponent ='';
let Player='';
let opposite='';
window.onload = () =>{
    startplay.onclick = () =>
    {
        startbox.classList.add("hide");
        selectbox.classList.remove("hide");
    }
    selectXbtn.onclick = () =>
    {
        Player=selectXbtn.value;
        cur_turn.innerHTML=Player;
        opposite = 'O';
        selectXbtn.classList.add("selected");
        selectObtn.classList.remove("selected");
        for(let i = 0 ; i<opponent_type.length ; i++)
            {
                opponent_type[i].onclick = (e) =>
                {
                    opponent = e.target.innerHTML;
                    selectbox.classList.add("hide");
                    maingame.classList.remove("hide");
                }
            }
    }
    selectObtn.onclick = () =>
        {
            Player=selectObtn.value;
            cur_turn.innerHTML=Player;
            opposite = 'X';
            selectObtn.classList.add("selected");
            selectXbtn.classList.remove("selected");
            for(let i = 0 ; i<opponent_type.length;i++)
                {
                    opponent_type[i].onclick = (e) =>
                    {
                        opponent = e.target.innerHTML;
                        selectbox.classList.add("hide");
                        maingame.classList.remove("hide");
                    }
                }
            turnsymbol.setAttribute("class","symbol active playerO");
        }

}


//***************** Human function  */
let runBot = true;
let runfriend=true;




// ***************** win combo ******************//
function win() {
    let _tie = false;
    let winner = null;
    let z = 0;
    let a = document.getElementById("0").innerHTML;
    let b = document.getElementById("1").innerHTML;
    let c = document.getElementById("2").innerHTML;
    let d = document.getElementById("3").innerHTML;
    let e = document.getElementById("4").innerHTML;
    let f = document.getElementById("5").innerHTML;
    let g = document.getElementById("6").innerHTML;
    let h = document.getElementById("7").innerHTML;
    let i = document.getElementById("8").innerHTML;

    if (a == opposite && b == opposite && c == opposite) {
        winner = opposite;
        _tie = true;
    }
    if (d == opposite && e == opposite && f == opposite) {
        winner = opposite;
        _tie = true;
    }
    if (g == opposite && h == opposite && i == opposite) {
        winner = opposite;
        _tie = true;
    }
    //V
    if (a == opposite && d == opposite && g == opposite) {
        winner = opposite;
        _tie = true;
    }
    if (b == opposite && e == opposite && h == opposite) {
        winner = opposite;
        _tie = true;
    }
    if (c == opposite && f == opposite && i == opposite) {
        winner = opposite;
        _tie = true;
    }
    //d
    if (a == opposite && e == opposite && i == opposite) {
        winner = opposite;
        _tie = true;
    }
    if (c == opposite && e == opposite && g == opposite) {
        winner = opposite;
        _tie = true;
    }

    //human
    if (a == Player && b == Player && c == Player) {
        winner = Player;
        _tie = true;
    }
    if (d == Player && e == Player && f == Player) {
        winner = Player;
        _tie = true;
    }
    if (g == Player && h == Player && i == Player) {
        winner = Player;
        _tie = true;
    }
    //V
    if (a == Player && d == Player && g == Player) {
        winner = Player;
        _tie = true;
    }
    if (b == Player && e == Player && h == Player) {
        winner = Player;
        _tie = true;
    }
    if (c == Player && f == Player && i == Player) {
        winner = Player;
        _tie = true;
    }
    //d
    if (a == Player && e == Player && i == Player) {
        winner = Player;
        _tie = true;
    }
    if (c == Player && e == Player && g == Player) {
        winner = Player;
        _tie = true;
    }


    if (_tie == false) {
        if (a != "" && b != "" && c != "" && d != "" && e != "" && f != "" &&
            g != "" && h != "" && i != "")
            {
                winner = "Tie !";
            }

    }

    if (winner != null) {
        
        return winner;
    }
}


// ******************** vs computer function ***************** //
function computer() {
    let bestScore = -Infinity;
    let bestMove;


    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText == '') {
            document.getElementById(i).innerHTML = opposite;
            // console.log(i);
            let score = minimax(cells, 0, false);
            document.getElementById(i).innerHTML = "";

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;

            }
        }
    }

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText == '') {
            document.getElementById(i).innerHTML =Player;

            let score = minimax(cells, 0, false);
            document.getElementById(i).innerHTML = "";

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;

            }
        }
    }
    if(turnsymbol.classList.contains("playerO"))
        {
            cur_turn.innerHTML =  Player;
           document.getElementById(bestMove).innerHTML = opposite;
           document.getElementById(bestMove).style.color="#17ffdc";
           turnsymbol.classList.add("active");
    
        }
        else

        {       cur_turn.innerHTML =  Player;
                document.getElementById(bestMove).innerHTML = opposite;
                document.getElementById(bestMove).style.color="hsl(39, 100%, 69%)";
                turnsymbol.classList.remove("active");
              
                // turnsymbol.classList.add("playerO"); 
        }
        cells[bestMove].style.pointerEvents = "none";



    // document.getElementById(bestMove).innerHTML = AI;
    // document.getElementById(bestMove).removeEventListener("click", human);


}

function minimax(board, depth, isMaximizing) {
    let s = {
        X: -101,
        O: -100,
        tie: -102,   
    }
    let result = win();
    if (result != null) {
        return s[result];

    }
    return -1000;
   
}

reset.onclick = () => { 
    cells.forEach(cell =>{
        cell.innerHTML = "";
        cell.style.pointerEvents="fill";
    })
    if(opponent == 'Friend' || opponent == 'Computer')
        {
            runfriend = true;  
            if(Player =='O')
            {
                turnsymbol.classList.add("active");
            }
            else
            {
                turnsymbol.classList.remove("active");
            }
        
                cur_turn.innerHTML=Player;
        }
}



// ************************* Replay function ***************************//
replay.onclick = () => {
    let show2 = document.querySelector(".overlay"); 
    show2.classList.add("hide");
    cells.forEach(cell =>{
        cell.innerHTML = "";
        cell.style.pointerEvents="fill";
    })
    if(opponent == 'Friend' || opponent == 'Computer')
    {
        runfriend = true;  
        if(Player =='O')
        {
            turnsymbol.classList.add("active");
        }
        else
        {
            turnsymbol.classList.remove("active");
        }
    
            cur_turn.innerHTML=Player;
    }

    if(Player == 'O')
    {   
        tiescore.innerHTML=tie;
        playerxscore.innerHTML=oponentwins;
        playeroscore.innerHTML=playerwin;
    }
    else 
    {
        tiescore.innerHTML=tie;
        playerxscore.innerHTML=playerwin;
        playeroscore.innerHTML=oponentwins;
    }
}

// ****************** Quit function **********************//
const QuitBtn = document.querySelector(".quit");
QuitBtn.onclick = () => {
    window.location.reload();
}


// ************************** checkresult *********************//
let oponentwins= 0;
let playerwin =0;
let tie=0;
let show1 = document.querySelector(".winnername");
let pic = document.querySelector(".trophy");
function checkresult()
{
    let result = win();
                if (result != null) { 
                    if(result == opposite)
                    {
                        oponentwins=oponentwins+1;
                        let show2 = document.querySelector(".overlay");
                        show2.classList.remove("hide");
                        show1.innerHTML = `Player &nbsp;&nbsp;${result} &nbsp;&nbsp;Won`;
                        pic.innerHTML='<img src="win.png">';
                    }
            
                    else if(result == Player)
                    {
                        playerwin=playerwin+1;
                        let show2 = document.querySelector(".overlay");
                        show2.classList.remove("hide");
                        show1.innerHTML = `Player &nbsp;&nbsp;${result} &nbsp;&nbsp;Won`;  
                        pic.innerHTML='<img src="win.png">';
                         
                    }
                    else
                    {
                        tie=tie+1;
                        let show2 = document.querySelector(".overlay");
                        show2.classList.remove("hide");
                        show1.innerHTML = result;  
                        pic.innerHTML='<img src="tie.png">';
                    }
                    // let show3 = document.getElementById("header");
                    // show3.style.display = "flex";
                    cells.forEach(cell => {
                        cell.removeEventListener("click");
            
            
                    })
                }
}

for(let i=0 ; i<cells.length ; i++)
    {
        cells[i].addEventListener('click' ,() =>{
                //******************************* Player vs AI //
                if(opponent =='Computer')
                {
                    if(Player == 'X')
                    { 
                        cur_turn.innerHTML =  opposite;
                        cells[i].style.color="#17ffdc";
                        cells[i].innerHTML = Player;
                        turnsymbol.classList.remove("active");
                    }
                    else
                    {
                        cur_turn.innerHTML =  opposite;
                        turnsymbol.classList.add("active");
                        cells[i].style.color="hsl(39, 100%, 69%)";
                        cells[i].innerHTML = Player;
                    }
        
                    let randomTimeDelay = ((Math.random() * 200) + 200).toFixed();
                    setTimeout(()=>{
                        checkresult();
                        computer(runBot);
                        checkresult();
              
                    }, randomTimeDelay);
                    cells[i].style.pointerEvents = "none";
                }
    
                //******************** Player vs Player
                else
                {
                    if(Player == 'X')
                    {
                        if(runfriend)
                            {
                                cells[i].style.color="#17ffdc";
                                cells[i].innerHTML=Player;
                                runfriend = false;
                                cur_turn.innerHTML=opposite;
                                turnsymbol.classList.add("active");
                            }
                            else
                            {
                                cells[i].style.color="hsl(39, 100%, 69%)";
                                turnsymbol.classList.remove("active");
                                cells[i].innerHTML = opposite;
                                runfriend = true;
                                cur_turn.innerHTML=Player;
                            }
                    }
                    else{
                        if(runfriend)
                            {
                                cells[i].style.color="hsl(39, 100%, 69%)";
                                cells[i].innerHTML=Player;
                                runfriend = false;
                                cur_turn.innerHTML=opposite;
                                turnsymbol.classList.remove("active");
                            }
                            else
                            {
                                cells[i].style.color="#17ffdc";
                                turnsymbol.classList.add("active");
                                cells[i].innerHTML = opposite;
                                runfriend = true;
                                cur_turn.innerHTML=Player;
                            }
                    }
      
                    cells[i].style.pointerEvents = "none";
                    checkresult();
                }
        })
    }

// function checkresult()
// {
//     let result = win();
//     if (result != null) { 
//         if(result == opposite)
//         {
//            oponentwins=oponentwins+1;
//             let show2 = document.querySelector(".overlay");
//             show2.classList.remove("hide");
//             let show = document.querySelector(".winner");
//             show.innerHTML = result; 
//             pic.innerHTML='<img src="win.png">';
//         }

//         else if(result == Player){
//             playerwin=playerwin+1;
//             let show2 = document.querySelector(".overlay");
//             show2.classList.remove("hide");
//             let show = document.querySelector(".winner");
//             show.innerHTML = result;  
//             pic.innerHTML='<img src="win.png">';
//         }
//         else
//         {
//             tie=tie+1;
//             let show2 = document.querySelector(".overlay");
//             show2.classList.remove("hide");
//             let show = document.querySelector(".winnername");
//             show.innerHTML = result; 
//             pic.innerHTML='<img src="tie.png">'; 
//         }
//         cells.forEach(cell => {
//             cell.removeEventListener("click");


//         })
//     }
// }


