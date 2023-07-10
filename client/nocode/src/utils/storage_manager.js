
export class StorageManager {

    data_in_mem = {}

    setItemInMem(key, value) {
        this.data_in_mem[key] = value
    }

    getItemInMem(key) {
        return this.data_in_mem[key]
    }

}