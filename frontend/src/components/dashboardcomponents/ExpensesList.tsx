import * as React from "react";

interface Item 
{
    key:string;
    Name: string;
    Date: any;
}
  
interface PropsType {
items: Item[];
renderer: (item: Item) => React.ReactNode;
}

function ExpensesList(props: PropsType) {
    return (
        <ul className="bg-white shadow divide-y divide-gray-200 max-w-sm min-h-0">
        {props.items.map((item) => {
            return <li className="px-6 py-4">{props.renderer(item)}</li>;
        })}
        </ul>
    );
}
export default ExpensesList;