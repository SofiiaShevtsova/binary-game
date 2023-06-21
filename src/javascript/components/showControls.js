export default function showControlsInfo() {
    const element = document.createElement('div');
    element.classList.add('player-controls-box');
    const template =
        '<h3> Press any key to close!!!</h3>' +
        '<div class="player-controls">' +
        '<h3> Left controls</h3>' +
        '<p>Player: attack: "KeyA", block: "KeyD".</p>' +
        '<p>Player critical hit: ["KeyQ", "KeyW", "KeyE"]. You can use when your indicator is yellow.</p>' +
        '</div>' +
        '<div class="player-controls">' +
        '<h3>Right controls</h3>' +
        '<p>Player: attack: "KeyJ", block: "KeyL".</p>' +
        '<p>Player critical hit: ["KeyU","KeyI", "KeyO"]. You can use when your indicator is yellow.</p>' +
        '</div>';
    element.innerHTML = template;
    document.querySelector('#root').append(element);
}
