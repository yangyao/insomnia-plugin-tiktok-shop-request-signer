## How to use:

### 1. Install the plugin in Insomnia.

Applications->Preferences->Plugins

NPM package name: "insomnia-plugin-tiktok-shop-request-signer"

### 2. Setup the environment variable.

```
{
	"app_key": "your openKeyId",
	"app_secret": "your secretKey",
	"shop_id": "your shop id"
}
```

### 3. Enable request signature.
For the requests that require the signature, you'll need to include the header `x-tts-sign` with the value `true`