


/**
 * 思路：
 * 1.所有图片宽度固定
 * 2.容器的宽度和图片的宽度决定有几列，并且还决定了列与列之间的宽度
 * 
 */


let divContainer = document.getElementsByClassName('container')[0];//获取父级容器
let imgWidth = 220;//固定图片的宽度

/**
 * 加入图片元素
 */
function createImgs () {
    for (let i = 0 ; i <= 40 ; i++) {
        let src = 'img/' + i + '.jpg';
        let img = document.createElement('img');
        img.src = src;
        img.style.width = imgWidth;
        divContainer.appendChild(img);
        img.onload = function () {
            setPosition();
        };
    }
}
createImgs();

/**
 * 设置每张图片的位置
 */
function setPosition () {
    let info = cal();
    let nextTops = new Array(info.columns);//长度为列数，每一项表示每一列的高度
    nextTops.fill(0);//将数组的每一项填充为0
    for (let i = 0 ; i < divContainer.children.length ; i ++) {
        let  img = divContainer.children[i];
        // 设置纵坐标
        // 找到nextTops当中的最小值作为当前图片的纵坐标
        let minTop = getMin(nextTops);
        img.style.top = minTop + 'px';

        //更新数组下一项的高度
        let index = nextTops.indexOf(minTop);//找到使用的第几列的top

        nextTops[index] = img.height + info.space;
        //设置横坐标
        let left = (index + 1) * info.space + index * imgWidth;
        img.style.left = left + 'px';
       
    }
    let max = getMax(nextTops);
    divContainer.style.height = max + 'px';
}
/**
 * 获取数组当中的最小值
 * @param {*} arr 
 */
function getMin (arr) {
    let min = arr[0];
    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i] < min) {
            min = arr[i]
        }
    }
    return min;
}
/**
 * 获取数组当中的最大值
 * @param {*} arr 
 */
function getMax (arr) {
    let max = arr[0];
    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i] > min) {
            max = arr[i]
        }
    }
    return max;
}
/**
 * 计算一共有多少列，以及列之间的宽度
 */
function cal () {
    let containerWidth = divContainer.clientWidth; //获取容器的宽度
    let columns = Math.floor(containerWidth / imgWidth);    //计算列的数量
    //计算间隔
    let spaceNumber = columns + 1;//间隔数量
    let leftSpace = containerWidth - columns * imgWidth;//剩余空间
    let space = leftSpace / spaceNumber;//平分剩余空间
    return {
        space:space,//间隙空间
        columns:columns  //列的数量
    }

}

let timer = null;
/**
 * 窗口发生改变时
 * 利用防抖，优化效率
 */
window.onresize = function () {
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        setPosition()
    },300)
}
