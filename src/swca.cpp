#include "swca.h";

Napi::Value swca::setComposition(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Value returnValue = Napi::Boolean::New(env, false);

    if(swca::SWCA) {
        HWND hwnd = *reinterpret_cast<HWND *>(info[0].As<Napi::Uint32Array>().Data());

        ACCENTPOLICY policy;
        policy.nAccentState = static_cast<int32_t>(info[1].ToNumber());
        policy.nFlags = 2;
        policy.nColor = static_cast<uint32_t>(info[2].ToNumber());
        policy.nAnimationId = 0;

        WINCOMATTRPDATA data;
        data.nAttribute = WCA_ACCENT_POLICY;
        data.pData = &policy;
        data.ulDataSize = sizeof(policy);

        returnValue = Napi::Boolean::New(env, SWCA(hwnd, &data));
    }

    return returnValue;
}

Napi::Object swca::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("setComposition", Napi::Function::New(env, swca::setComposition));

    return exports;
}