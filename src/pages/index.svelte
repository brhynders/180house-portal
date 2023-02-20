<script>
  import { goto } from "@roxi/routify";
  import { pb } from "../stores";

  let loading = false;
  let username, password, errors;

  const login = async () => {
    loading = true;
    errors = false;

    try {
      const res = await pb
        .collection("users")
        .authWithPassword(username, password);
      if (res) $goto("/dashboard");
      else errors = "Error logging in";
    } catch (error) {
      errors = error.message;
    }
    loading = false;
  };
</script>

{#if pb.authStore.isValid}
  {$goto("/dashboard")}
{:else}
  <div
    class="min-h-screen w-full flex items-center content-center bg-slate-100 justify-center"
  >
    <div
      class="w-full max-w-xl bg-white rounded-md border shadow min-h-[200px] py-12 px-4 flex flex-col items-center"
    >
      <img
        width="150"
        src="https://the180center.org/wp-content/uploads/elementor/thumbs/180logo-q1xi78gxx1eucwn48jsmd4mqgu6rcr2nzsh700ham8.png"
        alt=""
      />
      <h3 class="text-gray-600 mt-8 text-lg font-bold">
        The 180 House Management Portal
      </h3>
      <form on:submit|preventDefault={login} class="w-full max-w-md mt-6">
        <div class="relative flex items-center w-full">
          <span class="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            bind:value={username}
            type="text"
            class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Username"
          />
        </div>
        <div class="relative flex items-center mt-3 w-full">
          <span class="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>

          <input
            bind:value={password}
            type="password"
            class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Password"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          class="flex items-center justify-center mt-3 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg disabled:bg-blue-200 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {#if loading}
            <div
              class="mr-2 w-4 h-4 rounded-full animate-spin border-2 border-t-transparent border-solid border-white"
            />
          {/if}
          Login
        </button>
        {#if errors}
          <p class="text-center mt-6 text-red-800 font-bold font-md">
            {errors}
          </p>
        {/if}
      </form>
    </div>
  </div>
{/if}
