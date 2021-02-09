export function destructureEdges(edges = [], processor = (node) => node){
  let res = [];
  for(let i=0; i<edges.length; i++){
    let {node} = edges[i];
    res.push(processor(node));
  }
  return res;
}

module.exports = {
  destructureEdges
}