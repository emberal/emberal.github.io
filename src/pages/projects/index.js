import * as React from "react";
import Layout from "../../layouts/Layout";

const Index = () => {
    return(
        <Layout
            title={"Prosjekter"}
            headline={"Mine prosjekter"}
            children={
                <div>
                    Her er mine prosjekter :D
                </div>
            }/>
    )
}

export default Index
