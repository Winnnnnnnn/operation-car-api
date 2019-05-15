//引入购物车API
const car = require('./car'),
    readline = require('readline');

/**
 * 输入输出流
 * @type {Interface}
 */
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

/**
 * 初始化View
 */
function initView() {
    console.log('------购物车首页------');
    console.log('1.添加物品到购物车');
    console.log('2.我的购物车');
    //监听用户选择
    rl.question('请选择：',function(action) {
        switch (action) {
            case '1':
                //进入添加商品
                addProduct();
                break;
            case '2':
                //获取个人的购物车
                getProduct();
                break;
            default:
                console.log('输入有误!');
                //重新绘制View
                resetView();
                break;
        }
    });
}

/**
 * 重新绘制View
 */
function resetView() {
    console.log('\033[2J');
    initView();
}

/**
 * 添加物品到购物车
 */
function addProduct() {
    //存放物品数据
    let product = {};
    //监听物品数据的输入
    rl.question('请输入物品名称：',function(name) {
        product.name = name;
        rl.question('请输入物品价格：',function(price) {
            product.price = parseFloat(price);
            rl.question('请输入物品数量：',function(count) {
                product.count = parseInt(count);
                //添加至购物车
                car.addProduct(product);
                //重新绘制View
                resetView();
            });
        });
    });
}

/**
 * 查看我的购物车
 */
function getProduct() {
    if (car.getProduct()) {
        //监听操作选择
        opProduct();
    } else {
        //购物车内无数据，重新绘制View
        resetView();
    }
}

/**
 * 将物品移除购物车
 */
function opProduct() {
    console.log('------购物车操作------');
    console.log('1.移除');
    console.log('2.退出');
    //监听选择
    rl.question('请选择：',function(action) {
        switch (action) {
            case '1':
                //移除
                delProduct();
                break;
            case '2':
                //退出、重新绘制View
                resetView();
                break;
            default:
                console.log('输入有误!');
                //重新绘制View
                resetView();
                break;
        }
    });
}

/**
 * 从购物车中移除物品
 */
function delProduct() {
    //监听移除
    rl.question('请选择要移除的物品：',function(index) {
        let re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
        if (!re.test(index)) {
            //输入有误
            console.log('输入有误!');
            //重新绘制View
            resetView();
        } else {
            if (car.delProduct(parseInt(index))) {
                //重新绘制View
                resetView();
            } else {
                //输入有误
                console.log('所选物品不存在!');
                //重新绘制View
                resetView();
            }
        }
    });
}

//初始化View
initView();