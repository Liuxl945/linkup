import LinkUp from './js/linkUp';
import './css/index.scss';

let lv = 'primary';

const linkup = new LinkUp({
  dom: '#J_canvas',
  lv: lv
});

linkup.init();

const lvGroup = document.querySelector('#J_level');

lvGroup.addEventListener('click', changeLevel, false);

function changeLevel (ev) {
  let e = ev || window.event,
      tar = e.target || e.srcElement;

  if (tar.nodeName.toUpperCase() === 'BUTTON') {
    if (confirm(`是否选择${tar.dataset.levelText}？`)) {
      linkup.changeLevel(tar.dataset.level);
    }
  }
}
