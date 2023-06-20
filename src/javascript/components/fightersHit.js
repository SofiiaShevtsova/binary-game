// import { getDamage } from './fight';

// const fightersHit = (firstFighter, secondFighter, pressed, controls, fightState, resolve) => {
//     return e => {
//         e.preventDefault();
//         pressed.add(e.code);
//         if (
//             pressed.has(controls.PlayerOneCriticalHitCombination[0]) &&
//             pressed.has(controls.PlayerOneCriticalHitCombination[1]) &&
//             pressed.has(controls.PlayerOneCriticalHitCombination[2])
//         ) {
//             const loseHealth = (100 / secondFighter.health) * (firstFighter.attack * 2);
//             fightState.secondFighterHealth -= loseHealth;
//             document.querySelector('#right-fighter-indicator').style.width = `${
//                 fightState.secondFighterHealth < 0 ? 0 : fightState.secondFighterHealth
//             }%`;
//         }

//         if (
//             pressed.has(controls.PlayerTwoCriticalHitCombination[0]) &&
//             pressed.has(controls.PlayerTwoCriticalHitCombination[1]) &&
//             pressed.has(controls.PlayerTwoCriticalHitCombination[2])
//         ) {
//             const loseHealth = (100 / firstFighter.health) * (secondFighter.attack * 2);
//             fightState.firstFighterHealth -= loseHealth;
//             document.querySelector('#left-fighter-indicator').style.width = `${
//                 fightState.firstFighterHealth < 0 ? 0 : fightState.firstFighterHealth
//             }%`;
//         }

//         if (
//             (pressed.has(controls.PlayerOneAttack) && pressed.has(controls.PlayerTwoBlock)) ||
//             (pressed.has(controls.PlayerTwoAttack) && pressed.has(controls.PlayerOneBlock))
//         ) {
//             return;
//         }

//         if (pressed.has(controls.PlayerOneAttack)) {
//             const damage = getDamage(firstFighter, secondFighter);
//             const loseHealth = (100 / secondFighter.health) * damage;
//             fightState.secondFighterHealth -= loseHealth;
//             document.querySelector('#right-fighter-indicator').style.width = `${fightState.secondFighterHealth}%`;
//         }
//         if (pressed.has(controls.PlayerTwoAttack)) {
//             const damage = getDamage(secondFighter, firstFighter);
//             const loseHealth = (100 / firstFighter.health) * damage;
//             fightState.firstFighterHealth -= loseHealth;
//             document.querySelector('#left-fighter-indicator').style.width = `${fightState.firstFighterHealth}%`;
//         }

//         if (fightState.firstFighterHealth <= 0 || fightState.secondFighterHealth <= 0) {
//             const winner = fightState.firstFighterHealth <= 0 ? secondFighter : firstFighter;
//             resolve(winner);
//         }
//     };
// };

// export default fightersHit;
