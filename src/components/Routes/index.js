import {
  Routes,
  Route,
} from "react-router-dom";
import { CustomerAttributes } from "../Pages/CustomerAttributes";
import { CustomersTable } from "../Pages/CustomersTable/CustomersTable";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<CustomersTable />} />
      </Routes>

      <Routes>
        <Route exact path="/customer/attributes" element={<CustomerAttributes />} />
      </Routes>
    </>
  )
}