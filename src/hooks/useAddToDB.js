const useAddToDB = (addApiLink, data) => {
    // send data to server
    fetch({ addApiLink }, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log('success');
        });
};

export default useAddToDB;