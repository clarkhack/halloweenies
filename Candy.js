/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Candy() {
    this.position = new Point(50, 90);
    this.friendsFound = 0;
    this.rect = new Rectangle(this.position.x, this.position.y, 25, 25);
    this.rU = new Rectangle(this.position.x, this.position.y - 10, 25, 10);
    this.rD = new Rectangle(this.position.x, this.position.y + 25, 25, 10);
    this.rL = new Rectangle(this.position.x -10, this.position.y, 10, 25);
    this.rR = new Rectangle(this.position.x + 25, this.position.y, 10, 25);
    this.image = new Image();
    this.image.src = "images/candy.png";
    this.hidden = false;
}
Candy.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.rect.x = x;
    this.rect.y = y;
    this.rU = new Rectangle(this.position.x, this.position.y - 10, 25, 10);
    this.rD = new Rectangle(this.position.x, this.position.y + 25, 25, 10);
    this.rL = new Rectangle(this.position.x -10, this.position.y, 10, 25);
    this.rR = new Rectangle(this.position.x + 25, this.position.y, 10, 25);
};

Candy.prototype.hide = function() {
    this.hidden = true;
};

Candy.prototype.rectangle = function() {
    return this.rect;
};

Candy.prototype.getPosition = function() {
    return this.position;
};

Candy.prototype.toString = function() {
    return "Position: " + this.position.x + ", " + this.position.y + "<br>";
};
