import axios from "axios"

const key = process.env.API_KEY

if (!key) {
  throw new Error("API Key is not found.")
}

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${key}`
}

const requestData = {
  "model": "gpt-3.5-turbo",
  "messages": [
        {role: "system", content: "あなたはChatBotです"},
        {role: "user", content: "おはようございます"},
  ]
}

const axiosClient = axios.create({
  baseURL: "https://api.openai.com/v1/chat/",
  headers: headers,
  responseType: "json",
})

axiosClient.post("completions", requestData).then(response => response.data).then(response => {
  console.info(response.usage)
  return response.choices}).then(choices => choices[0].message).then(message=> console.log(message))