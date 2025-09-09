import Content from "@/components/Content";
import { promises as fs } from 'fs';
import path from 'path';

async function readFile() {
  try {
    const filepath = path.join(process.cwd(), 'public', 'test_data.json')
    const data = await fs.readFile(filepath, 'utf8');
    return data
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

export default async function Home() {
  let data = await readFile()
  data = JSON.parse(data)
  return (
    <div className="flex justify-center ">
      <Content data={data}/>
    </div>
  );
}
