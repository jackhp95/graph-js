<img src="./logo.svg" alt="logo" style="width:8rem;">

# graph-js
This module is an implementation of an undirected graph data structure using ES6 Maps and Sets.
## Install

### jsdelivr
```html
<script src="https://cdn.jsdelivr.net/gh/jackhp95/graph-js@master/index.min.js"></script>
```


## Usage

### Creating a graph

To create a new graph, call the `Graph` constructor function with an optional array of `[key, value]` pairs to initialize the graph:

```javascript
const Graph = require('./graph');

const myGraph = Graph([
  ['A', 'C'],
  ['C', 'B'],
]);

console.log(myGraph); // { clear: [Function], delete: [Function], remove: [Function], size: [Function], has: [Function], get: [Function], set: [Function], nodes: [Function], edges: [Function] }
```

### Adding and removing nodes and edges

You can add edges to the graph by calling the `set` method and passing in two keys:

```javascript
myGraph.set('A')('B');
```

This will add an edge between node `'A'` and node `'B'`.

You can remove edges from the graph by calling the `remove` method and passing in two keys:

```javascript
myGraph.remove('A')('B');
```

This will remove the edge between node `'A'` and node `'B'`.

You can delete a node from the graph and all connected edges by calling the `delete` method and passing in the node's key:

```javascript
myGraph.delete('A');
```

This will delete node `'A'` from the graph, along with any edges that connected it to other nodes.

### Checking for nodes and edges

You can check if a node exists in the graph by calling the `has` method and passing in the node's key:

```javascript
myGraph.has('A'); // returns false
myGraph.has('B'); // returns true
```

You can check if an edge exists between two nodes by calling the `has` method and passing in both nodes' keys:

```javascript
myGraph.has('A')('B'); // returns false
myGraph.has('B')('C'); // returns false
myGraph.set('A')('B');
myGraph.set('B')('C');
myGraph.has('A')('B'); // returns true
myGraph.has('B')('C'); // returns true
```

### Retrieving nodes and edges

You can retrieve a set of all nodes in the graph by calling the `nodes` method:

```javascript
myGraph.nodes(); // returns Set { 'B', 'C' }
```

You can retrieve a set of all nodes connected to a given node by calling the `get` method and passing in the node's key:

```javascript
myGraph.get('B'); // returns Set { 'C' }
```

You can retrieve an array of all edges in the graph by calling the `edges` method:

```javascript
myGraph.edges(); // returns [ [ 'B', 'C' ] ]
```

### Clearing the graph

You can clear all nodes and edges from the graph by calling the `clear` method:

```javascript
myGraph.clear();
```


## Examples

### Creating a social network graph

```javascript
const Graph = require('./graph');

const socialNetwork = Graph([
  ['Alice', 'Tom'],
  ['Bob', 'Tom'],
  ['Greg', 'Bob'],
  ]);
socialNetwork.get('Bob') // returns [ 'Tom', 'Greg' ]
socialNetwork.has('Bob')('Alice') // returns false
socialNetwork.set('Bob')('Alice') 
socialNetwork.has('Bob')('Alice') // returns true
socialNetwork.has('Alice')('Bob') // returns true
socialNetwork.get('Bob') // returns [ 'Tom', 'Greg', 'Alice' ]
socialNetwork.remove('Bob')('Tom')
socialNetwork.get('Bob') // returns [ 'Greg', 'Alice' ]
```
