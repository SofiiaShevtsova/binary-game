class FightState {
    #firstFighterHealth = 100;

    #secondFighterHealth = 100;

    getHealth() {
        return {
            left: this.#firstFighterHealth,
            right: this.#secondFighterHealth
        };
    }

    setHealth(loseHealth, fighter) {
        if (fighter === 'right') {
            if (this.#secondFighterHealth < loseHealth) {
                this.#secondFighterHealth = 0;
            } else {
                this.#secondFighterHealth -= loseHealth;
            }
        }
        if (fighter === 'left') {
            if (this.#firstFighterHealth < loseHealth) {
                this.#firstFighterHealth = 0;
            } else {
                this.#firstFighterHealth -= loseHealth;
            }
        }
    }
}

const fightState = new FightState();

export default fightState;
