import controls from '../../constants/controls';

const fightState = {
    firstFighterHealth: 100,
    secondFighterHealth: 100,
    setHealth(loseHealth, fighter) {
        if (fighter === 'right') {
            this.secondFighterHealth -= loseHealth;
        }
        this.firstFighterHealth -= loseHealth;
    }
};

const pressed = new Set();
let idThrottle = null;

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = Math.random() + 1;
    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = Math.random() + 1;
    const power = defense * dodgeChance;
    return power;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    if (damage <= 0) {
        return 0;
    }
    return damage;
}

function throttleFunction(func) {
    if (idThrottle) {
        return;
    }

    idThrottle = setTimeout(() => {
        func();
        idThrottle = undefined;
    }, 10000);
}

function keyDownCobination(fighter) {
    if (fighter === 'left') {
        return controls.PlayerOneCriticalHitCombination.every(key => pressed.has(key));
    }
    return controls.PlayerTwoCriticalHitCombination.every(key => pressed.has(key));
}

function fightersHit(firstFighter, secondFighter, resolve) {
    return e => {
        e.preventDefault();
        pressed.add(e.code);
        if (keyDownCobination('left')) {
            const criticalHit = () => {
                const loseHealth = (100 / secondFighter.health) * (firstFighter.attack * 2);
                fightState.setHealth(loseHealth, 'right');
                document.querySelector('#right-fighter-indicator').style.width = `${
                    fightState.secondFighterHealth < 0 ? 0 : fightState.secondFighterHealth
                }%`;
            };

            throttleFunction(criticalHit);
        }

        if (keyDownCobination('right')) {
            const criticalHit = () => {
                const loseHealth = (100 / firstFighter.health) * (secondFighter.attack * 2);
                fightState.setHealth(loseHealth, 'left');
                document.querySelector('#left-fighter-indicator').style.width = `${
                    fightState.firstFighterHealth < 0 ? 0 : fightState.firstFighterHealth
                }%`;
            };
            throttleFunction(criticalHit);
        }

        if (
            (pressed.has(controls.PlayerOneAttack) && pressed.has(controls.PlayerTwoBlock)) ||
            (pressed.has(controls.PlayerTwoAttack) && pressed.has(controls.PlayerOneBlock)) ||
            (pressed.has(controls.PlayerOneAttack) && pressed.has(controls.PlayerOneBlock)) ||
            (pressed.has(controls.PlayerTwoAttack) && pressed.has(controls.PlayerTwoBlock))
        ) {
            return;
        }

        if (pressed.has(controls.PlayerOneAttack)) {
            const damage = getDamage(firstFighter, secondFighter);
            const loseHealth = (100 / secondFighter.health) * damage;
            fightState.setHealth(loseHealth, 'right');
            document.querySelector('#right-fighter-indicator').style.width = `${fightState.secondFighterHealth}%`;
        }
        if (pressed.has(controls.PlayerTwoAttack)) {
            const damage = getDamage(secondFighter, firstFighter);
            const loseHealth = (100 / firstFighter.health) * damage;
            fightState.setHealth(loseHealth, 'left');
            document.querySelector('#left-fighter-indicator').style.width = `${fightState.firstFighterHealth}%`;
        }

        if (fightState.firstFighterHealth <= 0 || fightState.secondFighterHealth <= 0) {
            const winner = fightState.firstFighterHealth <= 0 ? secondFighter : firstFighter;
            resolve(winner);
        }
    };
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const keyDownFun = fightersHit(firstFighter, secondFighter, resolve);

        document.addEventListener('keydown', keyDownFun);
        document.addEventListener('keyup', e => {
            pressed.delete(e.code);
            if (fightState.firstFighterHealth <= 0 || fightState.secondFighterHealth <= 0) {
                document.removeEventListener('keydown', keyDownFun);
            }
        });
    });
}
