<script>
  //Electron Imports
  const { ipcRenderer } = require("electron");

  function Ping() {
    console.log("PING SENDED");
    ipcRenderer.send("PING", null);
  }

  //When a new file is opened, update the state
  ipcRenderer.on("PONG", () => {
    console.log("PONG RECIVED");
  });
</script>

<main>
  <button on:click={Ping}>PING</button>
</main>

<style>
  button {
    background-color: green;
  }
</style>
