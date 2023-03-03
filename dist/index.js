"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const _global = (globalThis !== null && globalThis !== void 0 ? globalThis : window);
let turnstileState = typeof _global.turnstile !== "undefined" ? "ready" : "unloaded";
let ensureTurnstile;
// Functions responsible for loading the turnstile api, while also making sure
// to only load it once
{
    const TURNSTILE_LOAD_FUNCTION = "cf__reactTurnstileOnLoad";
    const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    let turnstileLoad;
    const turnstileLoadPromise = new Promise((resolve, reject) => {
        turnstileLoad = { resolve, reject };
        if (turnstileState === "ready")
            resolve(undefined);
    });
    ensureTurnstile = () => {
        if (turnstileState === "unloaded") {
            turnstileState = "loading";
            _global[TURNSTILE_LOAD_FUNCTION] = () => {
                turnstileLoad.resolve();
                turnstileState = "ready";
                delete _global[TURNSTILE_LOAD_FUNCTION];
            };
            const url = `${TURNSTILE_SRC}?onload=${TURNSTILE_LOAD_FUNCTION}&render=explicit`;
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.addEventListener("error", () => {
                turnstileLoad.reject("Failed to load Turnstile.");
                delete _global[TURNSTILE_LOAD_FUNCTION];
            });
            document.head.appendChild(script);
        }
        return turnstileLoadPromise;
    };
}
function Turnstile({ id, className, style, sitekey, action, cData, theme, language, tabIndex, responseField, responseFieldName, size, retry, retryInterval, refreshExpired, userRef, onVerify, onLoad, onError, onExpire, onTimeout, }) {
    const ownRef = (0, react_1.useRef)(null);
    const inplaceState = (0, react_1.useState)({ onVerify })[0];
    const ref = userRef !== null && userRef !== void 0 ? userRef : ownRef;
    (0, react_1.useEffect)(() => {
        if (!ref.current)
            return;
        let cancelled = false;
        let widgetId = "";
        (async () => {
            var _a, _b;
            // load turnstile
            if (turnstileState !== "ready") {
                try {
                    await ensureTurnstile();
                }
                catch (e) {
                    (_a = inplaceState.onError) === null || _a === void 0 ? void 0 : _a.call(inplaceState, e);
                    return;
                }
            }
            if (cancelled || !ref.current)
                return;
            const turnstileOptions = {
                sitekey,
                action,
                cData,
                theme,
                language,
                tabindex: tabIndex,
                "response-field": responseField,
                "response-field-name": responseFieldName,
                size,
                retry,
                "retry-interval": retryInterval,
                "refresh-expired": refreshExpired,
                callback: (token) => inplaceState.onVerify(token),
                "error-callback": () => { var _a; return (_a = inplaceState.onError) === null || _a === void 0 ? void 0 : _a.call(inplaceState); },
                "expired-callback": () => { var _a; return (_a = inplaceState.onExpire) === null || _a === void 0 ? void 0 : _a.call(inplaceState); },
                "timeout-callback": () => { var _a; return (_a = inplaceState.onTimeout) === null || _a === void 0 ? void 0 : _a.call(inplaceState); },
            };
            widgetId = window.turnstile.render(ref.current, turnstileOptions);
            (_b = inplaceState.onLoad) === null || _b === void 0 ? void 0 : _b.call(inplaceState, widgetId);
        })();
        return () => {
            cancelled = true;
            if (widgetId)
                window.turnstile.remove(widgetId);
        };
    }, [
        sitekey,
        action,
        cData,
        theme,
        language,
        tabIndex,
        responseField,
        responseFieldName,
        size,
        retry,
        retryInterval,
        refreshExpired,
    ]);
    (0, react_1.useEffect)(() => {
        inplaceState.onVerify = onVerify;
        inplaceState.onLoad = onLoad;
        inplaceState.onError = onError;
        inplaceState.onExpire = onExpire;
        inplaceState.onTimeout = onTimeout;
    }, [onVerify, onLoad, onError, onExpire, onTimeout]);
    return react_1.default.createElement("div", { ref: ref, id: id, className: className, style: style });
}
exports.default = Turnstile;
//# sourceMappingURL=index.js.map