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
You don't need to add the timestamp and sign fields in the request parameters.

![image](https://user-images.githubusercontent.com/5866775/236987121-9fc0f37c-6958-4206-a9df-89bc78484eda.png)


![image](https://user-images.githubusercontent.com/5866775/236986940-12c83874-f9b7-42a3-b5e1-64dac74acc5c.png)
