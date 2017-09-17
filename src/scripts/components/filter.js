import { isTouch } from '../utils';

const desktopMediaQuery = "(min-width: 768px)";

class Filter {
    constructor({ root }) {
        if (!root) return;
        this.DOM = {
            root: root,
            toggleBtn: document.querySelector('.filter__toggle'),
            closeBtn: document.querySelector('.filter__close'),
            form: document.querySelector('.filter__form')
        };

        ['toggleFilter', 'checkScreenSize', 'toggleItem', 'clearInlineStyles'].forEach(method => this[method] = this[method].bind(this));

        this.checkScreenSize();
        this.bindEvents();
    }

    toggleFilter() {
        this.DOM.root.classList.toggle('filter_open')
    }

    toggleItem(e) {
        var target = e.target.closest('.fieldset__head');
        if (!target) return;
        var fieldset = target.closest('.fieldset');
        var body = fieldset.querySelector('.fieldset__body');
        var isOpen = fieldset.classList.contains('fieldset_open');
        body.style.height = isOpen ? '' : `${body.scrollHeight}px`;
        fieldset.classList[isOpen ? 'remove' : 'add']('fieldset_open');
        // target.closest('.filter-form__body').style.overflow = 'scroll';
    }

    checkScreenSize() {
        var isDesktop = matchMedia(desktopMediaQuery).matches;
        var action = (isDesktop && !isTouch()) ? 'remove' : 'add';
        document[action + 'EventListener']('click', this.toggleItem);
        if (isDesktop) {
            this.clearInlineStyles();
        }
    }

    clearInlineStyles() {
        this.DOM.root
            .querySelectorAll('.fieldset__body')
            .forEach(item => item.style.height = '');
    }

    bindEvents() {
        const { toggleBtn, closeBtn } = this.DOM;
        [toggleBtn, closeBtn].forEach(btn => btn.addEventListener('click', this.toggleFilter));

        // if (isTouch()) {
        //     document.addEventListener('click', this.toggleItem)
        // }
        window.addEventListener('resize', this.checkScreenSize);
        window.addEventListener('orientationchange', this.checkScreenSize);
    }
}

export default Filter;
