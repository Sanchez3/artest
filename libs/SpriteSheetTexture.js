function SpriteSheetTexture(filename, prefix, postfix, start, end, frameWidth, frameHeight, frames, totalFrame, frameRate) {
    this.frameWidth = frameWidth || 320;
    this.frameHeight = frameHeight || 569;
    this.frames = frames || 9;
    this.frameRate = frameRate || 15;

    this.filepath = filepath;
    this.prefix = prefix;
    this.postfix = postfix;
    this._start = start;
    this._end = end;
    this.totalFrame = totalFrame;
}

function TextureAnimator(textures, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
    // note: texture passed by reference, will be updated by the update function.


    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet. 
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;
    this.currentIndex = 0;
    this.totalIndex = textures.length;
    this.texture = textures[this.currentIndex];
    return this.texture

    this.update = function(milliSec) {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentIndex == this.totalIndex) {
                this.currentIndex = 0;
                this.currentTile = 0;
                this.texture == textures[this.currentIndex];
            }
            if (this.currentTile == this.numberOfTiles) {

                this.currentIndex++;
                this.currentTile = 0;
                this.texture == textures[this.currentIndex];

            }
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}
