/**
 * 封装当前时间
 */

module.exports = {
    alltime(){
        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth() + 1; // 月份从0开始，因此需要加1
        const day = currentTime.getDate();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const time = year+"-"+month+"-"+day+"."+hours+":"+minutes;
        return time;
    },
    bigTime() {
        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth() + 1; // 月份从0开始，因此需要加1
        const day = currentTime.getDate();
        const time=year+"/"+month+"/"+day;
        return time
    },
    smalltime(){
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const time=hours+":"+minutes
        return time
    }

}