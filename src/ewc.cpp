#include <napi.h>
#include "swca.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	return swca::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)


