
window.onload = function() {
    var title = new Image();
    title.src = "images/title.png";
    var titleCanvas = document.getElementById("title");
    var ctx = titleCanvas.getContext("2d");
    title.onload = function() {
        ctx.drawImage(title, 0, 0, titleCanvas.width, titleCanvas.height);
    };
    document.getElementById("start").onclick = function() {
        document.body.removeChild(titleCanvas);
        document.body.removeChild(document.getElementById("start"));
        start();
    };
};
function start() {
    this.time = 45;
    this.candyList = [];
    this.friendList = [];
    this.ghostList = [];
    this.spawnPoints = [new Point(51.5, 62),
        new Point(48.5, 105),
        new Point(48.5, 244),
        new Point(46.5, 387), new Point(163.5, 110),
        new Point(279.5, 113),
        new Point(386.5, 172), new Point(387.5, 249), new Point(520.5, 297), new Point(718.5, 122), new Point(712.5, 229), new Point(723.5, 313),
        new Point(720.5, 396),
        new Point(1049.5, 146),
        new Point(1050.5, 244),
        new Point(1161.5, 107),
        new Point(1156.5, 195),
        new Point(1157.5, 271),
        new Point(1163.5, 313),
        new Point(1162.5, 367)
    ];
    createCanvas("main", window.innerWidth, window.innerHeight);
    this.canvas = document.getElementById("main");
    this.canvasCtx = this.canvas.getContext("2d");
    this.player = new Player();
    this.player.setPosition(50, 50);
    drawMaze();
    generateCandy(4);
    generateFriends(4);
    generateGhosts(12);
    this.ghostInterval = setInterval(animateGhosts, 400);
    startKeyListener();
    this.timeInterval = setInterval(decrementTime, 1000);
}
function animateGhosts() {
    for (var i = 0; i < this.ghostList.length; i++) {
        var x = Math.floor(Math.random() * 10);
        var y = Math.floor(Math.random() * 10);
        var move = Math.random() * 500;
        if (move > 400)
            x = x * -1;
        else
        if (move > 300)
            y = y * -1;
        else
        if (move > 200) {
            x = x * -1;
            y = y * -1;
        }
        else
        if (move < 200)
            y = y * -1;
            
        this.ghostList[i].move(x, y);
    }//end for
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw();
}

function drawMaze() {
    this.mazeImg = new Image();
    this.mazeImg.src = "images/maze.png";
    this.canvasCtx.drawImage(this.mazeImg, 0, 0, this.canvas.width, this.canvas.height);
}

function decrementTime() {
    if (this.time > 0 && this.player.health > 0)
        this.time--;
    else {
        gameOver = new Image();
        gameOver.src = "images/gameover.png";
        gameOver.onload = function() {
            endGame();
        };
    }
    document.getElementById("timer").innerHTML = ":" + time + "s";
}

function endGame() {
    window.clearInterval(this.timeInterval);
    var canvas = createCanvas("gameOver", this.canvas.width, this.canvas.height);
    canvas.getContext("2d").drawImage(gameOver, 0, 0, this.canvas.width, this.canvas.height);
    document.body.removeChild(this.canvas);
}

function generateCandy(size) {
    var candy;
    var x = 0;
    var y = 0;
    var length = this.spawnPoints.length;
    for (var i = 0; i < size; i++) {
        candy = new Candy();
        x = Math.floor(Math.random() * length);
        candy.setPosition(this.spawnPoints[x].x, this.spawnPoints[x].y);
        this.candyList.push(candy);
    }//end for
}

function generateFriends(size) {
    var friend;
    var x = 0;
    for (var i = 0; i < size; i++) {
        friend = new Friend();
        x = Math.floor(Math.random() * this.spawnPoints.length);
        friend.setPosition(this.spawnPoints[x].x, this.spawnPoints[x].y);
        var picIndex = i + 1;
        friend.setImage("images/kid" + picIndex + ".png");
        this.friendList.push(friend);
    }//end for
}

function generateGhosts(size) {
    var ghost;
    var x = 0;
    for (var i = 0; i < size; i++) {
        ghost = new Ghost();
        do {
            x = Math.floor(Math.random() * this.spawnPoints.length);
        } while (this.player.rect.contains(this.spawnPoints[x]));
        ghost.setPosition(this.spawnPoints[x].x, this.spawnPoints[x].y);
        this.ghostList.push(ghost);
    }//end for
}

function onKeyPressed(e) {
    var dx = 0;
    var dy = 0;
    var speed = 5;
    switch (e.keyCode) {
        case 37: // left arrow
            dx = speed * -1;
            break;
        case 39: // right arrow
            dx = speed;
            break;
        case 38: // up arrow
            dy = speed * -1;
            break;
        case 40: // down arrow
            dy = speed;
            break;
    }//end switch
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.move(dx, dy);
    for (var i = 0; i < this.candyList.length; i++) {
        if (this.player.rect.contains(this.candyList[i].position) &&
                !this.candyList[i].hidden) {
            this.candyList[i].hide();
            this.player.changeHealth(15);
            document.getElementById("health").innerHTML = this.player.health;
        }//end if
        if (this.player.rect.contains(this.friendList[i].position) &&
                !this.friendList[i].hidden) {
            this.friendList[i].hide();
            this.player.changeFriendsFound(1);
            document.getElementById("fFound").innerHTML = this.player.friendsFound;
        }
    }//end for
    for (var i = 0; i < this.ghostList.length; i++) {
        if (this.player.rect.contains(this.ghostList[i].position) &&
                !this.ghostList[i].hidden) {
            this.player.changeHealth(-22);
            document.getElementById("health").innerHTML = this.player.health;
        }
    }
    draw();
}

function startKeyListener() {
    window.addEventListener("keydown", onKeyPressed, false);
}

function draw() {
    this.canvasCtx.drawImage(this.mazeImg, 0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.fillStyle = "orange";
    this.canvasCtx.drawImage(this.player.image, this.player.rectangle().x,
            this.player.rectangle().y);
    for (var i = 0; i < this.candyList.length; i++) {
        if (!this.candyList[i].hidden)
            this.canvasCtx.drawImage(this.candyList[i].image, this.candyList[i].rectangle().x,
                    this.candyList[i].rectangle().y);
        if (!this.friendList[i].hidden)
            this.canvasCtx.drawImage(this.friendList[i].image, this.friendList[i].rectangle().x,
                    this.friendList[i].rectangle().y);
    }//end for
    for (var i = 0; i < this.ghostList.length; i++) {
        this.canvasCtx.drawImage(this.ghostList[i].image, this.ghostList[i].rectangle().x,
                this.ghostList[i].rectangle().y);
    }//end for
}

function createCanvas(id, width, height) {
    var canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return document.getElementById(id);
}

