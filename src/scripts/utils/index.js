export function isTouch() {
    return (!!('ontouchstart' in window) ||
        (navigator.MaxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

export const getScrollBarValue = (function() {
    var elem = document.createElement('div');
    elem.style.cssText = `
      width: 99px !important;
      height: 99px !important;
      border: 0 !important;
      padding: 0 !important;
      overflow: scroll !important;
    `;

    document.body.appendChild(elem);
    let scrollValue = elem.offsetWidth - elem.clientWidth;
    document.body.removeChild(elem);

    return function() {
        return scrollValue;
    }
  })();

function getViewportH() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
};

function getDocumentHeight() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
};

export function isOverflow() {
    return getDocumentHeight() > getViewportH();
}
