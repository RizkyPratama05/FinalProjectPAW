import { VideoText } from "./magicui/video-text";
 
export function VideoTextDemo() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden">
      <VideoText src="https://cdn.magicui.design/ocean-small.webm">
        SEMINAR
      </VideoText>
    </div>
  );
}
