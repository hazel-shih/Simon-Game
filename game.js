gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];

//最一開始要啟動遊戲的時候
$(document).keypress(function (event) {
  if (gamePattern.length === 0) {
    if (event.key === "a") {
      nextSequence();
    }
  }
});

//存取user按的按鈕至userClickedPattern
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  //按鈕被按下變成灰色的動畫
  animatePress(userChosenColour);

  //利用判斷兩陣列是否相同，決定要前往下一關卡還是game over，注意使用者每點一個按鈕就要檢查一次
  //抓出使用者現在點的這個按鈕，是user陣列中的第幾項item(currentIndex)，並與game陣列中相對應位置的item檢查
  var currentIndex = userClickedPattern.length - 1;
  if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
    gameOverAlert();
  } else {
    //必須要檢查到所有的item，也就是user item數必須達到該關卡要求的點按數(game item數)，才可以進入下一關
    if (userClickedPattern.length === gamePattern.length) {
      //不要馬上執行，點按完要有一點點緩衝時間再進下一關卡
      setTimeout(nextSequence, 500);
    }
  }
});

// 最新註解：這是最一開始寫的檢查兩陣列功能，但執行後發現使用者每點一個按鈕時，此功能就會馬上被執行，或是等到使用者全部
// 按完時才被執行，目前下面這一段先註解掉，以提醒自己要根據情況來設計檢查功能

// //檢查兩陣列(gamePattern & userClickedPattern)是否相同
// //要是在檢查兩陣列內的各項時都沒項目不同的情況發生
// function arraysEqual(a, b) {
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] !== b[i]) {
//       return false;
//     }
//   }
//   return true;
// }


//進入下一個關卡
function nextSequence() {
  //清空使用者按下按鈕紀錄的陣列，因為每開始新局，使用者的陣列都要重新填item並且每一item都要被檢查
  userClickedPattern = [];
  //產出一隨機數字
  var randomNumber = Math.floor(Math.random() * 4);
  //利用產出的數字找出對應的顏色
  var randomChosenColour = buttonColours[randomNumber];
  //將每一局的隨機顏色放到遊戲的關卡陣列中
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  //改變關卡關數數字
  var levelNumber = gamePattern.length;
  $("h1").text(`Level ${levelNumber}`);
  //每新一局被隨機選到將要成為關卡的按鈕會閃
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  //每新一局被隨機選到將要成為關卡的按鈕會發出聲音
  playSound(randomChosenColour);
}

//按錯後的gameover
function gameOverAlert() {
  $("h1").text("Game Over, Press Any Key to Restart");
  var originalBackground = $("body").css("background-color");
  $("body").css("background-color", "red");
  setTimeout(function () {
    $("body").css("background-color", originalBackground);
  }, 200);
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  reStart();
}

//gameover後用鍵盤按任何鍵重新開始
function reStart() {
  gamePattern = [];
  userClickedPattern = [];
  $(document).keypress(function (event) {
    if (gamePattern.length === 0) {
      if (event.key !== "a") {
        nextSequence();
      }
    }
  });
}

//播放按鈕聲
function playSound(color) {
  var audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

//點按按鈕時為按鈕加上灰色動態動畫
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
