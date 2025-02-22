function convertNum(num){
    var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var numString = num.toString();
    if (num < 0) throw new Error('Negative numbers are not supported.');
    if (num === 0) return 'Zero';
    //1 - 19
    if (num < 20) {
      return capLetter(ones[num]);
    }
    //20 - 99
    if (numString.length === 2) {
      return capLetter(tens[numString[0]] + ' ' + ones[numString[1]]);
    }
    //100 - 999
    if (numString.length === 3) {
      if (numString[1] === '0' && numString[2] === '0')
        return capLetter(ones[numString[0]] + ' hundred');
      else
        return capLetter(ones[numString[0]] + ' hundred and ' + convertNum(+(numString[1] + numString[2])));
    }
    //1000 - 9999
    if (numString.length === 4) {
      var end = +(numString[1] + numString[2] + numString[3]);
      if (end === 0) return capLetter(ones[numString[0]] + ' thousand');
      if (end < 100) return capLetter(ones[numString[0]] + ' thousand and ' + convertNum(end));
      return capLetter(ones[numString[0]] + ' thousand ' + convertNum(end));
    }
    //10,000 - 999,000
    if (numString.length > 4 && numString.length < 7){
        var start = numString.substring(0, numString.length - 3);
        var end = parseInt(numString.substring(numString.length - 3, numString.length));
        if (end === 0) return capLetter(convertNum(start) + ' thousand');
        if (end < 100) return capLetter(convertNum(start) + ' thousand and ' + convertNum(end));
        return capLetter(convertNum(start) + ' thousand ' + convertNum(end));
    }
}

function formatArrList(arr) {
  if (arr.length === 0) {
    return ""
  }else if(arr.length === 1){
    return arr[0]
  }else if(arr.length === 2){
    return arr[0] + " and " + arr[1]
  }else{
    var output = arr[0];
    for (let i = 1; i < arr.length - 1; i++) {
      output = output + ", " + arr[i]
    }
    output = output + ", and " + arr[arr.length - 1]
    return output;
  }
}

function displayStandardForm(number) {
  const scientificNotation = number.toExponential().split('e');
  const coefficient = parseFloat(scientificNotation[0]);
  const exponent = parseInt(scientificNotation[1]);
  return `${coefficient} x 10<sup>${exponent}</sup> `;
}

function getRandomList(n, x, y) { //Num of values, Min, Max
  if (y - x + 1 < n) return [];
  var randomList = [];
  var availableNumbers = Array.from({ length: y - x + 1 }, (_, index) => x + index);
  for (var i = 0; i < n; i++) {
    var randomIndex = Math.floor(Math.random() * availableNumbers.length);
    var selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
    randomList.push(selectedNumber);
  }
  return randomList;
}