#include <napi.h>
#include <dwmapi.h>
#include <cstdint>

struct ACCENTPOLICY {
	int32_t nAccentState;
	int32_t nFlags;
	uint32_t nColor;
	int32_t nAnimationId;
};

struct WINCOMATTRPDATA {
	int32_t nAttribute;
	void* pData;
	uint32_t ulDataSize;
};

enum WINCOMPATTR {
	WCA_ACCENT_POLICY = 19
};

namespace swca {
    typedef BOOL(WINAPI* pSWCA)(HWND, WINCOMATTRPDATA*);
    static pSWCA SWCA = (pSWCA)GetProcAddress(GetModuleHandle(TEXT("user32.dll")), "SetWindowCompositionAttribute");

    Napi::Value setComposition(const Napi::CallbackInfo& info);
    Napi::Object Init(Napi::Env env, Napi::Object exports);
}