import React, {lazy, Suspense, Component}from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import InventoryTable from "./components/InventoryTable";
import ReturnTable from "./components/ReturnItem";


const LoginPage = lazy(()=> import('./components/adminloginPage') );
const HomePage = lazy(()=> import('./components/HomePage') );
const DayFormComponent = lazy(()=> import('./components/DayFormComponent') );
const CleanFormComponent = lazy(()=> import('./components/CleanFormComponent') );
const IssuedItemsTable = lazy(()=> import('./components/IssuedItemsTable') );

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to the top of the page on route change
//   }, [pathname]);

//   return null;
// };

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


const App = () => {


  return (
    <Router>
      <ErrorBoundary>


      <Suspense fallback = {<div>Loading...</div>}>
      <Routes>
        {/* Define routes for each page */}
        <Route path = "/" element={<LoginPage/>}/>{/*adminloginpage*/}

        <Route path="/homepage" element={<HomePage />} /> {/* Home Page */}
        <Route path="/issued-items" element={<IssuedItemsTable />} /> {/*issued items table */}

        <Route path="/day-form" element={<DayFormComponent />} /> {/* Day Form */}
        <Route path="/clean-form" element={<CleanFormComponent/>} />
        <Route path="/return-table" element={<ReturnTable/>} />
        <Route path="/check-inventory" element={<InventoryTable/>} />

      </Routes>
      </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;