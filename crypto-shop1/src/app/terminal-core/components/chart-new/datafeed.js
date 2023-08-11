import {makeApiRequest, parseFullSymbol} from './helpers.js';

// import { subscribeOnStream, unsubscribeFromStream } from './streaming.js';

// DatafeedConfiguration implementation
const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: ['1H', '6H', '12H', '1D', '1W', '1M'],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  /*exchanges: [
    { value: 'StartCryptoTrade', name: 'StartCryptoTrade', desc: 'StartCryptoTrade'},
    // { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},
  ],*/
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  /*symbols_types: [
    { name: 'crypto', value: 'crypto'}
  ]*/
};

// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map();

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
  async function getSymbols () {
    try {
      const response = await fetch(`https://startcryptotrade.com/api/trade/getAllSymbols`);
      return response.json();
    } catch (error) {
      throw new Error(`CryptoCompare request error: ${error.status}`);
    }
  }

  let allSymbols = [];
  const data = await getSymbols();

  // for (const exchange of configurationData.exchanges) {
  //   const pairs = data;

    for (let i = 0; i < data.length; i++) {
      const symbols = data.map(sSymbol => {
        return {
          symbol: sSymbol,
          full_name: sSymbol,
          description: sSymbol,
          type: 'crypto',
        };
      });
      allSymbols = [...allSymbols, ...symbols];
    }
  // }
  return allSymbols
}

export default {
  onReady: (callback) => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    console.log('[searchSymbols]: Method call');
    const symbols = await getAllSymbols();
    // console.log('symbols', symbols)
    /*const newSymbols = symbols.filter(symbol => {
      console.log('symbol', symbol)
      console.log('exchange', exchange)
      const isExchangeValid = exchange === '' || symbol === exchange;
      const isFullSymbolContainsInput = symbol
        .toLowerCase()
        .indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });*/
    onResultReadyCallback(symbols.symbols);
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('Cannot resolve symbol');
      return;
    }
    // Symbol information object
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      has_intraday: false,
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming',
    };
    console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    const { from, to, firstDataRequest } = periodParams;
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    const urlParameters = {
      e: parsedSymbol.exchange,
      fsym: parsedSymbol.fromSymbol,
      tsym: parsedSymbol.toSymbol,
      toTs: to,
      limit: 2000,
    };
    const query = Object.keys(urlParameters)
      .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&');
    try {
      const data = await makeApiRequest(`data/histoday?${query}`);
      if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true });
        return;
      }
      let bars = [];
      data.Data.forEach(bar => {
        if (bar.time >= from && bar.time < to) {
          bars = [...bars, {
            time: bar.time * 1000,
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
          }];
        }
      });
      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, { ...bars[bars.length - 1] });
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.log('[getBars]: Get error', error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    /*subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name)
    );*/
  },

  unsubscribeBars: (subscriberUID) => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    // unsubscribeFromStream(subscriberUID);
  },
};
