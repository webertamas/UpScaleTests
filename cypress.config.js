const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '2n79eh',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalWebKitSupport: true
  },
});
