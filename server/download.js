import ytdl from "ytdl-core"
import fs from "node:fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://youtube.com/shorts/" + videoId
    console.log("Realizando download do video:", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Nao foi possivel fazer o download do video. Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
