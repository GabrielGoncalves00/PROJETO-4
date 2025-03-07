class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WelcomeScene' });
    }

    create() {
        this.add.text(200, 150, 'Bem-vindo ao Jogo!', { fontSize: '32px', fill: '#fff' });
        this.add.text(180, 200, 'Pressione ESPAÇO para começar', { fontSize: '24px', fill: '#fff' });
        
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.score = 0;
        this.add.text(16, 16, 'Pontuação: 0', { fontSize: '24px', fill: '#fff' });
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'platform');
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');
        
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        this.physics.add.collider(this.player, this.platforms);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 5,
            setXY: { x: 12, y: 0, stepX: 150 }
        });
        
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade', arcade: { gravity: { y: 300 }, debug: false } },
    scene: [WelcomeScene, GameScene]
};

const game = new Phaser.Game(config);
