export type TypeLinkText = {
  title: string,
  href: string,
}
export type TypeNavItem = TypeLinkText & {
  items?: TypeLinkText []
}
export type TypeSecondary = { secondary?: boolean }

export type TypeIntroduction = {
  title: string,
  description: string,
  image: string
}
export type TypeConfidenceCard = {
  count: string
  title: string
  description: string
}

export type TypeAdditionalCard = {
  title: string,
  description: string
};

export type TypeAccountMenuItem = {
  text: string,
  extraText?: string,
  disabled?: boolean
}

export type TypeAccountCard = {
  href: string,
  title: string,
  selectedTitle?: boolean,
  description: string,
  menuItems: TypeAccountMenuItem []
}

export type TypeStepCard = {
  number: string,
  primaryText: string,
  text: string,
  description: string,
}

export type TypeStatsCard = {
  name: string,
  description: string,
}

export type TypePartnerSlide = {
  image: string
}

export type TypeToolCard = {
  iframeUrl: string,
  title: string,
}

export type UserModel = {
  sBalance_Demo?: string
  bDemoAccount?: boolean
  sProfilePhoto?: string
  id: string
  sBalance: string
  sEmail: string
  sName: string
  sNumber: string
  sSurname: string
  bVerificationDocumentsSubmitted: boolean
  sVerificationConfirmed: string
  oVerificationDocuments: any
  _id: string
}

export type TypeMarketPage = {
  name: string,
  introduction: TypeIntroduction,
  additionalInformation: TypeIntroduction,
  advantages: TypeStatsCard [],
  toolTable: TypeToolCard,
  tradingInstrumentTable: TypeToolCard
}
