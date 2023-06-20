import controls from '../../constants/controls';
import fightersHit from './fightersHit';

export async function fight(firstFighter, secondFighter) {
    const pressed = new Set();
    const fightState = {
        firstFighterHealth: 100,
        secondFighterHealth: 100
    };

    return new Promise(resolve => {
        const keyDownFun = fightersHit(firstFighter, secondFighter, pressed, controls, fightState, resolve);

        document.addEventListener('keydown', keyDownFun);
        document.addEventListener('keyup', e => {
            pressed.delete(e.code);
            if (fightState.firstFighterHealth <= 0 || fightState.secondFighterHealth <= 0) {
                document.removeEventListener('keydown', keyDownFun);
            }
        });
    });
}

// export function getDamage(attacker, defender) {
//     const damage = getBlockPower(defender) - getHitPower(attacker);
//     if (damage <= 0) {
//         return 0;
//     }
//     return damage;
// }

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
