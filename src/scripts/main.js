import 'dom4/build/dom4.js';
import 'svgxuse/svgxuse.js';

import * as utils from './utils';
import Filter from './components/filter';
import modal from './components/modal';

NodeList.prototype.forEach || (NodeList.prototype.forEach = Array.prototype.forEach);

if (utils.isTouch()) {
    document.documentElement.classList.add('ctx-touch')
}

var filter = new Filter({
    root: document.querySelector('.filter')
});

(function() {
    var modalElem = document.getElementById('product-view');
    if (!modalElem) return;

    document.addEventListener('click', function(e) {
        var target = e.target.closest('.product-grid .card');
        if (!target) return;
        modal(modalElem).open();
        e.preventDefault();
    });
})();
