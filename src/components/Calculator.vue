<template>
  <form class="" @submit.prevent="submitHandler">
    <div class="user-input">
      <div>
        <label for="currency">Choose currency:</label>
        <select v-model="selectedCurrency" name="currency" id="currency">
          <option v-for="currency in currencies" :value="currency.cc">
            {{currency.cc}}
          </option>
        </select>
        <div>Selected: {{ selectedCurrency }}</div>
      </div>
      <label for="assets">Investable assets</label>
      <input type="text" v-model="assets" id="assets" name="assets" placeholder="$0">
    </div>
    <button class="btn">
      Calculate
    </button>
    <div class="calc-container">
      <label class=""for="btc">70% BTC allocation</label>
      <input  type="text" v-model="btc" id="btc" name="btc" placeholder="0.0">
      <label  type="text" for="eth">30% ETH allocation</label>
      <input  type="text" v-model="eth" id="eth" name="eth" placeholder="0.0">
    </div>
  </form>
</template>

<script setup>
  import { conversionToCrypto } from './../utils.js';
  import currencies from './../currencies.json';
  import { ref } from 'vue';

  const selectedCurrency = ref('USD');
  const assets = ref(null)
  const btc = ref(null)
  const eth = ref(null)
  console.log(currencies)

  const submitHandler = async () => {
    const conversion = await conversionToCrypto(assets.value);
    console.log(conversion);
    btc.value = conversion.BTC;
    eth.value = conversion.ETH;
  }


</script>
