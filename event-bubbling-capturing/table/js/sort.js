'use strict';

function handleTableClick(event) {
  const node = event.target;
  const table = event.currentTarget;

  if (node.tagName == 'TH') {
  	event.stopPropagation();
    node.dataset.dir = node.dataset.dir == 1 ? -1 : 1;
    table.dataset.sortBy = node.dataset.propName;
    sortTable(node.dataset.propName, node.dataset.dir);
  }
}