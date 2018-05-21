
// Helper functions for the game-manager component.
var GameManagerUtils = {
    generateRandomNumber: function (min, max) {
        return Math.floor(Math.random() * max + min);
    },
    chooseRandomPosition: function () {
        // TODO
        var xPos = GameManagerUtils.generateRandomNumber(-10, 10);
        var yPos = 1.6;
        // var zPos = GameManagerUtils.generateRandomNumber(-15, -30);
        var zPos = GameManagerUtils.generateRandomNumber(-10, -12);
        return { 'x': xPos, 'y': yPos, 'z': zPos};
    },
    
    // Create a new enemy entity.
    createEnemy: function (enemyNumber) {
        var enemyId = "enemy" + enemyNumber.toString();
        var newEnemy = document.createElement('a-entity');
        newEnemy.setAttribute('gltf-model', '#ghost');
        //newEnemy.setAttribute('cursor-listener', '');
        newEnemy.setAttribute('enemy', {'health': 1});
        //newEnemy.setAttribute('dynamic-body',  { 'mass': 1000});
        //newEnemy.setAttribute('dynamic-body',  '');
        newEnemy.setAttribute('static-body', '');
        newEnemy.setAttribute('id', enemyId);
        newEnemy.setAttribute('type', 'enemy');
        // Temporarily fix position.
        //var position = GameManagerUtils.chooseRandomPosition();
        var position = { 'x': -10 + enemyNumber * 2, 'y': 1.8, 'z': -10};
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        
        newEnemy.setAttribute('position', position);
        //newEnemy.setAttribute('collision-helper', '');
        var destinationStr = '0 ' + position.y.toString() + ' 0';
        // Temporarily disable animations.
       /*newEnemy.setAttribute('animation', { 'property': 'position',
                                            'to': destinationStr,
                                            'autoplay': true,
                                            dur: 10000});
        */
        /*newEnemy.setAttribute('animation', { 'property': 'rotation',
                                             'to': '0 360 0',
                                            'autoplay': true,
                                             'dur': 1000,
                                            'repeat': 'indefinite'}); */
        return newEnemy;
    }
};

//var currentEnemy = 0;

// The game-manager A-Frame component automatically 
// generates randomly positioned enemies.
AFRAME.registerComponent('game-manager', {
    schema: {
        numberEnemies: { type: 'int' },
    },
    init: function () {
        console.log('game-manager.init');
        var numEnemies = this.data['numberEnemies'];
        //var sceneEl = document.querySelector('a-scene');
        var sceneEl = this.el;
        AFPS.enemies = [];
        AFPS.score = 0;
        for (var i = 0; i < numEnemies; i++) {
            var enemyId = "enemy" + i.toString();
            console.log("Creating enemy " + enemyId);
            AFPS.enemies.push(GameManagerUtils.createEnemy(i));
        }
        //console.log(newEnemies);
        //console.log(AFPS.enemies);
        sceneEl.addEventListener('loaded', function () {
            //newEnemies.forEach(function (enemy) {
            var newEnemies = AFPS.enemies;
            AFPS.enemies.forEach(function (enemy) {
                sceneEl.appendChild(enemy);
            });
        });

        sceneEl.addEventListener('targetdestroyed', function(e) {
            console.log('caught targetdestroyed');
            console.log(e);
            var targetEl = e.target;
            targetEl.parentNode.removeChild(targetEl);
            AFPS.score++;
            console.log('new score', AFPS.score);
            this.currentEnemy++;
        });
    }
});
