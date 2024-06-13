// Function to introduce typos
export default function typoGenerator(str: string) {
  const index = Math.floor(Math.random() * str.length);
  const char = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase letter
  return str.substring(0, index) + char + str.substring(index + 1);
}
