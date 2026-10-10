export type AccountSummary = {
  mainBalance: string;
  /** Full account number — rendered masked / grouped in fours. */
  accountNumber: string;
  creditSpentLabel: string;
  creditUsedPct: number;
  /** Cardholder / anchor name shown on the debit card. */
  holderName: string;
  /** Product type label (rendered in the top-right badge). */
  productType: string;
  /** Available credit shown on the card's bottom-right. */
  availableCredit: string;
};

export const accountSummary: AccountSummary = {
  mainBalance: '$73,300',
  accountNumber: '4921 7764 2203 8847',
  creditSpentLabel: '$2,000 credit spent',
  creditUsedPct: 42,
  holderName: 'Alexander Grayson',
  productType: 'SCF FLEXI TL',
  availableCredit: '$71,300',
};
