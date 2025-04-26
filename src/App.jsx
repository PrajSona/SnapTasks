import { useContext, useEffect, useState } from 'react';
import Login from './component/Auth/Login';
import EmployeeDashboard from './component/Dashboard/EmployeeDashboard';
import AdminDashboard from './component/Dashboard/AdminDashboard';
import { Data } from './Context/DataProvider';

function App() {
  const [user, setUser] = useState(null);
  const { getLoginUser, dbReady } = useContext(Data);

  useEffect(() => {
    const checkLogin = async () => {
      const login = localStorage.getItem("login");
      if (dbReady && login) {
        if (login === "Admin") {
          setUser("Admin");
        } else if (JSON.parse(login).employee) {
          setUser("Employee");
        }
      }
    };

    checkLogin();
  }, [dbReady]);

  const handleLogin = async (email, password) => {
    if (email === "praj@admin.com" && password === "admin123") {
      setUser("Admin");
      localStorage.setItem("login", "Admin");
      return;
    }

    const userId = await getLoginUser(email, password);
    if (userId) {
      setUser("Employee");
      localStorage.setItem("login", JSON.stringify({ employee: "employee", id: userId }));
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      {!user ? <Login loginUser={handleLogin} /> : (
        user === "Admin" ? <AdminDashboard logout={setUser} /> : <EmployeeDashboard logout={setUser} />
      )}
    </>
  );
}

export default App;
