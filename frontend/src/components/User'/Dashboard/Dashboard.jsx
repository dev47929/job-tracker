import table from "flyonui/components/table";
import { useContext } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";

const Dashboard = () =>{
    

    return (
        <>
        
        <div className="flex flex-row gap-5 justify-between items-center">
        <div className="flex flex-row gap-5 justify-start items-center">
        <Sidebar></Sidebar>
            <h1 className="m-3 mb-4 text-4xl font-bold tracking-tight text-heading md:text-4xl lg:text-5xl">My Dashboard</h1>
        </div>
<p class="text-lg font-normal text-body lg:text-xl mr-3">JobStack</p></div>

        <Table></Table>
        
        </>

        
    )
}

export default Dashboard;