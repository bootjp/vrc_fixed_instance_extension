const VRCHAT_PUBLIC_APIKEY = "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
let options = {
  worldID: "",
  instanceID: "",
  nonce: "",
  instanceOwnerID: "",
  instancePermission: "",
};
chrome.storage.local.get(options, (item) => {
  // load setting.
  for (let optionsKey in options) {
    let elm = document.getElementsByName(optionsKey);
    if (
      typeof item[optionsKey] !== "undefined" &&
      typeof elm[0] !== "undefined"
    ) {
      elm[0].value = item[optionsKey];
    }
  }
});

/**
 * @returns {string} UUID V4
 */
const generateNonce = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * setting save to chrome storage.
 * @param e Event
 * @returns {boolean} disable bubbling
 */
const save = (e) => {
  resetValidColor();
  if (checkValidForJS()) {
    e.preventDefault();
    return false;
  }
  for (let optionsKey in options) {
    document.getElementsByName(optionsKey);
    let elm = document.getElementsByName(optionsKey);
    if (optionsKey === "instancePermission" && elm.tagName === "select") {
      elm = elm.getElementsByTagName("option")[elm.selectedIndex];
    }
    if (
      typeof options[optionsKey] !== "undefined" &&
      typeof elm[0] !== "undefined"
    ) {
      options[optionsKey] = elm[0].value;
    }
  }

  chrome.storage.local.set(options, () => {
    console.log("stored");
    console.log(options);
  });
  // disable popup reload
  e.preventDefault();
};

/**
 * launch vrchat fixed instance.
 * @param e Event
 * @returns {boolean}
 */
const launch = (e) => {
  for (let optionsKey in options) {
    let elm = document.getElementsByName(optionsKey);
    if (optionsKey === "instancePermission" && elm.tagName === "select") {
      elm = elm.getElementsByTagName("option")[elm.selectedIndex];
    }
    options[optionsKey] = elm[0].value;
  }
  options["instancePermission"] = options["instancePermission"].replace(
    "%%OWNER_ID%%",
    options["instanceOwnerID"]
  );
  let params = {
    worldId: `${options["worldID"]}&instanceId=${options["instanceID"]}~${options["instancePermission"]}`,
  };

  if (options["nonce"] !== "") {
    params.worldId += `~nonce(${options["nonce"]})`;
  }
  resetValidColor();
  if (checkValidForJS()) {
    e.preventDefault();
    return false;
  }

  window.open(
    "https://www.vrchat.com/home/launch?" +
      Object.keys(params)
        .map((k) => k + "=" + params[k])
        .join("&")
  );
};

/**
 * HTML5 require check for javascript.
 * @returns {boolean}
 */
const checkValidForJS = () => {
  let eles = document.querySelectorAll("input[required]:invalid");
  eles.forEach((ele) => {
    ele.style.backgroundColor = "red";
  });
  return eles.length !== 0;
};

/**
 * Clear validation status.
 */
const resetValidColor = () => {
  document.querySelectorAll("input").forEach((ele) => {
    ele.style.backgroundColor = null;
  });
};

const gen = document.getElementById("nonce_gen");
gen.addEventListener("click", (e) => {
  let ele = document.getElementsByName("nonce")[0];

  if (ele.value !== "" && !window.confirm("nonceを新たに生成しますか?")) {
    return false;
  }
  ele.value = generateNonce();

  // disable popup reload
  e.preventDefault();
});

const inviteMe = (e) => {
  for (let optionsKey in options) {
    let elm = document.getElementsByName(optionsKey);
    if (optionsKey === "instancePermission" && elm.tagName === "select") {
      elm = elm.getElementsByTagName("option")[elm.selectedIndex];
    }
    options[optionsKey] = elm[0].value;
  }
  options["instancePermission"] = options["instancePermission"].replace(
    "%%OWNER_ID%%",
    options["instanceOwnerID"]
  );

  let params = `https://vrchat.com/api/1/instances/${options["worldID"]}:${options["instanceID"]}~${options["instancePermission"]}`;

  if (options["nonce"] !== "") {
    params += `~nonce(${options["nonce"]})`;
  }
  resetValidColor();
  if (checkValidForJS()) {
    e.preventDefault();
    params += `/invite?apiKey=${VRCHAT_PUBLIC_APIKEY}`;

    fetch(params, {
      method: "POST",
      body: data,
    })
      .then()
      .catch();

    return false;
  }

  e.preventDefault();
};

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", save);
saveButton.addEventListener("click", launch);
const launchButton = document.getElementById("launch");
launchButton.addEventListener("click", launch);
const inviteMe = document.getElementById("invite_me");
inviteMe.addEventListener("click", inviteMe);
