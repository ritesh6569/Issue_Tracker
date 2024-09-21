import Header from "./Header";
import "../styles/Home.css";

function Home(){
    return(
        <div className="home-body" >
            <Header/>
            <div className="home-div">
                <h1>WELCOME TO OUR WEBSITE</h1>
            </div>
        </div>
    );
}

export default Home