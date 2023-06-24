import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDzGlSsIRXzB5K8tllxW-a8aIb-tgv09Wk`
        );

        if (response.ok) {
          const data = await response.json();
          setVideoData(data.items[0]);
        } else {
          console.error('Unable to fetch video data.');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchData();
  }, [videoId]);

  if (!videoData) {
    return <div>Loading...</div>;
  }


  const { snippet } = videoData;
  const src = `https://www.youtube.com/embed/${videoId}`;
  // console.log(src);
  return (
    <div className="youtube-video">
            {/* <div className="App">
      <p>hello</p>
      <video src={src} width="750" height="500" controls>
     </video>
      </div> */}
      <iframe
        className="youtube-video-iframe"
        title=""
        width="100%"
        height="100vh !important"
        src={`https://www.youtube.com/embed/${videoId}?controls=0`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Hero;
