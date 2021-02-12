"use strict";

/*global document, console,model, localStorage */

let rateMap, homeCurrency, awayCurrency, bankFee;

class Model {
  constructor() {}

  getRatesXML() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      console.log("Getting rates");
      rateMap = model.parseRates(this.responseText);
      localStorage.setItem(
        "rateMap",
        JSON.stringify(Array.from(model.getRateMap()))
      );
    });
    xhr.open("GET", "https://devweb2020.cis.strath.ac.uk/~aes02112/ecbxml.php");
    xhr.send();
  }

  parseRates(response) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(response, "text/xml");
    let entries = xmlDoc
      .getElementsByTagName("Cube")[0]
      .getElementsByTagName("Cube")[0]
      .getElementsByTagName("Cube");

    let map = new Map();
    map.set("EUR", "1");

    for (let entry of entries) {
      map.set(entry.getAttribute("currency"), entry.getAttribute("rate"));
    }
    return map;
  }

  setRates(map) {
    rateMap = map;
  }

  getRateMap() {
    return rateMap.entries();
  }
  setHomeCurrency(currency) {
    homeCurrency = currency;
    return awayCurrency;
  }

  setAwayCurrency(currency) {
    awayCurrency = currency;
    return awayCurrency;
  }

  getHomeCurrency() {
    return homeCurrency;
  }

  getAwayCurrency() {
    return awayCurrency;
  }

  setBankFee(fee) {
    bankFee = fee;
    return bankFee;
  }

  getBankFee() {
    return bankFee;
  }

  calculateConversion(currentInput) {
    let convertedPrice =
      currentInput * (rateMap.get(homeCurrency) / rateMap.get(awayCurrency));
    let fee = (convertedPrice / 100) * bankFee;
    convertedPrice += fee;
    return Math.round((convertedPrice + Number.EPSILON) * 100) / 100;
  }

  setStorage() {
    if (localStorage.getItem("rateMap") != null) {
      model.setRates(new Map(JSON.parse(localStorage.rateMap)));
    }
    if (localStorage.getItem("homeCurrency") != null) {
      model.setHomeCurrency(localStorage.getItem("homeCurrency"));
      view.setDisplayedCurrencyHome(localStorage.getItem("homeCurrency"));
    } else {
      model.setHomeCurrency("GBP");
      localStorage.setItem("homeCurrency", "GBP");
    }
    if (localStorage.getItem("awayCurrency") != null) {
      model.setAwayCurrency(localStorage.getItem("awayCurrency"));
      view.setDisplayedCurrencyAway(localStorage.getItem("awayCurrency"));
    } else {
      model.setAwayCurrency("EUR");
      localStorage.setItem("awayCurrency", "EUR");
    }

    if (localStorage.getItem("bankFee") != null) {
      model.setBankFee(localStorage.getItem("bankFee"));
      view.setDisplayedBankFee(localStorage.getItem("bankFee"));
    } else {
      model.setBankFee(0);
      localStorage.setItem("bankFee", 0);
    }
  }
}
