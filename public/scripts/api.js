'use babel'

class ApiObj {
    getRSSContent(callback){
        this.getRSSContentForIndex(0, callback);
    }

    getRSSSources(callback){
        axios.get("/api/rss_sources").then(function (response){
            const items = response.data
            console.log(response)
            callback(items)
        }).catch(function (error){
            console.log(error);
        })
    }

    getRSSContentForIndex(index, callback){
        axios.get("/api/rss", {
            params : {
                source : index
            }
        }).then(function (response){
            const items = response.data
            console.log(response)
            callback(items)
        }).catch(function (error){
            console.log(error);
        })
    }
}

const API = new ApiObj();
