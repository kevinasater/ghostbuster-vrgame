AFRAME.registerComponent('enemy', {
    schema: {
        'health': {type: 'int', default: 1}
    },
    init: function() {
        var el = this.el;
        /*el.addEventListener('collide', function(e) {
            if (e.detail.body.el.id !== "ground") {
                console.log(el.id + " has been hit!");
                el.parentNode.removeChild(el);
            }
        }); */
    },

    hit: function() {
        
        console.log('Calling enemy.hit');
        var el = this.el;
        console.log("original health:", this.data.health);
        this.data.health--;
        console.log("current health", this.data.health);
        if (this.data.health <= 0) {
            /*var sceneEl = document.querySelector('a-scene');
            sceneEl.gameManager.targetDestroyed(this.el); */
            this.el.emit('targetdestroyed');
            //el.parentNode.removeChild(el);
        }
    }

});