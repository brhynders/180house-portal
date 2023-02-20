<script>
  import { BaseTransition } from "@roxi/routify/decorators";
  import { goto } from "@roxi/routify";
  import { pb, house } from "../../stores";
  import Sidebar from "./_sidebar.svelte";

  let houseName = "";
  let _house;

  $: if (_house) house.set(_house);

  const logout = () => {
    pb.authStore.clear();
    $goto("/");
  };

  const houses = pb.collection("houses").getList(1, 50);
</script>

{#if !pb.authStore.isValid}
  {$goto("/")}
{:else}
  <div class="bg-slate-100 min-h-screen w-full flex items-stretch">
    <Sidebar />
    <main class="flex-grow flex flex-col">
      <header class="w-full shadow-b bg-white px-6 py-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          {#await houses}
            Loading
          {:then { items }}
            <select bind:value={_house} class="px-6 py-2 shadow bg-neutral-50">
              {#each items as house}
                <option value={house.id}>{house.house_name}</option>
              {/each}
            </select>
          {/await}
          <div class="flex items-center gap-6">
            <button on:click={logout}>Logout</button>
          </div>
        </div>
      </header>
      <div class="mt-16 w-full max-w-6xl mx-auto flex-grow">
        <slot decorator={BaseTransition} />
      </div>
      <footer class="px-6 py-4 w-full shadow-t bg-white">
        <p class="text-center">This is a footer</p>
      </footer>
    </main>
  </div>
{/if}
