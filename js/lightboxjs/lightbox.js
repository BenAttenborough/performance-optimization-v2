/**
 * Created by ben on 01/01/2017.
 */

console.log("Lightbox working");

var thumbnails = document.getElementsByClassName("image");

var Thumbnail = function (element) {
    this.element = element;
    this.src = this.getImageSrc();
    this.assignClickFunctions();
};

Thumbnail.prototype.getImageSrc = function () {
    return this.element.getElementsByTagName('img')[0].src;
};

Thumbnail.prototype.assignClickFunctions = function () {
    this.addSelectListener(this.element, "click", this.showLightbox);
};

Thumbnail.prototype.addSelectListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

Thumbnail.prototype.showLightbox = function () {
    console.log(this.src);
};

var thumbnailsCollection = [];

for (var i = 0; i < thumbnails.length; i++) {
    thumbnailsCollection.push(new Thumbnail(thumbnails[i]));
}