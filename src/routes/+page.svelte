<script lang="ts">
  import Panel from "$lib/panel.svelte";

  const BASE_URL = import.meta.env.BASE_URL
</script>

<main>
  <div class="panel" id="header">
    <div id="title">Hutanika</div>
  </div>
  <div class="panel" id="content">
    <Panel>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl">Pesan atas nama?</h1>
        <input type="text">
        <button>Mulai</button>
      </div>
    </Panel>
  </div>
  <div class="panel" id="footer">
    Powered By SvelteKit
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
  }

  #header {
    width: 100%;
    height: 6%;
    justify-content: left;
  }

  #content {
    width: 100%;
    height: 86%;
  }

  #footer {
    height: 6%;
    justify-content: end;
    margin-right: 1em;
  }

  #title {
    font-size: 1.5em;
    font-weight: bold;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left: 0.5em;
  }

  .panel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>