/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Friend() {
    this.image = new Image();
    this.image.src = "images/kid1.png";
    this.position = new Point();
    this.rect = new Rectangle(this.position.x, this.position.y, 50, 50);
    this.hidden = false;
    this.canvas = document.getElementById("main");
}

Friend.prototype.setImage = function(path) {
    this.image.src = path;
};

Friend.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.rect.x = x;
    this.rect.y = y;
};

Friend.prototype.hide = function() {
    this.hidden = true;
};

Friend.prototype.rectangle = function() {
    return this.rect;
};