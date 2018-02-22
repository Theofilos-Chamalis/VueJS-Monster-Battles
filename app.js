new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: [],
		currentTurn: 0
	},
	mounted: function () {
		this.playMusic();
	},
	methods: {
		startGame: function () {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
			this.playMusic();
		},
		attack: function () {
			var damage = this.calculateDamage(1, 8);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: `Player inflicts ${damage} damage to the Monster`,
				id: this.currentTurn + 1
			});
			this.currentTurn++;
			if (this.checkWin()) {
				return;
			}
			this.monsterAttacks();
		},
		specialAttack: function () {
			var damage = this.calculateDamage(4, 13);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: `Player inflicts ${damage} magic damage to the Monster!`,
				id: this.currentTurn + 1
			});
			this.currentTurn++;
			if (this.checkWin()) {
				return;
			}
			this.monsterAttacks();
		},
		heal: function () {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.turns.unshift({
				isPlayer: true,
				text: 'Player heals 10 hitpoints!',
				id: this.currentTurn + 1
			});
			this.currentTurn++;
			this.monsterAttacks();
		},
		surrender: function () {
			this.gameIsRunning = false;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player has given up!'
			});
			this.playMusic();
		},
		monsterAttacks: function () {
			var damage = this.calculateDamage(4, 11);
			this.playerHealth -= damage;
			this.turns.unshift({
				isPlayer: false,
				text: `Monster inflicts ${damage} damage to the Player`,
				id: this.currentTurn + 1
			});
			this.checkWin();
			this.currentTurn++;
		},
		calculateDamage: function (min, max, playersTurn) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function () {
			if (this.monsterHealth <= 0) {
				if (confirm('You won! Start a new game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
					this.playMusic();
				}
				return true;
			} else if (this.playerHealth <= 0) {
				if (confirm('You lost! Start a new game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
					this.playMusic();
				}
				return true;
			}
			return false;
		},
		playMusic: function () {
			Howler.unload();

			var soundBattle = new Howl({
				src: ['sounds/PokemonBattle.mp3'],
				loop: true,
				volume: 0.2,
			});

			var soundMainScreen = new Howl({
				src: ['sounds/PokemonRoute1.mp3'],
				loop: true,
				volume: 0.2,
			});

			if (this.gameIsRunning) {
				soundBattle.play();
			} else {
				soundMainScreen.play();
			}
		}
	}
});