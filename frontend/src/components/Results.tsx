

function Results(){


    
    return(
        <div id = "results">

            <span id = "visualTitle" className = "font-[Lucida Sans] font-bold text-[3vh] text-[#ffffff]"> Your Income</span>

            <div id = "tableResult">
                <br></br>

                <table className = "absolute left-[5%] w-[90%] border border-black border-collapse">
                    <tr className = "">
                        <th className="border border-black border-collapse">
                            Income
                        </th>

                        <th className="border border-black border-collapse">
                            Manage Income
                        </th>
                    </tr>
                </table>
            </div>

        </div>
    );
}


export default Results;