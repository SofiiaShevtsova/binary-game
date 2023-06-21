import controls from '../../constants/controls';
import fightState from '../services/fightState';

const pressed = new Set();
const idThrottle = {
    left: null,
    right: null
};

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

function throttleFunction(func, position) {
    if (idThrottle[position] === null) {
        func();
    }

    idThrottle[position] = setTimeout(() => {
        idThrottle[position] = null;
        document.querySelector(`#${position}-fighter-indicator`).style.backgroundColor = '#ebd759';
    }, 10000);
}

function keyDownCobination(position) {
    if (pressed.size < 3) {
        return false;
    }
    if (position === 'left') {
        return controls.PlayerOneCriticalHitCombination.every(key => pressed.has(key));
    }
    return controls.PlayerTwoCriticalHitCombination.every(key => pressed.has(key));
}

function showDamage(attacker, defender, position, critical = false) {
    const damage = critical ? attacker.attack * 2 : getDamage(attacker, defender);
    const loseHealth = (100 / defender.health) * damage;
    fightState.setHealth(loseHealth, position);
    document.querySelector(`#${position}-fighter-indicator`).style.width = `${fightState.getHealth()[position]}%`;
}

function fightersHit(firstFighter, secondFighter, resolve) {
    return e => {
        e.preventDefault();
        pressed.add(e.code);
        if (keyDownCobination('left')) {
            const criticalHit = () => {
                showDamage(firstFighter, secondFighter, 'right', true);
                document.querySelector(`#left-fighter-indicator`).style.backgroundColor = 'red';
            };

            throttleFunction(criticalHit, 'left');
        }

        if (keyDownCobination('right')) {
            const criticalHit = () => {
                showDamage(secondFighter, firstFighter, 'left', true);
                document.querySelector(`#right-fighter-indicator`).style.backgroundColor = 'red';
            };
            throttleFunction(criticalHit, 'right');
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
            showDamage(firstFighter, secondFighter, 'right');
        }
        if (pressed.has(controls.PlayerTwoAttack)) {
            showDamage(secondFighter, firstFighter, 'left');
        }

        if (fightState.getHealth().left === 0 || fightState.getHealth().right === 0) {
            const winner = fightState.getHealth().left === 0 ? secondFighter : firstFighter;
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
            if (fightState.getHealth().left === 0 || fightState.getHealth().right === 0) {
                document.removeEventListener('keydown', keyDownFun);
            }
        });
    });
}
