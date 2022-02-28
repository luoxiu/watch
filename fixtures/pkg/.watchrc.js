const config = {
  watchers: [
    {
      paths: ".",
      options: {
        ignored: "**/node_modules/**",
      },
      callbacks: [
        {
          event: ["change"],
          callback: async (...args) => {
            console.log("change", ...args);
          } 
        },
      ]
    }
  ]
};

export default config;
