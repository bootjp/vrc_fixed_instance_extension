let options = {
  instanceID: "",
  nonce:  "",
  userUID: "",
  instanceOwnerID: "",
  instancePermission: "",
};

chrome.storage.local.get(options, (item) =>  {
  // load setting.
  console.log(item);
  for (let optionsKey in options) {
    console.log(optionsKey, item[optionsKey]);
    let elm = document.getElementsByName(optionsKey);
    if (typeof elm !== 'undefined') {
      elm[0].setAttribute("value", item[optionsKey])
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const save = () => {
    for (let optionsKey in options) {
      document.getElementsByName(optionsKey);
      let elm = document.getElementsByName(optionsKey);
      if (typeof elm !== 'undefined') {
        options[optionsKey] = elm[0].value
      }
    }

    chrome.storage.local.set(options, () => {
      console.log("stored");
    });

  };
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', save);
});

