import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Container, Button, Typography, Box } from '@mui/material';
import './App.css';

const videoList = [
  "https://youtu.be/DEqkukrLRYQ",
  "https://r10104.yandexwebcache.org/jujutsu-kaisen/2.1080.00e82869f54154d8.mp4?hash1=7100958f6916ba233ef5ce6bd39101bb&hash2=9c597d4bf68359d68a8f6b4a1f0e2542",
  "https://r10104.yandexwebcache.org/jujutsu-kaisen/3.1080.3ab1a0c4b449d8f9.mp4?hash1=be39c345502100b67dfc0fa522b838cd&hash2=db05d411d8440eb3533a6629a8422454",
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);
  const videosPerPage = 1;

  const handleNextPage = () => {
    if ((currentPage + 1) * videosPerPage < videoList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentVideos = videoList.slice(currentPage * videosPerPage, (currentPage + 1) * videosPerPage);

  const rewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    }
  };

  const forward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    }
  };

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '20px', position: 'relative', zIndex: 1 }}>
      <Typography variant="h4" gutterBottom style={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
        Видеоплеер
      </Typography>
      {currentVideos.length > 0 ? (
        currentVideos.map((url, index) => (
          <Box key={index} mb={2}>
            <ReactPlayer 
              ref={playerRef}
              width="100%"
              height="450px"
              autoPlay
              playing
              light={<img src="https://via.placeholder.com/600x450.png?text=Нажмите+для+воспроизведения" alt="Thumbnail" />}
              stopOnUnmount={true}
              controls
              pip
              playbackRate={1}
              style={{ borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              progressInterval={200}
              url={url}
            />
          </Box>
        ))
      ) : (
        <Typography variant="h6" color="error" style={{ color: '#fff' }}>
          Нет доступных видео для отображения.
        </Typography>
      )}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={rewind} style={{ marginRight: '10px' }}>
          Отмотать на 5 секунд
        </Button>
        <Button variant="contained" color="primary" onClick={forward} style={{ marginRight: '10px' }}>
          Перемотать на 5 секунд
        </Button>
        <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={currentPage === 0} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Назад
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextPage} disabled={(currentPage + 1) * videosPerPage >= videoList.length} style={{ padding: '10px 20px' }}>
          Вперед
        </Button>
      </Box>
    </Container>
  );
}

export default App;
