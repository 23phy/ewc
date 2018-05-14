#include <napi.h>
#include <dwmapi.h>
#include <VersionHelpers.h>

struct ACCENTPOLICY
{
	int nAccentState;
	int nFlags;
	int nColor;
	int nAnimationId;
};

struct WINCOMATTRPDATA {
	int nAttribute;
	PVOID pData;
	ULONG ulDataSize;
};

enum WINCOMPATTR {
	WCA_ACCENT_POLICY = 19
};

enum ACCENTTYPES {
	ACCENT_DISABLE = 0,
	ACCENT_ENABLE_GRADIENT = 1,
	ACCENT_ENABLE_TRANSPARENTGRADIENT = 2,
	ACCENT_ENABLE_BLURBEHIND = 3,
	ACCENT_ENABLE_ACRYLICBLURBEHIND = 4,
	ACCENT_INVALID_STATE = 5
};

Napi::Value SetAcrylic(Napi::Env env, HWND hwnd, int tint, bool state) {
	Napi::Value result = Napi::Boolean::New(env, false);

	if (IsWindows10OrGreater() && state) {
		const HINSTANCE hModule = LoadLibrary(TEXT("user32.dll"));
		if (hModule) {
			typedef BOOL(WINAPI* pSetWindowCompositionAttribute)(HWND, WINCOMATTRPDATA*);
			const pSetWindowCompositionAttribute SetWindowCompositionAttribute = (pSetWindowCompositionAttribute)GetProcAddress(hModule, "SetWindowCompositionAttribute");
			if (SetWindowCompositionAttribute) {
				ACCENTPOLICY policy;
				policy.nAccentState = ACCENT_ENABLE_ACRYLICBLURBEHIND;
				policy.nColor = tint;


				WINCOMATTRPDATA data;
				data.nAttribute = WCA_ACCENT_POLICY;
				data.ulDataSize = sizeof(policy);
				data.pData = &policy;

				
				bool resultTemp = SetWindowCompositionAttribute(hwnd, &data);
				result = Napi::Boolean::New(env, resultTemp);
			}
			FreeLibrary(hModule);
		}
	}
	return result;
}

Napi::Value Acrylic(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();
	
	if (info.Length() < 3) {
		Napi::TypeError::New(env, "Wrong number of arguments.").ThrowAsJavaScriptException();
		return env.Null();
	}

	if (!info[0].IsObject() || !info[1].IsNumber() || !info[2].IsBoolean()) {
		Napi::TypeError::New(env, "Bad arguments.").ThrowAsJavaScriptException();
		return env.Null();
	}

	// Window handler, first parameter of the function SetAcrylic
	Napi::Uint32Array windowHandler = info[0].As<Napi::Uint32Array>();

	// The tint color as hexadecimal, the second parameter
	int32_t tint = info[1].As<Napi::Number>().Int32Value();

	Napi::Boolean state = info[2].As<Napi::Boolean>().ToBoolean();

	uint32_t handle = *windowHandler.Data();
	HWND hwnd = (HWND)handle;

	return SetAcrylic(env, hwnd, tint, state);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(
		Napi::String::New(env, "SetAcrylic"),
		Napi::Function::New(env, Acrylic)
	);
	return exports;
}

NODE_API_MODULE(Acrylic, Init)