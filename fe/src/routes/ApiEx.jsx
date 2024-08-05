import {useState, useEffect} from 'react'
import { getData } from '../apis/ApiExample';

export default function ApiEx() {
    const [data, setData] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        const result = await getData(); 
        setData(JSON.stringify(result)); 
      };
      
      fetchData();
    }, []);
  
  return (
    <div>{data}</div>
  )
}
