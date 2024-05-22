'use client'

import Image from "next/image";
import LogoColor from "../Assets/LogoColor.png"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import revalidateHomePage from "./RevalidateAction";

async function postAllVideos(title: string, description: string, url: string) {
    const res = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: "debasish_sahoo",
            description: description,
            video_url: url,
            title: title
        })
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export const NewVideoDialog = () => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const handlePostVideo = async () => {
        setLoading(true)
        const data = await postAllVideos(title, description, url)
        if (data["success"] === "POST /videos") {
            revalidateHomePage()
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    return (
        <div className="w-full flex md:flex-row flex-col justify-between items-center">
            <div className="mb-5">
                <Image
                    src={LogoColor}
                    alt="Picture of the author"
                    className="w-40 relative"
                />
                <p className="text-xs absolute hidden md:block md:top-[78px] md:left-[92px] text-slate-500">The first learning place for your kids</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default" className="w-full md:w-32">Add new Video</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Video (by link)</DialogTitle>
                        <DialogDescription>*every field is necessary</DialogDescription>
                    </DialogHeader>
                    <Input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <Input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <Input type="text" placeholder="URL" onChange={(e) => setUrl(e.target.value)} value={url} />
                    <DialogFooter>
                        <Button className="w-full" onClick={handlePostVideo}>{loading ? "Loading.." : "Upload"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}