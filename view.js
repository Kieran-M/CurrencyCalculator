"use strict" /* a jshint hint */;

/*global document, console */ let currentInput, MAX_LENGTH;

class View {
  constructor() {
    MAX_LENGTH = 12;
    currentInput = "";
  }

  registerClickListener(onClick) {
    document.querySelectorAll(".calc-button").forEach((item) => {
      item.addEventListener("click", onClick);
    });
  }

  registerOnChangeListener(onChange) {
    document
      .getElementById("homeCurrency")
      .addEventListener("change", onChange);
    document
      .getElementById("awayCurrency")
      .addEventListener("change", onChange);
    document.getElementById("bankFee").addEventListener("change", onChange);
  }

  getCurrentInput() {
    return currentInput;
  }

  setAwayValue(buttonValue) {
    if (currentInput.length < MAX_LENGTH) {
      currentInput += buttonValue;
      document.getElementById("away").value = currentInput;
    }
  }

  setHomeValue(val) {
    document.getElementById("visiting").value = val;
  }

  setDisplayedCurrencyAway(curr) {
    document.getElementById("awayCurrency").value = curr;
  }

  setDisplayedCurrencyHome(curr) {
    document.getElementById("homeCurrency").value = curr;
  }

  setDisplayedBankFee(fee) {
    document.getElementById("bankFee").value = fee;
  }

  setHomeFlag(homeCurrency) {
    document.getElementById("homeFlag").src = "images/" + homeCurrency + ".png";
  }
  setAwayFlag(awayFlag) {
    document.getElementById("awayFlag").src = "images/" + awayFlag + ".png";
  }

  clear() {
    currentInput = "";
    document.getElementById("away").value = "0";
    document.getElementById("visiting").value = "";
  }

  openNav() {
    document.getElementById("sidebar").style.width = "50%";
  }
  closeNav() {
    document.getElementById("sidebar").style.width = "0%";
  }
}
