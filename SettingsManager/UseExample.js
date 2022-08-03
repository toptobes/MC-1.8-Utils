// /*

// This *NEEDS* to be loaded after Settings.js and SettingsObject.js
// This will be handled automatically by metadata key "requires" as of 0.15

// Creates a new SettingsObject and sets up the default values
// This needs to be structured in a similar manner EG:
//     array
//         object
//             name: string
//             settings: array

// */
// var testSettings = new SettingsObject("SettingsManager", [
//     {
//         name: "Test Category 1",
//         settings: [
//             new Setting.Toggle("Test Toggle", true),
//             new Setting.ColorPicker("Test Color", [200, 130, 255]),
//             new Setting.StringSelector("Test Selector", 0, [
//                 "This is a test option", 
//                 "This is another test option", 
//                 "Yet another test option", 
//                 "String", 
//                 ":)"
//             ]),
//             new Setting.TextInput("Text Input", "&ct&5e&es&at"),
//             new Setting.Slider("Slider", 50, 0, 100, 3),
//             new Setting.Button("Reset Settings", "click", function() {
//                 testSettings.reset();
//                 testSettings.load();
//             })
//         ]
//     },
//     {
//         name: "Category 2",
//         settings:[
//             new Setting.Toggle("toggle", false),
//             new Setting.Toggle("another one", true),
//             new Setting.ColorPicker("color", [0, 0, 0]),
//             new Setting.ColorPicker("and another one", [255, 255, 255]),
//             new Setting.Toggle("hidden toggle", true).setHidden(true),
//             new Setting.Slider("slider", 1000, 500, 5000)
//         ]
//     }
// ]);

// // Optional modifications
// testSettings.setCommand("ExampleSettings").setSize(400, 200);

// // Registers the SettingsObject (this is REQUIRED)
// Setting.register(testSettings);

// // example use of the color picker setting
// register("step", function() {
//     if (!testSettings.gui.isOpen()) return;
//     var value = testSettings.getSetting("Test Category 1", "Test Color");
//     testSettings.setColor(Renderer.color(value[0], value[1], value[2], 255));
// });
