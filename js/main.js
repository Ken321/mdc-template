// スクロールしたらヘッダーを固定
window.addEventListener('scroll', function() {
  if (window.scrollY <= 300) {
    let el = document.querySelector('#app-bar');
    el.classList.remove('scrolled');
  } else if (window.scrollY > 300) {
    let el = document.querySelector('#app-bar');
    el.classList.add('scrolled');
  }
});

// プルダウンを使う場合
// const m = window.mdc.menu;
// const btn = document.querySelector('.select-button');
//
// const menu = new m.MDCMenu(document.querySelector('.mdc-menu'));
// menu.setAnchorCorner(m.Corner.BOTTOM_LEFT)
// menu.setAnchorElement(document.querySelector('.select-button'));
//
// btn.addEventListener('click', () => {
//   if(!menu.open) {
//     menu.open = true;
//   }
// });
//
// document.querySelectorAll('.mdc-list-item--select').forEach(function(item) {
//   item.addEventListener('click',(e) => {
//     window.location.href = e.target;
//   });
// })

// タブ
const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
const contentEls = document.querySelectorAll('.content');

tabBar.listen('MDCTabBar:activated', function(event) {
  // Hide currently-active content
  document.querySelector('.content--active').classList.remove('content--active');
  // Show content for newly-activated tab
  contentEls[event.detail.index].classList.add('content--active');
});


// ドロワー
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

const closeBtn = document.querySelector('.mdc-drawer__close-button');

closeBtn.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

// カルーセル
new Glide('.glide').mount();

// ダイアログ
const dialogEls = Array.from(document.querySelectorAll('.mdc-dialog'));
// First one is the Login, Second one is the Delivery
var dialogArr = [];
dialogEls.forEach((ele) => {
  const dialog = new mdc.dialog.MDCDialog(ele);
  dialogArr.push(dialog);
});

document.querySelector('#open-dialog-1').addEventListener('click', function(evt) {
  dialogArr[0].open();
});

// テキストフィールド
const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
  return new mdc.textField.MDCTextField(el);
});
