import Header from "../Components/Header";
import "../assets/css/Home.css";
function Home() {
    return (
        <div>
            <Header/>
            <div className="content">
                <h1>Welcome to Coinfocus</h1>
                <p>
                    Coinfocus is a platform that allows you to follow the evolution of the cryptocurrency market in real time.
                </p>
                <p>
                    You can also make transactions and follow your transaction history.
                </p>
            </div>
        </div>

    )
  }
  
  export default Home