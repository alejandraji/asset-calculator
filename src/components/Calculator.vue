<template>
  <form class="" @submit.prevent="submitHandler">
    <div class="user-input">
      <div class="select">
        <label for="currency">Choose currency:</label>
        <select v-model="selectedCurrency" name="currency" id="currency">
          <option v-for="currency in currencies" :value="currency.cc">
            {{currency.cc}}
          </option>
        </select>
      </div>
      <label for="assets">Investable assets</label>
      <input 
        type="text" 
        v-model="assets" 
        id="assets" 
        name="assets" 
        :placeholder="`${selectedSymbol} 0`"
        required
      >
    </div>
    <button class="btn">
      Calculate
    </button>
    <div class="calc-container">
      <div class="">
        <label for="firstCryptoSelected">Choose CryptoCoin:</label>
        <select v-model="firstCryptoSelected" name="firstCryptoSelected" id="firstCryptoSelected">
          <option v-for="cryptocoin in cryptocoins" :value="cryptocoin.coin">
            {{cryptocoin.coin}}
          </option>
        </select> 
      </div>
      <label class="firstCrypto" for="firstCrypto">70% {{firstCryptoSelected}} allocation</label>
      <input  readonly type="text" v-model="firstCrypto" name="firstCrypto" placeholder="0.0">
      <label  for="eth">30% ETH allocation</label>
      <input  readonly type="text" v-model="eth" id="eth" name="eth" placeholder="0.0">
    </div>
  </form>
</template>

<script setup>
  import { conversionToCrypto } from './../utils.js';
  import currencies from './../currencies.json';
  import cryptocoins from './../cryptocoins.json';
  import { computed, ref } from 'vue';

  const selectedCurrency = ref('USD');
  const selectedSymbol = computed(() => {
    const currency = currencies.find(currency => currency.cc === selectedCurrency.value);
    return currency?.symbol;
  })
  const assets = ref(null);
  const firstCrypto = ref(null);
  const firstCryptoSelected = ref(null);
  // const btc = ref(null)
  const eth = ref(null)

  const submitHandler = async () => {
    const conversion = await conversionToCrypto(assets.value, selectedCurrency.value, firstCryptoSelected.value);
    console.log(conversion, firstCryptoSelected);
    firstCrypto.value = conversion[firstCryptoSelected.value];
    eth.value = conversion.ETH;
  }


</script>
