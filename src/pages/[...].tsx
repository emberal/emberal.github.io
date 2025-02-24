import * as React from "react"

const Homepage: Component = ()=> {
    if (typeof window !== "object") return <div>Server</div>
    window.location.replace("https://martials.no")
    return (
        <div>Bye</div>
    );
};

export default Homepage;

export const Head = () => <meta http-equiv="refresh" content="0;url=https://martials.no" />;

