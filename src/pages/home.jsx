import MatrixRain from '../components/MatrixRain'
import Header from '../components/header'
import Introduction from '../components/introduction'
import Bento from '../components/Bento'
import Exp from '../components/exp'
import Terminal from '../components/Terminal'
import Footer from '../components/footer'

export default function Home() {
    return (
        <div className="page">
            <MatrixRain />
            <Header />
            <main>
                <Introduction />
                <Terminal />
                <Bento />
                <Exp />
                <Footer />
            </main>
        </div>
    )
}
