import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [dataStorage, setDataStorage] = useState(null);
  const [dataCache, setDataCache] = useState([]);

  const updateDataStorage = data => {
    setDataStorage(data);
  };
  /*   const updateDataCache = data => {
    setDataCache(data);
  }; */

  const getItemsAmount = () => {
    const getItemsPerScreen = () => {
      const VIEWPORT_HEIGHT = window.innerHeight;
      const HEADER_HEIGHT = 80;
      const ITEM_HEIGHT = 134.5;

      for (let i = 1; i > 0; i++) {
        const count = VIEWPORT_HEIGHT - HEADER_HEIGHT - ITEM_HEIGHT * i;
        if (count < 0) {
          // console.log(i - 1);
          const itemsPerScreen = i - 1;
          return itemsPerScreen;
        }
      }
    };

    const getItemsToLoad = itemsPerScreen => {
      return itemsPerScreen + itemsPerScreen / 2 + 1;
    };

    return getItemsToLoad(getItemsPerScreen());
  };

  useEffect(
    (itemsToLoad = getItemsAmount()) => {
      if (dataStorage && dataStorage.length <= itemsToLoad) {
        setDataCache({
          items: dataStorage,
          hasMore: false
        });
      } else {
        const dataChunk = dataStorage && dataStorage.slice(0, itemsToLoad);
        setDataCache({
          items: dataChunk,
          hasMore: true
        });
      }
    },
    [dataStorage]
  );

  const fetchMoreData = () => {
    if (dataCache.items.length >= dataStorage.length) {
      setDataCache({ items: [...dataCache.items], hasMore: false });
      return;
    }
    setTimeout(() => {
      const newDataChunk = dataStorage.slice(
        dataCache.items.length,
        dataCache.items.length + 5
      );
      const newData = [...dataCache.items, ...newDataChunk];
      setDataCache({
        items: newData,
        hasMore: true
      });
    }, 500);
  };

  return (
    <DataContext.Provider
      value={{
        dataStorage,
        updateDataStorage,
        dataCache,
        fetchMoreData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
