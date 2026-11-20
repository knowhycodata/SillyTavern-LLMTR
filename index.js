/**
 * LLMTR provider for SillyTavern.
 *
 * Adds LLMTR to the Chat Completion source list, in the "Custom Providers" group.
 * It is a Custom (OpenAI-compatible) connection with the LLMTR endpoint filled in.
 * The extension never connects on its own and never stores or reads a key.
 *
 * Based on the SillyTavern provider extension example (AGPL-3.0).
 */

/* global SillyTavern */

/** @typedef {import('../../../custom-providers.js').CustomProviderDefaults} CustomProviderDefaults */
/** @typedef {import('../../../custom-providers.js').ModelSetup} ModelSetup */
/** @typedef {import('../../../custom-providers.js').AuthPolicy} AuthPolicy */
/** @typedef {import('../../../custom-providers.js').Registration} Registration */

// Saved connections refer to this id, so it must not change.
const PROVIDER_ID = 'llmtr';
const PROVIDER_LABEL = 'LLMTR';

/** @type {CustomProviderDefaults} */
const CONNECTION = {
    custom_url: 'https://llmtr.com/v1',
};

/** @type {ModelSetup} */
const MODELS = {
    mode: 'discover',
    suggestions: [
        { id: 'llmtr/qwen3-8-27b', label: 'Qwen 3.8 27B (hosted in Turkey)' },
        { id: 'llmtr/gemma-4', label: 'Gemma 4 (hosted in Turkey)' },
        { id: 'llmtr/trendyol-asure-12b', label: 'Trendyol Asure 12B (hosted in Turkey)' },
        { id: 'anthropic/claude-sonnet-5', label: 'Claude Sonnet 5' },
        { id: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro' },
    ],
};

/** @type {AuthPolicy} */
const AUTH = { mode: 'bearer', required: true };

const NOTE = 'Create an API key at https://llmtr.com/dashboard/keys';

const LOG_PREFIX = `[Provider: ${PROVIDER_LABEL}]`;
/** @type {Registration|null} */
let registration = null;

/** Runs on "activate" and "enable". Both can fire, so registering twice must be harmless. */
export function onActivate() {
    if (registration) {
        return;
    }

    const { customProviders } = SillyTavern.getContext();
    if (!customProviders || customProviders.apiVersion !== 1) {
        console.warn(`${LOG_PREFIX} This SillyTavern version does not support Custom providers (API version 1). Nothing was added.`);
        return;
    }

    try {
        registration = customProviders.register(PROVIDER_ID, {
            label: PROVIDER_LABEL,
            defaults: CONNECTION,
            models: MODELS,
            auth: AUTH,
            note: NOTE,
        });
    } catch (error) {
        console.error(`${LOG_PREFIX} Could not register the provider:`, error);
    }
}

/** Runs on "disable", "delete" and "clean". Connections the user saved keep working without the extension. */
export function onDisable() {
    if (!registration) {
        return;
    }

    registration.unregister();
    registration = null;
}
