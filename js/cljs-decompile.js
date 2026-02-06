// =============================================================================
// GOOGLE CLOSURE LIBRARY - BASE UTILITIES (Readable Version)
// =============================================================================

// Global setup
const IS_COMPILED = true;
const goog = goog || {};

goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";

// -----------------------------------------------------------------------------
// Namespace declaration
// -----------------------------------------------------------------------------

goog.provide = function(namespace) {
    if (!IS_COMPILED) {
        if (isNamespaceAlreadyProvided(namespace)) {
            throw new Error(`Namespace "${namespace}" already declared.`);
        }

        delete goog.implicitNamespaces[namespace];

        let parent = namespace;
        while ((parent = parent.substring(0, parent.lastIndexOf("."))) &&
               !getGlobalObject(parent)) {
            goog.implicitNamespaces[parent] = true;
        }
    }

    exportPathToGlobal(namespace);
};

// Test-only code protection
goog.setTestOnly = function(optionalMessage) {
    if (IS_COMPILED && !goog.DEBUG) {
        const msg = optionalMessage ? `: ${optionalMessage}` : ".";
        throw new Error("Importing test-only code into non-debug environment" + msg);
    }
};

// -----------------------------------------------------------------------------
// DEBUG UTILITIES (only when not compiled)
// -----------------------------------------------------------------------------

if (!IS_COMPILED) {
    goog.isProvided_ = function(namespace) {
        return !goog.implicitNamespaces[namespace] && !!getGlobalObject(namespace);
    };

    goog.implicitNamespaces_ = {};
}

// -----------------------------------------------------------------------------
// Export path (creates nested objects in global scope)
// -----------------------------------------------------------------------------

goog.exportPath_ = function(name, value, rootObject) {
    const parts = name.split(".");
    let current = rootObject || goog.global;

    if (!(parts[0] in current) && current.execScript) {
        current.execScript("var " + parts[0]);
    }

    for (let part; parts.length && (part = parts.shift());) {
        if (parts.length === 0 && value !== undefined) {
            current[part] = value;
        } else {
            current = current[part] || (current[part] = {});
        }
    }
};

// -----------------------------------------------------------------------------
// Get object by dotted path
// -----------------------------------------------------------------------------

goog.getObjectByName = function(name, scope) {
    const parts = name.split(".");
    let current = scope || goog.global;

    for (let part; (part = parts.shift());) {
        if (current[part] != null) {
            current = current[part];
        } else {
            return null;
        }
    }

    return current;
};

// =============================================================================
// TYPE CHECKING UTILITIES
// =============================================================================

goog.typeOf = function(value) {
    const t = typeof value;

    if (t === "object") {
        if (!value) return "null";
        if (value instanceof Array) return "array";
        if (value instanceof Object) return t;

        const className = Object.prototype.toString.call(value);

        if (className === "[object Window]") return "object";

        if (className === "[object Array]" ||
            (typeof value.length === "number" &&
             typeof value.splice !== "undefined" &&
             typeof value.propertyIsEnumerable !== "undefined" &&
             !value.propertyIsEnumerable("splice"))) {
            return "array";
        }

        if (className === "[object Function]" ||
            (typeof value.call !== "undefined" &&
             typeof value.propertyIsEnumerable !== "undefined" &&
             !value.propertyIsEnumerable("call"))) {
            return "function";
        }
    }

    if (t === "function" && typeof value.call === "undefined") {
        return "object";
    }

    return t;
};

// Simple type helpers
goog.isDef = v => v !== undefined;
goog.isNull = v => v === null;
goog.isDefAndNotNull = v => v != null;
goog.isArray = a => goog.typeOf(a) === "array";
goog.isArrayLike = a => {
    const t = goog.typeOf(a);
    return t === "array" || (t === "object" && typeof a.length === "number");
};
goog.isString = s => typeof s === "string";
goog.isNumber = n => typeof n === "number";
goog.isFunction = f => goog.typeOf(f) === "function";
goog.isObject = o => {
    const t = typeof o;
    return (t === "object" && o != null) || t === "function";
};

// =============================================================================
// APPLICATION-SPECIFIC CODE (Shoelace / Grid Editor)
// =============================================================================

// -----------------------------------------------------------------------------
// Example: Row creation logic (originally obfuscated)
// -----------------------------------------------------------------------------

function createRowElements() {
    // Creates a new row in the layout editor
    // Returns: [rowId, rowDomElement, ...]
    // (Original logic not available)
}

// -----------------------------------------------------------------------------
// Main workspace initialization
// -----------------------------------------------------------------------------

function initializeShoelaceEditor() {
    const layoutAtom = shoelace.client.layout;     // Reagent atom with layout state
    const settingsAtom = shoelace.client.settings; // Reagent atom with settings

    const previewContainer = document.querySelector(".preview-area");
    const codeOutputElement = document.querySelector(".output-code");

    // Watch layout changes → update output + preview
    cljs.core.add_watch.call(null, layoutAtom, "update-output", function() {
        updateOutputAndPreview();
    });

    // Watch media mode changes → update preview
    cljs.core.add_watch.call(
        null,
        settingsAtom,
        "media-mode-change",
        function(oldVal, newVal) {
            updatePreviewForMediaSize(newVal);
        }
    );

    // Initial render
    updateOutputAndPreview();
}

// -----------------------------------------------------------------------------
// Main output update function
// -----------------------------------------------------------------------------

function updateOutputAndPreview() {
    const settings = cljs.core.deref(settingsAtom);
    const layout = cljs.core.deref(layoutAtom);

    const mode = settings.outputMode;
    const useLessMixin = settings.useLessMixin;
    const includeContainer = settings.includeContainer;

    let generatedCode;

    switch (mode) {
        case ":html":
            generatedCode = convertLayoutToHtml(layout, includeContainer, useLessMixin);
            codeOutputElement.textContent = html_beautify(generatedCode);
            break;

        case ":jade":
            generatedCode = convertLayoutToJade(layout, includeContainer, useLessMixin);
            break;

        case ":edn":
            generatedCode = convertLayoutToEDN(layout);
            break;

        default:
            console.error("Unknown output mode:", mode);
    }

    updateLivePreview();

    if (useLessMixin) {
        updateLessMixinDisplay();
    }
}

// =============================================================================
// Layout Conversion Utilities
// =============================================================================

function convertLayoutToHtml(layout, includeContainer, useLess) {
    // Converts layout → HTML
    // (Original logic not available)
}

function convertLayoutToJade(layout, includeContainer, useLess) {
    // Converts layout → Jade/Pug
    // (Original logic not available)
}

function convertLayoutToEDN(layout) {
    return pr_str(layout);
}

// =============================================================================
// Application Initialization
// =============================================================================

function main() {
    if (window.location.pathname === "/preview/") {
        loadAndRenderPreviewOnly();
    } else {
        initializeWorkspaceEditor();
        loadWorkspaceFromGistIfPresent();
    }
}

main();
