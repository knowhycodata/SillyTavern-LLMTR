# LLMTR for SillyTavern

Adds **LLMTR** to SillyTavern's Chat Completion sources.

LLMTR is an OpenAI-compatible gateway at `https://llmtr.com/v1`. It serves models hosted in Turkey (IDs that start with `llmtr/`, for example `llmtr/qwen3-8-27b` and `llmtr/gemma-4`) and models from other vendors, such as `anthropic/claude-sonnet-5` and `deepseek/deepseek-v4-pro`.

## Requirements

- SillyTavern 1.20.0 or newer.
- An LLMTR account and API key from https://llmtr.com/dashboard/keys.

## Install

1. In SillyTavern, open **Extensions > Install extension**.
2. Paste this repository's URL and confirm.

## Connect

1. Open **API Connections** and set **API** to **Chat Completion**.
2. Under **Chat Completion Source**, pick **LLMTR** in the **Custom Providers** group.
3. Enter your API key from https://llmtr.com/dashboard/keys, or pick one you saved before.
4. Click **Connect**, then choose a model. The list is read from `https://llmtr.com/v1/models`.

## Good to know

- Model IDs include the vendor prefix, for example `llmtr/gemma-4` or `anthropic/claude-sonnet-5`.

## Support

- LLMTR: <https://llmtr.com>
- Problems with SillyTavern itself belong in the [SillyTavern issue tracker](https://github.com/SillyTavern/SillyTavern/issues).

## License

AGPL-3.0. This extension is based on the SillyTavern provider extension example, which is AGPL-3.0.
