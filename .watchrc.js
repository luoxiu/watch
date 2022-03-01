export default {
  watchers: [
    {
      paths: "src/**",
      callbacks: [
        {
          events: ["change"],
          callback: (path) => {
            console.log(path)
          }
        }
      ]
    }
  ]
};
