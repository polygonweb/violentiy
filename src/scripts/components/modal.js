import { getScrollBarValue, isOverflow } from '../utils';

let body = document.body;
let scrollValue = getScrollBarValue();

const SHOW_CLASS = 'modal_show';
const PAGE_CLASS = 'ctx-modal-open';

export default function modal(elem) {
  if (!elem) return;

  return {
    isOpen: function() {
      elem.classList.contains( SHOW_CLASS);
    },

    open: function(callback) {
        elem.classList.add( SHOW_CLASS);
        console.log(isOverflow());
        body.style.paddingRight = isOverflow() ? `${scrollValue}px` : '';
        body.classList.add(PAGE_CLASS);
        document.addEventListener('click', outSideClickHandler);
        typeof callback === 'function' && callback();
        return this;
    },

    close: function(callback) {
        elem.classList.remove( SHOW_CLASS);
        body.classList.remove(PAGE_CLASS);
        body.style.paddingRight = '';
        document.removeEventListener('click', outSideClickHandler);
        typeof callback === 'function' && callback();
        return this;
    },

    toggle: function(callback) {
        this.isOpen() ? this.close(callback) : this.open(callback);
        return this;
    },
  }
}

function outSideClickHandler(e) {
  var modalElement = e.target.closest('.modal');
  if (!modalElement) return;
  var dialog = modalElement.querySelector('.modal__dialog');
  if (!dialog) return;
  if (!dialog.contains(e.target)) {
    modal(modalElement).close();
  }
}

function docClickHandler(e) {
  var modalBtn = e.target.closest('[data-modal]');
  if (!modalBtn) return;
  try {
      var data = JSON.parse(modalBtn.getAttribute('data-modal'));
      var elem = document.querySelector(data.target);
      modal(elem)[data.action]();
      e.preventDefault();
  } catch(e) {
    console.error('Ошибка обработки атрибута data-modal');
  }
}

function closeHandler(e) {
  var modalClose = e.target.closest('.modal__close');
  if (!modalClose) return;
  var modalElem = modalClose.closest('.modal');
  if (!modalElem) return;
  modal(modalElem).close();
  e.preventDefault();
}

function escapeHandler(e) {
    if (e.keyCode !== 27) return;
    document.querySelectorAll('.modal_show').forEach(function(modalEl) {
        modal(modalEl).close();
    });
}

document.addEventListener('click', docClickHandler);
document.addEventListener('click', closeHandler);
document.addEventListener('keyup', escapeHandler);
