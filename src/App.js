import "./App.css";
import LayoutWrapper from "./components/LayoutWrapper/LayoutWrapper";
import Search from "./components/Search/Search";
import EmpCards from "./components/Cards/EmpCards";

const App = () => {
  return (
    <LayoutWrapper>
      <Search />
      <EmpCards />
    </LayoutWrapper>
  );
};
export default App;
