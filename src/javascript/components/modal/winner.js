import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const finishedFight = hideModal => {
        const modal = document.querySelector('.modal-layer');
        modal.innerHTML = '';
        const template =
            '<div class="modal-root"><div class="modal-header"><span>Do you want play again?</span></div><div class="link-box"><a href="/">Yes</a><button class="close-modal">No</button></div></div>';
        modal.innerHTML = template;
        document.querySelector('.close-modal').addEventListener('click', hideModal);
    };

    const winnerModal = {
        title: ``,
        bodyElement: null,
        onClose: finishedFight
    };

    if (fighter) {
        winnerModal.title = `${fighter.name} win this battle!`;
        const attributes = {
            src: fighter.source,
            title: fighter.name,
            alt: fighter.name,
            height: '60%'
        };
        winnerModal.bodyElement = createElement({
            tagName: 'img',
            className: 'fighter-preview___img',
            attributes
        });
    }

    showModal(winnerModal);
}
