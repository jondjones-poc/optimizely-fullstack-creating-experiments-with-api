import '../styles/globals.css'
import Layout from "../UI/Layout";
import "../public/assets/vendor/bootstrap/css/bootstrap.min.css"
import "../public/assets/vendor/fonts/circular-std/style.css"
import "../public/assets/libs/css/style.css"

function MyApp({ Component, pageProps }) {

const props = {...pageProps};

  return (<>
            <Layout {...props}>
              <Component {...pageProps} />
            </Layout>
      </>)
}

export default MyApp
