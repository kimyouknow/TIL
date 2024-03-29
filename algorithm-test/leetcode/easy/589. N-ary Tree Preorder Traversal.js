/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  const answer = [];

  const travel = (node) => {
    if (!node) return;
    answer.push(node.val);
    node.children.forEach((child) => {
      travel(child);
    });
  };

  travel(root);

  return answer;
};
