import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class treeService {
  constructor() {}
 mapTree(list: any[], level = 0) {
    const checkChildren = (tree: any[], item: any, level: number) => {
      tree.forEach((treeNode) => {
        if (treeNode.ID == item.ParentId) {
          treeNode.children.push({
            ...item,
            children: [],
            ParentId: treeNode.ID,
            level,
          });
        } else if (treeNode.children && treeNode.children.length > 0) {
          checkChildren(treeNode.children, item, level + 1);
        }
      });
    };

    let tree: any[] = [];
    // console.log('list', list.length);
    list.forEach((item) => {
      if (!item.ParentId) {
        tree.push({ ...item, children: [], ParentId: 0, level });
      }
    });
    if (tree.length > 0) {
      list.forEach((item) => {
        if (item.ParentId) {
          checkChildren(tree, item, level + 1);
        }
      });
    }

    return tree;
  }
}
