import React from "react";
import { Tree } from "antd";
import { data } from "./data.js";

const KEYS = {
  CATEGORY: "Category",
  SUBCATEGORY: "Подкатегория",
  PRODUCT_NAME: "Product Name",
};

const createTree = (data) => {
  const treeMap = {};

  data.forEach((item) => {
    const {
      [KEYS.CATEGORY]: category,
      [KEYS.SUBCATEGORY]: subcategory,
      [KEYS.PRODUCT_NAME]: productName,
    } = item;
    if (!category || !subcategory || !(KEYS.PRODUCT_NAME in item)) return;

    if (!treeMap[category]) {
      treeMap[category] = { title: category, key: category, children: [] };
    }
    if (
      !treeMap[category].children.find((child) => child.title === subcategory)
    ) {
      treeMap[category].children.push({
        title: subcategory,
        key: subcategory,
        children: [],
      });
    }
    const subCategory = treeMap[category].children.find(
      (child) => child.title === subcategory
    );
    subCategory.children.push({
      title: productName,
      key: productName,
    });
  });

  return Object.values(treeMap);
};

const tree = createTree(data);

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

const TreeComponent = () => {
  return (
    <Tree checkable defaultExpandedKeys={["tree_root"]} treeData={[treeRoot]} />
  );
};

export default TreeComponent;
