<script lang="ts">
  import { onMount } from 'svelte';
  let members = [];
  let maxGroupNumber = 0;

  onMount(async () => {
    const button = document.querySelector("button");
    const input = document.querySelector("input");

    button.addEventListener("click", (event) => {
      if ( input.value === '') { return; }
      members.push(input.value);
      maxGroupNumber = members.length;
      members = members;
    })
  })
</script>

<div class="top__members">
  {#each members as member}
    <p>{member}</p>
  {/each}
</div>

<div class="top__input-area">
  <input class="top__name-input">
  <button class="top__name-add">＋</button>
</div>

<select>
  <option value="">--組み分け数を選択--</option>
  {#each {length: maxGroupNumber} as _, i}
    <option value={i+1}>{i+1}</option>
  {/each}
</select>

<nav>
  <a href="/result">チョイスする</a>
</nav>
