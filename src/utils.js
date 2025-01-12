
export const getCryptoExchangeRates = async (currencyCode) => {
  try {
    const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currencyCode}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const results = await response.json();
    return results.data.rates;

  } catch (error) {
    console.error(error.message);
  }
}

export const conversionToCrypto = async (dollarAmount,currencyCode) =>{
  const seventySplit = dollarAmount * 0.7;
  const thirtySplit = dollarAmount * 0.3;

  const rates = await getCryptoExchangeRates(currencyCode);
  
  return {
    BTC: seventySplit * rates.BTC,
    ETH: thirtySplit * rates.ETH
  };
};