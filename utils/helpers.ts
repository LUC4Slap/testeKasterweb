export function CPFMask(v: string) {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})[^"]*/, '$1-$2');
  return v;
}

export const CNPJMask = (v: string) => {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  v = v.replace(/(\d{4})(\d{2})[^"]*/, '$1-$2');
  return v;
};

export function PhoneMask(v: string) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '$1$2');
  v = v.replace(/^(\d{2})(\d{1})(\d)/, '($1) $2 $3');
  v = v.replace(/(\d{4})(\d{4})[^"]*/, '$1-$2');
  return v;
}

export function RegularPhoneMask(v: string) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '$1$2');
  v = v.replace(/^(\d{2})(\d{1})(\d)/, '($1) $2$3');
  v = v.replace(/(\d{4})(\d)/, '$1-$2');
  return v;
}

export function DateMask(v: string) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '$1/$2');
  v = v.replace(/(\d{2})(\d)/, '$1/$2');
  v = v.replace(/(\d{4})[^"]*/, '$1');
  return v;
}

const BLACKLIST: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const STRICT_STRIP_REGEX: RegExp = /[-\\/.]/g;
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g;

export const strip = (number: string, strict?: boolean): string => {
  const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (number || '').replace(regex, '');
};

export const verifierDigit = (digits: string): number => {
  let index: number = 2;
  const reverse: Array<number> = digits
    .split('')
    .reduce((buffer: number[], number) => {
      return [parseInt(number, 10)].concat(buffer);
    }, []);

  const sum: number = reverse.reduce((buffer, number) => {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod: number = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

export const isCNPJValid = (number: string, strict?: boolean): boolean => {
  const stripped: string = strip(number, strict);

  if (!stripped) {
    return false;
  }

  if (stripped.length !== 14) {
    return false;
  }

  if (BLACKLIST.includes(stripped)) {
    return false;
  }

  let numbers: string = stripped.substring(0, 12);
  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return numbers.substring(-2) === stripped.substring(-2);
};

//Autor: https://github.com/tiagoporto/gerador-validador-cpf

export const hasCPFLength = (cpf: string): void | boolean => {
  if (cpf.length > 11 || cpf.length < 11) {
    return false;
  }

  return true;
};

export const allDigitsAreEqual = (digits: string): boolean => {
  for (let i = 0; i < 10; i++) {
    if (digits === new Array(digits.length + 1).join(String(i))) {
      return true;
    }
  }

  return false;
};

export const calcFirstChecker = (firstNineDigits: string): number => {
  let sum = 0;

  for (let i = 0; i < 9; ++i) {
    sum += Number(firstNineDigits.charAt(i)) * (10 - i);
  }

  const lastSumChecker = sum % 11;
  return lastSumChecker < 2 ? 0 : 11 - lastSumChecker;
};

export const calcSecondChecker = (cpfWithChecker1: string): number => {
  let sum = 0;

  for (let i = 0; i < 10; ++i) {
    sum += Number(cpfWithChecker1.charAt(i)) * (11 - i);
  }

  const lastSumChecker2 = sum % 11;
  return lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;
};

export const isCPFValid = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  const cleanCPF = String(value).replace(/[\s.-]/g, '');
  const firstNineDigits = cleanCPF.slice(0, 9);
  const checker = cleanCPF.slice(9, 11);

  if (!hasCPFLength(cleanCPF) || allDigitsAreEqual(cleanCPF)) {
    return false;
  }

  const checker1 = calcFirstChecker(firstNineDigits);
  const checker2 = calcSecondChecker(`${firstNineDigits}${checker1}`);

  return checker === `${checker1}${checker2}`;
};

export function isEmailValid(email: string) {
  const valid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return valid.test(email);
}

export const pipe =
  (...fns: any[]) =>
    (x: any) =>
      fns.reduce((v, f) => f(v), x);

export const compose =
  (...fns: any[]) =>
    (x: any) =>
      fns.reduceRight((v, f) => f(v), x);

export const formatDateTime = (timestamp: string) => {
  const onlyNumbers = timestamp.replace(/\D/g, '');
  const sliced = onlyNumbers.slice(0, 14);
  const formatted = sliced.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
  return formatted;
};

export const splitUserInput = (input: string) => input.split('/').map(elem => parseInt(elem, 10));

export const setDateFromIntegers = (args: number[]) => {
  const finalDate = new Date();
  const timeOffset = 1;
  finalDate.setDate(args[0]);
  finalDate.setMonth(args[1] - timeOffset);
  finalDate.setFullYear(args[2]);
  return finalDate;
};