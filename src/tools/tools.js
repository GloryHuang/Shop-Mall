//格式化从数据库中取出的数据
exports.DataFormat = (data) => {
    data = JSON.parse(data);
    data.forEach((item) => {
        item.goodsPic = item.goodsPic.split(',');
        item.goodsContentImg = item.goodsContentImg.split(',');
        item.buyColor = JSON.parse(item.buyColor);
        item.buyCapacity = JSON.parse(item.buyCapacity);
    });

    return data;
}