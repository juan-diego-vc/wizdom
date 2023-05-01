interface proptypes{
    width? : string | number,
    height? : string | number
}

export default function Xiraicon({ width, height }: proptypes){
    const finalWidth = width ? width : '2cm'
    const finalHeight = height ? height : '2cm'
    const inlineStyle = {width : finalWidth, height : finalHeight}
    return <img
        src="https://i0.wp.com/xira.ai/wp-content/uploads/2022/01/cropped-Logo-XIRA-simple-02.png?fit=192%2C192&ssl=1"
        alt=""
        style={inlineStyle}/>
}