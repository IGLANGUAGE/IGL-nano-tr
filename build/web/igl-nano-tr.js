// igl-nano.js
export default class NanoTR {
    static #instance;
    static #heap = new Uint8Array();
  
    static async init() {
      const { instance } = await WebAssembly.instantiateStreaming(
        fetch('nano.wasm'),
        { 
          env: {
            memory: new WebAssembly.Memory({ initial: 256 }),
            gpu_interop: (ptr, size) => {
              const data = this.#heap.subarray(ptr, ptr + size);
              return window.__igl_quant__.createGPUBuffer(data);
            }
          }
        }
      );
      this.#instance = instance.exports;
      this.#heap = new Uint8Array(this.#instance.memory.buffer);
      return this;
    }
  
    static transferToGPU(data) {
      const ptr = this.#instance.__heap_base.value;
      this.#heap.set(data, ptr);
      const gpuPtr = this.#instance.igl_transfer(
        ptr,
        ptr, // Используем как временный буфер
        data.length,
        0x00
      );
      return window.__igl_quant__.registerBuffer(gpuPtr, data.length);
    }
  }