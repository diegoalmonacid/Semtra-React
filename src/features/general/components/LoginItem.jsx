import { WhiteCard } from "../../../components/ui/WhiteCard";
import { OutlookButton } from "./OutlookButton";
import { useUser } from "../../../context/UserContext";
import { Navigate } from "react-router-dom";
const AUTH_URL = 'http://localhost:3000/api/auth/microsoft'


export const LoginItem = () => {
  const { user } = useUser();
  if ( user ) {
    return Navigate('/home');
  }
  const handleLogin = async () => {
      window.location.href = AUTH_URL;
    }
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
      <WhiteCard>
        <h1 className="text-2xl font-semibold text-center mb-4">
          Bienvenido al portal <br/> SEMTRA
        </h1>
        <div className="mt-16 mb-4">
          <OutlookButton onClick={handleLogin}/>
        </div>
      </WhiteCard>
      </div>
    );
}
