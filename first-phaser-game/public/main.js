let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

let platforms

let player

let cursors

let stars
let score = 0
let scoreText

let epics

let game = new Phaser.Game(config)

function preload() {
  this.load.image('sky', 'assets/sky.png')
  this.load.image('ground', 'assets/platform.png')
  this.load.image('star', 'assets/star.png')
  this.load.image('epic', 'assets/epic.png')
  this.load.spritesheet('dude', 'assets/dude.png', {
    frameWidth: 32,
    frameHeight: 48
  })
}

function create() {
  this.add.image(400, 300, 'sky')

  platforms = this.physics.add.staticGroup()

  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody()

  platforms.create(600, 400, 'ground')
  platforms.create(50, 250, 'ground')
  platforms.create(750, 220, 'ground')

  player = this.physics.add.sprite(200, 450, 'dude')

  player.setBounce(0)
  player.setCollideWorldBounds(true)

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  })

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })

  this.physics.add.collider(player, platforms)

  cursors = this.input.keyboard.createCursorKeys()

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  })

  stars.children.iterate(star => {
    star.setBounceY(Phaser.Math.FloatBetween(0.6, 1.0))
  })

  this.physics.add.collider(stars, platforms)

  this.physics.add.overlap(player, stars, collectStar, null, this)

  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  })

  epics = this.physics.add.group()

  this.physics.add.collider(epics, platforms)

  this.physics.add.collider(player, epics, hitepic, null, this)
}

function collectStar(player, star) {
  star.disableBody(true, true)

  score += 10
  scoreText.setText('Score: ' + score)

  if (stars.countActive(true) === 0) {
    stars.children.iterate(star => {
      star.enableBody(true, star.x, 0, true, true)
    })

    let epicX =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400)

    let epic = epics.create(epicX, 16, 'epic')
    epic.setBounce(1)
    epic.setCollideWorldBounds(true)
    epic.setVelocity(Phaser.Math.Between(-200, 200), 20)
    epic.allowGravity = false
  }
}

function hitepic(player, epic) {
  this.physics.pause()

  player.setTint(0xff0000)

  player.anims.play('turn')

  gameOver = true
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-1000)

    player.anims.play('left', true)
  } else if (cursors.right.isDown) {
    player.setVelocityX(1000)

    player.anims.play('right', true)
  } else {
    player.setVelocityX(0)

    player.anims.play('turn')
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330)
  }
}
