import {
  TypeAccountCard,
  TypeAdditionalCard,
  TypeConfidenceCard,
  TypeIntroduction,
  TypeMarketPage,
  TypeNavItem,
  TypeStatsCard,
  TypeStepCard
} from "../types";

const logoSrc = "assets/img/logoNew.png"

const logoSrcHover = "assets/img/logoNew.png"

const banner1 = "../assets/img/logo1.jpeg"
const banner3 = "../assets/img/banner3.jpg"
const banner2 = "../assets/img/banner.f146717a.webp";
const image1 = "../assets/img/logo2.jpeg"
const image2 = "../assets/img/logo3.jpeg"
const image3 = "../assets/img/logo4.jpeg"

const company1 = "../assets/img/company1.webp";
const company2 = "../assets/img/company2.webp";
const company3 = "../assets/img/company3.webp";
const company4 = "../assets/img/company4.webp";
const company5 = "../assets/img/company5.webp";
const company6 = "../assets/img/company6.webp";
const company7 = "../assets/img/company7.webp";

const market_currencies = "../assets/img/market_currencies.webp";
const market_metals = "../assets/img/market_metals.webp";
const market_stock = "../assets/img/market_stock.webp";
const market_products = "../assets/img/market_products.webp";
const market_indicies = "../assets/img/market_indicies.webp";
const market_crypto = "../assets/img/market_crypto.webp";

const market_addition_currencies = "../assets/img/market-addition_currencies.webp";
const market_addition_metals = "../assets/img/market-addition_metals.webp";
const market_addition_stock = "../assets/img/market-addition_stock.webp";
const market_addition_products = "../assets/img/market-addition_products.webp";
const market_addition_indicies = "../assets/img/market-addition_indicies.webp";
const market_addition_crypto = "../assets/img/market-addition_crypto.webp";


export const linksHeader: TypeNavItem[] = [
  {
    title: "Markets",
    href: "",
    items: [
      {
        title: "Currencies",
        href: "/markets/currencies",
      },
      {
        title: "Metals",
        href: "/markets/metals",
      },
      {
        title: "Stock",
        href: "/markets/stock",
      },
      {
        title: "Products",
        href: "/markets/products",
      },
      {
        title: "Indicies",
        href: "/markets/indicies",
      },
      {
        title: "Cryptocurrencies",
        href: "/markets/cryptocurrencies",
      },
    ],
  },
  {
    title: "Trading conditions",
    href: "/conditions"
  },
  {
    title: "About company",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/contact"
  },
]

export const linksFooter = [
  {
    title: "Trading conditions",
    href: "/conditions"
  },
  {
    title: "About company",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/contact"
  },
]

export const homeIntroduction: TypeIntroduction = {
  description: "Sign up and learn risk-free on our state-of-the-art platform with all the features and a $10 000 free demo account",
  title: "Make money on global financial markets in minutes",
  image: banner1,
}

export const about2Introduction: TypeIntroduction = {
  description: "The main value of the company is the work on creating a comfortable environment for all users of the platform, we have implemented the most convenient functionality of the platform and round-the-clock access from anywhere in the world. The instantaneous speed of updating quotes and the interface is what our company is proud of",
  title: "Access to investing in financial markets from anywhere in the world",
  image: banner3,
}

export const tradingConditionsIntroduction: TypeIntroduction = {
  description: "Trading conditions are being optimized every year, and CFD trading is becoming more accessible even for those who were not previously interested in financial markets. Trading on our platform is really simple and convenient. Open an account for free. Choose a comfortable tariff. Use modern technologies and earn money already now",
  title: "Accessible trading for everyone",
  image: image3,
}

export const aboutIntroduction: TypeIntroduction = {
  description: "Our brokerage company MARKET BY Crypto Trade provides the fastest trading using modern technology. No delays in the execution of orders and the most accurate quotes. Our marketplace and customer support service is available 24/7. We are constantly adding new financial instruments so that you can trade and earn the way you like.",
  image: banner2,
  title: "Innovations in brokerage decorators for private and corporate clients",
}

export const marketsData: TypeMarketPage [] = [
  {
    name: "currencies",
    introduction: {
      title: "Currency trading",
      description: "The main instrument of the market are currency pairs. When buying one currency, a trader always sells another.",
      image: market_currencies,
    },
    advantages: [
      {
        name: "Investment liquidity",
        description: "Cash and electronic fiat money are the most in demand, as they are used as a means of payment throughout the world."
      },
      {
        name: "Reduced risks",
        description: "The Crypto Trade platform ensures high speed of transactions and protects your orders from requotes and slippages."
      },
      {
        name: "Fundamental analysis",
        description: "Analytics allows you to track trends in the supply and demand for a currency and earn on the price difference."
      },
      {
        name: "24 hour trading",
        description: "Transactions are not limited in time, as the market is open around the clock from Monday to Friday."
      },
    ],
    additionalInformation: {
      title: "Additional Information",
      description: 'When designating pairs of national monetary units, the first is the base, and the second is the quote currency',
      image: market_addition_currencies,
    },
    toolTable: {
      title: "Tool table",
      iframeUrl: "https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Forex%22%2C%22originalName%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FX%3AEURUSD%22%2C%22displayName%22%3A%22EUR%2FUSD%22%7D%2C%7B%22name%22%3A%22FX%3AGBPUSD%22%2C%22displayName%22%3A%22GBP%2FUSD%22%7D%2C%7B%22name%22%3A%22FX%3AUSDJPY%22%2C%22displayName%22%3A%22USD%2FJPY%22%7D%2C%7B%22name%22%3A%22FX%3AUSDCHF%22%2C%22displayName%22%3A%22USD%2FCHF%22%7D%2C%7B%22name%22%3A%22FX%3AAUDUSD%22%2C%22displayName%22%3A%22AUD%2FUSD%22%7D%2C%7B%22name%22%3A%22FX%3AUSDCAD%22%2C%22displayName%22%3A%22USD%2FCAD%22%7D%2C%7B%22name%22%3A%22OANDA%3AGBPJPY%22%2C%22displayName%22%3A%22GBP%2FJPY%22%7D%2C%7B%22name%22%3A%22FX%3AEURCAD%22%2C%22displayName%22%3A%22EUR%2FCAD%22%7D%2C%7B%22name%22%3A%22FX%3AEURJPY%22%2C%22displayName%22%3A%22EUR%2FJPY%22%7D%2C%7B%22name%22%3A%22FX%3ANZDUSD%22%2C%22displayName%22%3A%22NZD%2FUSD%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22cmarketcap.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fcurrencies%22%7D"
    },
    tradingInstrumentTable: {
      title: "Trading instrument chart",
      iframeUrl: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_4d40f&symbol=FX%3AEURUSD&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=cmarketcap.com&utm_medium=widget&utm_campaign=chart&utm_term=FX%3AEURUSD#%7B%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fcurrencies%22%7D"
    }
  },

  {
    name: "metals",
    introduction: {
      title: "Operations with precious metals",
      description: "Expand your investment portfolio by trading in various precious metals.",
      image: market_metals,
    },
    advantages: [
      {
        name: "Reliability of investments",
        description: "Fluctuations in quotes for precious metals are insignificant, in contrast, for example, to currencies."
      },
      {
        name: "Asset Independence",
        description: "The rise in the cost of precious metals is ahead of inflationary fluctuations."
      },
      {
        name: "High profitability",
        description: "Precious metals are among the most liquid investment assets."
      },
      {
        name: "Profitability",
        description: "Thanks to fundamental and technical analysis, a trader can significantly increase his earnings."
      },
    ],
    additionalInformation: {
      title: "Additional Information",
      description: 'For the implementation of a long-term investment strategy, gold is more suitable - its prices are growing slowly but steadily.',
      image: market_addition_metals,
    },
    toolTable: {
      title: "Tool table",
      iframeUrl: "https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Add%20tab%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22COMEX%3AGC1!%22%2C%22displayName%22%3A%22GOLD%20FUTURES%22%7D%2C%7B%22name%22%3A%22NYMEX%3APL1!%22%2C%22displayName%22%3A%22PLATINUM%20FUTURES%22%7D%2C%7B%22name%22%3A%22NYMEX%3APA1!%22%2C%22displayName%22%3A%22PALLADIUM%20FUTURES%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AIRDM%22%2C%22displayName%22%3A%22IRIDIUM%22%7D%2C%7B%22name%22%3A%22CURRENCYCOM%3AGOLD%22%2C%22displayName%22%3A%22GOLD%22%7D%2C%7B%22name%22%3A%22CURRENCYCOM%3ASILVER%22%2C%22displayName%22%3A%22SILVER%22%7D%2C%7B%22name%22%3A%22CURRENCYCOM%3APLATINUM%22%2C%22displayName%22%3A%22PLATINUM%22%7D%2C%7B%22name%22%3A%22CURRENCYCOM%3APALLADIUM%22%2C%22displayName%22%3A%22PALLADIUM%22%7D%2C%7B%22name%22%3A%22COMEX%3ASI1!%22%2C%22displayName%22%3A%22SILVER%20FUTURES%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22cmarketcap.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fmetals%22%7D",
    },
    tradingInstrumentTable: {
      title: "Trading instrument chart",
      iframeUrl: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_95c7e&symbol=CURRENCYCOM%3AGOLD&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=cmarketcap.com&utm_medium=widget&utm_campaign=chart&utm_term=CURRENCYCOM%3AGOLD#%7B%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fmetals%22%7D"
    }
  },

  {
    name: "stock",
    introduction: {
      title: "Stocks and bods market",
      description: "The main asset in this market are the securities of large companies.",
      image: market_stock,
    },
    advantages: [
      {
        name: "Strategic Opportunities",
        description: "Choose the most favorable ratio of risks and expected return on investment."
      },
      {
        name: "Low entry threshold",
        description: "A minimum financial investment is required to carry out commercial transactions."
      },
      {
        name: "Relative stability",
        description: "The value of shares of large companies has a relatively low volatility."
      },
      {
        name: "Investment prospects",
        description: "Earn in the industry by analyzing trends and the global economic situation."
      },
    ],
    additionalInformation: {
      title: "Additional Information",
      description: 'Shares of large companies are the most common investment tool.',
      image: market_addition_stock,
    },
    toolTable: {
      title: "Tool table",
      iframeUrl: "https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22STOCK%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22NASDAQ%3AAAPL%22%2C%22displayName%22%3A%22APPLE%20INC.%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ATSLA%22%2C%22displayName%22%3A%22TESLA%20INC.%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANFLX%22%2C%22displayName%22%3A%22NETFLIX%20INC.%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANVDA%22%2C%22displayName%22%3A%22NVIDIA%20CORPORATION%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AMSFT%22%2C%22displayName%22%3A%22MICROSOFT%20CORPORATION%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AAMZN%22%2C%22displayName%22%3A%22AMAZON.COM%20INC.%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AMETA%22%2C%22displayName%22%3A%22META%20PLATFORM%20INC.%22%7D%2C%7B%22name%22%3A%22NYSE%3ANKE%22%2C%22displayName%22%3A%22NIKE%20INC.%22%7D%2C%7B%22name%22%3A%22NYSE%3ATWTR%22%2C%22displayName%22%3A%22TWITTER%20INC.%22%7D%2C%7B%22name%22%3A%22NYSE%3AV%22%2C%22displayName%22%3A%22VISA%20INC.%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22cmarketcap.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fstock%22%7D",
    },
    tradingInstrumentTable: {
      title: "Trading instrument chart",
      iframeUrl: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_ec858&symbol=NASDAQ%3AAAPL&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=cmarketcap.com&utm_medium=widget&utm_campaign=chart&utm_term=NASDAQ%3AAAPL#%7B%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fstock%22%7D"
    }
  },
  {
    name: "products",
    introduction: {
      title: "Commodity exchange",
      description: "The main assets on the exchange are contracts for agricultural and energy raw materials.",
      image: market_products,
    },
    advantages: [
      {
        name: "CFD contracts",
        description: "Non-deliverable CFD contracts allow a trader to earn on price differences."
      },
      {
        name: "Diversification",
        description: "Invest in different types of assets and distribute investments to increase profitability."
      },
      {
        name: "Leverage",
        description: "The possibility of using leverage allows traders to invest small amounts."
      },
      {
        name: "Analytical Tools",
        description: "A competent analysis of environmental factors allows traders to qualitatively increase profits in the commodity market."
      },
    ],
    additionalInformation: {
      title: "Additional Information",
      description: 'Commodities include assets such as oil, gas, sugar, coffee, and so on.',
      image: market_addition_products,
    },
    toolTable: {
      title: "Tool table",
      iframeUrl: "https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22NASDAQ%3AOILSY%22%2C%22displayName%22%3A%22OIL%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AGASS%22%2C%22displayName%22%3A%22GAS%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANQCIWER%22%2C%22displayName%22%3A%22WHEAT%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANQCICER%22%2C%22displayName%22%3A%22CORN%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANQCI2CTER%22%2C%22displayName%22%3A%22COTTON%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANQCICCER%22%2C%22displayName%22%3A%22COCOA%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANQCISBER%22%2C%22displayName%22%3A%22SUGAR%22%7D%2C%7B%22name%22%3A%22NYSE%3ARONI%22%2C%22displayName%22%3A%22RICE%22%7D%2C%7B%22name%22%3A%22NASDAQ%3ANQUSB60101040%22%2C%22displayName%22%3A%22COAL%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22cmarketcap.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fproducts%22%7D",
    },
    tradingInstrumentTable: {
      title: "Trading instrument chart",
      iframeUrl: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_c626b&symbol=NYMEX%3ACL1!&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=cmarketcap.com&utm_medium=widget&utm_campaign=chart&utm_term=NYMEX%3ACL1!#%7B%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fproducts%22%7D"
    }
  },
  {
    name: "indicies",
    introduction: {
      title: "Stock Indices",
      description: "Stock indices are measured in coefficients and reflect the average value of securities of a number of companies grouped according to a certain attribute.",
      image: market_indicies,
    },
    advantages: [
      {
        name: "Stability",
        description: "Indices have low volatility, which minimizes the risks associated with changes in the value of assets."
      },
      {
        name: "Long term investment",
        description: "This trading tool is most often used to implement long-term investment strategies."
      },
      {
        name: "Diversification",
        description: "Stock indices are used by traders to diversify their investment portfolio."
      },
      {
        name: "Analytics",
        description: "The Crypto Trade platform provides a wide range of graphical and analytical tools."
      },
    ],
    additionalInformation: {
      title: "Additional Information",
      description: 'Stock indices are indicators of the state of the securities market.',
      image: market_addition_stock,
    },
    toolTable: {
      title: "Tool table",
      iframeUrl: "https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Indices%22%2C%22originalName%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22displayName%22%3A%22S%26P%20500%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22displayName%22%3A%22US%20100%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ADJI%22%2C%22displayName%22%3A%22Dow%2030%22%7D%2C%7B%22name%22%3A%22INDEX%3ANKY%22%2C%22displayName%22%3A%22Nikkei%20225%22%7D%2C%7B%22name%22%3A%22INDEX%3ADEU40%22%2C%22displayName%22%3A%22DAX%20Index%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3AUKXGBP%22%2C%22displayName%22%3A%22UK%20100%22%7D%2C%7B%22name%22%3A%22OANDA%3ADE30EUR%22%2C%22displayName%22%3A%22GERMANY%2030%22%7D%2C%7B%22name%22%3A%22BIST%3AXU100%22%2C%22displayName%22%3A%22BIST%20100%22%7D%2C%7B%22name%22%3A%22BLACKBULL%3ASPX500%22%2C%22displayName%22%3A%22SPX500%22%7D%2C%7B%22name%22%3A%22CAPITALCOM%3ANIFTY50%22%2C%22displayName%22%3A%22INDIA50%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22cmarketcap.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Findices%22%7D",
    },
    tradingInstrumentTable: {
      title: "Trading instrument chart",
      iframeUrl: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_e8296&symbol=CURRENCYCOM%3AUS30&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=cmarketcap.com&utm_medium=widget&utm_campaign=chart&utm_term=CURRENCYCOM%3AUS30#%7B%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Findices%22%7D"
    }
  },
  {
    name: "cryptocurrencies",
    introduction: {
      title: "Cryptocurrency exchange",
      description: "The cryptocurrency market is in demand due to the autonomy of the payment system and the anonymity of the operations performed and, as a result, the absence of tax fees.",
      image: market_crypto,
    },
    advantages: [
      {
        name: "Low investment threshold",
        description: "We provide users with the opportunity to apply for leverage and invest a small amount of initial capital."
      },
      {
        name: "Promising industry",
        description: "The cryptocurrency market is rapidly developing and is one of the most popular trading instruments."
      },
      {
        name: "Predictability",
        description: "Using various analytical methods, a trader studies the market trend and earns on price changes."
      },
      {
        name: "Inflation Protection",
        description: "Cryptocurrency is independent, limited in volume, it cannot be counterfeited or printed on paper."
      },
    ],
    additionalInformation: {
      title: "Additional Information",
      description: 'Cryptocurrency is a kind of digital currency, accounting for the internal units of account of which is provided by a decentralized payment system.',
      image: market_addition_crypto,
    },
    toolTable: {
      title: "Tool table",
      iframeUrl: "https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22cryptocurrencies%22%2C%22originalName%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22displayName%22%3A%22BTC%2FUSD%22%7D%2C%7B%22name%22%3A%22BITSTAMP%3AETHUSD%22%2C%22displayName%22%3A%22ETH%2FUSD%22%7D%2C%7B%22name%22%3A%22FTX%3ASOLUSD%22%2C%22displayName%22%3A%22SOLANA%2FUSD%22%7D%2C%7B%22name%22%3A%22COINBASE%3AMATICUSD%22%2C%22displayName%22%3A%22MATIC%2FUSD%22%7D%2C%7B%22name%22%3A%22FTX%3AATOMUSD%22%2C%22displayName%22%3A%22ATOM%2FUSD%22%7D%2C%7B%22name%22%3A%22BITTREX%3ADOGEUSD%22%2C%22displayName%22%3A%22DOGE%2FUSD%22%7D%2C%7B%22name%22%3A%22BITFINEX%3AADAUSD%22%2C%22displayName%22%3A%22CARDANO%2FUSD%22%7D%2C%7B%22name%22%3A%22BITFINEX%3ALTCUSD%22%2C%22displayName%22%3A%22LITECOIN%2FUSD%22%7D%2C%7B%22name%22%3A%22BITFINEX%3AWAVESUSD%22%2C%22displayName%22%3A%22WAVES%2FUSD%22%7D%2C%7B%22name%22%3A%22FTX%3ASHIBUSD%22%2C%22displayName%22%3A%22SHIB%2FUSD%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22cmarketcap.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fcryptocurrencies%22%7D",
    },
    tradingInstrumentTable: {
      title: "Trading instrument chart",
      iframeUrl: "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_c365b&symbol=BITSTAMP%3ABTCUSD&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=cmarketcap.com&utm_medium=widget&utm_campaign=chart&utm_term=BITSTAMP%3ABTCUSD#%7B%22page-uri%22%3A%22cmarketcap.com%2Fmarkets%2Fcryptocurrencies%22%7D"
    }
  },
]
export const confidenceCards: TypeConfidenceCard[] = [
  {
    count: "01",
    title: "Fast deposits and withdrawals",
    description: "Instant replenishment and withdrawal of funds directly on the day of receipt of a request from the Client"
  },
  {
    count: "02",
    title: "Favorable terms of service",
    description: " Our company offers various trading tariff plans that are comfortable for both beginners and pros "
  },
  {
    count: "03",
    title: "Fast deposits and withdrawals",
    description: "Instant replenishment and withdrawal of funds directly on the day of receipt of a request from the Client"
  },
  {
    count: "04",
    title: "Fast deposits and withdrawals",
    description: "Instant replenishment and withdrawal of funds directly on the day of receipt of a request from the Client"
  },
  {
    count: "05",
    title: "Fast deposits and withdrawals",
    description: "Instant replenishment and withdrawal of funds directly on the day of receipt of a request from the Client"
  },
  {
    count: "06",
    title: "Fast deposits and withdrawals",
    description: "Instant replenishment and withdrawal of funds directly on the day of receipt of a request from the Client"
  },

]

export const additionalCards: TypeAdditionalCard [] = [
  {
    title: "Convenient terminal trading interface",
    description: "Use the wide functionality of the platform to master new investment strategies"
  },
  {
    title: "Quality in everything and no exceptions",
    description: "Transparency of the platform, advanced technologies, the best conditions for participants - all this makes us unique"
  },
  {
    title: "Over 150 assets including popular stocks",
    description: " Use the wide functionality of the platform to master new investment strategies "
  },
]

export const accountCards: TypeAccountCard[] = [
  {
    href: "#",
    title: "Gold",
    description: " Universal option for a novice trader ",
    menuItems: [{
      text: "Minimum deposit",
      extraText: "$1 000",
    },
      {
        text: "Leverage",
        extraText: "1:5",
      },
      {
        text: "Instant execution",
      },
      {
        text: "Trading cryptocurrencies and metals",
        disabled: true,
      },
      {
        text: "Opening a personal PAMM account",
        disabled: true,
      },
      {
        text: "No swap",
        disabled: true,
      },
      {
        text: "Trading ETFs and Indices",
        disabled: true,
      },
      {
        text: "Deposit insurance",
        disabled: true,
      },
      {
        text: "Personal manager",
        disabled: true,
      },
    ]
  },
  {
    href: "#",
    title: "Platinum",
    selectedTitle: true,
    description: " Universal option for a novice trader ",
    menuItems: [{
      text: "Minimum deposit",
      extraText: "$25 000",
    },
      {
        text: "Leverage",
        extraText: "1:10",
      },
      {
        text: "Instant execution",
      },
      {
        text: "Trading cryptocurrencies and metals",
      },
      {
        text: "Opening a personal PAMM account",
      },
      {
        text: "No swap",
      },
      {
        text: "Trading ETFs and Indices",
        disabled: true,
      },
      {
        text: "Deposit insurance",
        disabled: true,
      },
      {
        text: "Personal manager",
        disabled: true,
      },
    ]
  },
  {
    href: "#",
    title: "Diamond",
    description: " Universal option for a novice trader ",
    menuItems: [{
      text: "Minimum deposit",
      extraText: "$50 000",
    },
      {
        text: "Leverage",
        extraText: "1:20",
      },
      {
        text: "Instant execution",
      },
      {
        text: "Trading cryptocurrencies and metals",
      },
      {
        text: "Opening a personal PAMM account",
      },
      {
        text: "No swap",
      },
      {
        text: "Trading ETFs and Indices",
      },
      {
        text: "Deposit insurance",
      },
      {
        text: "Personal manager",
      },
    ]
  },
]


export const stepsCards: TypeStepCard [] = [
  {
    number: '1',
    primaryText: 'Register,',
    text: ' take your first step to trading!',
    description: ' On the registration page, you need to provide basic contact details in order to go to the trading terminal '
  },
  {
    number: '2',
    primaryText: 'Top up your balance',
    text: '  in any convenient way',
    description: ' Replenishment of a personal account without commission is carried out directly in the personal account of the trading terminal '
  },
  {
    number: '3',
    primaryText: 'Start trading',
    text: '',
    description: '  Immediately after the receipt of funds to the personal account, all the functionality of the trading platform will be available  '
  },
]

export const partnersCards = [
  {
    image: company1
  },
  {
    image: company2
  },
  {
    image: company3
  },
  {
    image: company4
  },
  {
    image: company5
  },
  {
    image: company6
  },
  {
    image: company7
  },
]

export const statsCards: TypeStatsCard [] = [
  {
    name: "110 000",
    description: "Open accounts"
  },
  {
    name: "385 000",
    description: "Trading operations per day"
  },
  {
    name: "150+",
    description: "Trading instruments"
  },
  {
    name: "$50 million",
    description: "Daily trading volume"
  },
  {
    name: "11",
    description: "Years of activity"
  },

]

const fireBase = {
  projectId: 'startcryptotrade.ts-a5ee6',
  appId: '1:141890926260:web:3530956aa53bf9762f09e1',
  storageBucket: 'startcryptotrade.ts-a5ee6.appspot.com',
  apiKey: 'AIzaSyBOXizKzEDHVDc0fYRAwQC3NCe07WYyW3Y',
  authDomain: 'startcryptotrade.ts-a5ee6.firebaseapp.com',
  messagingSenderId: '141890926260',
  measurementId: 'G-KP5H40GDBQ',
}

export {banner1, image1, image2, image3, logoSrcHover, logoSrc, fireBase}
