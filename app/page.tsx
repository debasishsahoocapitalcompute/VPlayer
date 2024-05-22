import Image from "next/image";
import Video from 'next-video';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

async function getAllVideos() {
  const res = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=debasish_sahoo', {
    method: "GET"
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

type videoObject = {
  created_at: string,
  video_url: string,
  user_id: string,
  description: string,
  title: string,
  num_comments: number,
  id: string
}

export default async function Home() {
  const { videos } = await getAllVideos()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {videos.map((video: videoObject) =>
        <Card key={video.id} className="p-5 w-96">
          <CardHeader>
            <Video src={video.video_url} width={300} className="rounded-lg" />
          </CardHeader>
          <CardContent>
            <CardTitle className="mt-5">{video.title}</CardTitle>
            <CardDescription className="mt-4 mb-[-15px]">{video.description}</CardDescription>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
