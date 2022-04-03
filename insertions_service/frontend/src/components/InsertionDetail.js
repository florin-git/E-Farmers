import React from 'react';

function InsertionDetail(props) {
    const [insertion, setInsertion] = useState([]);

    // setInsertions(insert);

    // One possiblity
    useEffect(() => {
        // Make an asynchronous HTTP request.
        (async () => {
            /* 
                Because the 'await' keyword, the asynchronous
                function is paused unitl the request completes. 
                */
            const response = await fetch(
                "http://localhost:8000/api/insertions/"
            );
            const data = await response.json();

            setInsertion(data);
        })();
    }, []);


    return (
        <div>
            
        </div>
    );
}

export default InsertionDetail;