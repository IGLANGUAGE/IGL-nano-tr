#![no_std]
#![no_main]

use core::panic::PanicInfo;
use core::arch::wasm32;

#[panic_handler]
fn panic(_: &PanicInfo) -> ! {
    wasm32::unreachable()  // Убрали unsafe
}

#[no_mangle]
pub unsafe extern "C" fn transfer(
    src: *const u8,
    dst: *mut u8,
    len: usize,
    _direction: u8,  // Префикс _ для подавления предупреждения
) -> u8 {
    if src.is_null() || dst.is_null() {
        return 1;
    }
    core::sync::atomic::fence(core::sync::atomic::Ordering::SeqCst);
    core::ptr::copy_nonoverlapping(src, dst, len);
    0
}

/// Запрос размера памяти
#[no_mangle]
pub fn memory_size() -> usize {
    core::arch::wasm32::memory_size(0) * 65536
}