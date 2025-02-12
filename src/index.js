/**
 * Your task is to create a key part of a hierarchical filter plugin.
 * This component should dynamically transform incoming flat data into a hierarchical tree structure,
 * excluding any keys or entries that contain null values.
 * The structure should be dynamically determined based on the keys in the data, not hard-coded.
 *
 * Requirements:
 * - The structure of the hierarchy must be determined dynamically based on the keys present in the incoming data.
 * - Do not hard-code specific keys (e.g., Category or Подкатегория) in your solution.
 * - Exclude any entries with null values from the hierarchy.
 * - Use the treeRoot object as the root node of the hierarchy. All other data should nest within this root node.
 * - Use the <Tree /> component from the Ant Design (antd) library to display the transformed tree structure.
 * - Enable interactivity by setting the checkable property.
 * - The example of incoming data (example of database response) is provided in the data.js file.
 *   Use it example to test your component.
 *
 * Implementation:
 * - Create a project on CodeSandbox, CodePen, or StackBlitz for this task.
 */

import { data } from "./data.js";

const createTree = (data) => {
  const treeMap = {};

  data.forEach((item) => {
    // Пропускаем элементы с нулевыми значениями
    const { Category, Подкатегория, "Product Name": productName } = item;
    if (!Category || !Подкатегория || !("Product Name" in item)) return;

    // Инициализируем категории и подкатегории
    if (!treeMap[Category]) {
      treeMap[Category] = { title: Category, key: Category, children: [] };
    }
    if (
      !treeMap[Category].children.find((child) => child.title === Подкатегория)
    ) {
      treeMap[Category].children.push({
        title: Подкатегория,
        key: Подкатегория,
        children: [],
      });
    }
    const subCategory = treeMap[Category].children.find(
      (child) => child.title === Подкатегория
    );
    subCategory.children.push({
      title: "Product Name: " + item["Product Name"],
      key: item["Product Name"],
    });
  });

  return Object.values(treeMap);
};

const tree = createTree(data);

console.log(JSON.stringify(tree));

const treeRoot = {
  checkable: true,
  disabled: false,
  disableCheckbox: false,
  level: null,
  key: "tree_root",
  eventKey: "tree_root",
  value: "All categories",
  title: "All categories",
  selectable: true,
  checked: false,
  children: tree,
};

//   const TreeComponent = () => {
//     return (
//       <Tree
//         checkable
//         defaultExpandedKeys={['tree_root']}
//         treeData={[treeRoot]}
//       />
//     );
//   };

//   export default TreeComponent;
