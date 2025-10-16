import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleNavigateToAbout() {
    navigate("/about");
  }

  return (
    <>
      <h1>Home Page</h1>
      <p>This is the home page with button-based routing.</p>
      <button onClick={handleNavigateToAbout} className="border-2 rounded-xl">
        Go to About Page
      </button>
    </>
  );
}

export default Home;
