import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const DashboardPie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Puchase pie chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default DashboardPie;
