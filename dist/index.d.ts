import React from "react";
import { SupportedLanguages } from "turnstile-types";
export default function Turnstile({ id, className, style, sitekey, action, cData, theme, language, tabIndex, responseField, responseFieldName, size, retry, retryInterval, refreshExpired, userRef, onVerify, onLoad, onError, onExpire, onTimeout, }: TurnstileProps): JSX.Element;
interface TurnstileProps extends TurnstileCallbacks {
    sitekey: string;
    action?: string;
    cData?: string;
    theme?: "light" | "dark" | "auto";
    language?: SupportedLanguages | "auto";
    tabIndex?: number;
    responseField?: boolean;
    responseFieldName?: string;
    size?: "normal" | "invisible" | "compact";
    retry?: "auto" | "never";
    retryInterval?: number;
    refreshExpired?: "auto" | "manual" | "never";
    id?: string;
    userRef?: React.MutableRefObject<HTMLDivElement>;
    className?: string;
    style?: React.CSSProperties;
}
interface TurnstileCallbacks {
    onVerify: (token: string) => void;
    onLoad?: (widgetId: string) => void;
    onError?: (error?: Error | any) => void;
    onExpire?: () => void;
    onTimeout?: () => void;
}
export {};
