function Player() {
    this.position = new Point(50, 50);
    this.health = 1; //int
    this.friendsFound = 0;
    this.rect = new Rectangle(this.position.x, this.position.y, 35, 35);
    this.image = new Image();
    this.image.src = "images/maincharacter.png";
    this.canvas = document.getElementById("main");
}

Player.prototype.changeFriendsFound = function(f) {
    this.friendsFound += f;
};

Player.prototype.changeHealth = function(health) {
    //will add x to the health. If x is negative, it'll take away health
    if (this.health < 100 && this.health > 0)
        this.health += health;
};

Player.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.rect.x = x;
    this.rect.y = y;
};

Player.prototype.move = function(dx, dy) {
    // moves player x paces and y paces
    //negative numbers denote left or right or up and down
//    if (this.position.x > 2 && this.position.x < this.canvas.width - 40
//            && this.position.y > 2 && this.position.y < this.canvas.height - 40) {
    this.position.x += dx;
    this.position.y += dy;
    this.rect.x += dx;
    this.rect.y += dy;
//    }

//    if (dx < 0)
//        this.image.src = "images/playerLeft.png";
//    else if (dx > 0)
//        this.image.src = "images/playerRight.png";
};

Player.prototype.rectangle = function() {
    return this.rect;
};

Player.prototype.getHealth = function() {
    return this.health;
};

Player.prototype.getPosition = function() {
    return this.position;
};

Player.prototype.toString = function() {
    return "Position: " + this.position.x + ", " + this.position.y + "<br>";
};