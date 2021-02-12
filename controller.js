"use strict" /* a jshint hint */;
/*global Model, View, localStorage, document, console, window*/ let model, view;

const initialise = (evt) => {
  model = new Model();
  view = new View();
  if (localStorage.getItem("rateMap" != null)) {
    localStorage.setItem("lastRateCheck", getTime());
    model.getRatesXML();
  } else {
    if (window.navigator.onLine) {
      let OneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
      if (OneDay > localStorage.getItem("lastRateCheck")) {
        localStorage.setItem("lastRateCheck", getTime());
        model.getRatesXML();
      }
    }
  }

  model.setStorage();
  view.setHomeFlag(model.getHomeCurrency());
  view.setAwayFlag(model.getAwayCurrency());

  view.registerClickListener((event) => {
    const targ = event.target.value;

    if (targ === "=") {
      view.setHomeValue(model.calculateConversion(view.getCurrentInput()));
    } else if (targ === "clear") {
      view.clear();
    } else {
      view.setAwayValue(targ);
    }
  });

  view.registerOnChangeListener((event) => {
    const targ = event.target;

    if (targ.id === "bankFee") {
      model.setBankFee(targ.value);
      view.setDisplayedBankFee(targ.value);
      localStorage.setItem("bankFee", targ.value);
    } else {
      let tempHome = model.getHomeCurrency();
      let tempAway = model.getAwayCurrency();
      if (targ.id === "homeCurrency") {
        if (tempAway === targ.value) {
          tempAway = model.setAwayCurrency(tempHome);
          console.log(tempAway);
          document.getElementById("awayCurrency").value = tempAway;
          localStorage.setItem("awayCurrency", tempAway);
          view.setAwayFlag(model.getAwayCurrency());
        }
        tempHome = model.setHomeCurrency(targ.value);
        localStorage.setItem("homeCurrency", tempHome);
        view.setHomeFlag(model.getHomeCurrency());
      } else {
        if (tempHome === targ.value) {
          tempHome = model.setHomeCurrency(tempAway);
          document.getElementById("homeCurrency").value = tempHome;
          console.log(tempHome.valueOf());
          localStorage.setItem("homeCurrency", tempHome);
          view.setHomeFlag(model.getHomeCurrency());
        }

        tempAway = model.setAwayCurrency(targ.value);
        localStorage.setItem("awayCurrency", tempAway);
        view.setAwayFlag(model.getAwayCurrency());
      }
      view.clear();
    }
  });
};

function getTime() {
  console.log(new Date().toLocaleString());
  return new Date().toLocaleString();
}

window.addEventListener("load", initialise);
