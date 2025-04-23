# igl_nano.py
from wasmtime import Store, Module, Instance, WasiConfig
import threading

class NanoTR:
    _lock = threading.Lock()
    
    def __init__(self):
        self.store = Store()
        self.module = Module.from_file(self.store, 'nano.wasm')
        self.instance = Instance(self.store, self.module, {})
        
    def transfer(self, src: bytes, dst_ptr: int, dir: int) -> int:
        with self._lock:
            heap = self.instance.exports.memory.data_ptr(self.store)
            ctypes.memmove(heap, src, len(src))
            return self.instance.exports.igl_transfer(
                heap, dst_ptr, len(src), dir
            )