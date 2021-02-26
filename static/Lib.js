class Lib{
    static deepcopy(val){
        return JSON.parse(JSON.stringify(val));
    }
}

export default Lib;