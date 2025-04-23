# IGL-nano-tr
Минимальный WASM-транспортёр для связки IGL-Quant и IGL-Q (377 байт).  

 🔥 Особенности  
- Размер: 0.5 КБ (сжатый WASM).  
- Zero-Copy: Прямая передача между CPU/GPU/QPU.  
- Поддержка:  
  - Браузеры (WebAssembly).  
  - IoT (WASI).  

 🚀 Быстрый старт  
```bash
git clone https://github.com/IGLANGUAGE/igl-nano-tr  
cd igl-nano-tr  
wasm-pack build --target web

```rust
#[no_mangle]
pub unsafe fn transfer(src: *const u8, dst: *mut u8, len: usize) -> u8
