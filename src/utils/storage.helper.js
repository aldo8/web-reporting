const getStorage = key => {
    try {
      if (key) {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
      }
      return {};
    } catch (err) {
      console.log('getStorageError', err);
      return {};
    }
  };

const setStorage = async (key,payload) => {
  console.log('storage',key,payload)
    try {
        if (key && payload) {
            const data = JSON.stringify(payload);
            await localStorage.setItem(key,data);    
        }
    } catch (err) {
        console.log('setStorageError:', err)
    }
};

const removeStorage = async (key) => {
  try {
    await localStorage.removeItem(key);
  } catch (err) {
    console.log('removeStorage', err);
  }
}
export {setStorage,getStorage,removeStorage};