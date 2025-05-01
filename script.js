const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

//creates a reverse mapping from numbers to letters
//to decode the numbers back to letters
const numberToLetter = Object.fromEntries(
  Object.entries(letterToNumber).map(([k, v]) => [v, k])
);

// Function to add noise to the array
// adds 1-3 random numbers (27-76) to the array
function addNoise(arr) {
  const noiseArray = arr.slice();
  const noiseCount = Math.floor(Math.random() * 3) + 1; // 1-3 noise elements
  for (let i = 0; i < noiseCount; i++) {
    const noiseValue = Math.floor(Math.random() * 50) + 27; // Numbers 27+ are fake
    noiseArray.push(noiseValue);
  }
  return noiseArray;
}

function zipperArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  const result = [];
  let toggle = true;

  while (left <= right) {
    if (toggle) {
      result.push(arr[left++]);
    } else {
      result.push(arr[right--]);
    }
    toggle = !toggle;
  }

  return result;
}

function unzipZipperedArray(arr) {
  const result = new Array(arr.length);
  let left = 0;
  let right = arr.length - 1;
  let i = 0;
  let toggle = true;

  while (left <= right) {
    if (toggle) {
      result[left++] = arr[i++];
    } else {
      result[right--] = arr[i++];
    }
    toggle = !toggle;
  }

  return result;
}

function convertText() {
  const input = document.getElementById("textInput").value.toLowerCase();
  const numberArray = [];

  for (let char of input) {
    if (char === " ") {
      numberArray.push(" ");
    } else if (letterToNumber[char]) {
      numberArray.push(letterToNumber[char]);
    }
  }

  const withNoise = addNoise(numberArray);
  const reversed = withNoise.reverse();
  const zippered = zipperArray(reversed);

  document.getElementById("output").textContent = JSON.stringify(zippered);
}

function decodeArray() {
  try {
    const raw = document.getElementById("arrayInput").value;
    const arr = JSON.parse(raw);
    const unzipped = unzipZipperedArray(arr);
    const originalOrder = unzipped.reverse();
    let decoded = "";

    for (let item of originalOrder) {
      if (item === " ") {
        decoded += " ";
      } else if (numberToLetter[item]) {
        decoded += numberToLetter[item];
      }
      // skip noise
    }

    document.getElementById("decodedOutput").textContent = decoded;
  } catch (e) {
    document.getElementById("decodedOutput").textContent =
      "Invalid array input!";
  }
}
