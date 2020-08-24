

<template>
  <div>
    <div id="signature-pad">
      <canvas></canvas> 
      <!-- Empty tag, JS creates the signature pad inside this -->
    </div>
    <div>
      <button type="button" onclick="window.location.reload();">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var wrapper = document.getElementById("signature-pad");
    var canvas = wrapper.querySelector("canvas");
    var signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgb(255, 255, 255)",
    });
    function download(dataURL, filename) {
      var blob = dataURLToBlob(dataURL);
      var url = window.URL.createObjectURL(blob);

      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
    function dataURLToBlob(dataURL) {
      // Code taken from https://github.com/ebidel/filer.js
      var parts = dataURL.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    }
  },
};
</script>
