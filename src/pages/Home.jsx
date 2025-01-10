import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import '../assets/css/Home.css';

const Home = () => {
    // Generate random data for the graph
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 7; i++) {
            data.push({
                name: `Day ${i + 1}`,
                price: Math.floor(Math.random() * (50000 - 30000) + 30000)
            });
        }
        return data;
    };

    return (
        <>
        <Header />
        <div className="home-container">
            <h1>Welcome to Coinfocus</h1>
            <p>
                Coinfocus is a platform that allows you to follow the evolution of the cryptocurrency market in real time.
            </p>
            <p>
                You can also make transactions and follow your transaction history.
            </p>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={generateData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#f5ba00" 
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <Link to="/register" className="get-started-btn">
                Get Started
            </Link>
        </div>
        </>
    );
};

export default Home;