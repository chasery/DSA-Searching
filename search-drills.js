const BinarySearchTree = require('./BinarySearchTree');
const Queue = require('./Queue');

/* 1. How many searches?
  a. 3x to get 8
    [3, 5, 6, 8, 11, 12, 14, 15, 17, 18]
    [3, 5, 6, 8, 11]
    [6, 8, 11] -- Returns 8
  b. 
    [3, 5, 6, 8, 11, 12, 14, 15, 17, 18]
    [..., 12, 14, 15, 17, 18]
    [..., 15, 17, 18]
    [15, 17]
    [15] -- Returns -1
*/

// 3. Find a book
function bookSearch(deweyDec, title, start, end) {
  start = start === undefined ? 0 : start;
  end = end === undefined ? deweyDec.length : end;
  if (start > end) {
    return -1;
  }
  const index = Math.floor((start + end) / 2);
  const middle = deweyDec[index];
  for (let i = 0; i < deweyDec.length; i++) {
    if (deweyDec[i] === title) {
      return `Book found: ${title}`;
    }
    if (middle < deweyDec) {
      return bookSearch(deweyDec, title, index + 1, end);
    } else if (middle > deweyDec) {
      return bookSearch(deweyDec, title, index - 1);
    }
  }
  return `Book Not found`;
}

/* 4. Searching in a BST
    In-Order Traversal: 14 15 19 25 27 35 79 89 90 91
    Pre-Order Traversal: 35 25 15 14 19 27 89 79 91 90
    Answer: Post-Order Traversal: 14, 15, 19, 27, 25, 79, 90, 89, 35
                    35
                   /   \
                  25   89
                 / \    / \
               15  27  79  91
              / \         /  
            14  19       90
    Post-Order Traversal: 5 7 6 9 11 10 8.
    Answer: Pre-Order Traversal: 8, 6, 5, 7, 10, 9, 11
                    8
                  /  \
                 6   10
                / \  /  \
               5  7  9  11
*/

// 5. Implement Tree Traversals
const BST = new BinarySearchTree();
const treeData = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];

function dataFill(arr, bst) {
  let tree = bst;
  for (let i = 0; i < arr.length; i++) {
    tree.insert(arr[i], arr[i]);
  }
  return tree;
}

// dataFill(treeData, BST);

function preOrder(bst) {
  let node = bst;
  console.log(node.key);
  if (node.left) {
    preOrder(node.left);
  }
  if (node.right) {
    preOrder(node.right);
  }
}
// console.log("Pre-order");
// preOrder(BST);

function postOrder(bst) {
  let node = bst;
  if (node.left) {
    postOrder(node.left);
  }
  if (node.right) {
    postOrder(node.right);
  }
  console.log(node.key);
}
// console.log("Post-order");
// postOrder(BST);

function inOrder(bst) {
  let node = bst;
  if (node.left) {
    inOrder(node.left);
  }
  console.log(node.key);
  if (node.right) {
    postOrder(node.right);
  }
}
// console.log("In-Order");
// inOrder(BST);

// 6. Next Commanding Officer
const StarCommandTree = new BinarySearchTree();

StarCommandTree.insert(5, 'Captain Picard');
StarCommandTree.insert(3, 'Commander Riker');
StarCommandTree.insert(6, 'Commander Data');
StarCommandTree.insert(8, 'Lt. Cmdr. Crusher');
StarCommandTree.insert(7, 'Lieutenant Selar');
StarCommandTree.insert(2, 'Lt. Cmdr. Worf');
StarCommandTree.insert(4, 'Lt. Cmdr. LaForge');
StarCommandTree.insert(1, 'Lt. Security-Officer');

function nextInCommand(tree, result = []) {
  const CommanderQueue = new Queue();
  CommanderQueue.enqueue(tree);
  while (CommanderQueue.first !== null) {
    const node = CommanderQueue.dequeue();
    result.push(node.value);
    if (node.left) {
      CommanderQueue.enqueue(node.left);
    }
    if (node.right) {
      CommanderQueue.enqueue(node.right);
    }
  }
  result.forEach((officers) => console.log(officers));
}

//nextInCommand(StarCommandTree);

// 7. Max Profit
function maxProfit(array) {
  let maxProfit = array[0] - array[1];
  let buyInDay = 0;
  for (let i = 0; i < array.length; i++) {
    let dayProfit = array[i - 1] - array[i];
    if (dayProfit > maxProfit) {
      maxProfit = dayProfit;
      buyInDay = i - 1;
    }
  }
  return `If you buy on Day ${buyInDay}, you will make a profit of ${maxProfit}`;
}

// let weekOne = [128, 97, 121, 123, 98, 97, 105];
// console.log(maxProfit(weekOne));
