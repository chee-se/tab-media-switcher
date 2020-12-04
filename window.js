// request user to get mic permission
navigator.mediaDevices.getUserMedia({ audio: true }).then((deviceInfo) =>
    navigator.mediaDevices.enumerateDevices().then((devices) => console.log(devices))
).finally(() => window.close());
