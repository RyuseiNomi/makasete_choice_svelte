<script lang="ts">
  import { onMount } from 'svelte';
  let members = [];

  onMount(async () => {
    const button = document.querySelector("button");
    const input = document.querySelector("input");

    button.addEventListener("click", (event) => {
      if ( input.value === '') { return; }
      members.push(input.value);
      members = members;
      console.log(members);
    })
  })
</script>

<div class="page__members">
  {#each members as member}
    <p>{member}</p>
  {/each}
</div>
<input class="page__name-input">
<button class="page__name-add">＋</button>

<nav>
  <a href="/result">チョイスする</a>
</nav>
