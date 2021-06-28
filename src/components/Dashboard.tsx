import useAuth from "../helpers/useAuth";

interface DashboardProps {
  authCode: string;
}

const Dashboard = (props: DashboardProps) => {
  const accessToken = useAuth(props.authCode);
  console.log(accessToken);
  return <div></div>;
};

export default Dashboard;
