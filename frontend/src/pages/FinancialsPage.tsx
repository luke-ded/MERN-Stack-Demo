import Finances from '../components/Finances.tsx';
import NavBar from '../components/NavBar.tsx';
import VisualFinances from '../components/VisualFinances.tsx';
import Results from '../components/Results.tsx';
import Expresults from '../components/ExpResults.tsx';


const FinancialsPage = () => {

  return (
    <div className = "absolute top-0 left-0 h-full w-full bg-[rgba(0,26,51,1)]">
         <NavBar />

         <div className = "block fixed top-[28%] left-2/7 w-[30%] h-[41%] min-h-fit bg-[rgba(17,18,23,0.9)] border border-[#6d91e8] border-[1.5px] rounded-[2%] text-center transform -translate-x-1/2 -translate-y-1/2" id ="FinanceBar">
          <Finances />
        </div>

        <div className = "block fixed top-[29.5%] left-[70%] w-[30%] h-[44%] min-h-fit bg-[rgba(17,18,23,0.9)] border border-[#6d91e8] border-[1.5px] rounded-[2%] text-center transform -translate-x-1/2 -translate-y-1/2" id = "VisualBar">
          <VisualFinances />
        </div>

        <div className = "block fixed top-[76%] left-2/7 w-[30%] h-[40%] min-h-fit bg-[rgba(17,18,23,0.9)] border border-[#6d91e8] border-[1.5px] rounded-[2%] text-center transform -translate-x-1/2 -translate-y-1/2" id = "ResultsBar">
          <Results />
        </div>

        <div className = "block fixed top-[76%] left-[70%] w-[30%] h-[40%] min-h-fit bg-[rgba(17,18,23,0.9)] border border-[#6d91e8] border-[1.5px] rounded-[2%] text-center transform -translate-x-1/2 -translate-y-1/2" id = "ExpResultsBar">
            <Expresults />
        </div>
    </div>
  );
};

export default FinancialsPage;
