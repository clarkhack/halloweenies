/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Ghost() {
    this.position = new Point(50, 50);
    this.rect = new Rectangle(this.position.x, this.position.y, 25, 25);
    this.image = new Image();
    this.image.src = "images/ghost.png";
}
Ghost.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.rect.x = x;
    this.rect.y = y;
};

Ghost.prototype.rectangle = function() {
    return this.rect;
};

Ghost.prototype.move = function(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
    this.rect.x += dx;
    this.rect.y += dy;
};
