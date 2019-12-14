// traverse trees via recursion.

const BinarySearchTree = require("./bst");

const BST = new BinarySearchTree();

BST.insert(3, 3);
BST.insert(1, 1);
BST.insert(4, 4);
BST.insert(6, 6);
BST.insert(9, 9);
BST.insert(2, 2);
BST.insert(5, 5);
BST.insert(7, 7);

// 1. draw binary tree
//         3
//      /     \
//    1         4
//      \        \
//        2       6
//              /   \
//             5      9
//                   /
//                  7

// Inserting strings

// BST.insert("E", "E");
// BST.insert("A", "A");
// BST.insert("S", "S");
// BST.insert("Y", "Y");
// BST.insert("Q", "Q");
// BST.insert("U", "U");
// BST.insert("E", "E");
// BST.insert("S", "S");
// BST.insert("T", "T");
// BST.insert("I", "I");
// BST.insert("O", "O");
// BST.insert("N", "N");

// console.log(BST);

//                                    E
//                                /       \
//                              A           S
//                                        /   \
//                                      Q       Y
//                                    /       /
//                                  E        U
//                                   \      /
//                                     I   S
//                                      \   \
//                                       O   T
//                                      /
//                                     N

// 2. Root removed - replaces deleted with minimum value on right subtree. Just 1 level.

//          4
//        /   \
//      1       6
//        \    /  \
//         2  5    9
//                /
//               7
//

// 3,1,4,6,9,2,5,7

// function display(tree) {
//   if (tree) {
//     console.log(tree.value);
//     display(tree.left);
//     display(tree.right);
//   }
// }

// display(BST);

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

// console.log(tree(BST));
// adds up all the values in the tree.

// Find height of the binary tree.
function height(t, counter = 0) {
  if (!t) {
    return 0;
  }
  counter++;
  let left = counter;
  let right = counter;
  if (t.left) left = height(t.left, counter);
  if (t.right) right = height(t.right, counter);

  return left > right ? left : right;
}

// ALTERNATIVE SOLUTIONS:
// function heightOfBST(bst) {
//   let leftHeight = 0;
//   let rightHeight = 0;
//   if (!bst) {
//     return 0;
//   } else {
//     leftHeight = heightOfBST(bst.left);
//     rightHeight = heightOfBST(bst.right);
//     if (leftHeight > rightHeight) {
//       return leftHeight + 1;
//     } else {
//       return rightHeight + 1;
//     }
//   }
// }

// // REVIEW: Alternative solutions
// function bst_height1(tree) {
//   return (
//     Math.max(
//       tree.left && bst_height1(tree.left),
//       tree.right && bst_height1(tree.right)
//     ) + 1
//   );
// }

// function bst_height2(tree) {
//   if (tree.left && tree.right)
//     return Math.max(bst_height2(tree.left), bst_height2(tree.right)) + 1;
//   if (tree.left) return bst_height2(tree.left) + 1;
//   if (tree.right) return bst_height2(tree.right) + 1;
//   return 1;
// }

// console.log(height(BST));

// Is it a Tree?

// everything to the left must be smaller than root, and everything to right must be larger.
// all left must be smaller than parent, and all right must be larger than parent
// determine what is max for each recursive call and what is min
// the min is the item on the left, the max is the item on the right, and current is the parent.

function isBST(curNode, minval = null, maxval = null) {
  if (!curNode) {
    // An empty BST is still a valid BST.
    return true;
  }
  // is left lower than right
  return (
    (minval == null || minval <= curNode.value) &&
    (maxval == null || maxval >= curNode.value) &&
    // minval represents the previous
    isBST(curNode.left, minval, curNode.value) &&
    isBST(curNode.right, curNode.value, maxval)
  );
}

//         3
//      /     \
//    1         4
//      \        \
//        2       6
//              /   \
//             5      9
//                   /
//                  7

// 3, null, null
// 1, null, 3 --> maxVal = 3 > curVal = 1
// 4, 3, null --> minVal = 3 < curVal = 4
// console.log(isBST(BST));

// 3rd Largest Node

// From the root, check if at least 2 values on the right side. If so, root is the 3rd largest.
// if there aren't 2 values, then check

// Restate the question and ask clarifying questions.
// Write out some edge cases
// Make assumptions
// Know which data structure to use
// Talk about our solution or approach
// Write pseudocode or actual code

// 1. Find the Nth largest value in a given binary search tree.

function largestA(t, largest = []) {
  if (!t) {
    return false;
  }
  largest.push(t.key);
  if (t.left) largest = largestA(t.left, largest);
  if (t.right) largest = largestA(t.right, largest);
  return largest;
}

// returns all numbers = [ 3, 1, 2, 4, 6, 5, 9, 7 ]

function returnNthLargest(t, n) {
  let sorted = largestA(t).sort((a, b) => a < b);
  return sorted[n - 1];
}

// console.log(returnNthLargest(BST, 3));

// 8. Balanced BST
// Write an algorithm that checks if a BST is balanced
// (i.e., a tree where no 2 leaves differ in distance from the root by more than 1).

// balanced tree
//          10
//        /    \
//      7        14
//     / \         \
//    1   8         20
//  /
// 5
// left is only taller by 1. But not more than once. So balanced

// Unbalanced tree =

//            1
//              \
//                5
//                  \
//                    7
// Above is 2 leaves taller than he left side.

function balanced(t, count = 0) {
  if (!t) {
    return count;
  }

  if (t !== null) {
    count++;
    let left = 0;
    let right = 0;
    //traverse right count nodes until null.  return bounce
    right = balanced(t.right, count);
    if (right === false) {
      return false;
    }
    //traverse left counting nodes
    left = balanced(t.left, count);
    if (left === false) {
      return false;
    }
    //if left or right is greater by more than 1, true, else false
    return Math.abs(left - right) > 1 ? false : right + left;
  }

  //if the differnce between right and left is not greater than 1, return count.
}

// console.log(balanced(BST));

/* Are they the same BSTs?
// Rules: Don't construct the BST
// arr1: [3, 5, 4, 6, 1, 0, 2]
// arr2: [3, 1, 5, 2, 4, 6, 0]
 expected output: true
*/

let arr1 = [3, 5, 4, 6, 1, 0, 2];
let arr2 = [3, 1, 5, 2, 4, 6, 0];

function sameBSTs(arr1, arr2) {
  // works better with arrLength, index1, index2 as extra params
  // index1 === arrLength
  // base case
  if (arr1[0] !== arr2[0]) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  if (arr1.length === 1 && arr2.length === 1) {
    return true;
  }
  let root = arr1[0];
  // make sure both BSTs are the same height
  // if a child is < root then apply recursive fn on left child for node comparison
  // if a child is > root then apply recursive fn on right child for node comparison
  let leftArray1 = [];
  let rightArray1 = [];
  let leftArray2 = [];
  let rightArray2 = [];
  for (let i = 1; i < arr1.length; i++) {
    if (arr1[i] < root) {
      leftArray1.push(arr1[i]);
    } else if (arr1[i] > root) {
      rightArray1.push(arr1[i]);
    }
    if (arr2[i] < root) {
      leftArray2.push(arr2[i]);
    } else if (arr2[i] > root) {
      rightArray2.push(arr2[i]);
    }
  }
  return sameBSTs(leftArray1, leftArray2) && sameBSTs(rightArray1, rightArray2);
}

console.log(sameBSTs(arr1, arr2));
