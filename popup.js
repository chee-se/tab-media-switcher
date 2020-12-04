(() => {
  // check media device granted
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    if (devices.every((deviceInfo) => deviceInfo.label == "")) {
      chrome.windows.create({
        "url": "window.html",
        "type": "popup",
        "focused": true,
        "width": 100,
        "height": 100
      });
      // TODO: error handling when request is blocked
    } else {
      // TODO: save device info to storage.
    }
  });
})();
