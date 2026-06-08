import dotenv from "dotenv";
dotenv.config();

const API_URL = "http://4.224.186.213/evaluation-service/logs";
const TOKEN = process.env.BEARER_TOKEN;

export async function Log(
    stack,
    level,
    package1,
    message
) {
    try {
        const res = await fetch(API_URL,{
            method:"POST",
            headers:{"Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`},
            body: JSON.stringify({stack,level,package:package1,message})
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Logging failed", err);
    }
}