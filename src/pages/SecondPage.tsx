import { Link } from 'react-router';
import reactLogo from '../assets/react.svg';

function SecondPage() {
  return (
    <div className="h-screen bg-black flex justify-center items-center flex-col space-x-4 text-white">
      <h1>Symph coding assignment page 2</h1>
      <div className="py-4">
        <Link to="/">Go to home page</Link>
      </div>
    </div>
  );
}

export default SecondPage;
