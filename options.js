function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    sensitivity: document.querySelector("#sensitivity").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#sensitivity").value = result.sensitivity || "50";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("sensitivity");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

