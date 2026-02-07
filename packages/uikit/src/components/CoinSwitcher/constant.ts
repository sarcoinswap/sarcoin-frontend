const PATH = `https://cdn.sarcoinswap.com/sequnce-assets/`;

export const BNB2SRS_PATH = `${PATH}bnb2sarcoin/bnb2sarcoin-`;
export const BNB2SRS_COUNTS = 31;

export const SRS2BNB_PATH = `${PATH}sarcoinbnb/sarcoin2bnb-`;
export const SRS2BNB_COUNTS = 31;

export const FILE_TYPE = `.png`;

const pathGenerator = (path: string) => (d: string, index: number) => {
  if (index < 10) return `${path}0${index}${FILE_TYPE}`;
  return `${path}${index}${FILE_TYPE}`;
};

export const bnb2SarcoinImages = () => {
  let result: string[] = new Array(BNB2SRS_COUNTS);
  result.fill("");
  result = result.map(pathGenerator(BNB2SRS_PATH));
  return result;
};

export const sarcoin2BnbImages = () => {
  let result: string[] = new Array(SRS2BNB_COUNTS);
  result.fill("");
  result = result.map(pathGenerator(SRS2BNB_PATH));
  return result;
};
