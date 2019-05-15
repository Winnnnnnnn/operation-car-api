const mysql = require('./mysql/mysql');

//购物车数据
const products = [];

/**
 * 添加物品到购物车内
 * @param product 物品数据
 */
function addProduct(product) {
    //首次添加标志
    let flag = true;
    //判断物品是否已经在购物车内
    products.forEach(function (obj,i) {
        //物品名称一致
        if (obj.name == product.name) {
            //追加购物车内物品数量
            products[i].count += product.count;
            //关闭首次添加物品标志
            flag = false;
        }
    });
    //判断是否为第一题添加物品
    if (flag) {
        //添加到购物车列表内
        products.push(product);
    }
    //打印当前结果
    console.log('添加成功！');
}

/**
 * 获取用户的全部购物车数据
 */
function getProduct() {
    //判断是否有购物车数据
    if (products.length > 0) {
        console.log('------购物车列表------');
        products.forEach(function (obj,i) {
            console.log(i+1 + '.' + obj.name + '  ' + obj.price + '元  ' + obj.count);
        });
        return true;
    } else {
        console.log('------暂无数据------');
        return false;
    }
}

/**
 * 移除指定物品
 * @param index
 */
function delProduct(index) {
    //校验数据索引是否合法
    if (index<=products.length) {
        //索引合法
        products.splice(index-1,1);
        //打印当前结果
        console.log('移除成功！');
        return true;
    } else {
        //索引不合法
        return false;
    }
}

/**
 * 物品数据持久化保存
 * @param data
 */
function saveProduct(data) {
    let sql = "insert into car(name,price,count) values(?,?,?)";
    let p = [data.name,data.price,data.count];
    mysql.exec(sql,p,function (err,r) {
        if (err) {
            return false;
        } else {
            if (r.insertId != 0) {
                return true;
            } else {
                return false;
            }
        }
    });
}

/**
 * 获取持久化的物品数据
 */
function selectProduct() {
    let sql = "select * from car";
    mysql.exec(sql,null,function (err,r) {
        return JSON.stringify(r);
    });
}

/**
 * 移除持久化的数据
 * @param id
 */
function deleteProduct(id) {
    let sql = "delete from car where id=?";
    let p = [id];
    mysql.exec(sql,p,function (err,r) {
        if (err) {
            return false;
        } else {
            if (r.affectedRows == 0) {
                return true;
            } else {
                return false;
            }
        }
    });
}

//导出模块方法
module.exports = {addProduct,getProduct,delProduct};