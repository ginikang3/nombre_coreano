// src/lib/converter.ts

const SPECIAL_NAMES: { [key: string]: string } = {
  "marcus": "마르쿠스",
  "julia": "율리아",
  "augustus": "아우구스투스",
  "jesus": "헤수스",
};

const COMPLEX_RULES: { [key: string]: string } = {
  "lla": "야", "lle": "예", "lli": "이", "llo": "요", "llu": "유",
  "cha": "차", "che": "체", "chi": "치", "cho": "초", "chu": "추",
  "que": "케", "qui": "키",
  "ge": "헤", "gi": "히", "ja": "하", "je": "헤", "ji": "히", "jo": "호", "ju": "후"
};

const CONSONANTS: { [key: string]: string } = {
  "b": "ㅂ", "c": "ㅋ", "d": "ㄷ", "f": "ㅍ", "g": "ㄱ",
  "h": "ㅎ", "j": "ㅎ", "k": "ㅋ", "l": "ㄹ", "m": "ㅁ",
  "n": "ㄴ", "p": "ㅍ", "q": "ㅋ", "r": "ㄹ", "s": "ㅅ",
  "t": "ㅌ", "v": "ㅂ", "w": "ㅇ", "x": "ㅅ", "y": "ㅇ", "z": "ㅈ"
};

const VOWELS: { [key: string]: string } = {
  "a": "ㅏ", "e": "ㅔ", "i": "ㅣ", "o": "ㅗ", "u": "ㅜ"
};

// 받침으로 사용될 때의 한글 자모 인덱스
const JONGSEONG_MAP: { [key: string]: string } = {
  "n": "ㄴ", "m": "ㅁ", "l": "ㄹ", "r": "ㄹ", "s": "ㅅ"
};

const combineHangul = (cho: string, jung: string, jong: string = ""): string => {
  const choBase = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
  const jungBase = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
  const jongBase = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  
  const choIdx = choBase.indexOf(cho);
  const jungIdx = jungBase.indexOf(jung);
  const jongIdx = jongBase.indexOf(jong);

  if (choIdx === -1 || jungIdx === -1) return cho + jung + (jong || "");
  
  return String.fromCharCode((choIdx * 588) + (jungIdx * 28) + (jongIdx === -1 ? 0 : jongIdx) + 44032);
};

export const convertLatinToKorean = (name: string): string => {
  if (!name) return "";
  const lower = name.trim().toLowerCase();
  if (SPECIAL_NAMES[lower]) return SPECIAL_NAMES[lower];

  let result = "";
  let i = 0;

  while (i < lower.length) {
    const char1 = lower[i];
    const nextChar = lower[i + 1];
    const nextNextChar = lower[i + 2];
    const nextNextNextChar = lower[i + 3];

    // 1. 복합 규칙 (3글자 우선)
    const char3 = lower.substring(i, i + 3);
    const char2 = lower.substring(i, i + 2);

    if (COMPLEX_RULES[char3]) {
      result += COMPLEX_RULES[char3];
      i += 3;
      continue;
    } 
    
    if (COMPLEX_RULES[char2]) {
      result += COMPLEX_RULES[char2];
      i += 2;
      continue;
    }

    // 2. 자음 + 모음 조합
    if (CONSONANTS[char1] && nextChar && VOWELS[nextChar]) {
      // 다음 글자가 자음이고, 그 다음 글자가 모음이 아니면 받침으로 가져옴 (예: Juan의 n)
      if (nextNextChar && CONSONANTS[nextNextChar] && (!nextNextNextChar || !VOWELS[nextNextNextChar]) && JONGSEONG_MAP[nextNextChar]) {
        result += combineHangul(CONSONANTS[char1], VOWELS[nextChar], JONGSEONG_MAP[nextNextChar]);
        i += 3;
      } else {
        result += combineHangul(CONSONANTS[char1], VOWELS[nextChar]);
        i += 2;
      }
    }
    // 3. 모음 단독 (예: Ana의 A)
    else if (VOWELS[char1]) {
      // 모음 뒤에 받침이 올 수 있는 경우 (예: Antonio의 n)
      if (nextChar && CONSONANTS[nextChar] && (!nextNextChar || !VOWELS[nextNextChar]) && JONGSEONG_MAP[nextChar]) {
        result += combineHangul("ㅇ", VOWELS[char1], JONGSEONG_MAP[nextChar]);
        i += 2;
      } else {
        result += combineHangul("ㅇ", VOWELS[char1]);
        i++;
      }
    }
    // 4. 자음 단독 (예: Carlos의 r, s)
    else if (CONSONANTS[char1]) {
      result += combineHangul(CONSONANTS[char1], "ㅡ");
      i++;
    } 
    else {
      result += char1;
      i++;
    }
  }
  return result;
};