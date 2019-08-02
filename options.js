let options = {
  instanceID: "",
  nonce:  "",
  userUID: "",
  instanceOwnerID: "",
  instancePermission: "",
};

chrome.storage.local.get(options, (item) =>  {
  // load setting.
  for (let optionsKey in options) {
    let elm = document.getElementsByName(optionsKey);
    elm[0].value = item[optionsKey];
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const save = () => {
    for (let optionsKey in options) {
      document.getElementsByName(optionsKey);
      let elm = document.getElementsByName(optionsKey);
      if (optionsKey === 'instancePermission' && elm.tagName === "select") {
        elm = elm.getElementsByTagName('option')[elm.selectedIndex];
      }
      options[optionsKey] = elm[0].value
    }

      chrome.storage.local.set(options, () => {
        console.log("stored");
        console.log(options);
      });
    };
    const saveButton = document.getElementById('save');
    saveButton.addEventListener('click', save);
    const lunchButton = document.getElementById('lunch');
    lunchButton.addEventListener('click', () => {
     for (let optionsKey in options) {
        let elm = document.getElementsByName(optionsKey);
        if (optionsKey === 'instancePermission' && elm.tagName === "select") {
          elm = elm.getElementsByTagName('option')[elm.selectedIndex];
        }
        options[optionsKey] = elm[0].value
      }
      chrome.tabs.create({active: true, url: `vrchat://launch/?ref=vrchat.com&id=${options['world_id']}:${options['instanceID']}~private(${options['instanceOwnerID']})~nonce(${options['nonce']})~canRequestInvite`})
  });
});

