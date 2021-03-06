module.exports = {
  options: {
    interrupt: true,
    debounceDelay: 250
  },
  js: {
    files: [
      `${gruntConfig.src.ts}/**`,
      `${gruntConfig.src.tsShared}/**`
    ],
    tasks: [
      // Do not clean tmp dir here to ensure
      // TypeScript builds incrementally (faster).
      "shell:typescript",
      "browserify",
      "compress:gzip"
    ]
  },
  sass: {
    files: [
      `${gruntConfig.src.sass}/**`
    ],
    tasks: [
      "sass",
      "postcss:prefix",
      "compress:gzip"
    ]
  },
  static: {
    files: [
      `${gruntConfig.src.static}/**`
    ],
    tasks: [
      "common",
      "compress:gzip"
    ]
  },
};
