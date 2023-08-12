<script lang="ts">
  import { onMount } from 'svelte';
  let name = '';
  let members = [];
  let groupNumber = 0;
  let maxGroupNumber = 0;
  let shuffledMembers = [];
  let logo = '/logo.png';

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

  function addMember(value) {
    if ( value === '') { return; }
    members.push(value);
    maxGroupNumber = members.length;
    members = members;
  }
</script>

<div class="top__body">
  <div class="top__logo">
    <img src={logo}>
  </div>
  <div class="top__members">
    {#each members as member}
      <p>{member}</p>
    {/each}
  </div>
  
  <div class="top__input-area">
    <p>1. メンバーの名前を入力</p>
    <input
      placeholder="メンバー名を入力"
      bind:value={name}
      on:keydown={async (e) => {
        if ( e.key == 'Enter' ) {
          addMember(name);
          name = '';
        }
      }}
    >
  </div>
  
  <div class="top__group-input">
    <p>2. グループの数を入力</p>
    <select bind:value={groupNumber}>
      <option value="">--組み分け数を選択--</option>
      {#each {length: maxGroupNumber} as _, i}
        <option value={i+1}>{i+1}</option>
      {/each}
    </select>
  </div>
  
  <div class="top__submit-area" on:click={choice}>
    <button>チョイスする</button>
  </div>
  
  <div class="top__result">
    {#each shuffledMembers as group, i}
      <p class="top__result-group">Group {i+1}</p>
      {#each group as _, i}
        {#if group[i] !== null}
          <p>{group[i]}</p>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style lang="scss" scoped>
  .top__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    p {
      font-family: "ヒラギノ角ゴ ProN W3";
      color: #696969;
    }
  }

  .top__members {
    width: 100%;
    height: 40vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .top__input-area {
    width: 80%;
    padding-bottom: 30px;

    input {
      width: 100%;
      height: 30px;
    }
  }

  .top__group-input {
    width: 80%;
    select {
      width: 100%;
      margin-bottom: 30px;
      height: 20px;
    }
  }

  .top__submit-area {
      button {
        background: #E6A0BD;
        border: none;
        color: white;
        font-size: 30px;
        border-radius: 6px;
        margin-bottom: 10px;
      }
  }

  .top__result {
    width: 80%;
  }
  .top__result-group {
    font-size: 24px;
  }
</style>
