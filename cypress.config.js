const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // --- Reporters setup ---
      require("cypress-mochawesome-reporter/plugin")(on);
      allureWriter(on, config);


      // --- Custom Cypress tasks ---
      on("task", {
        //  Check if file exists (generic)
        exists(filePath) {
          return fs.existsSync(filePath);
        },

        //  Clean all YAML files (used in Kubernetes tests)
        cleanYamlFiles(folderPath) {
          const files = fs.readdirSync(folderPath)
            .filter(f => f.startsWith("config") && f.endsWith(".yaml"));
          files.forEach(f => fs.unlinkSync(path.join(folderPath, f)));
          console.log(`🧹 Deleted ${files.length} old YAML file(s) from ${folderPath}`);
          return null;
        },

        //  Get the latest downloaded config.yaml file
        getLatestFile(folderPath) {
          const files = fs.readdirSync(folderPath)
            .filter(f => f.startsWith("config") && f.endsWith(".yaml"))
            .map(f => ({
              name: f,
              time: fs.statSync(path.join(folderPath, f)).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time);

          if (!files.length) {
            throw new Error(` No config.yaml files found in ${folderPath}`);
          }

          const latestFile = path.join(folderPath, files[0].name);
          console.log(`Latest YAML file: ${latestFile}`);
          return latestFile;
        },

        //  Check if a specific file was downloaded
        checkFileDownloaded(fileName) {
          const fs = require('fs');
          const path = require('path');
          const downloadsFolder = path.resolve('cypress/downloads');
          const filePath = path.join(downloadsFolder, fileName);
          const exists = fs.existsSync(filePath);
          console.log(`Check file ${filePath}: ${exists ? "found" : "missing"}`);
          return exists;
        },

        // Delete a specific file from downloads
        deleteFile(fileName) {
          const fs = require('fs');
          const path = require('path');
          const downloadsFolder = path.resolve('cypress/downloads');
          const filePath = path.join(downloadsFolder, fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(` Deleted: ${filePath}`);
            return true;
          }
          console.log(` File not found for deletion: ${filePath}`);
          return false;
        },

        //  Clean the entire downloads folder
        cleanDownloadsFolder() {
          const downloadsFolder = path.join(__dirname, "cypress", "downloads");
          if (fs.existsSync(downloadsFolder)) {
            fs.readdirSync(downloadsFolder).forEach(f =>
              fs.unlinkSync(path.join(downloadsFolder, f))
            );
            console.log(`🧹 Cleaned all files from ${downloadsFolder}`);
          }
          return true;
        },
      });

      return config;
    },
    env: {
      allure: true,
      allureResultsPath: 'allure-results',
    },

    // --- Spec pattern & downloads path ---
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    downloadsFolder: "cypress/downloads",
  },
});
