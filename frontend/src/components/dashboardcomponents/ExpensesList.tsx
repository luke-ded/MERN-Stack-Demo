import * as React from "react";
import { useNavigate } from 'react-router-dom';

interface Item 
{
    key:string;
    Name: string;
    Date: any;
}
  
interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}



function ExpensesList(props: PropsType) 
{
    const navigate = useNavigate();

    function navFinancials()
    {
        navigate('/financials');
    }

    return (
        <ul className="shadow divide-y divide-[#7f8fb5] max-w-sm min-h-0 border-b border-[#6d91e8]">
        {props.items.map((item) => {
            return <li onClick={navFinancials} className="px-[2vw] py-[1vh] cursor-pointer">{props.renderer(item)}</li>;
        })}
        </ul>
    );
}
export default ExpensesList;