


export const check = ({latitude1,longitude1}) => {

    const latitude2 =36.5310338;
    const longitude2 =116.6284361;
    const a =(latitude2 - latitude1) ;
    const b = (longitude2 - longitude1);
    const c =(latitude1 - latitude2);
    const d =(longitude1 - longitude2);
    const nn = false;
    const yy = true;

if(a <= 0.00002 && b <= 0.00002){
    return yy;
}else if(a <= 0.00002 && d <= 0.00002){
    return yy;
}else if(b <= 0.00002 && c <= 0.00002){
    return yy;
}else if(d <= 0.00002 && c <= 0.00002){
    return yy;
}else{
    return nn;
}   }