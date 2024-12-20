//游戏对象
const game = {
  dom: document.querySelector(".game"),
  width: 800,
  isPaused: false,
  isOver: false,
  calscore: {
    score: 0,
    scoreArr: [],
  },
  timer: {},
  pipe: {
    createDuration: 3000,
    gap: 200,
    minHeight: 50,
    width: 52,
    pipes: [],
  },
};
//需要用到的DOM
const dom = {
  score: document.querySelector(".score span"),
  mask: document.querySelector(".over"),
  final: document.querySelector("#final"),
};
//物体对象
const sky = {
    dom: document.querySelector(".game .sky"),
    left: 0, //背景的left
    height: 600,
  },
  land = {
    dom: document.querySelector(".game .land"),
    left: 0,
    height: 112,
  },
  bird = {
    dom: document.querySelector(".game .bird"),
    backgroundIndex: 0, //0~2
    backgroundPositionX: [0, 52, 104],
    top: 150,
    left: 150,
    width: 40, //52,
    height: 30, //45,
    move: {
      moveY: {
        v0: 0,
        a: 0.002,
        t: 16,
      },
    },
    show() {
      this.dom.style.left = this.left + "px";
      this.dom.style.top = this.top + "px";
    },
    setTop: function (top) {
      if (top < 0) {
        top = 0;
      }
      if (top > sky.height - land.height - this.height) {
        top = sky.height - land.height - this.height;
      }
      this.top = top;
      this.show();
    },
    flyUp() {
      this.move.moveY.v0 = -0.5;
    },
  };
bird.colisionVolume = {
  top: bird.top + (45 - bird.height) / 2,
  left: bird.left + (52 - bird.width) / 2,
  width: bird.width, //52,
  height: bird.height,
};

//1.背景移动
sky.move = wholeTimer(() => {
  sky.left += -0.5;
  if (sky.left <= -800) {
    sky.left = 0;
  }
  sky.dom.style.marginLeft = sky.left + "px";
  funcCalScore();
  isOver();
}, 16);
//2.大地移动
land.move = wholeTimer(() => {
  land.left += -1;
  if (land.left <= -790) {
    land.left = 0;
  }
  land.dom.style.left = land.left + "px";
}, 16);
//3.小鸟扇翅膀
bird.move.flapWing = wholeTimer(() => {
  bird.backgroundIndex++;
  bird.backgroundIndex = bird.backgroundIndex % bird.backgroundPositionX.length;
  bird.dom.style.backgroundPositionX =
    bird.backgroundPositionX[bird.backgroundIndex] + "px";
}, 100);
//4.小鸟下落
bird.move.moveY.drop = wholeTimer(
  function () {
    //计算位移及末速度
    let s =
        this.move.moveY.v0 * this.move.moveY.t +
        0.5 * this.move.moveY.a * this.move.moveY.t ** 2,
      dis = this.top + s,
      dis2 = this.colisionVolume.top + s;
    this.top = dis;
    this.colisionVolume.top = dis2;
    this.move.moveY.v0 += this.move.moveY.a * this.move.moveY.t;
    this.setTop(dis);
    //移动
    this.show();
  },
  16,
  bird
);
//5.一定时间内创建一对管道
game.pipe.create = wholeTimer(function () {
  new CreatePairPipes();
}, game.pipe.createDuration);
//6.管道移动
game.pipe.move = wholeTimer(
  function () {
    let arr = this.pipe.pipes;
    for (let i = 0; i < arr.length; i++) {
      let down = arr[i].down,
        up = arr[i].up;
      down.left -= 1;
      up.left -= 1;
      down.dom.style.left = down.left + "px";
      up.dom.style.left = up.left + "px";

      //管道销毁
      if (down.left <= -game.pipe.width) {
        down.dom.remove();
        up.dom.remove();
        this.pipe.pipes.shift();
      }
    }
  },
  16,
  game
);
//7.计分
dom.score.innerHTML = game.calscore.score;

//8.游戏结束判定
//8.1 小鸟撞地
function hitLand() {
  return bird.top >= sky.height - land.height - bird.height;
}
//8.2 小鸟撞柱子
function hitPipes() {
  for (let i = 0; i < game.pipe.pipes.length; i++) {
    let pairPipe = game.pipe.pipes[i],
      down = pairPipe.down,
      up = pairPipe.up;
    if (
      isCollision(bird.colisionVolume, down) ||
      isCollision(bird.colisionVolume, up)
    ) {
      return true;
    }
  }
  return false;
}
//游戏是否结束
function isOver() {
  if (hitLand() || hitPipes()) {
    game.isOver = true;
    game.timer.stop();
    dom.mask.style.display = "block";
    final.innerHTML = game.calscore.score;
  }
}

//添加动画计时器
game.timer.start = function () {
  return {
    sky: sky.move.timerStart(),
    land: land.move.timerStart(),
    bird: {
      flap: bird.move.flapWing.timerStart(),
      drop: bird.move.moveY.drop.timerStart(),
    },
    pairPipes: game.pipe.move.timerStart(),
    CreatePipes: game.pipe.create.timerStart(),
  };
};
//游戏停止
game.timer.stop = function () {
  return {
    sky: sky.move.timerStop(),
    land: land.move.timerStop(),
    bird: {
      flap: bird.move.flapWing.timerStop(),
      drop: bird.move.moveY.drop.timerStop(),
    },
    pairPipes: game.pipe.move.timerStop(),
    CreatePipes: game.pipe.create.timerStop(),
  };
};

function wholeTimer(callback, duration, thisArg) {
  let timerID;
  return {
    timerStart: function () {
      if (timerID) {
        return;
      }
      timerID = setInterval(() => {
        callback.bind(thisArg)();
      }, duration);
    },
    timerStop: function () {
      clearInterval(timerID);
      timerID = null;
    },
  };
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function isEqual(arr1, arr2) {
  if (
    arr1.length === arr2.length &&
    arr1.every(function (value, index) {
      return value === arr2[index];
    })
  ) {
    return true;
  }
  return false;
}
function copyPipeArr() {
  game.calscore.scoreArr = Array.from(game.pipe.pipes);
}
function funcCalScore() {
  if (game.pipe.pipes.length > 0) {
    if (!(game.isPaused || game.isOver)) {
      _calScore();
      // setInterval(_calScore, 16);
    }
  }

  // timer1 = setTimeout(function () {
  //   timer2 = setInterval(_calScore, 16);
  // }, 4000);

  function _calScore() {
    if (game.calscore.scoreArr[0].down.left + game.pipe.width <= bird.left) {
      game.calscore.score++;
      game.calscore.scoreArr.shift();
      dom.score.innerHTML = game.calscore.score;
    }
  }
}
function CreatePipe(direction, height) {
  this.width = game.pipe.width;
  this.height = height;
  this.direction = direction;
  this.left = game.width;
  this.dom = document.createElement("div");
  this.dom.className = "pipe";
  game.dom.appendChild(this.dom);
  this.dom.style.height = this.height + "px";
  this.dom.style.left = this.left + "px";
  if (this.direction === "down") {
    this.top = 0;
    this.dom.style.top = this.top;
    this.dom.classList.add("down");
  }
  if (this.direction === "up") {
    this.bottom = land.height;
    this.top = sky.height - land.height - this.height;
    this.dom.style.bottom = this.bottom + "px";
    this.dom.classList.add("up");
  }
}
function CreatePairPipes() {
  let random = getRandom(
    game.pipe.minHeight,
    sky.height - land.height - game.pipe.minHeight - game.pipe.gap
  );
  let pipeDown = new CreatePipe("down", random);
  let pipeUp = new CreatePipe(
    "up",
    sky.height - land.height - random - game.pipe.gap
  );
  let pairs = {};
  pairs.down = pipeDown;
  pairs.up = pipeUp;
  game.pipe.pipes.push(pairs);
  game.calscore.scoreArr.push(pairs);
}
function getCenterPosition(item) {
  return {
    x: item.left + 0.5 * item.width,
    y: item.top + 0.5 * item.height,
  };
}
function getItemInfo(item) {
  return {
    x: getCenterPosition(item).x,
    y: getCenterPosition(item).y,
    width: item.width,
    height: item.height,
  };
}
/**
 *
 * @param {object} item1
 * @param {object} item2
 * @returns
 */
function isCollision(item1, item2) {
  if (
    Math.abs(getItemInfo(item1).x - getItemInfo(item2).x) <
      0.5 * (getItemInfo(item1).width + getItemInfo(item2).width) &&
    Math.abs(getItemInfo(item1).y - getItemInfo(item2).y) <
      0.5 * (getItemInfo(item1).height + getItemInfo(item2).height)
  ) {
    //x方向的距离小于两个物体一半宽度的和，说明在x方向上相交了
    //y方向的距离小于两个物体一半高度的和，说明在y方向上相交了
    return true;
  } else {
    return false;
  }
}
function init() {
  game.timer.start();
}
//注册事件
document.onkeydown = (e) => {
  if (e.code === "Space") {
    if (!game.isOver) {
      e.preventDefault();
      bird.flyUp();
    }
  }
  if (e.key === "Escape") {
    e.preventDefault();
    if (game.isPaused) {
      game.timer.start();
      game.isPaused = false;
    } else {
      game.timer.stop();
      game.isPaused = true;
    }
  }
  if (e.key === "Enter") {
    e.preventDefault();
    location.reload();
    game.isOver = false;
  }
};

init();

// let pipe1 = new CreatePipe("down", 50),
//   pipe2 = new CreatePipe("up", 150);
// console.log(pipe2);

// setInterval(() => {
//   sky.left += -0.5;
//   land.left += -1;

//   if (sky.left <= -800) {
//     sky.left = 0;
//   }
//   if (land.left <= -790) {
//     land.left = 0;
//   }

//   sky.dom.style.marginLeft = sky.left + "px";
//   land.dom.style.left = land.left + "px";

//   //   console.log(sky.left, land.left);
// }, 16);

// setInterval(() => {
//   index++;
//   index = index % 3;
//   bird.dom.style.backgroundPositionX = bird.backgroundPositionX[index] + "px";
// }, 100);
