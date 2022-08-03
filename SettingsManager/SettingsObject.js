const Setting = require("./Settings.js")


/**
 * Represents a Settings Object.
 * Example usage can be found in UseExample.js
 * 
 * @constructor
 * @param {String} moduleName the name of the module
 * @param {Array} defaultSettings the array of default settings
 */
function SettingsObject(moduleName, defaultSettings) {
    this.module = moduleName;
    this.defaults = defaultSettings;

    this.settings;

    this.gui = new Gui();
    this.command;

    this.color = 0xff42a7f4;
    this.width = 250;
    this.height = 150;

    this.handler;
}

/**
 * Sets the SettingsObject's color for the highlighted category tabs.
 * 
 * @param {number} color the color of the hightighted category tabs
 * @returns {*} this for function chaining
 */
SettingsObject.prototype.setColor = function(color) {
    this.color = color;
    return this;
}

/**
 * Sets the size of the SettingsObject window when drawn.
 * 
 * @param {number} width the width of the settings window
 * @param {number} height the height of the settings window
 * @returns {*} this for function chaining
 */
SettingsObject.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    return this;
}

/**
 * Sets the command to open the SettingsObject gui.
 * 
 * @param {String} command the command
 * @returns {*} this for function chaining
 */
SettingsObject.prototype.setCommand = function(command) {
    this.command = command;
    return this;
}

/**
 * Gets the value stored in a setting.
 * 
 * @param {String} category the category of the setting
 * @param {String} name the name of the setting
 * @returns {*} the value in the setting if found
 */
SettingsObject.prototype.getSetting = function(category, name) {
    for (var i = 0; i < this.settings.length; i++) {
        if (category != this.settings[i].name) continue;
        for (var j = 0; j < this.settings[i].settings.length; j++) {
            if (name != this.settings[i].settings[j].name) continue;

            switch (this.settings[i].settings[j].type) {
                case("string_selector"):
                    var stringSelector = this.settings[i].settings[j];
                    return stringSelector.options[stringSelector.value];
                case("text_input"):
                    return this.settings[i].settings[j].text;
                default:
                    return this.settings[i].settings[j].value;
            }
        }
    }
    print("Could not fine settings " + name + " in category " + category);
    return null;
}

/**
 * Gets a setting object.
 * 
 * @param {String} category the category of the setting
 * @param {String} name the name of the setting
 * @returns {*} the value in the setting if found
 */
SettingsObject.prototype.getSettingObject = function(category, name) {
    for (var i = 0; i < this.settings.length; i++) {
        if (category != this.settings[i].name) continue;
        for (var j = 0; j < this.settings[i].settings.length; j++) {
            if (name != this.settings[i].settings[j].name) continue;
            return this.settings[i].settings[j];
        }
    }
    print("Could not fine settings " + name + " in category " + category);
    return null;
}

/**
 * Resets the SettingsObject to default values and saves the file.
 * 
 * @returns {*} this for function chaining
 */
SettingsObject.prototype.reset = function() {
    this.settings = [];
    for (var i = 0; i < this.defaults.length; i++) {
        var category = this.defaults[i];
        var _settings = [];
        for (var j = 0; j < category.settings.length; j++) {
            var setting = category.settings[j];
            var _setting;
            switch (setting.type) {
                case("toggle"):
                    _setting = new Setting.Toggle(
                        setting.name,
                        setting.value
                    ).setHidden(setting.hidden);
                    break;
                case("color_picker"):
                    _setting = new Setting.ColorPicker(
                        setting.name,
                        setting.value.slice(0)
                    ).setHidden(setting.hidden);
                    break;
                case("string_selector"):
                    _setting = new Setting.StringSelector(
                        setting.name,
                        setting.value,
                        setting.options
                    ).setHidden(setting.hidden);
                    break;
                case("button"):
                    _setting = new Setting.Button(
                        setting.name,
                        setting.text,
                        setting.method
                    ).setHidden(setting.hidden);
                    break;
                case("text_input"):
                    _setting = new Setting.TextInput(
                        setting.name,
                        setting.text
                    ).setHidden(setting.hidden);
                    break;
                case("slider"):
                    _setting = new Setting.Slider(
                        setting.name,
                        setting.value,
                        setting.min,
                        setting.max,
                        setting.round
                    ).setHidden(setting.hidden);
                    break;
            }

            _settings[j] = _setting;
        }
        this.settings[i] = {
            name: category.name,
            settings: _settings
        }
    }
    this.save();
    return this;
}

/**
 * Opens the SettingsObject's gui. This is ran with the command is {@link setCommand} is used.
 * 
 * @returns {*} this for function chaining
 */
SettingsObject.prototype.open = function() {
    var tabs = [];
    for (var i = 0; i < this.settings.length; i++) {
        tabs[i] = {
            height: 0,
            alpha: 0,
            y: 20,
            text: 255,
            hovered: false
        };
    }

    this.handler = {
        selected: 0,
        y: 20,
        alpha: 0,
        tabs: tabs
    };
    this.gui.open();

    return this;
}

/**
 * Loads the settings from the generated file.
 * 
 * @returns {*} this for function chaining
 */
SettingsObject.prototype.load = function() {
    var loadedSettings = FileLib.read(this.module, "." + this.module + "-settings.json");
    if (loadedSettings == "" || loadedSettings == null || loadedSettings == undefined) {
        this.settings = this.defaults;
        this.save();
    } else {
        this.settings = JSON.parse(loadedSettings, function(key, value) {
            if (typeof value === "string" && value.startsWith("/Function(") && value.endsWith(")/")) {
                value = value.substring(10, value.length - 2);
                return eval("(" + value + ")");
            }
            return value;
        });
        if (Array.isArray(this.settings)) {
            this.parse();
        } else {
            this.settings = this.defaults;
            this.save();
        }
    }

    return this;
}

/**
 * Saves the settings to a generated file.
 * 
 * @returns {*} this for function chaining 
 */
SettingsObject.prototype.save = function() {
    var write = JSON.parse(JSON.stringify(this.settings, function(key, value) {
        if (typeof value === "function") {
            return "/Function(" + value.toString() + ")/";
        }
        return value;
    }), function(key, value) {
        if (typeof value === "string" && value.startsWith("/Function(") && value.endsWith(")/")) {
            value = value.substring(10, value.length - 2);
            return eval("(" + value + ")");
        }
        return value;
    });
    for (var i = 0; i < write.length; i++) {
        for (var j = 0; j < write[i].settings.length; j++) {
            delete write[i].settings[j].handler
        }
    }
    FileLib.write(
        this.module, 
        "." + this.module + "-settings.json", 
        JSON.stringify(
            write, 
            function(key, value) {
                if (typeof value === "function") {
                    return "/Function(" + value.toString() + ")/";
                }
                return value;
            }, 
            2
        )
    );

    return this;
}

/**
 * Helper function to parse the settings into a usable form. 
 * This is used internally on load and is not meant for public use.
 */
SettingsObject.prototype.parse = function() {
    for (var i = 0; i < this.settings.length; i++) {
        for (var j = 0; j < this.settings[i].settings.length; j++) {
            switch (this.settings[i].settings[j].type) {
                case("toggle"):
                    this.settings[i].settings[j] = new Setting.Toggle(
                        this.settings[i].settings[j].name,
                        this.settings[i].settings[j].value
                    ).setHidden(this.settings[i].settings[j].hidden);
                    break;
                case("color_picker"):
                    this.settings[i].settings[j] = new Setting.ColorPicker(
                        this.settings[i].settings[j].name,
                        this.settings[i].settings[j].value
                    ).setHidden(this.settings[i].settings[j].hidden);
                    break;
                case("string_selector"):
                    this.settings[i].settings[j] = new Setting.StringSelector(
                        this.settings[i].settings[j].name,
                        this.settings[i].settings[j].value,
                        this.settings[i].settings[j].options
                    ).setHidden(this.settings[i].settings[j].hidden);
                    break;
                case("button"):
                    this.settings[i].settings[j] = new Setting.Button(
                        this.settings[i].settings[j].name,
                        this.settings[i].settings[j].text,
                        this.settings[i].settings[j].method
                    ).setHidden(this.settings[i].settings[j].hidden);
                    break;
                case("text_input"):
                    this.settings[i].settings[j] = new Setting.TextInput(
                        this.settings[i].settings[j].name,
                        this.settings[i].settings[j].text
                    ).setHidden(this.settings[i].settings[j].hidden);
                    break;
                case("slider"):
                    this.settings[i].settings[j] = new Setting.Slider(
                        this.settings[i].settings[j].name,
                        this.settings[i].settings[j].value,
                        this.settings[i].settings[j].min,
                        this.settings[i].settings[j].max,
                        this.settings[i].settings[j].round
                    ).setHidden(this.settings[i].settings[j].hidden);
                    break;
            }
        }
    }
}

/**
 * Helper function to update the GUI animations. Registers on step.
 * This is used internally on load and is not meant for public use.
 */
SettingsObject.prototype.update = function() {
    if (!this.gui.isOpen()) return;

    this.handler.y      = easeOut(this.handler.y,       0,      10, 0.1);
    this.handler.alpha  = easeOut(this.handler.alpha,   255,    10, 0.1);

    for (var i = 0; i < this.settings.length; i++) {
        if (i == this.handler.selected) {
            this.handler.tabs[i].height = easeOut(this.handler.tabs[i].height,  -18,    10, 0.1);
            this.handler.tabs[i].text   = easeOut(this.handler.tabs[i].text,    0,      10, 0.1);
            this.handler.tabs[i].alpha  = easeOut(this.handler.tabs[i].alpha,   255,    10, 1);
            this.handler.tabs[i].y      = easeOut(this.handler.tabs[i].y,       0,      10, 1);
        } else {
            this.handler.tabs[i].height = easeOut(this.handler.tabs[i].height,  0,      10, 0.1);
            this.handler.tabs[i].text   = easeOut(this.handler.tabs[i].text,    255,    10, 0.1);
            this.handler.tabs[i].alpha  = easeOut(this.handler.tabs[i].alpha,   0,      10, 1);
            this.handler.tabs[i].y      = easeOut(this.handler.tabs[i].y,       20,     10, 1);
        }

        for (var j = 0; j < this.settings[i].settings.length; j++) {
            if (this.settings[i].settings[j].hidden) continue;
            this.settings[i].settings[j].update();
        }
    }
}

/**
 * Helper function to update the GUI mouse dragged. Registers on mouse drag.
 * This is used internally on load and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 */
SettingsObject.prototype.drag = function(mouseX, mouseY) {
    for (var i = 0; i < this.settings.length; i++) {
        if (this.handler.selected != i) continue;
        for (var j = 0; j < this.settings[i].settings.length; j++) {
            if (this.settings[i].settings[j].hidden) continue;
            switch (this.settings[i].settings[j].type) {
                case("color_picker"):
                case("slider"):
                    this.settings[i].settings[j].click(mouseX, mouseY, this);
                    continue;
                default:
                    continue;
            }
        }
    }
}

/**
 * Helper function to update the GUI mouse click. Registers on mouse click.
 * This is used internally on load and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 */
SettingsObject.prototype.click = function(mouseX, mouseY) {
    for (var i = 0; i < this.settings.length; i++) {
        if (this.handler.tabs[i].hovered) {
            this.handler.selected = i;
            return;
        }

        if (this.handler.selected != i) continue;
        for (var j = 0; j < this.settings[i].settings.length; j++) {
            if (this.settings[i].settings[j].hidden) continue;
            switch (this.settings[i].settings[j].type) {
                case("toggle"):
                case("string_selector"):
                case("button"):
                case("text_input"):
                    this.settings[i].settings[j].click(mouseX, mouseY, this);
                    continue;
                default:
                    continue;
            }
        }
    }
}

/**
 * Helper function to update the GUI key typed. Registers on key typed.
 * This is used internally on load and is not meant for public use.
 * 
 * @param {number} keycode 
 */
SettingsObject.prototype.keyType = function(char, keycode) {
    for (var i = 0; i < this.settings.length; i++) {
        if (this.handler.selected != i) continue;
        for (var j = 0; j < this.settings[i].settings.length; j++) {
            switch (this.settings[i].settings[j].type) {
                case("text_input"):
                    this.settings[i].settings[j].keyType(char, keycode, this);
                    continue;
                default:
                    continue;
            }
        }
    }
}

/**
 * Helper function to draw the GUI. Registers on gui draw.
 * This is used internally on load and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 */
SettingsObject.prototype.draw = function(mouseX, mouseY) {
    var x = Renderer.screen.getWidth() / 2 - this.width / 2;
    var y = Renderer.screen.getHeight() / 2 - this.height / 2 + this.handler.y;

    Renderer.drawRect(Renderer.color(0, 0, 0, this.handler.alpha / 3), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.alpha / 1.5),
        x, y, this.width, this.height
    );

    var xOffset = 0;
    for (var i = 0; i < this.settings.length; i++) {
        var category = this.settings[i];
        var width = Renderer.getStringWidth(category.name) + 10;

        this.handler.tabs[i].hovered = 
                mouseX > x + xOffset 
            &&  mouseX < x + xOffset + width 
            &&  mouseY > y - 18 
            &&  mouseY < y;

        Renderer.drawRect(
            Renderer.color(0, 0, 0, this.handler.alpha / 1.5),
            x + xOffset, y - 18, width, 18
        );

        Renderer.drawRect(
            this.color,
            x + xOffset, y, width, this.handler.tabs[i].height
        );

        new Text(
            category.name,
            x + 5 + xOffset, y + 5 - 18
        ).setColor(
            Renderer.color(
                this.handler.tabs[i].text, 
                this.handler.tabs[i].text, 
                this.handler.tabs[i].text, 
                this.handler.alpha
            )
        ).draw();

        yOffset = 0;
        for (var j = 0; j < category.settings.length; j++) {
            if (category.settings[j].hidden) continue;
            yOffset += category.settings[j].draw(mouseX, mouseY, x + 5, y + 5 + yOffset + this.handler.tabs[i].y, this.handler.tabs[i].alpha, this, this.handler.selected == i);
        }

        xOffset += width;
    }
}

SettingsObject.prototype.register = function() {
    Settings.register(this)
}

module.exports = SettingsObject