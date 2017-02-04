SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "jsremote/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.20"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "jsremote": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "jspointerlock": "github:ardean/jsPointerLock@1.0.0",
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "jquery": "npm:jquery@3.1.1",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.1"
  },
  packages: {
    "github:jspm/nodelibs-events@0.1.1": {
      "map": {
        "events": "npm:events@1.0.2"
      }
    },
    "github:ardean/jsPointerLock@1.0.0": {
      "map": {
        "jquery": "npm:jquery@3.1.1",
        "events": "github:jspm/nodelibs-events@0.1.1"
      }
    }
  }
});
