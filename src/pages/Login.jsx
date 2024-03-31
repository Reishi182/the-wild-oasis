import styled from "styled-components";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/");
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading) return <Spinner />;
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log In To Your Account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
