const config = {
  watchers: [
    {
      paths: ".",
      options: {
        ignored: "**/node_modules/**",
      },
      handlers: [
        {
          event: "change",
          callback: console.log
        },
      ]
    }
  ]
};

export default config;
