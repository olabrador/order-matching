// Function to introduce typos
export default function typoGenerator(str: string) {
  let modifiedStr = str;
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * modifiedStr.length);
    const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    modifiedStr = modifiedStr.substring(0, index) + char + modifiedStr.substring(index + 1);
  }
  console.log({ str, modifiedStr });
  return modifiedStr;
}
