'use strict'
document.addEventListener('DOMContentLoaded', function () {

  // полифил метода forEach() для NodeList
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    }
  }

  const dropDown = document.querySelectorAll('.dropdown');

  dropDown.forEach(function (dropDownWrapper) {

    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    dropDownBtn.addEventListener('click', function () {
      dropDownList.classList.toggle('dropdown__list--visible');
      this.classList.add('dropdown__button--active');
    });

    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation(); /* остановка передачи события наверх, т.е., клик не считается сторонним и класс dropdown__button--active не удаляется */
        dropDownBtn.innerText = this.innerText;
        dropDownList.classList.remove('dropdown__list--visible');
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
      });
    });

    document.addEventListener("click", function (e) {
      if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === "Tab" || e.key === "Escape") {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });

  });

});
