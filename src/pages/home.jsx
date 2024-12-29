import Header from '../components/header'
import Introduction from '../components/introduction'
import Exp from '../components/exp'
import Skills from '../components/skills'
import Cert from '../components/cert'
import Footer from '../components/footer'

export default function Home() {
    return (
        <div>
          <Header/>
          <Introduction/>
          <Exp/>
          <Skills />
          <Cert />
          <Footer/>
        </div>
    )
}