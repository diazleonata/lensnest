import './HomePage.css';
import Header from '../components/Header';
import Photos from '../components/Photos';

const HomePage = () => {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="px-4 max-w-md mx-auto pt-4">
        <Photos
          imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          likes={2}
          comments={2}
          username="alexphoto"
          caption="is you are using your phone to took picture?"
        />
        <Photos
          imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          likes={2}
          comments={2}
          username="akukotkganteng"
          caption="where the location?"
        />
      </main>
    </div>
  )
}

export default HomePage;
