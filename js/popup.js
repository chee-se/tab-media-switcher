(() => {

  // storage data model
  // - device
  //   - deviceId
  //   - label

  // - url properties
  //   - uri or domain
  //   - favicon
  //   - domain flg
  //   - active device
  //     - deviceId
  //   - devices
  //     - deviceId
  //     - volume

  // - tab dom
  //   - url
  //   - favicon
  //   - device id
  //   - volume

  // ユーザーの同意を得てデバイス一覧を取得
  const getDeviceList = async (requestGrant) => {
    if (requestGrant) {
      chrome.windows.create({
        "url": "/html/window.html",
        "type": "popup",
        "focused": true,
        "width": 100,
        "height": 100
      });
      // TODO: save granted status to storage

      // TODO: error handling when request is blocked
      // TODO: save not granted status to storage
    }
    return await navigator.mediaDevices.enumerateDevices();
  };

  // タブを取得するPromise関数
  const queryTab = async (query) => {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query(query, (tabs) => resolve(tabs));
      } catch (e) {
        reject(e);
      }
    });
  };

  const updateTabSection = async (queries) => {
    const tabs = await queryTab(queries["tab"]);
    const section = document.querySelector(queries["selector"]);
    // create DOM fragment

    // URLから前回の操作を復元
    // TODO: restore user control from storage

    updateDOM(tabModel, queries["selector"]);
  };

  /////////////////////////////////////////////////////////////// execute from here /////////////////////////
  // デバイス一覧を更新
  let devices = getDeviceList(false);
    // アクセス権限がない場合、ユーザーの同意を得るためのポップアップを開く
  if (devices.every((deviceInfo) => deviceInfo.label == "")) {
    devices = getDeviceList(true);
  }
  // TODO: save device info to storage

  // タブの情報を更新
  updateTabSection({ "tab": { "active": true }, "selector": "#current-tab" });
  updateTabSection({ "tab": { "active": false, "audible": true }, "selector": "#audio-tabs" });
  updateTabSection({ "tab": { "active": false, "audible": false }, "selector": "#other-tabs" });

  // ユーザー操作があったらオーディオに反映
  // 操作の内容を保存


})();
