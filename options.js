let options = {
  worldID: "",
  instanceID: "",
  nonce: "",
  userUID: "",
  instanceOwnerID: "",
  instancePermission: "",
};

chrome.storage.local.get(options, (item) => {
  // load setting.
  for (let optionsKey in options) {
    let elm = document.getElementsByName(optionsKey);
    if (typeof item[optionsKey] !== 'undefined' && typeof elm[0] !== 'undefined') {
      elm[0].value = item[optionsKey];
    }
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
      if (typeof options[optionsKey] !== 'undefined' && typeof elm[0] !== 'undefined') {
        options[optionsKey] = elm[0].value
      }
    }

    chrome.storage.local.set(options, () => {
      console.log("stored");
      console.log(options);
    });
  };
  const saveButton = document.getElementById('save');
  saveButton.addEventListener('click', save);
  const lunchButton = document.getElementById('lunch');

  lunchButton.addEventListener('click', save);
  lunchButton.addEventListener('click', () => {
    for (let optionsKey in options) {
      let elm = document.getElementsByName(optionsKey);
      if (optionsKey === 'instancePermission' && elm.tagName === "select") {
        elm = elm.getElementsByTagName('option')[elm.selectedIndex];
      }
      options[optionsKey] = elm[0].value
    }
    let params = {
      ref: "vrchat.com", // なくてもいいんだけど，対策されても良いようにつけておく
      id: `${options['worldID']}:${options['instanceID']}~private(${options['instanceOwnerID']})~nonce(${options['nonce']})`
    };
    chrome.tabs.create({
      active: true,
      url: 'vrchat://launch/?' + Object.keys(params).map(k => k + '=' + params[k]).join('&')
    })
  });
  // lunch時も保存するようにしておく
  const gen = document.getElementById('nonce_gen');
  gen.addEventListener('click', () => {
    let ele = document.getElementsByName('nonce')[0];
    if (ele.value !== ''){
      confirm("nonceを新たに生成しますか?")
    }

    ele.value = generateNonce()
  });
});

// UUIDv4
function generateNonce() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

