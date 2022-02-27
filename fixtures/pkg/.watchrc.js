const config = {
  watchers: [
    {
      paths: ".",
      options: {
        ignored: "**/node_modules/**",
      },
      handlers: [
        {
          eventName: "change",
          callback: console.log
        },
      ]
    }
  ]
}

export default config
