#include <napi.h>
#include <dwmapi.h>
#include <VersionHelpers.h>

#include <iostream>
#include <fstream>

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

	if (IsWindowsXPSP1OrGreater()) {
		const HINSTANCE hModule = LoadLibrary(TEXT("user32.dll"));
		if (hModule)
		{
			typedef BOOL(WINAPI* pSetWindowCompositionAttribute)(HWND, WINCOMATTRPDATA*);
			const pSetWindowCompositionAttribute SetWindowCompositionAttribute = (pSetWindowCompositionAttribute)GetProcAddress(hModule, "SetWindowCompositionAttribute");
			if (SetWindowCompositionAttribute)
			{
				ACCENTPOLICY policy;
				policy.nAccentState = ACCENT_ENABLE_ACRYLICBLURBEHIND;
				policy.nColor = 0x808080;


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
		Napi::TypeError::New(env, "Bad arguments placement.").ThrowAsJavaScriptException();
		return env.Null();
	}

	auto tint = info[1].As<Napi::Number>().Int32Value();
	std::cout << "TINT: " << tint << std::endl;
	auto state = info[2].As<Napi::Boolean>().ToBoolean();
	std::cout << "STATE: " << state << std::endl;

	auto ab = info[0].As<Napi::Object>();

	std::cout << "ab: " << ab.ToString() << std::endl;

	// TODO: arraybuffer to unsigned char*
	// unsigned char* windowHandleBuffer = reinterpret_cast<unsigned char*>(ab.Data());
	// std::cout << "The windowHandleBuffer" << windowHandleBuffer << std::endl;
	auto abc = info[0].As<Napi::ArrayBuffer>();


	uint32_t handle = *reinterpret_cast<uint32_t*>((unsigned char*)abc.Data());
	HWND hwnd = (HWND)handle;
	std::cout << "HWND: " << hwnd;

	

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