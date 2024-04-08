import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) =>{
    const [data,setData] = useState([]); //Here instead of using /posts in the url we want it to be generic so we could use it in aanother application...and custom hook is much like a utility function 
    const [fetchError,setFetchError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source(); //This is part of axios we can see this axios documentation it will set a cancel token ie we can actually cancel the request if forever any reason component is unmounted

        const fetchData = async (url)=>{
            setIsLoading(true);
            try{
                const response = await axios.get(url,{
                    cancelToken: source.token
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message);
                    setData([]);
                }
            }finally{
                isMounted && setTimeout(()=> setIsLoading(false),2000);
            }
        }

        fetchData(dataUrl);

        const cleanUp = ()=>{
            console.log('Clean up function');
            isMounted = false;
            source.cancel(); //Request is already completed 
        }

        return cleanUp;

    },[dataUrl]);

    return { data, fetchError, isLoading };

}

export default useAxiosFetch;