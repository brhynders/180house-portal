<script>
  import { house, pb } from "../../stores";

  $: tenants = pb.collection("tenants").getList(1, 20, {
    filter: `house.id = "${$house}"`,
  });
</script>

<h3 class="text-2xl font-bold">Tenants</h3>
<div class="mt-6">
  {#await tenants}
    Loading
  {:then { items }}
    <ul class="bullet">
      {#each items as tenant}
        {tenant.tenant_name}<br />
      {/each}
    </ul>
  {/await}
</div>
