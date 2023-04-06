declare type Graph = {
    clear: () => void;
    delete: (k: any) => Set<any> | undefined;
    remove: (k: any) => (v: any) => void;
    has: (k: any) => boolean | ((v: any) => boolean);
    get: (x: any) => Set<any> | undefined;
    set: (k: any) => (v: any) => void;
    nodes: () => Set<any>;
    edges: () => Array<[any, any]>;
    tidy: (err: (msg: string) => void) => boolean;
};

declare const Graph: (entries?: Array<[any, any]>) => Graph;
