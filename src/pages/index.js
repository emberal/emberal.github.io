import * as React from "react"
import Layout from "../layouts/Layout";

const IndexPage = () => {
  return (
      <Layout
          title={"Hjem"}
          headline={"Velkommen!"}
          children={
              <div>
                  Hallo dær!
              </div>
          }/>
  )
}

export default IndexPage
