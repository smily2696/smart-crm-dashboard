import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


interface User {

  _id: string;

  name: string;

  email: string;

  role: string;
}


interface AuthContextType {

  user: User | null;

  token: string | null;

  login: (
    token: string,
    userData: User
  ) => void;

  logout: () => void;
}


const AuthContext =
  createContext<AuthContextType | null>(
    null
  );


export const AuthProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);


  // RESTORE USER AFTER REFRESH
  useEffect(() => {

    try {

      const storedToken =
        localStorage.getItem("token");

      const storedUser =
        localStorage.getItem("user");


      if (
        storedToken &&
        storedUser &&
        storedUser !== "undefined"
      ) {

        setToken(storedToken);

        setUser(
          JSON.parse(storedUser)
        );
      }

    } catch (error) {

      console.log(
        "Invalid localStorage data"
      );

      localStorage.removeItem("user");

      localStorage.removeItem("token");
    }

  }, []);


  // LOGIN
  const login = (
    token: string,
    userData: User
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setToken(token);

    setUser(userData);
  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);

    window.location.href =
      "/login";
  };


  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        login,

        logout

      }}
    >

      {children}

    </AuthContext.Provider>
  );
};


export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};