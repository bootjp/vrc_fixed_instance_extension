let options = {
  instanceID: "",
  nonce:  "",
  userUID: "",
  instanceOwnerID: "",
  instancePermission: "",
};

document.addEventListener('DOMContentLoaded', () => {
  const save = () => {
    for (let optionsKey in options) {
      document.getElementsByName(optionsKey);
      let elm = document.getElementsByName(optionsKey);
      if (typeof elm !==  'undefined') {
        console.log(elm[0]);
        options[optionsKey] = elm[0].getAttribute("value")
      }
    }

    chrome.storage.local.set(options, () => {
      console.log("stored");
    });

  };
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', save);
});
