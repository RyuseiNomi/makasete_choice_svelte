<script lang="ts">
  import { onMount } from 'svelte';
  let members = [];
  let groupNumber = 0;
  let maxGroupNumber = 0;
  let shuffledMembers = [];

  async function choice() {
    const response = await fetch('/result', {
      method: 'POST',
      body: JSON.stringify({ members, groupNumber }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const responseJson = await response.json();
    shuffledMembers = responseJson.assignedMembers;
  }

  onMount(async () => {
    const nameAddButton = document.querySelector(".top__name-add");
    const input = document.querySelector("input");

    nameAddButton.addEventListener("click", (event) => {
      if ( input.value === '') { return; }
      members.push(input.value);
      maxGroupNumber = members.length;
      members = members;
    });
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

<select bind:value={groupNumber}>
  <option value="">--組み分け数を選択--</option>
  {#each {length: maxGroupNumber} as _, i}
    <option value={i+1}>{i+1}</option>
  {/each}
</select>

<div class="top__submit-area" on:click={choice}>
  <button>チョイスする</button>
</div>

<div class="top__result">
  {#each shuffledMembers as group, i}
    <p>Group {i+1}</p>
    {#each group as _, i}
      <p>{group[i]}</p>
    {/each}
  {/each}
</div>
