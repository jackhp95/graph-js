import { assert } from "chai";
import { Graph } from "./../index.js";

describe("Graph", () => {
  describe("set", () => {
    it("should add an edge between two nodes", () => {
      const graph = Graph();
      graph.set("a")("b");
      assert.deepEqual(graph.get("a"), new Set(["b"]));
      assert.deepEqual(graph.get("b"), new Set(["a"]));
    });
  });

  describe("remove", () => {
    it("should remove an edge between two nodes", () => {
      const graph = Graph();
      graph.set("a")("b");
      graph.remove("a")("b");
      assert.deepEqual(graph.get("a"), undefined);
      assert.deepEqual(graph.get("b"), undefined);
    });
  });

  describe("delete", () => {
    it("should remove edgeless nodes from the graph", () => {
      const graph = Graph();
      graph.set("a")("b");
      graph.delete("a");
      assert.deepEqual(graph.get("a"), undefined);
      assert.deepEqual(graph.get("b"), undefined);
    });
  });

  describe("has", () => {
    it("should return truthy if the graph contains the specified key", () => {
      const graph = Graph();
      graph.set("a")("b");
      assert.deepEqual(!!graph.has("a"), true);
      assert.deepEqual(!!graph.has("b"), true);
    });

    it("should return true if the graph has the specified edge", () => {
      const graph = Graph();
      graph.set("a")("b");
      assert.deepEqual(graph.has("a")("b"), true);
    });

    it("should return true if the key has an edge to the value", () => {
      const graph = Graph();
      graph.set("a")("b");
      assert.deepEqual(graph.has("a")("b"), true);
      assert.deepEqual(graph.has("b")("a"), true);
    });

    it("should return false if the key is not in the graph", () => {
      const graph = Graph();
      assert.deepEqual(graph.has("a"), false);
    });
  });

  describe("get", () => {
    it("should return the set of values associated with the specified key", () => {
      const graph = Graph();
      graph.set("a")("b");
      assert.deepEqual(graph.get("a"), new Set(["b"]));
    });

    it("should return undefined if the key is not in the graph", () => {
      const graph = Graph();
      assert.deepEqual(graph.get("a"), undefined);
    });
  });

  describe("nodes", () => {
    it("should return a set of all nodes in the graph", () => {
      const graph = Graph();
      graph.set("a")("b");
      assert.deepEqual(graph.nodes(), new Set(["a", "b"]));
    });
  });

  describe("edges", () => {
    it("should return an array of all edges in the graph", () => {
      const graph = Graph();
      graph.set("a")("b");
      console.log("edges", graph.edges());
      assert.deepEqual(graph.edges(), [
        ["a", "b"],
        ["b", "a"],
      ]);
    });
  });

  describe("clear", () => {
    it("should remove all nodes and edges from the graph", () => {
      const graph = Graph();
      graph.set("a")("b");
      graph.clear();
      assert.deepEqual(graph.get("a"), undefined);
      assert.deepEqual(graph.get("b"), undefined);
      assert.deepEqual(graph.nodes(), new Set([]));
      assert.deepEqual(graph.edges(), []);
    });
  });

  describe("tidy", () => {
    it("should not throw an error when all edges are bidirectional", () => {
      const graph = Graph();
      graph.set("a")("b");
      graph.set("b")("a");
      assert.doesNotThrow(() => graph.tidy((x) => new Throw(x)));
    });
  });
});
