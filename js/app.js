/**
 * Created by ben on 01/01/2017.
 */

console.log("Lightbox iss working");

var Thumbnail = function (element) {
    this.element = element;
    this.src = this.getImageSrc();
    this.dataID = this.getDataId();
    this.imageData = this.getImageData();
    this.assignClickFunctions();
};

Thumbnail.prototype.getImageSrc = function () {
    return this.element.getElementsByTagName('img')[0].src;
};

Thumbnail.prototype.getDataId = function () {
    return this.element.getElementsByTagName('a')[0].dataset.revealId;
};

Thumbnail.prototype.getImageData = function () {
    // Setup object to contain image data
    var imageData = {
        container: "",
        src: "",
        srcset: "",
        alt: ""
    };
    if (document.getElementById(this.dataID)) {
        var imageContainer = document.getElementById(this.dataID);
        imageData.container = imageContainer;
    } else {
        console.log("Error: No element with an id of " + this.dataID + " found");
        return null;
    }
    if (imageContainer.getElementsByClassName("photodata").length > 0) {
        var imageElements = imageContainer.getElementsByClassName("photodata");
    } else {
        console.log("Error: Element " + this.dataID + " does not contain a div with a class of photodata");
        return null;
    }
    if (imageElements[0].hasAttribute("data-src")) {
        var imageSrc = imageElements[0].dataset.src;
        imageData.src = imageSrc;
    } else {
        console.log("Error: photodata class does not contain an imgs dataset");
        return null;
    }
    if (imageElements[0].hasAttribute("data-srcset")) {
        var imageSrcset = imageElements[0].dataset.srcset;
        imageData.srcset = imageSrcset;
    }
    if (imageElements[0].hasAttribute("data-alt")) {
        var imageAlt = imageElements[0].dataset.alt;
        imageData.alt = imageAlt;
    }
    return imageData;
};

Thumbnail.prototype.assignClickFunctions = function () {
    this.addSelectListener(this.element, "click", this.showLightbox);
};

Thumbnail.prototype.addSelectListener = function (element, type, func) {
    element.addEventListener(type, func.bind(this));
};

Thumbnail.prototype.showLightbox = function () {
    if (this.imageData.container) {
        var lightboxContainer = this.imageData.container;
        var photobox = lightboxContainer.getElementsByClassName("photoBox")[0];
        var img = "<img src=\"" + this.imageData.src + "\">";
        var revealModalBg = document.getElementById("reveal-modal-overlay");
        var closeButton = lightboxContainer.getElementsByClassName("close-reveal-modal")[0];
        this.addSelectListener(closeButton, "click", this.hideLightbox);
        revealModalBg.style.display = "block";
        lightboxContainer.style.display = "block";
        photobox.innerHTML = img;
        console.log(lightboxContainer.getElementsByClassName("close-reveal-modal")[0])
    }
};

Thumbnail.prototype.hideLightbox = function (evt) {
    evt.preventDefault();
    var lightboxContainer = this.imageData.container;
    var revealModalBg = document.getElementById("reveal-modal-overlay");
    revealModalBg.style.display = "none";
    lightboxContainer.style.display = "none";
};

var thumbnailsCollection = [];
var thumbnails = document.getElementsByClassName("image");

for (var i = 0; i < thumbnails.length; i++) {
    thumbnailsCollection.push(new Thumbnail(thumbnails[i]));
}