import React, { createContext, useEffect, useState } from 'react';

export const Data = createContext();

const DataProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    let idb = indexedDB.open("WS-Data", 2);

    idb.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("employee")) {
        db.createObjectStore("employee", {
          keyPath: "id",
          autoIncrement: true
        });
      }
    };

    idb.onsuccess = () => {
      const db = idb.result;
      setDb(db);
      setDbReady(true);
    };

    idb.onerror = (event) => {
      console.error("Error opening IndexedDB:", event.target.error);
    };
  }, []);

  const createEmployee = (name, email, password) => {
    if (!db) {
      console.error("Database not initialized yet.");
      return;
    }

    if (!db.objectStoreNames.contains("employee")) {
      console.error("Employee object store does not exist.");
      return;
    }

    const tx = db.transaction("employee", "readwrite");
    const store = tx.objectStore("employee");
    const emp = {
      name, email, password, taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0,
      }, tasks: []
    };

    const request = store.add(emp);

    request.onsuccess = () => {
      alert("Employee added successfully");
    };

    request.onerror = (e) => {
      console.error("Error adding employee:", e.target.error);
    };
  };

  const getLoginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!db || !db.objectStoreNames.contains("employee")) {
        reject("DB not ready or employee store missing");
        return;
      }

      const tx = db.transaction("employee", "readonly");
      const store = tx.objectStore("employee");
      const request = store.getAll();

      request.onsuccess = () => {
        const employees = request.result;
        const user = employees.find(emp => emp.email === email && emp.password === password);
        if (user) {
          setUserId(user.id);
          resolve(user.id);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject("Error while fetching employees");
      };
    });
  };

  const getUserDetails = (id) => {
    return new Promise((resolve, reject) => {
      if (!db || !db.objectStoreNames.contains("employee")) {
        reject("DB not ready or employee store missing");
        return;
      }

      const tx = db.transaction("employee", "readonly");
      const store = tx.objectStore("employee");
      const request = store.getAll();

      request.onsuccess = () => {
        const employees = request.result;
        const user = employees.find(emp => emp.id === id);
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject("Error while fetching employees");
      };
    });
  };

  const getAllData = () => {
    return new Promise((resolve, reject) => {
      if (!db || !db.objectStoreNames.contains("employee")) {
        reject("DB not ready or employee store missing");
        return;
      }

      const tx = db.transaction("employee", "readonly");
      const store = tx.objectStore("employee");
      const request = store.getAll();

      request.onsuccess = () => {
        const employees = request.result;
        if (employees) {
          resolve(employees);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        reject("Error while fetching employees");
      };
    });
  };

  const getIdByName = (name) => {
    return new Promise((resolve, reject) => {
      if (!db || !db.objectStoreNames.contains("employee")) {
        reject("DB not ready or employee store missing");
        return;
      }
  
      const tx = db.transaction("employee", "readonly");
      const store = tx.objectStore("employee");
      const request = store.getAll();
  
      request.onsuccess = () => {
        const employees = request.result;
        const user = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());
        if (user) {
          resolve(user.id);
        } else {
          resolve(null);
        }
      };
  
      request.onerror = () => {
        reject("Error while searching for employee by name");
      };
    });
  };
  
  const createTask = (id, newTaskData) => {
    if (!db || !db.objectStoreNames.contains("employee")) {
      console.error("DB not ready or employee store missing");
      return;
    }
  
    const tx = db.transaction("employee", "readwrite");
    const store = tx.objectStore("employee");
  
    const getRequest = store.get(id);
  
    getRequest.onsuccess = () => {
      const user = getRequest.result;
  
      if (!user) {
        console.error("User not found");
        return;
      }
  
      if (!user.taskCounts) user.taskCounts = {};
      if (!user.tasks) user.tasks = [];
  
      user.taskCounts.newTask = (user.taskCounts.newTask || 0) + 1;
      user.tasks.push(newTaskData);
  
      const updateRequest = store.put(user);
  
      updateRequest.onsuccess = () => {
        console.log("Task added and user updated successfully");
      };
  
      updateRequest.onerror = (e) => {
        console.error("Error updating user:", e.target.error);
      };
    };
  
    getRequest.onerror = (e) => {
      console.error("Error getting user:", e.target.error);
    };
  };

  const updateUser = (id, updatedUser) => {
    if (!db || !db.objectStoreNames.contains("employee")) {
      console.error("DB not ready or employee store missing");
      return;
    }
  
    const tx = db.transaction("employee", "readwrite");
    const store = tx.objectStore("employee");
  
    const request = store.put(updatedUser); 
  
    request.onsuccess = () => {
      console.log("User updated successfully");
    };
  
    request.onerror = (e) => {
      console.error("Error updating user:", e.target.error);
    };
  };

  return (
    <Data.Provider value={{ createEmployee, getLoginUser, getUserDetails, setUserId, userId, dbReady, getAllData, getIdByName, updateUser, createTask}}>
      {children}
    </Data.Provider>
  );
};

export default DataProvider;
