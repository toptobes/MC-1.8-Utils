const Setting = new Settings();

var Toolkit = Java.type("java.awt.Toolkit");
var DataFlavor = Java.type("java.awt.datatransfer.DataFlavor");

/**
 * Registers all hooks and triggers for a new SettingsObject.
 * 
 * @param {*} self the settingsObject to register
 */
Settings.prototype.register = function(self) {
    self.load();
    
    if (self.command != undefined) {
        register("command", function() {
            if (arguments[0] == "reset") {
                self.reset();
                ChatLib.chat("&7Settings reset for " + self.module);
            } else {
                self.open();
            }
        }).setName(self.command);
    }
    
    self.gui.registerDraw(function(mouseX, mouseY) {
        self.draw(mouseX, mouseY);
    });

    self.gui.registerClicked(function(mouseX, mouseY, button) {
        if (button != 0) return;
        self.click(mouseX, mouseY);
    });

    self.gui.registerKeyTyped(function(char, key) {
        self.keyType(char, key);
    });

    register("dragged", function(dx, dy, mouseX, mouseY, button) {
        if (!self.gui.isOpen()) return;
        if (button != 0) return;
        self.drag(mouseX, mouseY);
    });
    
    register("step", function() {
        self.update();
    }).setFps(120);
}




function Settings() {}

/**
 * Represents a button setting.
 * Example usage can be found in UseExample.js
 * 
 * @param {String} name the name of the setting
 * @param {String} text the text on the button
 * @param {function} method the function to run when the button is clicked
 */
Settings.prototype.Button = function(name, text, method) {
    this.type = "button";

    this.name = name;
    this.text = text;
    this.method = method;

    this.hidden = false;

    this.handler = {
        pos: {},
        hover: {
            hover: false,
            alpha: 0,
            height: 0
        }
    }
}

/**
 * Sets the setting hidden value. If hidden, it will not draw in the GUI.
 * 
 * @param {boolean} hidden new hidden value
 * @return {*} this for method chaining
 */
Setting.Button.prototype.setHidden = function(hidden) {
    this.hidden = hidden;
    return this;
}

/**
 * Helper function to update the setting's animations.
 * This is used internally and is not meant for public use.
 */
Setting.Button.prototype.update = function() {
    if (this.handler.hover.hover) {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     130,    10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    8,      10, 0.1);
    } else {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     0,      10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    0,      10, 0.1);
    }
}

/**
 * Helper function to click the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {*} self 
 */
Setting.Button.prototype.click = function(mouseX, mouseY, self) {
    if (mouseX > this.handler.pos.x + self.width - Renderer.getStringWidth(this.text) - 60
        && mouseX < this.handler.pos.x + self.width - 10
        && mouseY > this.handler.pos.y
        && mouseY < this.handler.pos.y + 13) {
            this.method();
        }
}

/**
 * Helper function to draw the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} x 
 * @param {number} y 
 * @param {number} alpha 
 * @param {*} self 
 */
Setting.Button.prototype.draw = function(mouseX, mouseY, x, y, alpha, self) {
    this.handler.pos = {x: x, y: y};

    this.handler.hover.hover = 
            mouseX > x - 5 
        &&  mouseX < x - 5 + self.width
        &&  mouseY > y
        &&  mouseY < y + 15
        &&  alpha == 255;

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.hover.alpha),
        x - 5, y + 5 - this.handler.hover.height, self.width, this.handler.hover.height * 2
    )

    new Text(
        this.name,
        x, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    Renderer.drawRect(
        Renderer.color(0, 0, 0, alpha),
        x + self.width - Renderer.getStringWidth(this.text) - 60, y - 1, Renderer.getStringWidth(this.text) + 50, 13
    );

    new Text(
        this.text,
        x + self.width - Renderer.getStringWidth(this.text) - 35, y + 2
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    return 15;
}

/**
 * Represents a color picker setting.
 * Example usage can be found in UseExample.js
 * 
 * @constructor
 * @param {String} name the name of the setting
 * @param {Array.<number>} value the default value of the setting
 */
Settings.prototype.ColorPicker = function(name, value) {
    this.type = "color_picker";

    this.name = name;
    this.value = value;

    this.hidden = false;

    this.handler = {
        pos: {},
        hover: {
            hover: false,
            alpha: 0,
            height: 0
        }
    }
}

/**
 * Sets the setting hidden value. If hidden, it will not draw in the GUI.
 * 
 * @param {boolean} hidden new hidden value
 * @return {*} this for method chaining
 */
Setting.ColorPicker.prototype.setHidden = function(hidden) {
    this.hidden = hidden;
    return this;
}

/**
 * Helper function to update the setting's animations.
 * This is used internally and is not meant for public use.
 */
Setting.ColorPicker.prototype.update = function() {
    if (this.handler.hover.hover) {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     130,    10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    13,     10, 0.1);
    } else {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     0,      10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    0,      10, 0.1);
    }
}

/**
 * Helper function to click the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {*} self 
 */
Setting.ColorPicker.prototype.click = function(mouseX, mouseY, self) {
    if (!this.handler.hover.hover) return;

    slideWidth = self.width / 3 - 15;
    if (mouseX > this.handler.pos.x && mouseX < this.handler.pos.x + slideWidth) {
        this.value[0] = Math.floor(MathLib.map(mouseX, this.handler.pos.x, this.handler.pos.x + slideWidth, 0, 255));
        self.save();
    } else if (mouseX > this.handler.pos.x + slideWidth + 5 && mouseX < this.handler.pos.x + slideWidth * 2 + 5) {
        this.value[1] = Math.floor(MathLib.map(mouseX, this.handler.pos.x + slideWidth + 5, this.handler.pos.x + slideWidth * 2 + 5, 0, 255));
        self.save();
    } else if (mouseX > this.handler.pos.x + slideWidth * 2 + 10 && mouseX < this.handler.pos.x + slideWidth * 3 + 10) {
        this.value[2] = Math.floor(MathLib.map(mouseX, this.handler.pos.x + slideWidth * 2 + 10, this.handler.pos.x + slideWidth * 3 + 10, 0, 255));
        self.save();
    }
}

/**
 * Helper function to draw the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} x 
 * @param {number} y 
 * @param {number} alpha 
 * @param {*} self 
 */
Setting.ColorPicker.prototype.draw = function(mouseX, mouseY, x, y, alpha, self) {
    this.handler.pos = {x: x, y: y}

    this.handler.hover.hover = 
            mouseX > x - 5 
        &&  mouseX < x - 5 + self.width
        &&  mouseY > y
        &&  mouseY < y + 25
        &&  alpha == 255;

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.hover.alpha),
        x - 5, y + 10 - this.handler.hover.height, self.width, this.handler.hover.height * 2
    );

    new Text(
        this.name,
        x, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    slideWidth = self.width / 3 - 15;
    Renderer.drawRect(
        Renderer.color(this.value[0], 0, 0, alpha),
        x, y + 15, slideWidth, 3
    );

    Renderer.drawRect(
        Renderer.color(255, 255, 255, alpha),
        x + MathLib.map(this.value[0], 0, 255, 0, slideWidth), y + 14,
        1, 5
    );

    Renderer.drawRect(
        Renderer.color(0, this.value[1], 0, alpha),
        x + slideWidth + 5, y + 15, slideWidth, 3
    );

    Renderer.drawRect(
        Renderer.color(255, 255, 255, alpha),
        x + slideWidth + 5 + MathLib.map(this.value[1], 0, 255, 0, slideWidth), y + 14,
        1, 5
    );

    Renderer.drawRect(
        Renderer.color(0, 0, this.value[2], alpha),
        x + slideWidth * 2 + 10, y + 15, slideWidth, 3
    );

    Renderer.drawRect(
        Renderer.color(255, 255, 255, alpha),
        x + slideWidth * 2 + 10 + MathLib.map(this.value[2], 0, 255, 0, slideWidth), y + 14,
        1, 5
    );

    Renderer.drawRect(
        Renderer.color(this.value[0], this.value[1], this.value[2], alpha),
        x + self.width - 30, y, 20, 20
    );

    return 25;
}

/**
 * Represents a slider setting.
 * Example usage can be found in UseExample.js
 * 
 * @constructor
 * @param {String} name the name of the setting
 * @param {number} value the default value of the setting
 * @param {number} min the min number
 * @param {number} max the max number
 * @param {number} round optional number of decimals to round to (default 0)
 */
Settings.prototype.Slider = function(name, value, min, max, round) {
    this.type = "slider";

    this.name = name;
    this.value = value;
    this.min = min;
    this.max = max;

    this.round = 0;
    if (round != undefined) {
        this.round = round;
    }

    this.hidden = false;

    this.handler = {
        pos: {},
        hover: {
            hover: false,
            alpha: 0,
            height: 0
        }
    }
}

/**
 * Sets the setting hidden value. If hidden, it will not draw in the GUI.
 * 
 * @param {boolean} hidden new hidden value
 * @return {*} this for method chaining
 */
Setting.Slider.prototype.setHidden = function(hidden) {
    this.hidden = hidden;
    return this;
}

/**
 * Helper function to update the setting's animations.
 * This is used internally and is not meant for public use.
 */
Setting.Slider.prototype.update = function() {
    if (this.handler.hover.hover) {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     130,    10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    13,     10, 0.1);
    } else {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     0,      10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    0,      10, 0.1);
    }
}

/**
 * Helper function to click the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {*} self 
 */
Setting.Slider.prototype.click = function(mouseX, mouseY, self) {
    if (!this.handler.hover.hover) return;

    slideWidth = self.width - 10;
    if (mouseX > this.handler.pos.x && mouseX < this.handler.pos.x + slideWidth) {
        this.value = MathLib.map(mouseX, this.handler.pos.x, this.handler.pos.x + slideWidth, this.min, this.max).toFixed(this.round);
    } else if (mouseX <= this.handler.pos.x) {
        this.value = this.min;
    } else if (mouseX >= this.handler.pos.x + slideWidth) {
        this.value = this.max;
    }
    self.save();
}

/**
 * Helper function to draw the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} x 
 * @param {number} y 
 * @param {number} alpha 
 * @param {*} self 
 */
Setting.Slider.prototype.draw = function(mouseX, mouseY, x, y, alpha, self) {
    this.handler.pos = {x: x, y: y}

    this.handler.hover.hover = 
            mouseX > x - 5 
        &&  mouseX < x - 5 + self.width
        &&  mouseY > y
        &&  mouseY < y + 25
        &&  alpha == 255;

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.hover.alpha),
        x - 5, y + 10 - this.handler.hover.height, self.width, this.handler.hover.height * 2
    );

    new Text(
        this.name,
        x, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    slideWidth = self.width - 10;
    Renderer.drawRect(
        Renderer.color(100, 100, 100, alpha),
        x, y + 15, slideWidth, 3
    );

    Renderer.drawRect(
        Renderer.color(255, 255, 255, alpha),
        x + MathLib.map(this.value, this.min, this.max, 0, slideWidth), y + 14,
        1, 5
    );

    new Text(
        this.value,
        x + self.width - Renderer.getStringWidth(this.value) - 10, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    return 25;
}

/**
 * Represents a string selector setting.
 * Example usage can be found in UseExample.js
 * 
 * @constructor
 * @param {String} name the name of the setting
 * @param {number} value the default value of the setting
 * @param {Array.<String>} options the string options
 */
Settings.prototype.StringSelector = function(name, value, options) {
    this.type = "string_selector";

    this.name = name;
    this.value = value;
    this.options = options;

    this.hidden = false;

    var textAlphas = [];
    this.options.forEach(function() {
        textAlphas.push(0);
    });

    this.handler = {
        pos: {},
        text: {
            x: 0,
            alphas: textAlphas
        },
        hover: {
            hover: false,
            alpha: 0,
            height: 0
        }
    }
}

/**
 * Sets the setting hidden value. If hidden, it will not draw in the GUI.
 * 
 * @param {boolean} hidden new hidden value
 * @return {*} this for method chaining
 */
Setting.StringSelector.prototype.setHidden = function(hidden) {
    this.hidden = hidden;
    return this;
}

/**
 * Helper function to update the setting's animations.
 * This is used internally and is not meant for public use.
 */
Setting.StringSelector.prototype.update = function() {
    this.handler.text.x = easeOut(this.handler.text.x, this.value * 20, 10, 0.1);
    for (var i = 0; i < this.options.length; i++) {
        if (this.value == i) {
            this.handler.text.alphas[i] = easeOut(this.handler.text.alphas[i], 255, 10, 1);
        } else {
            this.handler.text.alphas[i] = easeOut(this.handler.text.alphas[i], 0, 10, 1);
        }
    }

    if (this.handler.hover.hover) {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     130,    10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    13,     10, 0.1);
    } else {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     0,      10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    0,      10, 0.1);
    }
}

/**
 * Helper function to click the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {*} self 
 */
Setting.StringSelector.prototype.click = function(mouseX, mouseY, self) {
    if (mouseX > this.handler.pos.x - 5 
    &&  mouseX < this.handler.pos.x - 5 + self.width / 2
    &&  mouseY > this.handler.pos.y
    &&  mouseY < this.handler.pos.y + 25) {
        this.value--;
        if (this.value < 0) this.value = 0;
        self.save();
    }

    if (mouseX > this.handler.pos.x - 5 + self.width / 2
    &&  mouseX < this.handler.pos.x - 5 + self.width
    &&  mouseY > this.handler.pos.y
    &&  mouseY < this.handler.pos.y + 25) {
        this.value++;
        if (this.value > this.options.length - 1) this.value = this.options.length - 1;
        self.save();
    }
}

/**
 * Helper function to draw the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} x 
 * @param {number} y 
 * @param {number} alpha 
 * @param {*} self 
 * @param {boolean} selected
 */
Setting.StringSelector.prototype.draw = function(mouseX, mouseY, x, y, alpha, self, selected) {
    this.handler.pos = {x: x, y: y};

    this.handler.hover.hover = 
            mouseX > x - 5 
        &&  mouseX < x - 5 + self.width
        &&  mouseY > y
        &&  mouseY < y + 25
        &&  alpha == 255;

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.hover.alpha),
        x - 5, y + 10 - this.handler.hover.height, self.width, this.handler.hover.height * 2
    );

    new Text(
        this.name,
        x, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    for (var i = 0; i < this.options.length; i++) {
        var xOffset = i * -20 + this.handler.text.x;
        if (xOffset > 20) xOffset = -20;
        if (xOffset < -20) xOffset = 20;

        var optionText = new Text(
            this.options[i],
            x + xOffset + self.width / 2 - 5 - Renderer.getStringWidth(this.options[i]) / 2,
            y + 11
        )
        
        if (selected && alpha > 0) {
            optionText.setColor(Renderer.color(255, 255, 255, this.handler.text.alphas[i]));
        } else {
            if (alpha > this.handler.text.alphas[i]) {
                optionText.setColor(Renderer.color(255, 255, 255, this.handler.text.alphas[i]));
            } else {
                optionText.setColor(Renderer.color(255, 255, 255, alpha));
            }
        }
        
        optionText.draw();
    }

    Renderer.drawRect(Renderer.color(0, 0, 0, alpha), x, y + 10, 25, 11);
    new Text("<", x + 10, y + 12).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    Renderer.drawRect(
        Renderer.color(0, 0, 0, alpha), x + self.width - 35, y + 10, 25, 11
    );

    new Text(
        ">", x + self.width - 24, y + 12
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    return 25;
}

Settings.prototype.TextInput = function(name, text) {
    this.type = "text_input";

    this.name = name;
    this.text = text;

    this.hidden = false;

    this.handler = {
        pos: {},
        hover: {
            hover: false,
            alpha: 0,
            height: 0
        },
        selected: false,
        cursor: {
            pos: 0,
            step: 0
        }
    }
}

/**
 * Sets the setting hidden value. If hidden, it will not draw in the GUI.
 * 
 * @param {boolean} hidden new hidden value
 * @return {*} this for method chaining
 */
Setting.TextInput.prototype.setHidden = function(hidden) {
    this.hidden = hidden;
    return this;
}

/**
 * Helper function to update the setting's key typed.
 * This is used internally and is not meant for public use.
 * 
 * @param {string} char 
 * @param {number} keycode 
 * @param {*} self 
 */
Setting.TextInput.prototype.keyType = function(char, keycode, self) {
    if (!this.handler.selected) return;

    this.handler.cursor.step = -30;

    if (keycode == 199) { // home
        this.handler.cursor.pos = 0;
        return;
    }

    if (keycode == 207) { // end
        this.handler.cursor.pos = this.text.length;
        return;
    }

    if (keycode == 203 && this.handler.cursor.pos > 0) { // left
        this.handler.cursor.pos--;
        return;
    }

    if (keycode == 205 && this.handler.cursor.pos < this.text.length) { // right
        this.handler.cursor.pos++;
        return;
    }

    // backspace
    if (keycode == 14 && this.handler.cursor.pos > 0) {
        this.text = this.text.slice(0, this.handler.cursor.pos - 1) + this.text.slice(this.handler.cursor.pos);
        this.handler.cursor.pos--;
        self.save();
        return;
    }

    //del
    if (keycode == 211 && this.handler.cursor.pos < this.text.length) {
        this.text = this.text.slice(0, this.handler.cursor.pos) + this.text.slice(this.handler.cursor.pos+1);
        self.save();
        return;
    }

    // paste
    var shouldPaste = false;
    if (keycode == 47) {
        if (Client.getMinecraft().field_142025_a) { // mac
            if (Keyboard.isKeyDown(219) || Keyboard.isKeyDown(220)) {
                shouldPaste = true;
            }
        } else { // literally everything else
            if (Keyboard.isKeyDown(29) || Keyboard.isKeyDown(157)) {
                shouldPaste = true;
            }
        }
    }
    if (shouldPaste) {
        var transferable = Toolkit.getDefaultToolkit().getSystemClipboard().getContents(null);
        if (transferable != null && transferable.isDataFlavorSupported(DataFlavor.stringFlavor)) {
            this.text = 
                this.text.slice(0, this.handler.cursor.pos) 
                + transferable.getTransferData(DataFlavor.stringFlavor)
                + this.text.slice(this.handler.cursor.pos);
        }
        self.save();
        return;
    }

    // text
    if (String(char).match(/[\x20-\x7E]/g)) {
        this.text = 
            this.text.slice(0, this.handler.cursor.pos) 
            + char 
            + this.text.slice(this.handler.cursor.pos);
        this.handler.cursor.pos++;
        self.save();
        return;
    }
}

/**
 * Helper function to update the setting's animations.
 * This is used internally and is not meant for public use.
 */
Setting.TextInput.prototype.update = function() {
    if (this.handler.selected) {
        this.handler.cursor.step++;
        if (this.handler.cursor.step > 60) {
            this.handler.cursor.step = 0;
        }
    }

    if (this.handler.hover.hover) {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     130,    10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    13,     10, 0.1);
    } else {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     0,      10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    0,      10, 0.1);
    }
}

/**
 * Helper function to click the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {*} self 
 */
Setting.TextInput.prototype.click = function(mouseX, mouseY, self) {
    if (this.handler.selected) {
        var x1 = this.handler.pos.x + self.width - Renderer.getStringWidth(this.text) - 12;
        var x2 = x1 + Renderer.getStringWidth(this.text) + 1;
        var y1 = this.handler.pos.y - 2;
        var y2 = y1 + 11;

        if (Client.getMouseY() > y1 && Client.getMouseY() < y2) {
            if (Client.getMouseX() <= x1) {
                this.handler.cursor.pos = 0;
            } else if (Client.getMouseX() >= x2) {
                this.handler.cursor.pos = this.text.length;
            } else {
                for (var i = 0; i <= this.text.length; i++) {
                    var t = x1 + Renderer.getStringWidth(this.text.slice(0, i));
                    if (Client.getMouseX() <= t) {
                    var left = t - Renderer.getStringWidth(this.text.slice(i - 1, i));
                    var right = t + Renderer.getStringWidth(this.text.slice(i - 1, i)) / 2;
                    this.handler.cursor.pos = (Client.getMouseX() - left > right - Client.getMouseX()) ? i : i-1;
                    return;
                    }
                }
            }
        }
    }

    if (!this.handler.selected && this.handler.hover.hover) {
        this.handler.cursor.pos = this.text.length;
    }
    this.handler.selected = this.handler.hover.hover;
}

/**
 * Helper function to draw the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} x 
 * @param {number} y 
 * @param {number} alpha 
 * @param {*} self 
 */
Setting.TextInput.prototype.draw = function(mouseX, mouseY, x, y, alpha, self) {
    this.handler.pos = {x: x, y: y};

    this.handler.hover.hover = 
            mouseX > x - 5 
        &&  mouseX < x - 5 + self.width
        &&  mouseY > y
        &&  mouseY < y + 25
        &&  alpha == 255;

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.hover.alpha),
        x - 5, y + 10 - this.handler.hover.height, self.width, this.handler.hover.height * 2
    );

    new Text(
        this.name,
        x, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    if (this.handler.selected) {
        Renderer.drawRect(
            Renderer.color(0, 0, 0, alpha),
            x + self.width - Renderer.getStringWidth(this.text) - 12, y - 2,
            Renderer.getStringWidth(this.text) + 1, 11
        );

        new Text(
            this.text,
            x + self.width - Renderer.getStringWidth(this.text) - 10, y
        ).setFormatted(false).setColor(Renderer.color(255, 255, 255, alpha)).draw();

        if (this.handler.cursor.step < 30) {
            var cursorPos = 
                x + self.width - 10
                - Renderer.getStringWidth(this.text) 
                + Renderer.getStringWidth(this.text.slice(0, this.handler.cursor.pos));

            Renderer.drawRect(
                Renderer.color(255, 255, 255, alpha),
                cursorPos, y - 2,
                1, 11
            );
        }
    } else {
        new Text(
            this.text,
            x + self.width - Renderer.getStringWidth(this.text) - 10, y
        ).setColor(Renderer.color(255, 255, 255, alpha)).draw();
    }

    return 25;
}

/**
 * Represents an on/off toggle setting.
 * Example usage can be found in UseExample.js
 * 
 * @constructor
 * @param {String} name the name of the setting
 * @param {boolean} value the default value of the setting
 */
Settings.prototype.Toggle = function(name, value) {
    this.type = "toggle";

    this.name = name;
    this.value = value;

    this.hidden = false;

    this.handler = {
        pos: {},
        slider: {
            x: 0,
            color: 255
        },
        hover: {
            hover: false,
            alpha: 0,
            height: 0
        }
    }
}

/**
 * Sets the setting hidden value. If hidden, it will not draw in the GUI.
 * 
 * @param {boolean} hidden new hidden value
 * @return {*} this for method chaining
 */
Setting.Toggle.prototype.setHidden = function(hidden) {
    this.hidden = hidden;
    return this;
}

/**
 * Helper function to update the setting's animations.
 * This is used internally and is not meant for public use.
 */
Setting.Toggle.prototype.update = function() {
    if (this.value) {
        this.handler.slider.x       = easeOut(this.handler.slider.x,        25,     10, 0.1);
        this.handler.slider.color   = easeOut(this.handler.slider.color,    0,      10, 1);
    } else {
        this.handler.slider.x       = easeOut(this.handler.slider.x,        0,      10, 0.1);
        this.handler.slider.color   = easeOut(this.handler.slider.color,    255,    10, 1);
    }

    if (this.handler.hover.hover) {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     130,    10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    8,      10, 0.1);
    } else {
        this.handler.hover.alpha    = easeOut(this.handler.hover.alpha,     0,      10, 1);
        this.handler.hover.height   = easeOut(this.handler.hover.height,    0,      10, 0.1);
    }
}

/**
 * Helper function to click the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {*} self 
 */
Setting.Toggle.prototype.click = function(mouseX, mouseY, self) {
    if (mouseX > this.handler.pos.x + self.width - 60 
    && mouseX < this.handler.pos.x + self.width - 10
    && mouseY > this.handler.pos.y
    && mouseY < this.handler.pos.y + 13) {
        this.value = !this.value;
        self.save();
    }
}

/**
 * Helper function to draw the setting.
 * This is used internally and is not meant for public use.
 * 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @param {number} x 
 * @param {number} y 
 * @param {number} alpha 
 * @param {*} self 
 */
Setting.Toggle.prototype.draw = function(mouseX, mouseY, x, y, alpha, self) {
    this.handler.pos = {x: x, y: y};

    this.handler.hover.hover = 
            mouseX > x - 5 
        &&  mouseX < x - 5 + self.width
        &&  mouseY > y
        &&  mouseY < y + 15
        &&  alpha == 255;

    Renderer.drawRect(
        Renderer.color(0, 0, 0, this.handler.hover.alpha),
        x - 5, y + 5 - this.handler.hover.height, self.width, this.handler.hover.height * 2
    )

    new Text(
        this.name,
        x, y
    ).setColor(Renderer.color(255, 255, 255, alpha)).draw();

    Renderer.drawRect(
        Renderer.color(0, 0, 0, alpha),
        x + self.width - 60, y - 1, 50, 13
    );

    Renderer.drawRect(
        Renderer.color(
            this.handler.slider.color,
            255 - this.handler.slider.color,
            0, alpha
        ),
        x + self.width - 60 + this.handler.slider.x, y - 1, 25, 13
    );

    new Text(
        "on",
        x + self.width - 28, y + 2
    ).setColor(
        Renderer.color(
            this.handler.slider.color,
            this.handler.slider.color,
            this.handler.slider.color,
            alpha
        )
    ).draw()

    new Text(
        "off",
        x + self.width - 55, y + 2
    ).setColor(
        Renderer.color(
            255 - this.handler.slider.color,
            255 - this.handler.slider.color,
            255 - this.handler.slider.color,
            alpha
        )
    ).draw()

    return 15;
}

module.exports = Setting