/**
 * Created by ben on 01/01/2017.
 */

console.log("Lightbox working");

var thumbnails = document.getElementsByClassName("image");

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
        src: "",
        srcset: "",
        alt: ""
    };
    if (document.getElementById(this.dataID)) {
        var imageContainer = document.getElementById(this.dataID);
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
    //console.log(this.src);
    //console.log(this.dataID);
    console.log(this.imageData);
    //console.log(this.images.dataset.imgs);
};

var thumbnailsCollection = [];

for (var i = 0; i < thumbnails.length; i++) {
    thumbnailsCollection.push(new Thumbnail(thumbnails[i]));
}

//var lightbox = {
//    overlay: "<div id='overlay' class='clearfix'></div>",
//    previousBtn: "<div class='col-prev clearfix'><a href='#'><img src='img/previousBtn.png' class='nav-btn'></a></div>",
//    contentDiv: "<div class='col-main clearfix'></div>",
//    nextBtn: "<div class='col-next clearfix'><a href='#'><img src='img/nextBtn.png' class='nav-btn'></a></div>",
//    instructions: "<p>Use arrow keys or buttons to cycle images</p>",
//    mediaContainer: "<div class='media-container'>",
//    caption: "<p></p>"
//};

/*
 *	Appends an overlay to the screen, this is initial hidden in CSS
 *	@PARAM none
 *  @RETURN none
 */
function addOverlay(parent, elementToAttach) {
    var elementContainer = document.createElement(elementToAttach.type);
    var elementNode = document.createTextNode(elementToAttach.content);
    elementContainer.id = elementToAttach.id;
    elementContainer.className = elementToAttach.classes;
    elementContainer.appendChild(elementNode);
    console.log(elementContainer);
    parent.appendChild(elementContainer);
}

var Lightbox = function () {
    this.elements = [];
};

Lightbox.prototype.addElement = function (element) {
    this.elements.push(element);
};

lightbox = new Lightbox();

var LightboxElement = function (type, id, classes, content) {
    this.type = type;
    this.id = id;
    this.classes = classes;
    this.content = content;
};

var overlay = new LightboxElement("div", "overlay", "clearfix", "Hello world");
lightbox.addElement(overlay);
var previousBtn = new LightboxElement("div", "", "col-prev clearfix", "<a href='#'><img src='img/previousBtn.png' class='nav-btn'></a>");
lightbox.addElement(previousBtn);

var objRef = document.body;


addOverlay(objRef, lightbox.elements[0]);
addOverlay(document.getElementById("overlay"), lightbox.elements[1]);


//$contentDiv.append($instructions);
//$contentDiv.append($mediaContainer);
//$contentDiv.append($caption);
//$overlay.append($previousBtn);
//$overlay.append($contentDiv);
//$overlay.append($nextBtn);
//$("body").prepend($overlay);
//fullHeight = $( "body" ).height();
//$overlay.height( fullHeight );
//# sourceMappingURL=app.js.map
