
// Helper functions for the game-manager component.
var GameManagerUtils = {
    generateRandomNumber: function (min, max) {
        return Math.floor(Math.random() * max + min);
    },
    chooseRandomPosition: function () {
        // TODO
        var xPos = GameManagerUtils.generateRandomNumber(-10, 10);
        var yPos = 1.6;
        var zPos = GameManagerUtils.generateRandomNumber(-15, -30);
        return { 'x': xPos, 'y': yPos, 'z': zPos};
    },
    // Create a new enemy entity.
    createEnemy: function () {
        var newEnemy = document.createElement('a-entity');
        newEnemy.setAttribute('gltf-model', '#ghost');
        //newEnemy.setAttribute('cursor-listener', '');
        newEnemy.setAttribute('enemy', '');
        
        // TODO: Assign position.
        var position = GameManagerUtils.chooseRandomPosition();
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        
        newEnemy.setAttribute('position', position);
        var destinationStr = '0 ' + position.y.toString() + ' 0';
        newEnemy.setAttribute('animation', { 'property': 'position',
                                            'to': destinationStr,
                                            'autoplay': true,
                                            dur: 10000});
        return newEnemy;
    }
};

// The game-manager A-Frame component automatically 
// generates randomly positioned enemies.
AFRAME.registerComponent('game-manager', {
    schema: {
        numberEnemies: { type: 'int' }
    },
    init: function () {
        var numEnemies = this.data['numberEnemies'];
        var sceneEl = document.querySelector('a-scene');
        var newEnemies = [];
        for (var i = 0; i < numEnemies; i++) {
            newEnemies.push(GameManagerUtils.createEnemy());
        }
        console.log(newEnemies);
        sceneEl.addEventListener('loaded', function () {
            newEnemies.forEach(function (enemy) {
                sceneEl.appendChild(enemy);
            });
        });
    }
});
