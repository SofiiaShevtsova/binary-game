import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    if (fighter) {
        const { source, name, health, attack, defense } = fighter;
        const template = `<p class='fighter-preview___fighter-name'>${name}</p>
<div class='fighter-preview___characteristics'>
<span>Health:${health}</span>
<span>Attack:${attack}</span>
<span>Defence:${defense}</span>
</div>
<img src="${source}" alt="${name}" height='300px'>`;
        fighterElement.innerHTML = template;
    }
    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
