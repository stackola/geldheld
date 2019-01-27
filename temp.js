let items = [
  { chance: 20, name: "500", order: 0 },
  { chance: 20, name: "LED", order: 1 },
  { chance: 20, name: "1500", order: 2 },
  { chance: 20, name: "2500", order: 3 },
  { chance: 20, name: "5000", order: 4 }
];

let convertedItems = items
  .map(i => {
    return { ...i, chance: i.chance / 100 };
  })
  .sort((a, b) => a.order - b.order);

console.log(convertedItems);

// ohne ober ende!
let winValue = Math.random();
let origWinValue = winValue;
let winningItem = null;
for (let x = 0; x < convertedItems.length; x++) {
  let i = convertedItems[x];
  winValue -= i.chance;
  if (winValue < 0) {
    console.log("found winner!");
    winningItem = i;
    break;
  }
}

if (!winningItem) {
  winningItem = convertedItems[convertedItems.length - 1];
}

console.log(origWinValue, winningItem);
