/**
 * A graph data structure implementation using ES6 Maps and Sets.
 * @typedef {Object} Graph
 * @property {function} clear - Clears all nodes and edges from the graph.
 * @property {function} delete - Deletes a node from the graph and all connected edges.
 * @property {function} remove - Removes an edge between two nodes from the graph.
 * @property {function} size - Returns the number of nodes in the graph.
 * @property {function} has - Checks if a node is in the graph, and optionally checks if it has a connection to another node.
 * @property {function} get - Returns a Set of nodes connected to a given node.
 * @property {function} set - Adds an edge between two nodes to the graph.
 * @property {function} nodes - Returns a Set of all nodes in the graph.
 * @property {function} edges - Returns an array of all edges in the graph.
 * @param {Array} entries - An optional array of [key, value] pairs to initialize the graph.
 * @returns {Graph} An object representing a graph data structure.
 */
const Graph = (entries = []) => {
  const g = new Map(entries);
  const loop = (fn) => (xs) => {
    for (const x of xs) {
      fn(x);
    }
  };
  return {
    /**
     * Removes all entries from the graph.
     * @method
     */
    clear: () => g.clear(),

    /**
     * Removes the entry with the specified key from the graph.
     * @method
     * @param {any} k - The key to remove from the graph.
     * @returns {Set<any>} The set of values that were associated with the key that was removed, or undefined if the key was not found.
     */
    delete: (k) => {
      if (g.has(k)) {
        const vs = g.get(k);
        loop((v) => {
          const ks = g.get(v);
          ks.delete(k);
          if (!ks.size) {
            g.delete(v);
          }
        })(vs);
        g.delete(k);
        return vs;
      }
    },

    /**
     * Removes the edge between the two specified keys.
     * @method
     * @param {any} k - The first key of the edge to remove.
     * @returns {function} A function that takes the second key of the edge to remove.
     */
    remove: (k) => (v) => {
      if (g.has(k)) {
        const vs = g.get(k);
        vs.delete(v);
        if (!vs.size) {
          g.delete(k);
        }
      }
      if (g.has(v)) {
        const ks = g.get(v);
        ks.delete(k);
        if (!ks.size) {
          g.delete(v);
        }
      }
    },

    /**
     * Returns true if the graph contains the specified key.
     * If a value is passed, returns true if the key has an edge to the value.
     * @method
     * @param {any} k - The key to check for in the graph.
     * @returns {(boolean|function)} Returns a function if a value is passed, indicating whether the key has an edge to the value.
     * Otherwise, returns a boolean indicating whether the key is in the graph.
     */
    has: (k) => {
      if (g.has(k)) {
        const vs = g.get(k);
        // functions are truthy,
        // this allows us to have optional edge checking via closure.
        return (v) => new Set(vs).has(v);
      }
      return false;
    },

    /**
     * Returns the set of values associated with the specified key, or undefined if the key is not in the graph.
     * @method
     * @param {any} x - The key to get the associated values for.
     * @returns {Set<any>|undefined} The set of values associated with the key, or undefined if the key is not in the graph.
     */
    get: (x) => (g.has(x) ? new Set(g.get(x)) : undefined),

    /**
     * Adds an edge between the two specified keys.
     * @method
     * @param {any} k - The first key of the edge to add.
     * @returns {function} A function that takes the second key of the edge to add.
     */
    set: (k) => (v) => {
      if (g.has(k)) {
        g.get(k).add(v);
      } else {
        g.set(k, new Set([v]));
      }
      if (g.has(v)) {
        g.get(v).add(k);
      } else {
        g.set(v, new Set([k]));
      }
    },
    /**
     * Returns a set of all nodes in the graph.
     * @returns {Set} A set of all nodes in the graph.
     */
    nodes: () => new Set(g.keys()),

    /**
     * Returns an array of all edges in the graph, represented as pairs of nodes.
     * @returns {Array} An array of all edges in the graph, represented as pairs of nodes.
     */
    edges: () => {
      const e = [];
      loop(([k, vs]) => loop((v) => e.push([k, v]))(vs))(g.entries());
      return e;
    },
  };
};

export { Graph };
